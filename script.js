/* ================================================
   VALENTINE 2026 – Dương Thành Đạt ❤️ Lê Nguyên Thảo
   VIP Ultra Edition – Complete Interactive Script
   ================================================ */

// ===== CONFIGURATION =====
const CONFIG = {
  password: '15122025',
  anniversaryDate: new Date(2025, 11, 15), // December 15, 2025
  typeSpeed: 80,
  typeDelay: 500,
  choiceResponses: {
    travel:
      'Anh sẽ đưa em đi khắp nơi, từ những con phố nhỏ đến những bãi biển xa. Nhưng nơi nào có em, nơi đó là nhà. 🌍',
    future:
      'Tương lai trong mắt anh chỉ thật sự rõ ràng khi có em đứng bên cạnh. Cùng nhau, mình sẽ xây nên điều gì đó đẹp lắm. 🏡',
    hug: 'Một cái ôm từ em đủ làm anh quên đi mọi mệt mỏi. Anh sẽ giữ em thật chặt, thật lâu, như thể thời gian không tồn tại. 🤗',
    kiss: 'Mỗi nụ hôn từ em là một lời hứa không cần nói. Anh muốn được hôn em mỗi sáng thức dậy và mỗi tối trước khi ngủ. 💋',
  },
  kissMessages: [
    'Muah! 💋',
    'Yêu em! 💕',
    'Thơm quá! 😘',
    'Chu chu 💗',
    'One more! 💖',
    'Hôn nữa đi! 😍',
    'Em là tất cả! 💕',
    'Nhớ em quá! 🥰',
    'Anh yêu em! ❤️',
    'Forever! 💝',
    'My love! 💘',
    'Số 1 của anh! 🏆',
  ],
  memoryCards: ['💕', '🌹', '💋', '🤗', '💕', '🌹', '💋', '🤗'],
};

// ===== DOM ELEMENTS =====
const DOM = {
  cursorGlow: document.getElementById('cursor-glow'),
  floatingHearts: document.getElementById('floating-hearts'),
  fallingPetals: document.getElementById('falling-petals'),
  confettiCanvas: document.getElementById('confetti-canvas'),
  musicToggle: document.getElementById('music-toggle'),
  passwordOverlay: document.getElementById('password-overlay'),
  passwordInput: document.getElementById('password-input'),
  passwordSubmit: document.getElementById('password-submit'),
  passwordError: document.getElementById('password-error'),
  heroSubtitle: document.getElementById('hero-subtitle'),
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
  decisionButtons: document.querySelector('.decision-buttons'),
  flowerMessage: document.getElementById('flower-message'),
  flowerMessageText: document.getElementById('flower-message-text'),
  flowersClicked: document.getElementById('flowers-clicked'),
  handLeft: document.getElementById('hand-left'),
  handRing: document.getElementById('hand-ring'),
  ringFill: document.getElementById('ring-fill'),
  handsResult: document.getElementById('hands-result'),
  kissBtn: document.getElementById('kiss-btn'),
  kissCount: document.getElementById('kiss-count'),
  kissMessages: document.getElementById('kiss-messages'),
  memoryBoard: document.getElementById('memory-board'),
  flipCount: document.getElementById('flip-count'),
  pairsFound: document.getElementById('pairs-found'),
  memoryComplete: document.getElementById('memory-complete'),
  quizContainer: document.getElementById('quiz-container'),
  quizCorrect: document.getElementById('quiz-correct'),
  quizResult: document.getElementById('quiz-result'),
  quizResultText: document.getElementById('quiz-result-text'),
  scratchCanvas: document.getElementById('scratch-canvas'),
  bouquetVip: document.getElementById('bouquet-vip'),
  btnRoseBloom: document.getElementById('btn-rose-bloom'),
  sparkleField: document.getElementById('sparkle-field'),
  crystalHeart: document.getElementById('crystal-heart'),
  bouquetRevealMsg: document.getElementById('bouquet-reveal-msg'),
};

// ===== STATE =====
let state = {
  musicPlaying: false,
  audioCtx: null,
  heartsFoundCount: 0,
  envelopeOpened: false,
  confettiRunning: false,
  yesClicked: false,
  flowersClickedCount: 0,
  holdingHand: false,
  holdProgress: 0,
  holdInterval: null,
  handsCompleted: false,
  kissCounter: 0,
  memoryFlipped: [],
  memoryMatched: 0,
  memoryLocked: false,
  memoryFlips: 0,
  quizCurrent: 0,
  quizScore: 0,
  petalsInterval: null,
  bouquetActivated: false,
};

