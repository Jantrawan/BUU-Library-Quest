/* =========================================================================
 * GAMEPLAY ENGINE (Parallax Backgrounds, Level Builder, Physics & Modals)
 * ========================================================================= */
(() => {
  'use strict';

  /* =========================================================================
   * 1. 3D-STYLED PARALLAX BACKGROUNDS (4 UNIQUE THEMES)
   * ========================================================================= */
  function drawThemeBackground(ctx, w, h, camX, theme, time) {
    if (theme === 'opac') {
      const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
      bgGrad.addColorStop(0, '#141129');
      bgGrad.addColorStop(0.55, '#261D4A');
      bgGrad.addColorStop(1, '#36265E');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      const winSpacing = 540;
      const p1 = -(camX * 0.18) % winSpacing;
      for (let wx = p1 - winSpacing; wx < w + winSpacing; wx += winSpacing) {
        const beamGrad = ctx.createLinearGradient(wx + 90, 60, wx + 220, h);
        beamGrad.addColorStop(0, 'rgba(186, 230, 253, 0.16)');
        beamGrad.addColorStop(1, 'rgba(186, 230, 253, 0.0)');
        ctx.fillStyle = beamGrad;
        ctx.beginPath();
        ctx.moveTo(wx + 30, 70);
        ctx.lineTo(wx + 180, 70);
        ctx.lineTo(wx + 320, h);
        ctx.lineTo(wx - 40, h);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#0F172A';
        ctx.fillRect(wx + 24, 64, 162, 212);
        ctx.fillStyle = '#38BDF8';
        ctx.globalAlpha = 0.25;
        ctx.fillRect(wx + 30, 70, 150, 200);
        ctx.globalAlpha = 1;

        ctx.fillStyle = '#FEF9C3';
        ctx.beginPath();
        ctx.arc(wx + 135, 115, 22, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#1E293B';
        for (let sy = 76; sy < 265; sy += 16) {
          ctx.fillRect(wx + 30, sy, 150, 6);
        }
      }

      const boardSpacing = 620;
      const p2 = -(camX * 0.35) % boardSpacing;
      for (let bx = p2 - boardSpacing + 240; bx < w + boardSpacing; bx += boardSpacing) {
        const by = Math.max(95, h * 0.2);
        ctx.fillStyle = '#451A03';
        ctx.beginPath();
        ctx.roundRect(bx - 6, by - 6, 212, 142, 10);
        ctx.fill();
        ctx.fillStyle = '#B45309';
        ctx.beginPath();
        ctx.roundRect(bx, by, 200, 130, 6);
        ctx.fill();

        const cards = [
          { x: bx + 18, y: by + 18, w: 46, h: 38, c: '#FEFCE8' },
          { x: bx + 125, y: by + 22, w: 52, h: 42, c: '#FDE68A' },
          { x: bx + 65, y: by + 72, w: 58, h: 40, c: '#E0F2FE' }
        ];
        cards.forEach(cd => {
          ctx.fillStyle = cd.c;
          ctx.fillRect(cd.x, cd.y, cd.w, cd.h);
          ctx.fillStyle = '#94A3B8';
          ctx.fillRect(cd.x + 6, cd.y + 8, cd.w - 12, 4);
          ctx.fillRect(cd.x + 6, cd.y + 16, cd.w - 18, 4);
        });

        ctx.strokeStyle = '#EF4444';
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.moveTo(bx + 40, by + 24);
        ctx.lineTo(bx + 150, by + 28);
        ctx.lineTo(bx + 92, by + 78);
        ctx.closePath();
        ctx.stroke();

        ctx.fillStyle = '#DC2626';
        [[bx + 40, by + 24], [bx + 150, by + 28], [bx + 92, by + 78]].forEach(([px, py]) => {
          ctx.beginPath();
          ctx.arc(px, py, 4, 0, Math.PI * 2);
          ctx.fill();
        });
      }

    } else if (theme === 'explorer') {
      const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
      bgGrad.addColorStop(0, '#FEFCE8');
      bgGrad.addColorStop(0.5, '#F3E8FF');
      bgGrad.addColorStop(1, '#FCE7F3');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      const unitW = 680;
      const p1 = -(camX * 0.22) % unitW;
      for (let ux = p1 - unitW; ux < w + unitW; ux += unitW) {
        ctx.fillStyle = '#7DD3FC';
        ctx.beginPath();
        ctx.arc(ux + 110, 145, 65, Math.PI, 0);
        ctx.lineTo(ux + 175, 290);
        ctx.lineTo(ux + 45, 290);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = '#F59E0B';
        ctx.lineWidth = 6;
        ctx.stroke();

        ctx.fillStyle = 'rgba(254, 240, 138, 0.28)';
        ctx.beginPath();
        ctx.moveTo(ux + 50, 145);
        ctx.lineTo(ux + 170, 145);
        ctx.lineTo(ux + 250, h);
        ctx.lineTo(ux + 10, h);
        ctx.closePath();
        ctx.fill();

        const sx = ux + 230;
        ctx.fillStyle = '#D97706';
        ctx.beginPath();
        ctx.roundRect(sx, 85, 210, 260, 10);
        ctx.fill();
        ctx.fillStyle = '#92400E';
        ctx.fillRect(sx + 10, 95, 190, 240);

        const bookColors = ['#A855F7', '#F472B6', '#38BDF8', '#FACC15', '#34D399', '#FB7185'];
        for (let row = 0; row < 4; row++) {
          const ry = 145 + row * 56;
          ctx.fillStyle = '#D97706';
          ctx.fillRect(sx + 8, ry, 194, 7);
          for (let b = 0; b < 11; b++) {
            ctx.fillStyle = bookColors[(row * 3 + b) % bookColors.length];
            const bh = 32 + ((b * 7) % 12);
            ctx.beginPath();
            ctx.roundRect(sx + 16 + b * 16, ry - bh, 13, bh, 2);
            ctx.fill();
          }
        }

        ctx.strokeStyle = '#78350F';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(ux + 540, 0);
        ctx.lineTo(ux + 540, 95);
        ctx.stroke();
        ctx.fillStyle = '#FACC15';
        ctx.beginPath();
        ctx.arc(ux + 540, 110, 22, Math.PI, 0);
        ctx.fill();
        ctx.fillStyle = 'rgba(254, 240, 138, 0.35)';
        ctx.beginPath();
        ctx.arc(ux + 540, 115, 34, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#7C3AED';
        ctx.beginPath();
        ctx.roundRect(ux + 475, 175, 130, 32, 8);
        ctx.fill();
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 12px "Chakra Petch", sans-serif';
        ctx.fillText('📚 หมวดความรู้ทั่วไป →', ux + 485, 195);
      }

      const furnW = 580;
      const p2 = -(camX * 0.45) % furnW;
      const floorRef = h - 75;
      for (let fx = p2 - furnW; fx < w + furnW; fx += furnW) {
        ctx.fillStyle = '#F472B6';
        ctx.beginPath();
        ctx.roundRect(fx + 60, floorRef - 62, 135, 48, 16);
        ctx.fill();
        ctx.fillStyle = '#F9A8D4';
        ctx.beginPath();
        ctx.roundRect(fx + 52, floorRef - 38, 150, 30, 12);
        ctx.fill();

        ctx.fillStyle = '#B45309';
        ctx.fillRect(fx + 260, floorRef - 42, 120, 10);
        ctx.fillRect(fx + 275, floorRef - 32, 10, 32);
        ctx.fillRect(fx + 355, floorRef - 32, 10, 32);
        ctx.fillStyle = '#FACC15';
        ctx.beginPath();
        ctx.arc(fx + 320, floorRef - 62, 14, Math.PI, 0);
        ctx.fill();
        ctx.fillRect(fx + 318, floorRef - 62, 4, 20);
      }

    } else if (theme === 'haunted') {
      const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
      bgGrad.addColorStop(0, '#0F0722');
      bgGrad.addColorStop(0.5, '#241247');
      bgGrad.addColorStop(1, '#3B1E6D');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = '#FEF9C3';
      ctx.beginPath();
      ctx.arc(w * 0.78, 95, 42, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = 'rgba(254, 249, 195, 0.14)';
      ctx.beginPath();
      ctx.arc(w * 0.78, 95, 68, 0, Math.PI * 2);
      ctx.fill();

      const unitW = 600;
      const p1 = -(camX * 0.25) % unitW;
      for (let ux = p1 - unitW; ux < w + unitW; ux += unitW) {
        ctx.fillStyle = '#1E1B4B';
        ctx.beginPath();
        ctx.arc(ux + 120, 150, 58, Math.PI, 0);
        ctx.lineTo(ux + 178, 300);
        ctx.lineTo(ux + 62, 300);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = '#7C3AED';
        ctx.lineWidth = 4;
        ctx.stroke();

        ctx.fillStyle = '#1E1035';
        ctx.beginPath();
        ctx.roundRect(ux + 250, 90, 200, 260, 8);
        ctx.fill();
        ctx.strokeStyle = '#581C87';
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.fillStyle = '#FEFCE8';
        ctx.fillRect(ux + 340, 72, 10, 18);
        ctx.fillStyle = '#FACC15';
        ctx.beginPath();
        ctx.arc(ux + 345, 66 + Math.sin(time * 8) * 1.5, 5, 0, Math.PI * 2);
        ctx.fill();
      }

      const ghostCount = 5;
      for (let i = 0; i < ghostCount; i++) {
        const baseGx = ((i * 340 + time * 26 - camX * 0.3) % (w + 300));
        const gx = baseGx < -150 ? baseGx + w + 300 : baseGx;
        const gy = 75 + (i % 3) * 48 + Math.sin(time * 2.1 + i * 1.7) * 14;

        ctx.save();
        ctx.translate(gx, gy);
        ctx.globalAlpha = 0.72;

        ctx.fillStyle = 'rgba(224, 242, 254, 0.25)';
        ctx.beginPath();
        ctx.arc(0, 0, 32, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(0, -6, 20, Math.PI, 0);
        ctx.lineTo(20, 16);
        ctx.lineTo(13, 10);
        ctx.lineTo(6, 17);
        ctx.lineTo(0, 10);
        ctx.lineTo(-6, 17);
        ctx.lineTo(-13, 10);
        ctx.lineTo(-20, 16);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#1E1B4B';
        ctx.beginPath();
        ctx.arc(-6, -6, 2.6, 0, Math.PI * 2);
        ctx.arc(6, -6, 2.6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#F472B6';
        ctx.beginPath();
        ctx.ellipse(0, 0, 3.2, 2.2, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

    } else {
      const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
      bgGrad.addColorStop(0, '#3B0764');
      bgGrad.addColorStop(0.45, '#7E22CE');
      bgGrad.addColorStop(0.8, '#F5D0FE');
      bgGrad.addColorStop(1, '#FEF9C3');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      ctx.save();
      ctx.translate(w * 0.5, 40);
      for (let r = 0; r < 10; r++) {
        ctx.rotate(Math.PI / 10);
        ctx.fillStyle = 'rgba(250, 204, 21, 0.08)';
        ctx.fillRect(-18, 0, 36, h);
      }
      ctx.restore();

      const grandW = 760;
      const p1 = -(camX * 0.25) % grandW;
      for (let gx = p1 - grandW; gx < w + grandW; gx += grandW) {
        const pillarGrad = ctx.createLinearGradient(gx, 0, gx + 42, 0);
        pillarGrad.addColorStop(0, '#FACC15');
        pillarGrad.addColorStop(0.5, '#FEF08A');
        pillarGrad.addColorStop(1, '#CA8A04');
        ctx.fillStyle = pillarGrad;
        ctx.fillRect(gx + 15, 20, 34, h - 80);

        ctx.fillStyle = '#581C87';
        ctx.beginPath();
        ctx.roundRect(gx + 75, 25, 250, h - 95, 10);
        ctx.fill();
        ctx.strokeStyle = '#FACC15';
        ctx.lineWidth = 4;
        ctx.stroke();

        const colors = ['#FACC15', '#F472B6', '#38BDF8', '#C084FC', '#FEFCE8'];
        for (let row = 0; row < 6; row++) {
          const ry = 75 + row * 52;
          ctx.fillStyle = '#FACC15';
          ctx.fillRect(gx + 82, ry, 236, 5);
          for (let b = 0; b < 13; b++) {
            ctx.fillStyle = colors[(row + b) % colors.length];
            ctx.fillRect(gx + 90 + b * 17, ry - 32, 13, 32);
          }
        }

        ctx.fillStyle = '#FACC15';
        ctx.beginPath();
        ctx.roundRect(gx + 375, 110, 175, 36, 12);
        ctx.fill();
        ctx.fillStyle = '#3B0764';
        ctx.font = 'bold 13px "Chakra Petch", sans-serif';
        ctx.fillText('✨ KNOWLEDGE PORTAL', gx + 390, 133);

        const floorY = h - 75;
        ctx.fillStyle = '#FEFCE8';
        ctx.fillRect(gx + 365, floorY - 44, 190, 44);
        ctx.strokeStyle = '#FACC15';
        ctx.lineWidth = 3;
        ctx.strokeRect(gx + 365, floorY - 44, 190, 44);

        ctx.fillStyle = '#1E1B4B';
        ctx.fillRect(gx + 395, floorY - 82, 46, 32);
        ctx.fillStyle = '#38BDF8';
        ctx.fillRect(gx + 399, floorY - 78, 38, 24);

        ctx.fillStyle = '#38BDF8';
        ctx.beginPath();
        ctx.arc(gx + 505, floorY - 66, 18, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#FACC15';
        ctx.lineWidth = 3;
        ctx.stroke();
      }

      for (let m = 0; m < 7; m++) {
        const mx = ((m * 280 - camX * 0.4) % (w + 200));
        const drawX = mx < -100 ? mx + w + 200 : mx;
        const my = 120 + (m % 3) * 65 + Math.sin(time * 2.6 + m) * 14;
        ctx.save();
        ctx.translate(drawX, my);
        ctx.rotate(Math.sin(time * 2 + m) * 0.15);
        ctx.fillStyle = 'rgba(250, 204, 21, 0.32)';
        ctx.beginPath();
        ctx.arc(0, 0, 22, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#7E22CE';
        ctx.fillRect(-12, -8, 24, 16);
        ctx.fillStyle = '#FEFCE8';
        ctx.fillRect(-10, -6, 20, 12);
        ctx.restore();
      }
    }
  }

  /* =========================================================================
   * 2. LEVEL BUILDER
   * ========================================================================= */
  function buildStageLevel(stage, questionsList) {
    const activeQuestions = questionsList.filter(q => q.active !== false);
    let orderedQuestions = [...activeQuestions];
    if (stage.randomize) {
      for (let i = orderedQuestions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [orderedQuestions[i], orderedQuestions[j]] = [orderedQuestions[j], orderedQuestions[i]];
      }
    }

    const groundY = 500;
    const platforms = [];
    const pits = [];
    const worms = [];
    const checkpoints = [];
    const questionBooks = [];

    let cursorX = 0;
    const startPlatW = 460;
    platforms.push({ x: cursorX, y: groundY, w: startPlatW, h: 180, type: 'ground' });
    cursorX += startPlatW;

    for (let i = 0; i < orderedQuestions.length; i++) {
      const q = orderedQuestions[i];

      const pitWidth = 120 + (i % 3) * 12;
      pits.push({ x: cursorX, w: pitWidth });
      cursorX += pitWidth;

      const segW = 430 + (i % 2) * 70;
      platforms.push({ x: cursorX, y: groundY, w: segW, h: 180, type: 'ground' });

      const elevW = 165;
      const elevX = cursorX + 115;
      const elevY = groundY - (105 + (i % 2) * 30);
      platforms.push({ x: elevX, y: elevY, w: elevW, h: 26, type: 'floating' });

      const onElevated = i % 2 === 0;
      questionBooks.push({
        id: q.id,
        index: i,
        questionData: q,
        x: onElevated ? elevX + elevW / 2 - 20 : cursorX + segW - 110,
        y: onElevated ? elevY - 52 : groundY - 52,
        w: 40,
        h: 40,
        collected: false,
        answeredCorrectly: null,
        bobPhase: i * 0.9
      });

      if (i % 2 === 1 && Math.random() < 0.72) {
        const patrolMin = cursorX + 45;
        const patrolMax = cursorX + segW - 85;
        if (patrolMax > patrolMin + 60) {
          worms.push({
            x: patrolMin + Math.random() * (patrolMax - patrolMin),
            y: groundY - 22,
            w: 38,
            h: 22,
            minX: patrolMin,
            maxX: patrolMax,
            vx: (Math.random() < 0.5 ? 1 : -1) * (52 + Math.random() * 25),
            phase: Math.random() * Math.PI * 2
          });
        }
      }

      if ((i + 1) % 3 === 0 && i < orderedQuestions.length - 1) {
        checkpoints.push({
          x: cursorX + segW - 48,
          y: groundY - 76,
          w: 36,
          h: 76,
          activated: false,
          spawnX: cursorX + segW - 70,
          spawnY: groundY - 78
        });
      }

      cursorX += segW;
    }

    pits.push({ x: cursorX, w: 125 });
    cursorX += 125;

    const goalPlatW = 540;
    platforms.push({ x: cursorX, y: groundY, w: goalPlatW, h: 180, type: 'goal' });

    const goalDesk = {
      x: cursorX + 260,
      y: groundY - 115,
      w: 170,
      h: 115,
      owlAngryTimer: 0
    };

    const worldWidth = cursorX + goalPlatW;

    return {
      worldWidth,
      groundY,
      platforms,
      pits,
      worms,
      checkpoints,
      questionBooks,
      goalDesk,
      totalQuestions: orderedQuestions.length
    };
  }

  /* =========================================================================
   * 3. MAIN GAME STATE & PHYSICS ENGINE
   * ========================================================================= */
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');

  const Game = {
    state: 'PLAYING',
    playerName: 'Player',
    stage: null,
    level: null,
    elapsedTime: 0,
    stars: 0,
    hearts: 5,
    maxHearts: 5,
    screenShake: 0,
    particles: [],
    toastTimer: null,
    touchMode: 'auto',

    player: {
      x: 90,
      y: 420,
      w: 48,
      h: 66,
      vx: 0,
      vy: 0,
      facing: 1,
      onGround: false,
      coyoteTimer: 0,
      jumpBufferTimer: 0,
      anim: 'idle',
      emotion: 'normal',
      emotionTimer: 0,
      invulnTimer: 0,
      spawnX: 90,
      spawnY: 420
    },

    camera: { x: 0, y: 0 },
    keys: { left: false, right: false, jumpHeld: false },
    activeQuizBook: null
  };

  function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  function updateTouchControlsVisibility() {
    const el = document.getElementById('touchControls');
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || window.innerWidth < 900;
    if (Game.touchMode === 'on' || (Game.touchMode === 'auto' && isTouchDevice)) {
      el.classList.remove('hidden');
    } else {
      el.classList.add('hidden');
    }
  }

  function showGameToast(message, variant = 'info') {
    const toast = document.getElementById('gameToast');
    toast.textContent = message;
    toast.className = 'mt-1.5 px-3 py-1 rounded-full text-xs sm:text-sm font-bold shadow-lg border-2 transition-all duration-200 text-center max-w-[90vw] truncate animate-pop ';
    if (variant === 'checkpoint') {
      toast.className += 'bg-emerald-100 border-emerald-500 text-emerald-900';
    } else if (variant === 'hurt') {
      toast.className += 'bg-rose-100 border-rose-500 text-rose-900';
    } else {
      toast.className += 'bg-amber-100 border-amber-500 text-amber-950';
    }
    toast.classList.remove('hidden');

    if (Game.toastTimer) clearTimeout(Game.toastTimer);
    Game.toastTimer = setTimeout(() => {
      toast.classList.add('hidden');
    }, 2300);
  }

  function renderHeartsHUD() {
    const container = document.getElementById('hudHearts');
    container.innerHTML = '';
    for (let i = 1; i <= Game.maxHearts; i++) {
      const span = document.createElement('span');
      span.className = 'inline-flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 text-sm sm:text-base transition-transform';
      if (Game.hearts >= i) {
        span.textContent = '❤️';
      } else if (Game.hearts >= i - 0.5) {
        span.innerHTML = `<span class="relative inline-block">
          <span class="opacity-30">🤍</span>
          <span class="absolute inset-0 overflow-hidden" style="width: 52%;">❤️</span>
        </span>`;
      } else {
        span.innerHTML = '<span class="opacity-35">🤍</span>';
      }
      container.appendChild(span);
    }
  }

  function updateHUD() {
    document.getElementById('hudPlayerName').textContent = Game.playerName;
    document.getElementById('hudStageName').textContent = Game.stage ? Game.stage.name : '';
    renderHeartsHUD();

    document.getElementById('hudTimer').textContent = formatSeconds(Game.elapsedTime);
    document.getElementById('hudStars').textContent = Game.stars;

    if (Game.level) {
      const answeredCount = Game.level.questionBooks.filter(b => b.collected).length;
      const totalQ = Game.level.totalQuestions;
      document.getElementById('hudQuestionProgress').textContent = `📖 ${answeredCount}/${totalQ}`;

      const goalX = Game.level.goalDesk.x;
      const pct = Math.max(0, Math.min(100, (Game.player.x / Math.max(1, goalX)) * 100));
      document.getElementById('hudRulerFill').style.width = `${pct}%`;
      document.getElementById('hudRulerMarker').style.left = `${pct}%`;
    }
  }

  function spawnFireworks(worldX, worldY, count = 42) {
    const palette = ['#FACC15', '#F472B6', '#A855F7', '#38BDF8', '#34D399', '#FB7185'];
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.3;
      const speed = 110 + Math.random() * 230;
      Game.particles.push({
        x: worldX,
        y: worldY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 90,
        size: 4 + Math.random() * 4.5,
        color: palette[i % palette.length],
        life: 0.9 + Math.random() * 0.5,
        maxLife: 1.4,
        gravity: 340
      });
    }
  }

  function spawnRunningDust(worldX, worldY) {
    Game.particles.push({
      x: worldX,
      y: worldY,
      vx: (Math.random() - 0.5) * 35,
      vy: -15 - Math.random() * 25,
      size: 3 + Math.random() * 3,
      color: 'rgba(255,255,255,0.7)',
      life: 0.35,
      maxLife: 0.35,
      gravity: 0
    });
  }

  function startStage(stageId) {
    const stages = Store.getStages();
    const chosenStage = stages.find(s => s.id === stageId) || stages[0];
    const qList = Store.getStageQuestions(chosenStage.id);

    Game.stage = chosenStage;
    Game.level = buildStageLevel(chosenStage, qList);
    Game.elapsedTime = 0;
    Game.stars = 0;
    Game.hearts = 5;
    Game.screenShake = 0;
    Game.particles = [];

    Game.player.x = 90;
    Game.player.y = Game.level.groundY - Game.player.h;
    Game.player.vx = 0;
    Game.player.vy = 0;
    Game.player.facing = 1;
    Game.player.onGround = true;
    Game.player.coyoteTimer = 0;
    Game.player.jumpBufferTimer = 0;
    Game.player.anim = 'idle';
    Game.player.emotion = 'normal';
    Game.player.emotionTimer = 0;
    Game.player.invulnTimer = 0;
    Game.player.spawnX = 90;
    Game.player.spawnY = Game.level.groundY - Game.player.h;

    Game.camera.x = 0;
    Game.camera.y = 0;
    Game.state = 'PLAYING';

    document.getElementById('pauseModal').classList.add('hidden');
    document.getElementById('quizModal').classList.add('hidden');
    document.getElementById('angryOwlModal').classList.add('hidden');
    document.getElementById('gameOverModal').classList.add('hidden');
    document.getElementById('victoryModal').classList.add('hidden');
    document.getElementById('btnPauseToggle').textContent = '⏸️';

    updateTouchControlsVisibility();
    updateHUD();
  }

  function damagePlayer(amount, reasonText, respawnAtCheckpoint = false) {
    if (!respawnAtCheckpoint && Game.player.invulnTimer > 0) return;

    Game.hearts = Math.max(0, Game.hearts - amount);
    Game.screenShake = 0.35;
    Game.player.emotion = 'sad';
    Game.player.emotionTimer = 2.2;
    Game.player.anim = 'hurt';
    Game.player.invulnTimer = 1.35;
    sound.hurt();
    updateHUD();

    if (Game.hearts <= 0) {
      Game.state = 'GAMEOVER';
      document.getElementById('gameOverModal').classList.remove('hidden');
      return;
    }

    showGameToast(reasonText, 'hurt');

    if (respawnAtCheckpoint) {
      Game.player.x = Game.player.spawnX;
      Game.player.y = Game.player.spawnY;
      Game.player.vx = 0;
      Game.player.vy = 0;
    } else {
      Game.player.vy = -260;
    }
  }

  function triggerJumpPress() {
    if (Game.state !== 'PLAYING') return;
    Game.keys.jumpHeld = true;
    Game.player.jumpBufferTimer = 0.14;
  }

  function triggerJumpRelease() {
    Game.keys.jumpHeld = false;
    if (Game.player.vy < -180) {
      Game.player.vy *= 0.55;
    }
  }

  function aabbOverlap(a, b) {
    return (
      a.x < b.x + b.w &&
      a.x + a.w > b.x &&
      a.y < b.y + b.h &&
      a.y + a.h > b.y
    );
  }

  /* =========================================================================
   * 4. QUIZ MODAL LOGIC
   * ========================================================================= */
  function openQuizModal(bookItem) {
    Game.activeQuizBook = bookItem;
    Game.state = 'QUIZ';
    sound.bookOpen();

    const q = bookItem.questionData;
    const total = Game.level ? Game.level.totalQuestions : 10;
    document.getElementById('quizBadge').textContent = `📖 คำถามข้อที่ ${bookItem.index + 1}/${total}`;
    document.getElementById('quizStarReward').textContent = `+${q.stars || 10}`;
    document.getElementById('quizQuestionText').textContent = q.question;

    const imgBox = document.getElementById('quizImageContainer');
    const imgEl = document.getElementById('quizImage');
    if (q.image && q.image.trim()) {
      imgEl.src = q.image.trim();
      imgEl.onerror = () => imgBox.classList.add('hidden');
      imgBox.classList.remove('hidden');
    } else {
      imgBox.classList.add('hidden');
    }

    const optContainer = document.getElementById('quizOptionsContainer');
    optContainer.innerHTML = '';
    const labels = ['ก.', 'ข.', 'ค.', 'ง.'];

    q.options.forEach((optText, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'btn-3d w-full text-left px-4 py-3 rounded-2xl bg-white hover:bg-purple-50 border-2 border-purple-300 font-bold text-sm sm:text-base text-purple-950 shadow-sm flex items-center gap-3 transition';
      btn.innerHTML = `
        <span class="w-8 h-8 rounded-xl bg-purple-100 text-purple-800 font-extrabold flex items-center justify-center shrink-0">${labels[idx]}</span>
        <span class="flex-1">${optText}</span>
      `;
      btn.addEventListener('click', () => handleQuizAnswer(idx));
      optContainer.appendChild(btn);
    });

    document.getElementById('quizResultBox').classList.add('hidden');
    document.getElementById('quizModal').classList.remove('hidden');
  }

  function handleQuizAnswer(selectedIndex) {
    const book = Game.activeQuizBook;
    if (!book) return;
    const q = book.questionData;
    const isCorrect = selectedIndex === Number(q.correctIndex);

    const optButtons = document.querySelectorAll('#quizOptionsContainer button');
    optButtons.forEach((btn, idx) => {
      btn.disabled = true;
      btn.classList.remove('hover:bg-purple-50');
      if (idx === Number(q.correctIndex)) {
        btn.classList.remove('border-purple-300', 'bg-white');
        btn.classList.add('border-emerald-500', 'bg-emerald-100', 'text-emerald-950');
      } else if (idx === selectedIndex && !isCorrect) {
        btn.classList.remove('border-purple-300', 'bg-white');
        btn.classList.add('border-rose-500', 'bg-rose-100', 'text-rose-950');
      } else {
        btn.classList.add('opacity-60');
      }
    });

    const resultBox = document.getElementById('quizResultBox');
    const resultIcon = document.getElementById('quizResultIcon');
    const resultTitle = document.getElementById('quizResultTitle');
    const expText = document.getElementById('quizExplanationText');

    resultBox.classList.remove('hidden', 'bg-emerald-50', 'border-emerald-400', 'text-emerald-950', 'bg-rose-50', 'border-rose-400', 'text-rose-950');

    if (isCorrect) {
      sound.correct();
      resultBox.classList.add('bg-emerald-50', 'border-emerald-400', 'text-emerald-950');
      resultIcon.textContent = '🎉';
      resultTitle.textContent = `ถูกต้อง! รับไปเลย +${q.stars || 10} ⭐`;
      expText.textContent = q.explanation || 'ยอดเยี่ยมมาก!';

      book.collected = true;
      book.answeredCorrectly = true;
      Game.stars += Number(q.stars || 10);
      Game.player.emotion = 'happy';
      Game.player.emotionTimer = 2.6;
      Game.player.anim = 'happy';
      spawnFireworks(Game.player.x + Game.player.w / 2, Game.player.y - 20, 48);
      updateHUD();
    } else {
      sound.wrong();
      const labels = ['ก.', 'ข.', 'ค.', 'ง.'];
      const correctLabel = `${labels[q.correctIndex]} ${q.options[q.correctIndex]}`;
      resultBox.classList.add('bg-rose-50', 'border-rose-400', 'text-rose-950');
      resultIcon.textContent = '😢';
      resultTitle.textContent = 'ตอบผิด! พลังชีวิตลดลง -1 ❤️';
      expText.innerHTML = `<strong>เฉลยที่ถูกต้อง:</strong> ${correctLabel}<br/><strong>คำอธิบาย:</strong> ${q.explanation || ''}`;

      book.collected = true;
      book.answeredCorrectly = false;
      Game.hearts = Math.max(0, Game.hearts - 1);
      Game.screenShake = 0.4;
      Game.player.emotion = 'sad';
      Game.player.emotionTimer = 2.6;
      Game.player.anim = 'hurt';
      updateHUD();
    }
  }

  document.getElementById('btnQuizContinue').addEventListener('click', () => {
    document.getElementById('quizModal').classList.add('hidden');
    Game.activeQuizBook = null;
    if (Game.hearts <= 0) {
      Game.state = 'GAMEOVER';
      document.getElementById('gameOverModal').classList.remove('hidden');
    } else {
      Game.state = 'PLAYING';
    }
  });

  /* =========================================================================
   * 5. STAGE VICTORY
   * ========================================================================= */
  function completeStageVictory() {
    Game.state = 'VICTORY';
    sound.victory();
    spawnFireworks(Game.player.x + 24, Game.player.y - 40, 70);

    const finalTime = Math.floor(Game.elapsedTime);
    Store.addScoreRecord({
      stageId: Game.stage.id,
      playerName: Game.playerName,
      stars: Game.stars,
      timeSeconds: finalTime,
      timestamp: Date.now()
    });

    document.getElementById('victoryStageTitle').textContent = Game.stage.name;
    document.getElementById('victoryPlayerSubtitle').textContent = `ผู้พิชิต: ${Game.playerName}`;
    document.getElementById('victoryStars').textContent = Game.stars;
    document.getElementById('victoryTime').textContent = formatSeconds(finalTime);

    const top10 = getTop10ForStage(Game.stage.id);
    renderLeaderboardRows(document.getElementById('victoryLeaderboardBody'), top10, Game.playerName);

    const stages = Store.getStages();
    const currIdx = stages.findIndex(s => s.id === Game.stage.id);
    const nextBtn = document.getElementById('btnVictoryNextStage');
    if (currIdx >= 0 && currIdx < stages.length - 1) {
      nextBtn.classList.remove('hidden');
      nextBtn.dataset.nextStageId = stages[currIdx + 1].id;
    } else {
      nextBtn.classList.add('hidden');
    }

    document.getElementById('victoryModal').classList.remove('hidden');
  }

  /* =========================================================================
   * 6. UPDATE & RENDER LOOP
   * ========================================================================= */
  const PHYSICS = {
    GRAVITY: 1580,
    MOVE_SPEED: 310,
    ACCEL: 2200,
    FRICTION: 2000,
    JUMP_VELOCITY: -620,
    MAX_FALL_SPEED: 880
  };

  function updateGame(dt) {
    if (Game.state !== 'PLAYING' || !Game.level) return;

    Game.elapsedTime += dt;
    const p = Game.player;
    const lvl = Game.level;

    if (p.invulnTimer > 0) p.invulnTimer = Math.max(0, p.invulnTimer - dt);
    if (p.emotionTimer > 0) {
      p.emotionTimer -= dt;
      if (p.emotionTimer <= 0) p.emotion = 'normal';
    }
    if (Game.screenShake > 0) Game.screenShake = Math.max(0, Game.screenShake - dt);
    if (lvl.goalDesk.owlAngryTimer > 0) lvl.goalDesk.owlAngryTimer = Math.max(0, lvl.goalDesk.owlAngryTimer - dt);

    const moveDir = (Game.keys.right ? 1 : 0) - (Game.keys.left ? 1 : 0);
    if (moveDir !== 0) {
      p.facing = moveDir;
      p.vx += moveDir * PHYSICS.ACCEL * dt;
      if (Math.abs(p.vx) > PHYSICS.MOVE_SPEED) {
        p.vx = moveDir * PHYSICS.MOVE_SPEED;
      }
    } else {
      if (Math.abs(p.vx) <= PHYSICS.FRICTION * dt) {
        p.vx = 0;
      } else {
        p.vx -= Math.sign(p.vx) * PHYSICS.FRICTION * dt;
      }
    }

    if (p.onGround) {
      p.coyoteTimer = 0.12;
    } else {
      p.coyoteTimer = Math.max(0, p.coyoteTimer - dt);
    }

    if (p.jumpBufferTimer > 0) {
      p.jumpBufferTimer = Math.max(0, p.jumpBufferTimer - dt);
    }

    if (p.jumpBufferTimer > 0 && p.coyoteTimer > 0) {
      p.vy = PHYSICS.JUMP_VELOCITY;
      p.onGround = false;
      p.coyoteTimer = 0;
      p.jumpBufferTimer = 0;
      sound.jump();
    }

    p.x += p.vx * dt;
    if (p.x < 10) {
      p.x = 10;
      p.vx = 0;
    }
    if (p.x + p.w > lvl.worldWidth - 10) {
      p.x = lvl.worldWidth - 10 - p.w;
      p.vx = 0;
    }

    p.vy = Math.min(PHYSICS.MAX_FALL_SPEED, p.vy + PHYSICS.GRAVITY * dt);
    const prevBottom = p.y + p.h;
    p.y += p.vy * dt;
    p.onGround = false;

    for (const plat of lvl.platforms) {
      if (p.x + p.w - 8 > plat.x && p.x + 8 < plat.x + plat.w) {
        if (p.vy >= 0 && prevBottom <= plat.y + 14 && p.y + p.h >= plat.y) {
          p.y = plat.y - p.h;
          p.vy = 0;
          p.onGround = true;
        }
      }
    }

    if (p.y > lvl.groundY + 135) {
      damagePlayer(1, '⚠️ ตกหลุม! เสียพลังชีวิต -1 ❤️ กลับสู่จุดเช็กพอยต์', true);
    }

    for (const w of lvl.worms) {
      w.phase += dt * 7;
      w.x += w.vx * dt;
      if (w.x <= w.minX) {
        w.x = w.minX;
        w.vx = Math.abs(w.vx);
      } else if (w.x >= w.maxX) {
        w.x = w.maxX;
        w.vx = -Math.abs(w.vx);
      }

      const wormHitbox = { x: w.x + 4, y: w.y + 4, w: w.w - 8, h: w.h - 4 };
      const playerHitbox = { x: p.x + 8, y: p.y + 8, w: p.w - 16, h: p.h - 10 };
      if (aabbOverlap(playerHitbox, wormHitbox)) {
        damagePlayer(0.5, '🐛 ชนหนอนกระดึ๊บ! เสียพลังชีวิต -0.5 ❤️', false);
      }
    }

    for (const cp of lvl.checkpoints) {
      if (!cp.activated && aabbOverlap(p, cp)) {
        cp.activated = true;
        p.spawnX = cp.spawnX;
        p.spawnY = cp.spawnY;
        sound.checkpoint();
        showGameToast('🚩 บันทึกจุด Checkpoint เรียบร้อยแล้ว!', 'checkpoint');
        spawnFireworks(cp.x + 18, cp.y + 10, 20);
      }
    }

    for (const book of lvl.questionBooks) {
      book.bobPhase += dt * 3.5;
      if (!book.collected && aabbOverlap(p, book)) {
        p.vx = 0;
        openQuizModal(book);
        return;
      }
    }

    if (aabbOverlap(p, lvl.goalDesk)) {
      const remaining = lvl.questionBooks.filter(b => !b.collected).length;
      if (remaining > 0) {
        p.x = lvl.goalDesk.x - p.w - 16;
        p.vx = 0;
        lvl.goalDesk.owlAngryTimer = 4;
        sound.angryOwl();
        Game.state = 'DIALOG';
        document.getElementById('angryOwlText').textContent =
          `ฮูก! คุณยังตอบคำถามไม่ครบเลย (เหลืออีก ${remaining} ข้อ) กรุณาย้อนกลับไปเก็บหนังสือคำถามให้ครบก่อนส่งคืนที่เคาน์เตอร์!`;
        document.getElementById('angryOwlModal').classList.remove('hidden');
        return;
      } else {
        completeStageVictory();
        return;
      }
    }

    if (p.emotionTimer > 1.7 && p.emotion === 'sad') {
      p.anim = 'hurt';
    } else if (p.emotionTimer > 1.8 && p.emotion === 'happy') {
      p.anim = 'happy';
    } else if (!p.onGround) {
      p.anim = p.vy < 0 ? 'jump' : 'fall';
    } else if (Math.abs(p.vx) > 220) {
      p.anim = 'run';
      if (Math.random() < 0.25) spawnRunningDust(p.x + p.w / 2, p.y + p.h);
    } else if (Math.abs(p.vx) > 15) {
      p.anim = 'walk';
    } else {
      p.anim = 'idle';
    }

    const viewW = window.innerWidth;
    const targetCamX = Math.max(0, Math.min(lvl.worldWidth - viewW, p.x - viewW * 0.34));
    Game.camera.x += (targetCamX - Game.camera.x) * Math.min(1, dt * 8.5);

    for (let i = Game.particles.length - 1; i >= 0; i--) {
      const pt = Game.particles[i];
      pt.x += pt.vx * dt;
      pt.y += pt.vy * dt;
      pt.vy += pt.gravity * dt;
      pt.life -= dt;
      if (pt.life <= 0) Game.particles.splice(i, 1);
    }

    updateHUD();
  }

  function renderGameWorld(time) {
    const w = window.innerWidth;
    const h = window.innerHeight;
    ctx.clearRect(0, 0, w, h);

    const activeTheme = Game.stage ? Game.stage.theme : 'explorer';
    drawThemeBackground(ctx, w, h, Game.camera.x, activeTheme, time);

    if (!Game.level) return;

    const lvl = Game.level;
    const desiredScreenGroundY = h - Math.max(105, h * 0.17);
    const offsetY = desiredScreenGroundY - lvl.groundY;

    ctx.save();
    if (Game.screenShake > 0) {
      const mag = Game.screenShake * 18;
      ctx.translate((Math.random() - 0.5) * mag, (Math.random() - 0.5) * mag);
    }
    ctx.translate(-Game.camera.x, offsetY);

    const themePalette = {
      opac: { top: '#7C3AED', front: '#312E81', trim: '#FACC15' },
      explorer: { top: '#F472B6', front: '#7E22CE', trim: '#FEF08A' },
      haunted: { top: '#6D28D9', front: '#1E1B4B', trim: '#38BDF8' },
      master: { top: '#FACC15', front: '#6B21A8', trim: '#FEFCE8' }
    }[activeTheme] || { top: '#7C3AED', front: '#4C1D95', trim: '#FACC15' };

    for (const plat of lvl.platforms) {
      if (plat.x + plat.w < Game.camera.x - 80 || plat.x > Game.camera.x + w + 80) continue;

      ctx.fillStyle = themePalette.trim;
      ctx.beginPath();
      ctx.roundRect(plat.x, plat.y - 6, plat.w, 12, 6);
      ctx.fill();

      const pGrad = ctx.createLinearGradient(plat.x, plat.y, plat.x, plat.y + plat.h);
      pGrad.addColorStop(0, themePalette.top);
      pGrad.addColorStop(0.22, themePalette.front);
      pGrad.addColorStop(1, '#1E1035');
      ctx.fillStyle = pGrad;
      ctx.beginPath();
      ctx.roundRect(plat.x, plat.y, plat.w, plat.h, [6, 6, 0, 0]);
      ctx.fill();

      ctx.fillStyle = 'rgba(255,255,255,0.22)';
      ctx.fillRect(plat.x + 6, plat.y + 4, plat.w - 12, 4);
    }

    for (const cp of lvl.checkpoints) {
      ctx.fillStyle = '#CBD5E1';
      ctx.fillRect(cp.x + 14, cp.y, 6, cp.h);
      ctx.fillStyle = '#FACC15';
      ctx.beginPath();
      ctx.arc(cp.x + 17, cp.y, 7, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = cp.activated ? '#10B981' : '#A855F7';
      ctx.beginPath();
      ctx.moveTo(cp.x + 20, cp.y + 6);
      ctx.lineTo(cp.x + 54, cp.y + 18 + Math.sin(time * 5) * 2);
      ctx.lineTo(cp.x + 20, cp.y + 32);
      ctx.closePath();
      ctx.fill();

      if (cp.activated) {
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 11px "Chakra Petch", sans-serif';
        ctx.fillText('✓', cp.x + 26, cp.y + 22);
      }
    }

    for (const book of lvl.questionBooks) {
      if (book.collected) continue;
      const by = book.y + Math.sin(book.bobPhase) * 6;
      const cx = book.x + book.w / 2;
      const cy = by + book.h / 2;

      const glow = ctx.createRadialGradient(cx, cy, 4, cx, cy, 30);
      glow.addColorStop(0, 'rgba(250, 204, 21, 0.75)');
      glow.addColorStop(1, 'rgba(250, 204, 21, 0)');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, cy, 30, 0, Math.PI * 2);
      ctx.fill();

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(Math.sin(book.bobPhase * 0.7) * 0.08);
      ctx.fillStyle = '#7E22CE';
      ctx.beginPath();
      ctx.roundRect(-16, -13, 32, 26, 5);
      ctx.fill();
      ctx.strokeStyle = '#FACC15';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.fillStyle = '#FEFCE8';
      ctx.fillRect(-12, -10, 24, 20);
      ctx.fillStyle = '#7E22CE';
      ctx.fillRect(-1, -10, 2, 20);

      ctx.fillStyle = '#D97706';
      ctx.font = 'bold 14px "Chakra Petch", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('?', 0, 5);
      ctx.restore();
    }

    for (const w of lvl.worms) {
      const inch = Math.sin(w.phase) * 3;
      const dir = w.vx >= 0 ? 1 : -1;
      ctx.save();
      ctx.translate(w.x + w.w / 2, w.y + w.h);
      ctx.scale(dir, 1);

      const segColors = ['#84CC16', '#A3E635', '#65A30D', '#BEF264'];
      for (let s = 0; s < 4; s++) {
        const sx = -12 + s * 8;
        const sy = -7 - (s === 1 || s === 2 ? Math.abs(inch) : 0);
        ctx.fillStyle = segColors[s];
        ctx.beginPath();
        ctx.arc(sx, sy, s === 3 ? 8.5 : 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#365314';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(14, -9, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#0F172A';
      ctx.beginPath();
      ctx.arc(15, -9, 1.6, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    const gd = lvl.goalDesk;
    const isAngry = gd.owlAngryTimer > 0;
    ctx.save();
    ctx.translate(gd.x + gd.w / 2, gd.y + 8 + (isAngry ? Math.sin(time * 25) * 3 : Math.sin(time * 3) * 2));
    ctx.fillStyle = isAngry ? '#DC2626' : '#78350F';
    ctx.beginPath();
    ctx.ellipse(0, 0, 26, 30, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#FEF3C7';
    ctx.beginPath();
    ctx.ellipse(0, 6, 17, 19, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(-9, -8, 8, 0, Math.PI * 2);
    ctx.arc(9, -8, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#0F172A';
    ctx.beginPath();
    ctx.arc(-9, -8, 4, 0, Math.PI * 2);
    ctx.arc(9, -8, 4, 0, Math.PI * 2);
    ctx.fill();

    if (isAngry) {
      ctx.strokeStyle = '#FEF08A';
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.moveTo(-16, -16);
      ctx.lineTo(-3, -11);
      ctx.moveTo(16, -16);
      ctx.lineTo(3, -11);
      ctx.stroke();
    }
    ctx.fillStyle = '#FACC15';
    ctx.beginPath();
    ctx.moveTo(-4, -3);
    ctx.lineTo(4, -3);
    ctx.lineTo(0, 4);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = '#FACC15';
    ctx.lineWidth = 2;
    ctx.strokeRect(-17, -15, 16, 14);
    ctx.strokeRect(1, -15, 16, 14);
    ctx.restore();

    const deskGrad = ctx.createLinearGradient(gd.x, gd.y + 20, gd.x, gd.y + gd.h);
    deskGrad.addColorStop(0, '#FACC15');
    deskGrad.addColorStop(0.18, '#7E22CE');
    deskGrad.addColorStop(1, '#4C1D95');
    ctx.fillStyle = deskGrad;
    ctx.beginPath();
    ctx.roundRect(gd.x, gd.y + 20, gd.w, gd.h - 20, 12);
    ctx.fill();
    ctx.strokeStyle = '#FEF08A';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.fillStyle = '#FEFCE8';
    ctx.beginPath();
    ctx.roundRect(gd.x + 14, gd.y + 42, gd.w - 28, 34, 8);
    ctx.fill();
    ctx.fillStyle = '#4C1D95';
    ctx.font = 'bold 14px "Chakra Petch", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('📚 เคาน์เตอร์ยืม-คืน', gd.x + gd.w / 2, gd.y + 64);

    drawMeedee(ctx, {
      x: Game.player.x,
      y: Game.player.y,
      width: Game.player.w,
      height: Game.player.h,
      facing: Game.player.facing,
      anim: Game.player.anim,
      emotion: Game.player.emotion,
      time,
      hasMagnifier: activeTheme === 'opac',
      invulnFlash: Game.player.invulnTimer > 0
    });

    for (const pt of Game.particles) {
      ctx.save();
      ctx.globalAlpha = Math.max(0, pt.life / pt.maxLife);
      ctx.fillStyle = pt.color;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    ctx.restore();
  }

  let lastTimestamp = 0;
  let globalTime = 0;
  function mainLoop(timestamp) {
    if (!lastTimestamp) lastTimestamp = timestamp;
    const dt = Math.min(0.05, (timestamp - lastTimestamp) / 1000);
    lastTimestamp = timestamp;
    globalTime += dt;

    updateGame(dt);
    renderGameWorld(globalTime);

    requestAnimationFrame(mainLoop);
  }

  /* =========================================================================
   * 7. INPUT BINDINGS & INITIALIZATION
   * ========================================================================= */
  window.addEventListener('keydown', (e) => {
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'Space'].includes(e.code) && Game.state === 'PLAYING') {
      e.preventDefault();
    }
    if (e.code === 'ArrowLeft' || e.code === 'KeyA') Game.keys.left = true;
    if (e.code === 'ArrowRight' || e.code === 'KeyD') Game.keys.right = true;
    if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') {
      if (!e.repeat) triggerJumpPress();
    }
    if (e.code === 'Escape' && (Game.state === 'PLAYING' || Game.state === 'PAUSED')) {
      togglePauseGame();
    }
  });

  window.addEventListener('keyup', (e) => {
    if (e.code === 'ArrowLeft' || e.code === 'KeyA') Game.keys.left = false;
    if (e.code === 'ArrowRight' || e.code === 'KeyD') Game.keys.right = false;
    if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') {
      triggerJumpRelease();
    }
  });

  function bindHoldButton(btnId, onDown, onUp) {
    const el = document.getElementById(btnId);
    const start = (e) => {
      e.preventDefault();
      el.classList.add('pressed');
      onDown();
    };
    const end = (e) => {
      e.preventDefault();
      el.classList.remove('pressed');
      onUp();
    };
    el.addEventListener('touchstart', start, { passive: false });
    el.addEventListener('touchend', end, { passive: false });
    el.addEventListener('touchcancel', end, { passive: false });
    el.addEventListener('mousedown', start);
    el.addEventListener('mouseup', end);
    el.addEventListener('mouseleave', end);
  }

  bindHoldButton('touchLeft', () => { Game.keys.left = true; }, () => { Game.keys.left = false; });
  bindHoldButton('touchRight', () => { Game.keys.right = true; }, () => { Game.keys.right = false; });
  bindHoldButton('touchJump', () => { triggerJumpPress(); }, () => { triggerJumpRelease(); });

  function togglePauseGame() {
    if (Game.state === 'PLAYING') {
      Game.state = 'PAUSED';
      document.getElementById('btnPauseToggle').textContent = '▶️';
      document.getElementById('pauseModal').classList.remove('hidden');
    } else if (Game.state === 'PAUSED') {
      Game.state = 'PLAYING';
      document.getElementById('btnPauseToggle').textContent = '⏸️';
      document.getElementById('pauseModal').classList.add('hidden');
    }
  }

  document.getElementById('btnPauseToggle').addEventListener('click', togglePauseGame);
  document.getElementById('btnResumeGame').addEventListener('click', togglePauseGame);
  document.getElementById('btnRestartGame').addEventListener('click', () => {
    if (Game.stage) startStage(Game.stage.id);
  });
  document.getElementById('btnPauseRestart').addEventListener('click', () => {
    if (Game.stage) startStage(Game.stage.id);
  });
  document.getElementById('btnGameOverRetry').addEventListener('click', () => {
    if (Game.stage) startStage(Game.stage.id);
  });
  document.getElementById('btnVictoryNextStage').addEventListener('click', (e) => {
    const nextId = e.currentTarget.dataset.nextStageId;
    if (nextId) startStage(nextId);
  });
  document.getElementById('btnCloseAngryOwl').addEventListener('click', () => {
    document.getElementById('angryOwlModal').classList.add('hidden');
    Game.state = 'PLAYING';
  });
  document.getElementById('btnSoundToggle').addEventListener('click', (e) => {
    sound.muted = !sound.muted;
    e.currentTarget.textContent = sound.muted ? '🔇' : '🔊';
  });

  // Boot Gameplay from URL Params or Active Session
  window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const session = Store.getActiveSession() || {};

    const playerName = (params.get('player') || session.playerName || '').trim();
    const stageId = params.get('stage') || session.stageId || 'stage_1';
    Game.touchMode = params.get('touch') || session.touchMode || 'auto';

    // Redirect back to index.html if no valid player name
    if (!playerName) {
      window.location.href = 'index.html';
      return;
    }

    Game.playerName = playerName;
    startStage(stageId);
    requestAnimationFrame(mainLoop);
  });
})();
