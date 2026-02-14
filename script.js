/* ================================================
   VALENTINE 2026 – Dương Thanh Đạt ❤️ Lê Nguyên Thảo
   Complete Interactive Script
   ================================================ */

// ===== CONFIGURATION =====
const CONFIG = {
    // Password to unlock the page
    // Ngày quen nhau / ngày tỏ tình: 15/12/2024
    password: '15122025',

    // Anniversary date (for day counter)
    anniversaryDate: new Date(2024, 11, 15), // December 15, 2024

    // Typewriter speeds (ms)
    typeSpeed: 80,
    typeDelay: 500,

    // Music URL (royalty-free piano)
    // Using a simple oscillator-based melody as fallback
    musicEnabled: true,

    // Choice responses
    choiceResponses: {
        travel: 'Anh sẽ đưa em đi khắp nơi, từ những con phố nhỏ đến những bãi biển xa. Nhưng nơi nào có em, nơi đó là nhà.',
        future: 'Tương lai trong mắt anh chỉ thật sự rõ ràng khi có em đứng bên cạnh. Cùng nhau, mình sẽ xây nên điều gì đó đẹp lắm.',
        hug: 'Một cái ôm từ em đủ làm anh quên đi mọi mệt mỏi. Anh sẽ giữ em thật chặt, thật lâu, như thể thời gian không tồn tại.'
    }
};

// ===== DOM ELEMENTS =====
const DOM = {
    cursorGlow: document.getElementById('cursor-glow'),
    floatingHearts: document.getElementById('floating-hearts'),
    confettiCanvas: document.getElementById('confetti-canvas'),
    musicToggle: document.getElementById('music-toggle'),
    passwordOverlay: document.getElementById('password-overlay'),
    passwordInput: document.getElementById('password-input'),
    passwordSubmit: document.getElementById('password-submit'),
    passwordError: document.getElementById('password-error'),
    heroSubtitle: document.getElementById('hero-subtitle'),
    heroName: document.getElementById('hero-name'),
    heroDate: document.getElementById('hero-date'),
    btnOpenGift: document.getElementById('btn-open-gift'),
    envelopeContainer: document.getElementById('envelope-container'),
    envelope: document.getElementById('envelope'),
    letterContent: document.getElementById('letter-content'),
    choiceButtons: document.querySelectorAll('.btn-choice'),
    choiceResponse: document.getElementById('choice-response'),
    choiceResponseText: document.getElementById('choice-response-text'),
    heartsFound: document.getElementById('hearts-found'),
    hiddenHearts: document.querySelectorAll('.hidden-heart'),
    minigameMessage: document.getElementById('minigame-message'),
    btnYes: document.getElementById('btn-yes'),
    btnNo: document.getElementById('btn-no'),
    yesResponse: document.getElementById('yes-response'),
    decisionButtons: document.querySelector('.decision-buttons')
};

// ===== STATE =====
let state = {
    musicPlaying: false,
    audioCtx: null,
    heartsFoundCount: 0,
    envelopeOpened: false,
    confettiRunning: false,
    yesClicked: false
};

// ================================================
// PASSWORD SYSTEM
// ================================================
function initPassword() {
    DOM.passwordSubmit.addEventListener('click', checkPassword);
    DOM.passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkPassword();
    });

    // Focus input
    setTimeout(() => DOM.passwordInput.focus(), 500);
}

function checkPassword() {
    const input = DOM.passwordInput.value.trim().toLowerCase();
    if (input === CONFIG.password) {
        DOM.passwordOverlay.style.transition = 'opacity 0.8s ease';
        DOM.passwordOverlay.style.opacity = '0';
        setTimeout(() => {
            DOM.passwordOverlay.classList.add('hidden');
            initPage();
        }, 800);
    } else {
        DOM.passwordError.textContent = 'Sai mật khẩu rồi, thử lại nhé 💔';
        DOM.passwordInput.style.borderColor = '#ff6b6b';
        DOM.passwordInput.value = '';
        setTimeout(() => {
            DOM.passwordError.textContent = '';
            DOM.passwordInput.style.borderColor = '';
        }, 2000);
    }
}

