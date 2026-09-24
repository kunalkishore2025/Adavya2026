const express = require('express');
const cookieSession = require('cookie-session'); // Replaced express-session
const crypto = require('crypto'); // Added for generating secure tokens
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Middleware ─────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware — survives Vercel restarts via encrypted cookies
app.use(cookieSession({
  name: 'heist-session',
  keys: ['cyber-freshers-2026-secret-key-scavenger-hunt'], // Encrypts the cookie
  maxAge: 2 * 60 * 60 * 1000 // 2 hours
}));

// Serve static assets from /public (CSS, images, client scripts)
app.use(express.static(path.join(__dirname, 'public'), {
  index: 'index.html'
}));

// ─── Helper Functions / File Utilities ──────────────────────

function getFakeUrls() {
  const filePath = path.join(__dirname, 'Fake_Url.txt');
  const lines = fs.readFileSync(filePath, 'utf8')
    .split(/\r?\n/)
    .map(l => l.trim())
    .filter(Boolean);

  return {
    easyUrls: lines.slice(0, 60),
    hardUrls: lines.slice(60, 100)
  };
}

function getGoodLinks() {
  const filePath = path.join(__dirname, 'Good_Links.txt');
  return fs.readFileSync(filePath, 'utf8')
    .split(/\r?\n/)
    .map(l => l.trim())
    .filter(Boolean);
}

function getMessagePairs() {
  const filePath = path.join(__dirname, 'message.txt');
  const lines = fs.readFileSync(filePath, 'utf8')
    .split(/\r?\n/)
    .map(l => l.trim())
    .filter(Boolean);

  return lines.map(line => {
    const commaIndex = line.indexOf(',');
    return {
      plaintext: line.substring(0, commaIndex).trim(),
      ciphertext: line.substring(commaIndex + 1)
    };
  });
}

function pickRandomDistinct(arr, count) {
  const copy = [...arr];
  const selected = [];
  const numToPick = Math.min(count, copy.length);

  for (let i = 0; i < numToPick; i++) {
    const randIdx = Math.floor(Math.random() * copy.length);
    selected.push(copy[randIdx]);
    copy.splice(randIdx, 1);
  }
  return selected;
}

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// ─── STAGE 1: The Link Shuffle & Guards ─────────────────────

app.get('/api/links', (req, res) => {
  try {
    const { easyUrls, hardUrls } = getFakeUrls();
    const goodLinks = getGoodLinks();

    const selectedEasy = pickRandomDistinct(easyUrls, 7);
    const selectedHard = pickRandomDistinct(hardUrls, 7);
    const selectedGood = pickRandomDistinct(goodLinks, 1);

    // Generate a one-time secure token for this session
    const stage1Token = crypto.randomBytes(8).toString('hex');
    req.session.stage1Token = stage1Token;

    // Build the bad items
    const badItems = [...selectedEasy, ...selectedHard].map(url => ({
      text: url,
      href: '/dead-end',
      isValid: false
    }));

    // Build the valid item with the secure token attached
    const goodItem = {
      text: selectedGood[0] || 'https://cyber-ops.security-cell.org/terminal',
      href: `/verify-stage1?token=${stage1Token}`,
      isValid: true
    };

    const allLinks = shuffleArray([...badItems, goodItem]);
    res.json({ links: allLinks });
  } catch (err) {
    console.error('Error in /api/links:', err);
    res.status(500).json({ error: 'Failed to generate link shuffle.' });
  }
});

app.get('/dead-end', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'dead-end.html'));
});

// Verifies the user actually clicked the link instead of guessing the URL
app.get('/verify-stage1', (req, res) => {
  const userToken = req.query.token;
  
  if (userToken && req.session.stage1Token && userToken === req.session.stage1Token) {
    req.session.stage1Solved = true;
    req.session.stage1Token = null; // Clear token so it can't be reused
    res.redirect('/challenge');
  } else {
    res.redirect('/dead-end');
  }
});

// Middleware Guard for Stage 1
function requireStage1(req, res, next) {
  if (req.session && req.session.stage1Solved) {
    next();
  } else {
    res.redirect('/');
  }
}

// ─── STAGE 2: Rail Fence Cipher Challenge & Guards ──────────

// Protected by requireStage1
app.get('/challenge', requireStage1, (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'challenge.html'));
});

