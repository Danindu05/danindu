
(function () {
  // ---------- Small helpers ----------
  function onReady(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn, { once: true });
  }
  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var s = document.createElement('script');
      s.src = src;
      s.defer = true;
      s.onload = resolve;
      s.onerror = function () { reject(new Error('Failed to load ' + src)); };
      document.head.appendChild(s);
    });
  }
  function exists(sel) { return !!document.querySelector(sel); }

  // ---------- Ensure GSAP + plugins (auto-load if missing) ----------
  function ensureGSAP() {
    var needsGSAP = !window.gsap;
    var needsST = !window.ScrollTrigger;
    var needsMP = !window.MotionPathPlugin;

    var queue = Promise.resolve();
    if (needsGSAP) queue = queue.then(function(){ return loadScript('https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js'); });
    if (needsST)   queue = queue.then(function(){ return loadScript('https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js'); });
    if (needsMP)   queue = queue.then(function(){ return loadScript('https://cdn.jsdelivr.net/npm/gsap@3/dist/MotionPathPlugin.min.js'); });

    return queue.then(function(){
      if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
      if (window.MotionPathPlugin) gsap.registerPlugin(MotionPathPlugin);
    });
  }

  // ---------- Features ----------
  function initGlowAnimations() {
    var hasAny = ['#glow-1','#glow-2','#glow-3','#glow-4','#glow-5'].some(exists);
    if (!hasAny) return; // nothing to animate, skip silently

    var hasMP = !!window.MotionPathPlugin;

    // G1
    if (exists('#glow-1')) {
      var tl1 = gsap.timeline({ repeat: -1 });
      var motion1 = hasMP ? { motionPath: { path: 'M0,0 Q150,-80 300,0 Q150,80 0,0', autoRotate: false } } : { x: 300 };
      tl1.to('#glow-1', Object.assign({ scale: 1.5, opacity: 0.8, filter: 'blur(60px)', duration: 12, ease: 'sine.inOut' }, motion1))
         .to('#glow-1', { scale: 0.6, opacity: 0.2, filter: 'blur(80px)', duration: 8, ease: 'power3.inOut' }, '-=4');
    }
    // G2
    if (exists('#glow-2')) {
      var tl2 = gsap.timeline({ repeat: -1 });
      tl2.to('#glow-2', { rotation: 360, transformOrigin: '200px 100px', scale: 1.3, opacity: 0.7, filter: 'blur(50px)', duration: 15, ease: 'none' })
         .to('#glow-2', { scale: 0.8, opacity: 0.3, filter: 'blur(90px)', duration: 5, ease: 'power2.inOut', yoyo: true, repeat: 2 }, '-=10');
    }
    // G3
    if (exists('#glow-3')) {
      var tl3 = gsap.timeline({ repeat: -1 });
      tl3.to('#glow-3', { y: -150, x: 80, scale: 1.6, opacity: 0.9, filter: 'blur(40px)', duration: 10, ease: 'power1.inOut' })
         .to('#glow-3', { y: 100, x: -60, scale: 0.7, opacity: 0.3, filter: 'blur(100px)', duration: 14, ease: 'power2.inOut' })
         .to('#glow-3', { y: 0, x: 0, scale: 1, opacity: 0.4, filter: 'blur(70px)', duration: 8, ease: 'elastic.out(1, 0.3)' });
    }
    // G4
    if (exists('#glow-4')) {
      var tl4 = gsap.timeline({ repeat: -1 });
      tl4.to('#glow-4', { y: 180, x: '+=100', scale: 0.5, opacity: 0.6, filter: 'blur(120px)', duration: 13, ease: 'sine.inOut' })
         .to('#glow-4', { y: -80, x: '-=200', scale: 1.4, opacity: 0.8, filter: 'blur(30px)', duration: 11, ease: 'power3.inOut' })
         .to('#glow-4', { y: 0, x: '+=100', scale: 1, opacity: 0.2, filter: 'blur(80px)', duration: 9, ease: 'back.out(1.7)' });
    }
    // G5
    if (exists('#glow-5')) {
      var tl5 = gsap.timeline({ repeat: -1 });
      var motion5 = hasMP ? { motionPath: { path: 'M0,0 Q120,-100 240,0 Q360,100 480,0 Q360,-100 240,0 Q120,100 0,0', autoRotate: false } } : { x: 480 };
      tl5.to('#glow-5', Object.assign({ scale: 1.8, opacity: 0.6, filter: 'blur(45px)', duration: 20, ease: 'power1.inOut' }, motion5))
         .to('#glow-5', { scale: 0.4, opacity: 0.9, filter: 'blur(25px)', duration: 6, ease: 'power2.inOut', yoyo: true, repeat: 1 }, '-=8');
    }

    // Mouse follow (optional)
    var hero = document.querySelector('#home');
    if (hero) {
      hero.addEventListener('mousemove', function (e) {
        var xP = (e.clientX / window.innerWidth - 0.5) * 2;
        var yP = (e.clientY / window.innerHeight - 0.5) * 2;
        if (exists('#glow-1')) gsap.to('#glow-1', { x: '+=' + xP * 30, y: '+=' + yP * 20, duration: 2, ease: 'power2.out' });
        if (exists('#glow-2')) gsap.to('#glow-2', { x: '+=' + xP * -25, y: '+=' + yP * 35, duration: 2.5, ease: 'power2.out' });
        if (exists('#glow-3')) gsap.to('#glow-3', { x: '+=' + xP * 40, y: '+=' + yP * -30, duration: 1.8, ease: 'power2.out' });
        if (exists('#glow-4')) gsap.to('#glow-4', { x: '+=' + xP * -35, y: '+=' + yP * 25, duration: 2.2, ease: 'power2.out' });
        if (exists('#glow-5')) gsap.to('#glow-5', { x: '+=' + xP * 20, y: '+=' + yP * -40, duration: 3, ease: 'power2.out' });
      }, { passive: true });
    }

    // Scroll-driven intensity (requires ScrollTrigger)
    if (window.ScrollTrigger && exists('#home')) {
      ScrollTrigger.create({
        trigger: '#home', start: 'top top', end: 'bottom top', scrub: 1,
        onUpdate: function (self) {
          var p = self.progress; var intensity = 1 - p * 0.7;
          if (exists('.floating-glow')) {
            gsap.to('.floating-glow', { opacity: intensity, scale: 0.8 + intensity * 0.4, filter: 'blur(' + (60 + p * 40) + 'px)', duration: 0.3 });
          }
        }
      });
    }
  }

  function initScrollAnimations() {
    if (!window.ScrollTrigger) return; // gracefully skip if missing

    // Parallax
    gsap.utils.toArray('.parallax-bg').forEach(function (el) {
      var speed = parseFloat(el.dataset.speed || '0.5');
      gsap.to(el, { yPercent: -50 * speed, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });
    });

    // Section 3D
    gsap.utils.toArray('.section-3d').forEach(function (section, i) {
      gsap.fromTo(section,
        { rotateX: 5, rotateY: i % 2 === 0 ? -2 : 2, opacity: 0.8 },
        { rotateX: 0, rotateY: 0, opacity: 1, duration: 1.5, ease: 'power3.out', scrollTrigger: { trigger: section, start: 'top 80%', end: 'top 20%', scrub: 1 } }
      );
    });

    // Headings
    gsap.utils.toArray('h1, h2, h3').forEach(function (h) {
      gsap.fromTo(h,
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: h, start: 'top 85%', toggleActions: 'play none none reverse' } }
      );
    });

    // Paragraphs
    gsap.utils.toArray('p').forEach(function (p) {
      gsap.fromTo(p,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power2.out', scrollTrigger: { trigger: p, start: 'top 90%', toggleActions: 'play none none reverse' } }
      );
    });
  }

  function initCLI() {
    var cliTerminal = document.getElementById('cli-terminal');
    var cliContent = document.getElementById('cli-content');
    if (!cliTerminal || !cliContent) return; // no CLI markup on page

    var cliInput = document.getElementById('cli-input');
    var cliClose = document.getElementById('cli-close');
    var cliModeBtn = document.getElementById('cli-mode-btn');
    var cliModeMobileBtn = document.getElementById('cli-mode-mobile-btn');

    var history = []; var idx = -1;
    var commands = {
      help: function () { return '<span class="cli-success">AVAILABLE COMMANDS:</span>\n\n' +
        '<span class="cli-info">Portfolio Commands:</span>\n' +
        '├── <span class="cli-command">help</span>          - Show this help message\n' +
        '├── <span class="cli-command">about</span>         - Info about Danindu\n' +
        '├── <span class="cli-command">skills</span>        - Technical skills\n' +
        '├── <span class="cli-command">projects</span>      - Project details\n' +
        '└── <span class="cli-command">contact</span>       - Contact info\n\n' +
        '<span class="cli-info">System Commands:</span>\n' +
        '├── <span class="cli-command">date</span>          - Current date/time\n' +
        '├── <span class="cli-command">pwd</span>           - Working directory\n' +
        '├── <span class="cli-command">ls</span>            - List directory\n' +
        '├── <span class="cli-command">cat [file]</span>    - Show file\n' +
        '├── <span class="cli-command">echo [text]</span>   - Echo text\n' +
        '└── <span class="cli-command">exit</span>          - Close terminal\n' +
        '<span class="cli-comment">Tip: Tab = complete, ↑/↓ = history</span>'; },
      about: function () { return 'DANINDU NANAYAKKARA\nWeb Developer\n\nI am a Computer Science undergraduate…\nLocation: Sri Lanka\nSpecialization: Full-stack web development'; },
      skills: function () { return '<span class="cli-success">TECHNICAL SKILLS:</span>\n├── HTML\n├── CSS\n├── JavaScript\n├── PHP\n├── Python\n├── Java\n├── MySQL\n├── React.js\n└── Tailwind'; },
      projects: function () { return 'FEATURED PROJECTS:\n[1] Cyberzone\n[2] WaveNest\n[3] Vehicle Assistant'; },
      contact: function () { return 'CONTACT:\nGitHub: github.com/Danindu05\nLinkedIn: linkedin.com/in/danindu'; },
      date: function () { return new Date().toString(); },
      pwd: function () { return '/home/danindu/portfolio'; },
      ls: function () { return 'total 5\ndanindu projects/\ndanindu skills/\ndanindu about.txt\ndanindu contact.txt\ndanindu README.md'; },
      clear: function () { cliContent.innerHTML = '<div class="cli-output cli-success">Welcome to Danindu\'s Portfolio CLI v1.0.0</div><div class="cli-output cli-info">Type \u2018<span class="cli-command">help</span>\u2019 to see available commands</div>'; return ''; },
      echo: function () { var a=[].slice.call(arguments); return a.join(' '); },
      exit: function () { cliTerminal.classList.remove('active'); return ''; }
    };

    function exec(input) {
      var parts = (input||'').trim().split(/\s+/); var cmd = (parts[0]||'').toLowerCase(); var args = parts.slice(1);
      if (!cmd) return '';
      history.push(input.trim()); idx = history.length;
      if (cmd === 'cat') {
        if (args[0] === 'about.txt') return commands.about();
        if (args[0] === 'contact.txt') return commands.contact();
        if (args[0] === 'readme.md') return "# Danindu's Portfolio\n\nWelcome to my interactive portfolio! Use the CLI to explore.\n\nType 'help' for available commands.";
        return 'cat: ' + (args[0]||'') + ': No such file or directory';
      }
      if (cmd === 'echo') return args.join(' ');
      if (commands[cmd]) return commands[cmd]();
      return 'Command not found: ' + cmd + '. Type \u2018help\u2019 for available commands.';
    }

    function addOutput(html) {
      if (!html) return;
      var div = document.createElement('div');
      div.className = 'cli-output';
      div.innerHTML = html;
      var prompt = cliContent.querySelector('.cli-prompt');
      if (prompt) cliContent.insertBefore(div, prompt); else cliContent.appendChild(div);
      cliContent.scrollTop = cliContent.scrollHeight;
    }

    function newPrompt() {
      var old = cliContent.querySelector('.cli-prompt');
      var wrap = document.createElement('div');
      wrap.className = 'cli-prompt';
      wrap.innerHTML = '<span style="color:#22c55e;">danindu@portfolio</span>:<span style="color:#00d4aa;">~</span>$ <input type="text" class="cli-input" autocomplete="off" spellcheck="false">';
      if (old) cliContent.replaceChild(wrap, old); else cliContent.appendChild(wrap);
      var input = wrap.querySelector('.cli-input');
      input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          var val = e.target.value;
          var echo = document.createElement('div'); echo.className='cli-output';
          echo.innerHTML = '<span style="color:#22c55e;">danindu@portfolio</span>:<span style="color:#00d4aa;">~</span>$ <span class="cli-command">' + val + '</span>';
          cliContent.insertBefore(echo, wrap);
          var out = exec(val); if (out) addOutput(out);
          newPrompt();
        } else if (e.key === 'ArrowUp') { e.preventDefault(); if (idx>0) { idx--; e.target.value = history[idx]; } }
        else if (e.key === 'ArrowDown') { e.preventDefault(); if (idx < history.length-1) { idx++; e.target.value = history[idx]; } else { idx = history.length; e.target.value=''; } }
        else if (e.key === 'Tab') {
          e.preventDefault();
          var v = e.target.value.toLowerCase();
          var keys = Object.keys(commands);
          var matches = keys.filter(function(k){ return k.indexOf(v)===0; });
          if (matches.length === 1) e.target.value = matches[0];
          else if (matches.length > 1) { addOutput('Available completions: ' + matches.join(', ')); newPrompt(); }
        }
      });
      input.focus();
      return input;
    }

    // Welcome
    if (!cliContent.querySelector('.cli-output')) {
      addOutput("<div class='cli-output cli-success'>Welcome to Danindu's Portfolio CLI v1.0.0</div>");
      addOutput("<div class='cli-output cli-info'>Type '<span class='cli-command'>help</span>' to see available commands</div>");
    }
    if (!cliInput) cliInput = newPrompt(); else { cliInput.addEventListener('keydown', function(e){ if(e.key==='Enter'){ var out=exec(e.target.value); if(out) addOutput(out); newPrompt(); } }); }

    // Open/close buttons
    if (cliModeBtn) cliModeBtn.addEventListener('click', function(){ cliTerminal.classList.add('active'); (cliInput || newPrompt()).focus(); });
    if (cliModeMobileBtn) cliModeMobileBtn.addEventListener('click', function(){ cliTerminal.classList.add('active'); (cliInput || newPrompt()).focus(); var mm=document.getElementById('mobile-menu'); var mmb=document.getElementById('mobile-menu-btn'); if (mm) mm.classList.remove('active'); if (mmb) mmb.classList.remove('active'); });
    if (cliClose) cliClose.addEventListener('click', function(){ cliTerminal.classList.remove('active'); });
    cliTerminal.addEventListener('click', function(e){ if (e.target === cliTerminal) cliTerminal.classList.remove('active'); });
    document.addEventListener('keydown', function(e){ if(e.key==='Escape' && cliTerminal.classList.contains('active')) cliTerminal.classList.remove('active'); });
  }

  function initMobileMenu() {
    var btn = document.getElementById('mobile-menu-btn');
    var menu = document.getElementById('mobile-menu');
    if (!btn || !menu) return;
    var links = document.querySelectorAll('.mobile-menu-link');
    btn.addEventListener('click', function(){ menu.classList.toggle('active'); btn.classList.toggle('active'); });
    links.forEach(function(a){ a.addEventListener('click', function(){ menu.classList.remove('active'); btn.classList.remove('active'); }); });
    document.addEventListener('click', function(e){ if (!menu.contains(e.target) && !btn.contains(e.target)) { menu.classList.remove('active'); btn.classList.remove('active'); } });
  }

  function initFadeIns() {
    var els = document.querySelectorAll('.fade-in');
    if (!els.length) return;
    var obs = new IntersectionObserver(function(entries){ entries.forEach(function(en){ if (en.isIntersecting) en.target.style.animationPlayState = 'running'; }); }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    els.forEach(function(el){ el.style.animationPlayState='paused'; obs.observe(el); });
  }

  function initSmoothScroll() {
    var navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(function(a){ a.addEventListener('click', function(e){ var id = a.getAttribute('href'); if (!id || id === '#') return; var target = document.querySelector(id); if (!target) return; e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }); });
  }

  function initContactForm() {
    var form = document.getElementById('contact-form');
    if (!form) return;
    form.addEventListener('submit', function(e){ e.preventDefault(); var btn = form.querySelector('button[type="submit"]'); if (!btn) return; var txt = btn.textContent; btn.textContent = 'MESSAGE SENT ✓'; btn.style.background = '#22c55e'; setTimeout(function(){ btn.textContent = txt; btn.style.background = '#ffffff'; form.reset(); }, 3000); });
  }

  // ---------- Boot ----------
  onReady(function () {
    ensureGSAP().then(function(){
      try { initGlowAnimations(); } catch(e){ console.error('Glow init failed:', e); }
      try { initScrollAnimations(); } catch(e){ console.error('Scroll init failed:', e); }
      try { initCLI(); } catch(e){ console.error('CLI init failed:', e); }
      try { initMobileMenu(); } catch(e){ console.error('Menu init failed:', e); }
      try { initFadeIns(); } catch(e){ console.error('Fade init failed:', e); }
      try { initSmoothScroll(); } catch(e){ console.error('Smooth scroll init failed:', e); }
      try { initContactForm(); } catch(e){ console.error('Contact form init failed:', e); }

      // Diagnostics to help you confirm
      console.table({
        gsap: !!window.gsap,
        ScrollTrigger: !!window.ScrollTrigger,
        MotionPathPlugin: !!window.MotionPathPlugin,
        home: exists('#home'),
        glows: ['#glow-1','#glow-2','#glow-3','#glow-4','#glow-5'].filter(exists).length,
        cli: !!document.getElementById('cli-terminal')
      });
    }).catch(function(err){
      console.warn('GSAP auto-load failed:', err);
    });
  });
})();



        (function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'969741c96393b2f2',t:'MTc1NDIzOTIyOC4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();