// ================================================
// PASSWORD SYSTEM
// ================================================
function initPassword() {
  DOM.passwordSubmit.addEventListener('click', checkPassword);
  DOM.passwordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') checkPassword();
  });
  setTimeout(() => DOM.passwordInput.focus(), 500);
}

function checkPassword() {
  const input = DOM.passwordInput.value.trim();
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
// PAGE INITIALIZATION
// ================================================
function initPage() {
  initCursorGlow();
  initTypewriter();
  initDayCounter();
  initScrollObserver();
  initFallingPetals();
  initGiantBouquet();
  initFlowers();
  initEnvelope();
  initHoldingHands();
  initChoices();
  initKiss();
  initQuiz();
  initMemoryGame();
  initScratchCard();
  initMiniGame();
  initTimeline();
  initDecision();
  initMusic();
  randomizeHiddenHearts();
}

// ================================================
// CURSOR GLOW
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
// TYPEWRITER EFFECT
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
    } else if (callback) callback();
  }
  type();
}

// ================================================
// DAY COUNTER
// ================================================
function initDayCounter() {
  const counterEl = document.getElementById('day-counter');
  if (!counterEl) return;
  setTimeout(() => {
    const now = new Date();
    const diff = now - CONFIG.anniversaryDate;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    counterEl.innerHTML = `💕 Đã yêu nhau được <strong>${days}</strong> ngày 💕`;
    counterEl.style.opacity = '1';
    counterEl.style.transform = 'translateY(0)';
  }, 4000);
}

// ================================================
// FALLING PETALS
// ================================================
function initFallingPetals() {
  const petals = ['🌸', '🌹', '💮', '🏵️', '🌺'];
  function createPetal() {
    const petal = document.createElement('div');
    petal.classList.add('petal');
    petal.textContent = petals[Math.floor(Math.random() * petals.length)];
    petal.style.left = Math.random() * 100 + '%';
    petal.style.fontSize = 0.6 + Math.random() * 0.8 + 'rem';
    petal.style.animationDuration = 6 + Math.random() * 6 + 's';
    petal.style.animationDelay = Math.random() * 2 + 's';
    DOM.fallingPetals.appendChild(petal);
    setTimeout(() => petal.remove(), 14000);
  }
  // Create petals periodically
  state.petalsInterval = setInterval(createPetal, 800);
  // Initial batch
  for (let i = 0; i < 5; i++) setTimeout(createPetal, i * 300);
}

// ================================================
// SCROLL OBSERVER
// ================================================
function initScrollObserver() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
  );
  document.querySelectorAll('.fade-in-element').forEach((el) => observer.observe(el));

  // Timeline items observer
  const timelineObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    },
    { threshold: 0.2 }
  );
  document.querySelectorAll('.timeline-item').forEach((el) => timelineObserver.observe(el));
}

// ================================================
// GIANT BOUQUET VIP
// ================================================
function initGiantBouquet() {
  if (!DOM.btnRoseBloom || !DOM.bouquetVip) return;

  DOM.btnRoseBloom.addEventListener('click', () => {
    if (state.bouquetActivated) return;
    state.bouquetActivated = true;

    // Add glowing class to bouquet
    DOM.bouquetVip.classList.add('glowing');

    // Activate crystal heart
    if (DOM.crystalHeart) {
      DOM.crystalHeart.classList.add('active');
    }

    // Start sparkle particles
    startBouquetSparkles();

    // Show reveal message after delay
    setTimeout(() => {
      if (DOM.bouquetRevealMsg) {
        DOM.bouquetRevealMsg.classList.add('show');
      }
    }, 1500);

    // Button feedback
    DOM.btnRoseBloom.textContent = '✨ Bó hoa đã phát sáng ✨';
    DOM.btnRoseBloom.classList.add('activated');

    // Effects
    spawnHearts(15);
    playMelody([392, 440, 523.25, 587.33, 659.25, 783.99, 880, 1046.5], 0.15);
  });
}