app.get('/api/challenge-question', (req, res) => {
  try {
    const pairs = getMessagePairs();
    const randomPair = pairs[Math.floor(Math.random() * pairs.length)];

    req.session.currentChallenge = {
      plaintext: randomPair.plaintext,
      ciphertext: randomPair.ciphertext
    };

    res.json({ plaintext: randomPair.plaintext });
  } catch (err) {
    console.error('Error in /api/challenge-question:', err);
    res.status(500).json({ error: 'Failed to load challenge question.' });
  }
});

app.post('/api/verify-cipher', (req, res) => {
  if (!req.session.currentChallenge) {
    return res.status(400).json({
      success: false,
      message: 'SESSION EXPIRED — Please refresh the page to load a new challenge.'
    });
  }

  const userAnswer = (req.body.answer || '');
  const expected = req.session.currentChallenge.ciphertext;

  // Simplified and safe strict matching
  const isMatch = userAnswer.toLowerCase().trim() === expected.toLowerCase().trim();

  if (isMatch) {
    req.session.stage2Solved = true;
    return res.json({
      success: true,
      message: 'ACCESS GRANTED — Cipher verified.',
      redirect: '/payload'
    });
  } else {
    return res.json({
      success: false,
      message: 'ACCESS DENIED — Cipher text incorrect. Try again.'
    });
  }
});

// Middleware Guard for Stage 2
function requireStage2(req, res, next) {
  if (req.session && req.session.stage2Solved) {
    next();
  } else {
    res.redirect('/challenge');
  }
}

// ─── STAGE 3: The Final Payload & Guards ────────────────────

// Protected by requireStage2
app.get('/payload', requireStage2, (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'payload.html'));
});

app.get('/download', requireStage2, (req, res) => {
  const filePath = path.join(__dirname, 'protected', 'Vault.zip');
  res.download(filePath, 'Vault.zip');
});

// Valid final codes hidden on the server
const validFinalCodes = [
  '8cf41a596d0eff021e8f96606ce27ae642a0d6f583fa3599d58862ada4acc94fa6bdba24b8b098fe657c26bf4c830c12b1e0aef235b65784d3f59610a72b6149',
  'a8d1b2ccbc62d324637f61ccb381af96dcf425816b2a2716e5145a4a0baccd22be380d177c9f5a70e0b1b68cc1c37acec5cf4e45d1e5de812987e6239ccfb323',
  'ae08c7dfc3ae44eccf372fe2df402ee52db60beca0d245881829ed5dc0e45ff8cf28d4b04abd37f280c1c3aea12ff12337c39014172f5160f76f83aabb1b4545',
  '617565d950b9e6d9d697e96323fceca3d6c9718a8a4e8f4112612766a5238ca5c105ba89de72ebfc89e6534d8c143b5f30bf2ecf5f2def96188c429acedd3761',
  'd5f83c8f929acdb02f1dfcbdf80a212e69c3fc6727e3931f3ecb4a3b87299b3227626c71854c367c55a8347256c1616a26fd683cc050a80ec252e7330ad76083',
  '0c8fa0cbd6dbaf1998f3738e394d7332a9da420fb0da0d3725f83d1bbf10e73eab55b27468c937c2258232e1b5f5cd2ed003f901001d21ecf9cddf81a656de8f'
];

app.post('/api/verify-secret', (req, res) => {
  const code = (req.body.code || '').trim().toLowerCase();
  
  if (validFinalCodes.includes(code)) {
    req.session.stage3Solved = true;
    return res.json({ success: true });
  }
  
  return res.json({ 
    success: false, 
    message: 'ACCESS DENIED — Invalid authorization code.' 
  });
});

// Middleware Guard for Stage 3 (Success Page)
function requireStage3(req, res, next) {
  if (req.session && req.session.stage3Solved) {
    next();
  } else {
    res.redirect('/payload');
  }
}

// Protected by requireStage3
app.get('/success', requireStage3, (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'success.html'));
});

// ─── Start Server ───────────────────────────────────────────
app.listen(PORT, () => {
  console.log('──────────────────────────────────────────');
  console.log("  Freshers' Heist 2026 — 3-Stage Scavenger Hunt");
  console.log('──────────────────────────────────────────');
  console.log(`  🔐 Server running at http://localhost:${PORT}`);
  console.log('──────────────────────────────────────────');
});

module.exports = app;