// ================================================
// PAGE INITIALIZATION (after password)
// ================================================
function initPage() {
    initCursorGlow();
    initTypewriter();
    initDayCounter();
    initScrollObserver();
    initEnvelope();
    initChoices();
    initMiniGame();
    initDecision();
    initMusic();
    randomizeHiddenHearts();
}

// ================================================
// DAY COUNTER (since December 15, 2024)
// ================================================
function initDayCounter() {
    const counterEl = document.getElementById('day-counter');
    if (!counterEl) return;

    function updateCounter() {
        const now = new Date();
        const diff = now - CONFIG.anniversaryDate;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        counterEl.innerHTML = `💕 Đã yêu nhau được <strong>${days}</strong> ngày 💕`;
        counterEl.style.opacity = '1';
        counterEl.style.transform = 'translateY(0)';
    }

    // Delay to show after typewriter
    setTimeout(updateCounter, 4000);
}

// ================================================
// CURSOR GLOW EFFECT
// ================================================
function initCursorGlow() {
    if (window.matchMedia('(hover: hover)').matches) {
        document.addEventListener('mousemove', (e) => {
            DOM.cursorGlow.style.left = e.clientX + 'px';
            DOM.cursorGlow.style.top = e.clientY + 'px';
        });
    }
}

// ================================================
// TYPEWRITER EFFECT (Hero Section)
// ================================================
function initTypewriter() {
    const subtitleText = 'Gửi Lê Nguyên Thảo';
    const dateText = 'Valentine 2026 — Từ Dương Thành Đạt';

    typeWriter(DOM.heroSubtitle, subtitleText, CONFIG.typeSpeed, () => {
        setTimeout(() => {
            typeWriter(DOM.heroDate, dateText, CONFIG.typeSpeed / 1.5);
        }, CONFIG.typeDelay);
    });
}

function typeWriter(element, text, speed, callback) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else if (callback) {
            callback();
        }
    }

    type();
}

// ================================================
// SCROLL OBSERVER (Fade-in Elements)
// ================================================
function initScrollObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.fade-in-element').forEach(el => {
        observer.observe(el);
    });
}

// ================================================
// GIFT BUTTON (Scroll + Hearts)
// ================================================
DOM.btnOpenGift.addEventListener('click', () => {
    // Spawn floating hearts
    spawnHearts(8);

    // Play a soft click sound
    playTone(523.25, 0.15, 'sine'); // C5

    // Smooth scroll to letter section
    setTimeout(() => {
        document.getElementById('letter').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }, 300);
});

// ================================================
// ENVELOPE INTERACTION
// ================================================
function initEnvelope() {
    DOM.envelopeContainer.addEventListener('click', () => {
        if (state.envelopeOpened) return;
        state.envelopeOpened = true;

        // Open envelope animation
        DOM.envelope.classList.add('opened');
        DOM.envelopeContainer.classList.add('opened');

        // Play paper sound
        playTone(880, 0.1, 'sine');
        setTimeout(() => playTone(1100, 0.08, 'sine'), 100);

        // Show letter content after envelope opens
        setTimeout(() => {
            DOM.letterContent.classList.add('show');
            spawnHearts(5);
        }, 900);
    });
}

// ================================================
// INTERACTIVE CHOICES
// ================================================
function initChoices() {
    DOM.choiceButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const choice = btn.dataset.choice;

            // Mark selected
            DOM.choiceButtons.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');

            // Show response
            DOM.choiceResponseText.textContent = CONFIG.choiceResponses[choice];
            DOM.choiceResponse.classList.add('show');

            // Effects
            spawnHearts(6);
            playTone(659.25, 0.2, 'sine'); // E5
            setTimeout(() => playTone(783.99, 0.15, 'sine'), 150); // G5
        });
    });
}

// ================================================
// MINI GAME - FIND HIDDEN HEARTS
// ================================================
function initMiniGame() {
    DOM.hiddenHearts.forEach(heart => {
        heart.addEventListener('click', (e) => {
            e.stopPropagation();
            if (heart.classList.contains('found')) return;

            heart.classList.add('found');
            state.heartsFoundCount++;
            DOM.heartsFound.textContent = state.heartsFoundCount;

            // Sound
            playTone(523.25 * (1 + state.heartsFoundCount * 0.25), 0.2, 'sine');

            // Spawn mini hearts at click position
            spawnHeartsAt(e.clientX, e.clientY, 3);

            // Check if all found
            if (state.heartsFoundCount >= 3) {
                setTimeout(() => {
                    DOM.minigameMessage.classList.add('show');
                    spawnHearts(10);
                    // Play victory melody
                    playMelody([523.25, 659.25, 783.99, 1046.50], 0.2);
                }, 500);
            }
        });
    });
}