function startBouquetSparkles() {
  if (!DOM.sparkleField) return;
  let sparkleCount = 0;
  const maxSparkles = 60;

  function createSparkle() {
    if (sparkleCount >= maxSparkles) return;
    sparkleCount++;

    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle-particle');
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.top = 20 + Math.random() * 60 + '%';
    sparkle.style.animationDuration = 1.5 + Math.random() * 1.5 + 's';
    sparkle.style.animationDelay = Math.random() * 0.5 + 's';

    // Random size
    const size = 2 + Math.random() * 4;
    sparkle.style.width = size + 'px';
    sparkle.style.height = size + 'px';

    // Random color (gold / pink / white)
    const colors = ['#d4af37', '#f0d77b', '#f4a0b5', '#ffffff', '#ffd700'];
    sparkle.style.background = colors[Math.floor(Math.random() * colors.length)];

    DOM.sparkleField.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 3000);
  }

  // Initial burst
  for (let i = 0; i < 20; i++) {
    setTimeout(createSparkle, i * 80);
  }

  // Continuous sparkles
  const sparkleInterval = setInterval(() => {
    if (sparkleCount >= maxSparkles) {
      // Reset count and continue
      sparkleCount = 0;
    }
    createSparkle();
  }, 200);

  // Stop after 10 seconds, then slow sparkle
  setTimeout(() => {
    clearInterval(sparkleInterval);
    // Slow residual sparkle
    setInterval(() => {
      sparkleCount = 0;
      createSparkle();
    }, 800);
  }, 10000);
}

// ================================================
// GIFT BUTTON
// ================================================
DOM.btnOpenGift.addEventListener('click', () => {
  spawnHearts(8);
  playTone(523.25, 0.15, 'sine');
  setTimeout(() => {
    document.getElementById('flowers').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 300);
});

// ================================================
// FLOWER BOUQUET
// ================================================
function initFlowers() {
  const flowers = document.querySelectorAll('.flower');
  flowers.forEach((flower) => {
    flower.addEventListener('click', () => {
      if (flower.classList.contains('bloomed')) return;
      flower.classList.add('bloomed');
      state.flowersClickedCount++;
      DOM.flowersClicked.textContent = state.flowersClickedCount;

      // Show message
      const msg = flower.dataset.msg;
      DOM.flowerMessageText.textContent = msg;
      DOM.flowerMessage.classList.add('show');

      // Effects
      spawnHeartsAt(
        flower.getBoundingClientRect().left + flower.offsetWidth / 2,
        flower.getBoundingClientRect().top,
        3
      );
      playTone(440 + state.flowersClickedCount * 80, 0.2, 'sine');

      // Hide message after 3s for next flower
      if (state.flowersClickedCount < 5) {
        setTimeout(() => DOM.flowerMessage.classList.remove('show'), 3000);
      }

      // All flowers bloomed
      if (state.flowersClickedCount >= 5) {
        setTimeout(() => {
          DOM.flowerMessageText.textContent =
            '💐 Cả bó hoa đã nở rộ, giống như tình yêu của anh dành cho em vậy!';
          DOM.flowerMessage.classList.add('show');
          spawnHearts(12);
          playMelody([523.25, 659.25, 783.99, 1046.5], 0.2);
        }, 1000);
      }
    });
  });
}

// ================================================
// ENVELOPE
// ================================================
function initEnvelope() {
  DOM.envelopeContainer.addEventListener('click', () => {
    if (state.envelopeOpened) return;
    state.envelopeOpened = true;
    DOM.envelope.classList.add('opened');
    DOM.envelopeContainer.classList.add('opened');
    playTone(880, 0.1, 'sine');
    setTimeout(() => playTone(1100, 0.08, 'sine'), 100);
    setTimeout(() => {
      DOM.letterContent.classList.add('show');
      spawnHearts(5);
    }, 900);
  });
}

// ================================================
// HOLDING HANDS
// ================================================
function initHoldingHands() {
  const ringCircumference = 2 * Math.PI * 54; // r=54
  DOM.ringFill.style.strokeDasharray = ringCircumference;
  DOM.ringFill.style.strokeDashoffset = ringCircumference;

  function startHold() {
    if (state.handsCompleted) return;
    state.holdingHand = true;
    state.holdInterval = setInterval(() => {
      state.holdProgress += 2;
      if (state.holdProgress > 100) state.holdProgress = 100;
      const offset = ringCircumference - (state.holdProgress / 100) * ringCircumference;
      DOM.ringFill.style.strokeDashoffset = offset;

      if (state.holdProgress >= 100) {
        clearInterval(state.holdInterval);
        state.handsCompleted = true;
        DOM.handsResult.classList.add('show');
        document.querySelector('.hands-container').style.display = 'none';
        document.querySelector('.hands-section .section-desc').style.display = 'none';
        spawnHearts(10);
        playMelody([392, 440, 523.25, 659.25, 783.99], 0.2);
      }
    }, 60);
  }

  function stopHold() {
    state.holdingHand = false;
    clearInterval(state.holdInterval);
    if (!state.handsCompleted && state.holdProgress > 0) {
      state.holdProgress = Math.max(0, state.holdProgress - 5);
      const offset = ringCircumference - (state.holdProgress / 100) * ringCircumference;
      DOM.ringFill.style.strokeDashoffset = offset;
    }
  }

  // Mouse events
  DOM.handRing.addEventListener('mousedown', startHold);
  DOM.handRing.addEventListener('mouseup', stopHold);
  DOM.handRing.addEventListener('mouseleave', stopHold);
  // Touch events
  DOM.handRing.addEventListener('touchstart', (e) => {
    e.preventDefault();
    startHold();
  });
  DOM.handRing.addEventListener('touchend', stopHold);
  DOM.handRing.addEventListener('touchcancel', stopHold);

  // Also allow clicking the hands
  DOM.handLeft.addEventListener('mousedown', startHold);
  DOM.handLeft.addEventListener('mouseup', stopHold);
  DOM.handLeft.addEventListener('touchstart', (e) => {
    e.preventDefault();
    startHold();
  });
  DOM.handLeft.addEventListener('touchend', stopHold);
}

// ================================================
// INTERACTIVE CHOICES
// ================================================
function initChoices() {
  DOM.choiceButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const choice = btn.dataset.choice;
      DOM.choiceButtons.forEach((b) => b.classList.remove('selected'));
      btn.classList.add('selected');
      DOM.choiceResponseText.textContent = CONFIG.choiceResponses[choice];
      DOM.choiceResponse.classList.add('show');
      spawnHearts(6);
      playTone(659.25, 0.2, 'sine');
      setTimeout(() => playTone(783.99, 0.15, 'sine'), 150);

      // Special kiss animation for kiss choice
      if (choice === 'kiss') {
        for (let i = 0; i < 8; i++) {
          setTimeout(() => {
            const kiss = document.createElement('div');
            kiss.classList.add('floating-heart');
            kiss.textContent = '💋';
            kiss.style.left = Math.random() * window.innerWidth + 'px';
            kiss.style.top = window.innerHeight + 20 + 'px';
            kiss.style.fontSize = 1 + Math.random() * 1.5 + 'rem';
            DOM.floatingHearts.appendChild(kiss);
            setTimeout(() => kiss.remove(), 4500);
          }, i * 200);
        }
      }
    });
  });
}

// ================================================
// LOVE QUIZ
// ================================================
function initQuiz() {
  const questions = DOM.quizContainer.querySelectorAll('.quiz-question');
  const allOptions = DOM.quizContainer.querySelectorAll('.quiz-option');

  allOptions.forEach((option) => {
    option.addEventListener('click', () => {
      const question = option.closest('.quiz-question');
      const options = question.querySelectorAll('.quiz-option');

      // Disable all options in this question
      options.forEach((opt) => opt.classList.add('disabled'));

      const isCorrect = option.dataset.correct === 'true';
      if (isCorrect) {
        option.classList.add('correct');
        state.quizScore++;
        DOM.quizCorrect.textContent = state.quizScore;
        playTone(783.99, 0.2, 'sine');
        spawnHeartsAt(
          option.getBoundingClientRect().left + option.offsetWidth / 2,
          option.getBoundingClientRect().top,
          3
        );
      } else {
        option.classList.add('wrong');
        // Show correct answer
        options.forEach((opt) => {
          if (opt.dataset.correct === 'true') opt.classList.add('correct');
        });
        playTone(300, 0.15, 'square');
      }

      state.quizCurrent++;

      // Next question after delay
      setTimeout(() => {
        question.classList.remove('active');
        if (state.quizCurrent < questions.length) {
          questions[state.quizCurrent].classList.add('active');
        } else {
          // Quiz complete
          showQuizResult();
        }
      }, 1500);
    });
  });
}