function randomizeHiddenHearts() {
    // Randomize heart positions on each load
    DOM.hiddenHearts.forEach(heart => {
        const top = 10 + Math.random() * 75;
        const left = 5 + Math.random() * 85;
        heart.style.top = top + '%';
        heart.style.left = left + '%';
    });
}

// ================================================
// DECISION SECTION
// ================================================
function initDecision() {
    // YES button
    DOM.btnYes.addEventListener('click', () => {
        if (state.yesClicked) return;
        state.yesClicked = true;

        // Hide buttons
        DOM.decisionButtons.style.display = 'none';

        // Show response
        DOM.yesResponse.classList.add('show');

        // Effects!
        spawnHearts(20);
        startConfetti();
        launchFireworks();

        // Play celebration melody
        playMelody([
            523.25, 587.33, 659.25, 698.46,
            783.99, 880.00, 987.77, 1046.50
        ], 0.15);

        // Auto-start music
        if (!state.musicPlaying) {
            toggleMusic();
        }
    });

    // NO button - runs away from cursor/touch
    DOM.btnNo.addEventListener('mouseover', runAwayButton);
    DOM.btnNo.addEventListener('touchstart', (e) => {
        e.preventDefault();
        runAwayButton();
    });

    DOM.btnNo.addEventListener('click', (e) => {
        e.preventDefault();
        runAwayButton();
    });
}

function runAwayButton() {
    const btn = DOM.btnNo;
    const parent = btn.parentElement;
    const parentRect = parent.getBoundingClientRect();

    // Get viewport dimensions
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Calculate random position within viewport
    const maxX = vw - btn.offsetWidth - 20;
    const maxY = vh - btn.offsetHeight - 20;

    const randomX = Math.max(20, Math.random() * maxX);
    const randomY = Math.max(20, Math.random() * maxY);

    // Move button to fixed position
    btn.style.position = 'fixed';
    btn.style.left = randomX + 'px';
    btn.style.top = randomY + 'px';
    btn.style.zIndex = '9999';
    btn.style.transition = 'all 0.15s ease';

    // Play funny sound
    playTone(300 + Math.random() * 400, 0.1, 'square');

    // Change text after a few runs
    const funnyTexts = [
        'Đừng bấm nút này 😜',
        'Anh không cho bấm 🙈',
        'Thôi chọn Đồng ý đi 💕',
        'Nút này hỏng rồi 🤭',
        'Em chắc chưa? 🥺',
        'Bấm kia kìa → 💖',
        'Hehe, bắt không được 😝'
    ];
    btn.textContent = funnyTexts[Math.floor(Math.random() * funnyTexts.length)];
}

// ================================================
// FLOATING HEARTS
// ================================================
function spawnHearts(count) {
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            createHeart(
                Math.random() * window.innerWidth,
                window.innerHeight + 20
            );
        }, i * 150);
    }
}

function spawnHeartsAt(x, y, count) {
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.classList.add('floating-heart');
            heart.textContent = ['❤️', '💖', '💕', '💗', '💘'][Math.floor(Math.random() * 5)];
            heart.style.left = (x + (Math.random() - 0.5) * 60) + 'px';
            heart.style.top = y + 'px';
            heart.style.fontSize = (0.8 + Math.random() * 0.8) + 'rem';
            DOM.floatingHearts.appendChild(heart);

            setTimeout(() => heart.remove(), 4000);
        }, i * 100);
    }
}

function createHeart(x, y) {
    const heart = document.createElement('div');
    heart.classList.add('floating-heart');
    heart.textContent = ['❤️', '💖', '💕', '💗', '💘', '🌹', '✨'][Math.floor(Math.random() * 7)];
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.style.fontSize = (1 + Math.random() * 1.5) + 'rem';
    DOM.floatingHearts.appendChild(heart);

    setTimeout(() => heart.remove(), 4500);
}