function showQuizResult() {
  const resultTexts = [
    'Không sao, anh sẽ giúp em nhớ thêm về chúng mình 💕',
    'Em biết nhiều về anh đấy! Anh thích vậy 💖',
    'Gần hoàn hảo rồi! Em hiểu anh thật nhiều 🥰',
    'Hoàn hảo! Em hiểu anh hơn ai hết! Em là number 1! 💝',
  ];
  DOM.quizResultText.textContent = resultTexts[state.quizScore];
  DOM.quizResult.classList.add('show');
  DOM.quizResult.style.opacity = '1';
  if (state.quizScore === 3) {
    spawnHearts(10);
    playMelody([523.25, 659.25, 783.99, 1046.5], 0.15);
  }
}

// ================================================
// MEMORY CARD GAME
// ================================================
function initMemoryGame() {
  const cards = [...CONFIG.memoryCards];
  // Shuffle
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }

  // Create card elements
  DOM.memoryBoard.innerHTML = '';
  cards.forEach((emoji, index) => {
    const card = document.createElement('div');
    card.classList.add('memory-card');
    card.dataset.emoji = emoji;
    card.dataset.index = index;
    card.innerHTML = `
            <div class="memory-card-inner">
                <div class="memory-card-front">❓</div>
                <div class="memory-card-back">${emoji}</div>
            </div>
        `;
    card.addEventListener('click', () => flipCard(card));
    DOM.memoryBoard.appendChild(card);
  });
}

function flipCard(card) {
  if (state.memoryLocked) return;
  if (card.classList.contains('flipped') || card.classList.contains('matched')) return;

  card.classList.add('flipped');
  state.memoryFlipped.push(card);
  state.memoryFlips++;
  DOM.flipCount.textContent = state.memoryFlips;
  playTone(600 + Math.random() * 200, 0.1, 'sine');

  if (state.memoryFlipped.length === 2) {
    state.memoryLocked = true;
    const [c1, c2] = state.memoryFlipped;

    if (c1.dataset.emoji === c2.dataset.emoji) {
      // Match!
      setTimeout(() => {
        c1.classList.add('matched');
        c2.classList.add('matched');
        state.memoryMatched++;
        DOM.pairsFound.textContent = state.memoryMatched;
        state.memoryFlipped = [];
        state.memoryLocked = false;
        playTone(783.99, 0.2, 'sine');
        spawnHeartsAt(
          c1.getBoundingClientRect().left + c1.offsetWidth / 2,
          c1.getBoundingClientRect().top,
          2
        );

        // All matched
        if (state.memoryMatched >= 4) {
          setTimeout(() => {
            DOM.memoryComplete.classList.add('show');
            DOM.memoryComplete.style.opacity = '1';
            spawnHearts(10);
            playMelody([523.25, 587.33, 659.25, 783.99, 1046.5], 0.15);
          }, 500);
        }
      }, 400);
    } else {
      // No match
      setTimeout(() => {
        c1.classList.remove('flipped');
        c2.classList.remove('flipped');
        state.memoryFlipped = [];
        state.memoryLocked = false;
        playTone(250, 0.1, 'square');
      }, 800);
    }
  }
}

// ================================================
// SCRATCH CARD
// ================================================
function initScratchCard() {
  const canvas = DOM.scratchCanvas;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // Set canvas size
  const card = document.getElementById('scratch-card');
  canvas.width = card.offsetWidth || 320;
  canvas.height = card.offsetHeight || 200;

  // Draw scratch layer
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, '#d4af37');
  gradient.addColorStop(0.5, '#f0d77b');
  gradient.addColorStop(1, '#d4af37');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Add text on scratch layer
  ctx.fillStyle = '#2c1810';
  ctx.font = 'bold 18px Poppins, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('✨ Cào tại đây ✨', canvas.width / 2, canvas.height / 2 - 10);
  ctx.font = '14px Poppins, sans-serif';
  ctx.fillText('Dùng ngón tay hoặc chuột', canvas.width / 2, canvas.height / 2 + 15);

  let isScratching = false;
  let scratchPercent = 0;

  function scratch(x, y) {
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 25, 0, Math.PI * 2);
    ctx.fill();
    checkScratchPercent();
  }

  function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if (e.touches) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  }

  function checkScratchPercent() {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let transparent = 0;
    for (let i = 3; i < imageData.data.length; i += 4) {
      if (imageData.data[i] === 0) transparent++;
    }
    scratchPercent = (transparent / (imageData.data.length / 4)) * 100;
    if (scratchPercent > 50) {
      canvas.style.transition = 'opacity 0.5s';
      canvas.style.opacity = '0';
      setTimeout(() => (canvas.style.display = 'none'), 500);
      spawnHearts(8);
      playMelody([523.25, 659.25, 783.99], 0.15);
    }
  }

  canvas.addEventListener('mousedown', (e) => {
    isScratching = true;
    const p = getPos(e);
    scratch(p.x, p.y);
  });
  canvas.addEventListener('mousemove', (e) => {
    if (isScratching) {
      const p = getPos(e);
      scratch(p.x, p.y);
    }
  });
  canvas.addEventListener('mouseup', () => (isScratching = false));
  canvas.addEventListener('mouseleave', () => (isScratching = false));
  canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    isScratching = true;
    const p = getPos(e);
    scratch(p.x, p.y);
  });
  canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    if (isScratching) {
      const p = getPos(e);
      scratch(p.x, p.y);
    }
  });
  canvas.addEventListener('touchend', () => (isScratching = false));
}

// ================================================
// KISS SECTION
// ================================================
function initKiss() {
  DOM.kissBtn.addEventListener('click', () => {
    state.kissCounter++;
    DOM.kissCount.textContent = state.kissCounter;

    // Kiss animation
    DOM.kissBtn.style.transform = 'scale(0.8)';
    setTimeout(() => (DOM.kissBtn.style.transform = ''), 200);

    // Random message
    const msg = CONFIG.kissMessages[Math.floor(Math.random() * CONFIG.kissMessages.length)];
    DOM.kissMessages.innerHTML = `<p class="kiss-msg">${msg}</p>`;

    // Spawn kiss emojis
    spawnHeartsAt(
      DOM.kissBtn.getBoundingClientRect().left + DOM.kissBtn.offsetWidth / 2,
      DOM.kissBtn.getBoundingClientRect().top,
      3
    );

    // Sound
    playTone(800 + Math.random() * 400, 0.1, 'sine');

    // Milestone messages
    if (state.kissCounter === 10) {
      DOM.kissMessages.innerHTML = '<p class="kiss-msg">🎉 10 nụ hôn! Em hào phóng quá!</p>';
      spawnHearts(10);
    }
    if (state.kissCounter === 50) {
      DOM.kissMessages.innerHTML =
        '<p class="kiss-msg">💝 50 nụ hôn! Anh là người hạnh phúc nhất!</p>';
      spawnHearts(15);
    }
    if (state.kissCounter === 100) {
      DOM.kissMessages.innerHTML =
        '<p class="kiss-msg">🏆 100 NỤ HÔN! Em chính thức là nữ hoàng hôn!</p>';
      spawnHearts(20);
      startConfetti();
    }
  });
}

// ================================================
// MINI GAME - HIDDEN HEARTS
// ================================================
function initMiniGame() {
  DOM.hiddenHearts.forEach((heart) => {
    heart.addEventListener('click', (e) => {
      e.stopPropagation();
      if (heart.classList.contains('found')) return;
      heart.classList.add('found');
      state.heartsFoundCount++;
      DOM.heartsFound.textContent = state.heartsFoundCount;
      playTone(523.25 * (1 + state.heartsFoundCount * 0.25), 0.2, 'sine');
      spawnHeartsAt(e.clientX, e.clientY, 3);
      if (state.heartsFoundCount >= 3) {
        setTimeout(() => {
          DOM.minigameMessage.classList.add('show');
          spawnHearts(10);
          playMelody([523.25, 659.25, 783.99, 1046.5], 0.2);
        }, 500);
      }
    });
  });
}

function randomizeHiddenHearts() {
  DOM.hiddenHearts.forEach((heart) => {
    heart.style.top = 10 + Math.random() * 75 + '%';
    heart.style.left = 5 + Math.random() * 85 + '%';
  });
}

// ================================================
// TIMELINE
// ================================================
function initTimeline() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), index * 200);
        }
      });
    },
    { threshold: 0.2 }
  );
  document.querySelectorAll('.timeline-item').forEach((item) => observer.observe(item));
}