// ================================================
// CONFETTI SYSTEM (Canvas-based)
// ================================================
function startConfetti() {
    if (state.confettiRunning) return;
    state.confettiRunning = true;

    const canvas = DOM.confettiCanvas;
    const ctx = canvas.getContext('2d');

    // Set canvas size
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // Confetti particles
    const particles = [];
    const colors = [
        '#d4af37', '#f0d77b', '#f4a0b5', '#e91e63',
        '#fce4ec', '#ffffff', '#ffd700', '#ff69b4'
    ];

    // Create particles
    for (let i = 0; i < 150; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            w: 4 + Math.random() * 6,
            h: 8 + Math.random() * 8,
            color: colors[Math.floor(Math.random() * colors.length)],
            speed: 2 + Math.random() * 4,
            angle: Math.random() * Math.PI * 2,
            spin: (Math.random() - 0.5) * 0.2,
            drift: (Math.random() - 0.5) * 2,
            opacity: 0.8 + Math.random() * 0.2
        });
    }

    let frameCount = 0;
    const maxFrames = 300; // ~5 seconds at 60fps

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.angle);
            ctx.globalAlpha = p.opacity;
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
            ctx.restore();

            p.y += p.speed;
            p.x += p.drift;
            p.angle += p.spin;

            // Fade out near end
            if (frameCount > maxFrames - 60) {
                p.opacity -= 0.015;
            }

            // Reset if off screen
            if (p.y > canvas.height + 20) {
                p.y = -20;
                p.x = Math.random() * canvas.width;
            }
        });

        frameCount++;
        if (frameCount < maxFrames) {
            requestAnimationFrame(animate);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            state.confettiRunning = false;
        }
    }

    animate();
}

// ================================================
// FIREWORKS (Simple canvas-based)
// ================================================
function launchFireworks() {
    const container = document.getElementById('fireworks-container');
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9996';
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();

    const fireworks = [];
    const colors = ['#d4af37', '#f0d77b', '#f4a0b5', '#e91e63', '#ffd700', '#ff69b4', '#ffffff'];

    // Create multiple firework bursts
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const centerX = Math.random() * canvas.width;
            const centerY = Math.random() * canvas.height * 0.5 + canvas.height * 0.1;
            const color = colors[Math.floor(Math.random() * colors.length)];

            for (let j = 0; j < 30; j++) {
                const angle = (Math.PI * 2 * j) / 30;
                const speed = 2 + Math.random() * 4;
                fireworks.push({
                    x: centerX,
                    y: centerY,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    color: color,
                    life: 1,
                    decay: 0.01 + Math.random() * 0.02,
                    size: 2 + Math.random() * 2
                });
            }

            // Play firework sound
            playTone(200 + Math.random() * 300, 0.15, 'sawtooth');
        }, i * 500);
    }

    let frame = 0;
    const maxFrame = 300;

    function animate() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        fireworks.forEach((fw, index) => {
            if (fw.life <= 0) return;

            ctx.beginPath();
            ctx.arc(fw.x, fw.y, fw.size, 0, Math.PI * 2);
            ctx.fillStyle = fw.color;
            ctx.globalAlpha = fw.life;
            ctx.fill();

            // Trail
            ctx.beginPath();
            ctx.moveTo(fw.x, fw.y);
            ctx.lineTo(fw.x - fw.vx * 3, fw.y - fw.vy * 3);
            ctx.strokeStyle = fw.color;
            ctx.lineWidth = fw.size * 0.5;
            ctx.globalAlpha = fw.life * 0.5;
            ctx.stroke();

            ctx.globalAlpha = 1;

            fw.x += fw.vx;
            fw.y += fw.vy;
            fw.vy += 0.05; // gravity
            fw.vx *= 0.98; // friction
            fw.life -= fw.decay;
        });

        frame++;
        if (frame < maxFrame) {
            requestAnimationFrame(animate);
        } else {
            canvas.remove();
        }
    }

    animate();
}

// ================================================
// AUDIO SYSTEM (Web Audio API)
// ================================================
function getAudioContext() {
    if (!state.audioCtx) {
        state.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    return state.audioCtx;
}

function playTone(frequency, duration, type) {
    try {
        const ctx = getAudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = type || 'sine';
        osc.frequency.setValueAtTime(frequency, ctx.currentTime);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + duration);
    } catch (e) {
        // Audio not supported, fail silently
    }
}

function playMelody(notes, noteDuration) {
    notes.forEach((note, i) => {
        setTimeout(() => {
            playTone(note, noteDuration, 'sine');
        }, i * (noteDuration * 1000 * 0.8));
    });
}

// ===== BACKGROUND MUSIC (Simple Piano-like melody using Web Audio) =====
let musicInterval = null;

function initMusic() {
    DOM.musicToggle.addEventListener('click', toggleMusic);
}

function toggleMusic() {
    if (state.musicPlaying) {
        stopMusic();
    } else {
        startMusic();
    }
}

function startMusic() {
    state.musicPlaying = true;
    DOM.musicToggle.classList.add('playing');
    DOM.musicToggle.querySelector('.music-icon').style.display = 'inline';
    DOM.musicToggle.querySelector('.music-off-icon').style.display = 'none';

    // Simple romantic piano melody loop
    const melody = [
        { note: 523.25, dur: 0.5 },  // C5
        { note: 659.25, dur: 0.5 },  // E5
        { note: 783.99, dur: 0.5 },  // G5
        { note: 880.00, dur: 0.8 },  // A5
        { note: 783.99, dur: 0.5 },  // G5
        { note: 698.46, dur: 0.5 },  // F5
        { note: 659.25, dur: 0.8 },  // E5
        { note: 587.33, dur: 0.5 },  // D5
        { note: 523.25, dur: 0.5 },  // C5
        { note: 493.88, dur: 0.5 },  // B4
        { note: 523.25, dur: 1.0 },  // C5
        { note: 0, dur: 0.5 },       // rest
        { note: 392.00, dur: 0.5 },  // G4
        { note: 440.00, dur: 0.5 },  // A4
        { note: 523.25, dur: 0.5 },  // C5
        { note: 587.33, dur: 0.8 },  // D5
        { note: 523.25, dur: 0.5 },  // C5
        { note: 493.88, dur: 0.5 },  // B4
        { note: 440.00, dur: 0.8 },  // A4
        { note: 392.00, dur: 0.5 },  // G4
        { note: 349.23, dur: 0.5 },  // F4
        { note: 392.00, dur: 0.5 },  // G4
        { note: 440.00, dur: 1.0 },  // A4
        { note: 0, dur: 0.8 },       // rest
    ];

    let noteIndex = 0;

    function playNextNote() {
        if (!state.musicPlaying) return;

        const { note, dur } = melody[noteIndex % melody.length];

        if (note > 0) {
            playMusicalNote(note, dur * 0.9);
        }

        noteIndex++;
        musicInterval = setTimeout(playNextNote, dur * 500);
    }

    playNextNote();
}

function stopMusic() {
    state.musicPlaying = false;
    DOM.musicToggle.classList.remove('playing');
    DOM.musicToggle.querySelector('.music-icon').style.display = 'none';
    DOM.musicToggle.querySelector('.music-off-icon').style.display = 'inline';

    if (musicInterval) {
        clearTimeout(musicInterval);
        musicInterval = null;
    }
}

function playMusicalNote(frequency, duration) {
    try {
        const ctx = getAudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        // Softer piano-like sound
        osc.type = 'sine';
        osc.frequency.setValueAtTime(frequency, ctx.currentTime);

        // ADSR-like envelope
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 0.05); // Attack
        gain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 0.15); // Decay
        gain.gain.linearRampToValueAtTime(0.03, ctx.currentTime + duration * 0.7); // Sustain
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration); // Release

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + duration);

        // Add harmonic for richer sound
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(frequency * 2, ctx.currentTime);
        gain2.gain.setValueAtTime(0, ctx.currentTime);
        gain2.gain.linearRampToValueAtTime(0.015, ctx.currentTime + 0.05);
        gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration * 0.6);
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.start(ctx.currentTime);
        osc2.stop(ctx.currentTime + duration);
    } catch (e) {
        // Fail silently
    }
}

// ================================================
// INITIALIZE
// ================================================
document.addEventListener('DOMContentLoaded', () => {
    initPassword();
});

// ===== Handle visibility change (pause music when tab not visible) =====
document.addEventListener('visibilitychange', () => {
    if (document.hidden && state.musicPlaying) {
        stopMusic();
    }
});

// ===== Prevent right-click (optional, for surprise factor) =====
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});