// ================================================
// DECISION SECTION
// ================================================
function initDecision() {
  DOM.btnYes.addEventListener('click', () => {
    if (state.yesClicked) return;
    state.yesClicked = true;
    DOM.decisionButtons.style.display = 'none';
    DOM.yesResponse.classList.add('show');
    spawnHearts(25);
    startConfetti();
    launchFireworks();
    playMelody([523.25, 587.33, 659.25, 698.46, 783.99, 880, 987.77, 1046.5], 0.15);
    if (!state.musicPlaying) toggleMusic();
  });

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
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const maxX = vw - btn.offsetWidth - 20;
  const maxY = vh - btn.offsetHeight - 20;
  btn.style.position = 'fixed';
  btn.style.left = Math.max(20, Math.random() * maxX) + 'px';
  btn.style.top = Math.max(20, Math.random() * maxY) + 'px';
  btn.style.zIndex = '9999';
  btn.style.transition = 'all 0.15s ease';
  playTone(300 + Math.random() * 400, 0.1, 'square');
  const funnyTexts = [
    'Đừng bấm nút này 😜',
    'Anh không cho bấm 🙈',
    'Thôi chọn Đồng ý đi 💕',
    'Nút này hỏng rồi 🤭',
    'Em chắc chưa? 🥺',
    'Bấm kia kìa → 💖',
    'Hehe, bắt không được 😝',
    'Lại đây nè~ 🏃‍♂️',
    'Trốn nè! 🐰',
  ];
  btn.textContent = funnyTexts[Math.floor(Math.random() * funnyTexts.length)];
}

// ================================================
// FLOATING HEARTS
// ================================================
function spawnHearts(count) {
  for (let i = 0; i < count; i++) {
    setTimeout(
      () => createHeart(Math.random() * window.innerWidth, window.innerHeight + 20),
      i * 150
    );
  }
}

function spawnHeartsAt(x, y, count) {
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const heart = document.createElement('div');
      heart.classList.add('floating-heart');
      heart.textContent = ['❤️', '💖', '💕', '💗', '💘', '💋'][Math.floor(Math.random() * 6)];
      heart.style.left = x + (Math.random() - 0.5) * 60 + 'px';
      heart.style.top = y + 'px';
      heart.style.fontSize = 0.8 + Math.random() * 0.8 + 'rem';
      DOM.floatingHearts.appendChild(heart);
      setTimeout(() => heart.remove(), 4000);
    }, i * 100);
  }
}

function createHeart(x, y) {
  const heart = document.createElement('div');
  heart.classList.add('floating-heart');
  heart.textContent = ['❤️', '💖', '💕', '💗', '💘', '🌹', '✨', '💋'][
    Math.floor(Math.random() * 8)
  ];
  heart.style.left = x + 'px';
  heart.style.top = y + 'px';
  heart.style.fontSize = 1 + Math.random() * 1.5 + 'rem';
  DOM.floatingHearts.appendChild(heart);
  setTimeout(() => heart.remove(), 4500);
}

// ================================================
// CONFETTI SYSTEM
// ================================================
function startConfetti() {
  if (state.confettiRunning) return;
  state.confettiRunning = true;
  const canvas = DOM.confettiCanvas;
  const ctx = canvas.getContext('2d');
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);
  const particles = [];
  const colors = [
    '#d4af37',
    '#f0d77b',
    '#f4a0b5',
    '#e91e63',
    '#fce4ec',
    '#ffffff',
    '#ffd700',
    '#ff69b4',
  ];
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
      opacity: 0.8 + Math.random() * 0.2,
    });
  }
  let frameCount = 0;
  const maxFrames = 360;
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.globalAlpha = Math.max(0, p.opacity);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
      p.y += p.speed;
      p.x += p.drift;
      p.angle += p.spin;
      if (frameCount > maxFrames - 60) p.opacity -= 0.015;
      if (p.y > canvas.height + 20) {
        p.y = -20;
        p.x = Math.random() * canvas.width;
      }
    });
    frameCount++;
    if (frameCount < maxFrames) requestAnimationFrame(animate);
    else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      state.confettiRunning = false;
    }
  }
  animate();
}

// ================================================
// FIREWORKS
// ================================================
function launchFireworks() {
  const container = document.getElementById('fireworks-container');
  const canvas = document.createElement('canvas');
  canvas.style.cssText =
    'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9996;';
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const fireworks = [];
  const colors = ['#d4af37', '#f0d77b', '#f4a0b5', '#e91e63', '#ffd700', '#ff69b4', '#ffffff'];
  for (let i = 0; i < 10; i++) {
    setTimeout(() => {
      const cx = Math.random() * canvas.width;
      const cy = Math.random() * canvas.height * 0.5 + canvas.height * 0.1;
      const color = colors[Math.floor(Math.random() * colors.length)];
      for (let j = 0; j < 30; j++) {
        const angle = (Math.PI * 2 * j) / 30;
        fireworks.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * (2 + Math.random() * 4),
          vy: Math.sin(angle) * (2 + Math.random() * 4),
          color,
          life: 1,
          decay: 0.01 + Math.random() * 0.02,
          size: 2 + Math.random() * 2,
        });
      }
      playTone(200 + Math.random() * 300, 0.12, 'sawtooth');
    }, i * 400);
  }
  let frame = 0;
  function animate() {
    ctx.fillStyle = 'rgba(0,0,0,0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    fireworks.forEach((fw) => {
      if (fw.life <= 0) return;
      ctx.beginPath();
      ctx.arc(fw.x, fw.y, fw.size, 0, Math.PI * 2);
      ctx.fillStyle = fw.color;
      ctx.globalAlpha = fw.life;
      ctx.fill();
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
      fw.vy += 0.05;
      fw.vx *= 0.98;
      fw.life -= fw.decay;
    });
    frame++;
    if (frame < 360) requestAnimationFrame(animate);
    else canvas.remove();
  }
  animate();
}

// ================================================
// AUDIO SYSTEM
// ================================================
function getAudioContext() {
  if (!state.audioCtx) state.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
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
  } catch (e) {}
}

function playMelody(notes, noteDuration) {
  notes.forEach((note, i) => {
    setTimeout(() => playTone(note, noteDuration, 'sine'), i * (noteDuration * 1000 * 0.8));
  });
}

// ===== BACKGROUND MUSIC =====
let musicInterval = null;

function initMusic() {
  DOM.musicToggle.addEventListener('click', toggleMusic);
}

function toggleMusic() {
  if (state.musicPlaying) stopMusic();
  else startMusic();
}

function startMusic() {
  state.musicPlaying = true;
  DOM.musicToggle.classList.add('playing');
  DOM.musicToggle.querySelector('.music-icon').style.display = 'inline';
  DOM.musicToggle.querySelector('.music-off-icon').style.display = 'none';
  const melody = [
    { note: 523.25, dur: 0.5 },
    { note: 659.25, dur: 0.5 },
    { note: 783.99, dur: 0.5 },
    { note: 880, dur: 0.8 },
    { note: 783.99, dur: 0.5 },
    { note: 698.46, dur: 0.5 },
    { note: 659.25, dur: 0.8 },
    { note: 587.33, dur: 0.5 },
    { note: 523.25, dur: 0.5 },
    { note: 493.88, dur: 0.5 },
    { note: 523.25, dur: 1.0 },
    { note: 0, dur: 0.5 },
    { note: 392, dur: 0.5 },
    { note: 440, dur: 0.5 },
    { note: 523.25, dur: 0.5 },
    { note: 587.33, dur: 0.8 },
    { note: 523.25, dur: 0.5 },
    { note: 493.88, dur: 0.5 },
    { note: 440, dur: 0.8 },
    { note: 392, dur: 0.5 },
    { note: 349.23, dur: 0.5 },
    { note: 392, dur: 0.5 },
    { note: 440, dur: 1.0 },
    { note: 0, dur: 0.8 },
  ];
  let noteIndex = 0;
  function playNextNote() {
    if (!state.musicPlaying) return;
    const { note, dur } = melody[noteIndex % melody.length];
    if (note > 0) playMusicalNote(note, dur * 0.9);
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
    osc.type = 'sine';
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 0.05);
    gain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 0.15);
    gain.gain.linearRampToValueAtTime(0.03, ctx.currentTime + duration * 0.7);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
    // Harmonic
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
  } catch (e) {}
}

// ================================================
// INITIALIZE
// ================================================
document.addEventListener('DOMContentLoaded', () => {
  initPassword();
});
document.addEventListener('visibilitychange', () => {
  if (document.hidden && state.musicPlaying) stopMusic();
});
document.addEventListener('contextmenu', (e) => e.preventDefault());
