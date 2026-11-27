/* =========================================================================
 * INDEX PAGE CONTROLLER (Start Screen, Preview, Leaderboard & Admin)
 * ========================================================================= */
(() => {
  'use strict';

  let touchMode = 'auto';
  let previewTime = 0;
  let lastTs = 0;
  let adminSelectedStageId = null;

  const previewCanvas = document.getElementById('previewMeedeeCanvas');
  const previewCtx = previewCanvas.getContext('2d');
  const nameInput = document.getElementById('playerNameInput');
  const btnStart = document.getElementById('btnStartGame');
  const nameFeedback = document.getElementById('nameFeedbackMsg');

  // 1. Animated MEEDEE Preview on Start Screen
  function renderStartPreview(timestamp) {
    if (!lastTs) lastTs = timestamp;
    const dt = Math.min(0.05, (timestamp - lastTs) / 1000);
    lastTs = timestamp;
    previewTime += dt;

    previewCtx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);

    const sparkles = [
      { x: 45, y: 55, r: 5, phase: 0 },
      { x: 195, y: 65, r: 6, phase: 1.5 },
      { x: 40, y: 175, r: 4, phase: 3.1 },
      { x: 200, y: 165, r: 5, phase: 4.2 }
    ];
    sparkles.forEach(sp => {
      const sc = 0.6 + 0.4 * Math.sin(previewTime * 4 + sp.phase);
      previewCtx.save();
      previewCtx.translate(sp.x, sp.y);
      previewCtx.scale(sc, sc);
      previewCtx.fillStyle = '#FACC15';
      previewCtx.beginPath();
      previewCtx.moveTo(0, -sp.r * 1.8);
      previewCtx.lineTo(sp.r * 0.5, -sp.r * 0.5);
      previewCtx.lineTo(sp.r * 1.8, 0);
      previewCtx.lineTo(sp.r * 0.5, sp.r * 0.5);
      previewCtx.lineTo(0, sp.r * 1.8);
      previewCtx.lineTo(-sp.r * 0.5, sp.r * 0.5);
      previewCtx.lineTo(-sp.r * 1.8, 0);
      previewCtx.lineTo(-sp.r * 0.5, -sp.r * 0.5);
      previewCtx.closePath();
      previewCtx.fill();
      previewCtx.restore();
    });

    const selectedStageId = document.getElementById('stageSelect').value;
    const stages = Store.getStages();
    const st = stages.find(s => s.id === selectedStageId) || stages[0];

    drawMeedee(previewCtx, {
      x: 52,
      y: 36,
      width: 136,
      height: 176,
      facing: 1,
      anim: 'idle',
      emotion: 'normal',
      time: previewTime,
      hasMagnifier: st && st.theme === 'opac'
    });

    requestAnimationFrame(renderStartPreview);
  }

  // 2. Stage Dropdown & Player Name Validation
  function populateStartStageDropdown() {
    const select = document.getElementById('stageSelect');
    const prevVal = select.value;
    const stages = Store.getStages();
    select.innerHTML = '';
    stages.forEach(st => {
      const opt = document.createElement('option');
      opt.value = st.id;
      opt.textContent = st.name;
      select.appendChild(opt);
    });
    if (prevVal && stages.some(s => s.id === prevVal)) {
      select.value = prevVal;
    }
  }

  function validateStartNameInput() {
    const val = nameInput.value.trim();
    if (!val) {
      nameFeedback.classList.add('hidden');
      btnStart.disabled = true;
      return false;
    }
    if (Store.isNameTaken(val)) {
      nameFeedback.textContent = 'ชื่อนี้ถูกใช้ไปแล้ว กรุณาตั้งชื่อใหม่ที่ไม่ซ้ำกัน';
      nameFeedback.classList.remove('hidden');
      btnStart.disabled = true;
      return false;
    }
    nameFeedback.classList.add('hidden');
    btnStart.disabled = false;
    return true;
  }

  nameInput.addEventListener('input', validateStartNameInput);
  nameInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && validateStartNameInput()) {
      btnStart.click();
    }
  });

  // Navigate to game.html with Session Data & URL Params
  btnStart.addEventListener('click', () => {
    if (!validateStartNameInput()) return;
    const playerName = nameInput.value.trim();
    const stageId = document.getElementById('stageSelect').value;

    Store.setActiveSession({
      playerName,
      stageId,
      touchMode
    });

    const params = new URLSearchParams({
      player: playerName,
      stage: stageId,
      touch: touchMode
    });
    window.location.href = `game.html?${params.toString()}`;
  });

  // Touch Controls Mode Toggle
  document.getElementById('btnToggleTouchPref').addEventListener('click', (e) => {
    const modes = ['auto', 'on', 'off'];
    const labels = {
      auto: '🎮 ปุ่มสัมผัสบนจอ: อัตโนมัติ',
      on: '🎮 ปุ่มสัมผัสบนจอ: เปิดตลอด',
      off: '🎮 ปุ่มสัมผัสบนจอ: ปิด'
    };
    const next = modes[(modes.indexOf(touchMode) + 1) % modes.length];
    touchMode = next;
    e.currentTarget.textContent = labels[next];
  });

  // 3. Standalone Leaderboard Modal
  document.getElementById('btnLeaderboardStart').addEventListener('click', () => {
    const filter = document.getElementById('lbStageFilter');
    const stages = Store.getStages();
    filter.innerHTML = '';
    stages.forEach(s => {
      const opt = document.createElement('option');
      opt.value = s.id;
      opt.textContent = s.name;
      filter.appendChild(opt);
    });
    filter.value = document.getElementById('stageSelect').value || stages[0].id;
    renderLeaderboardRows(document.getElementById('standaloneLbBody'), getTop10ForStage(filter.value));
    document.getElementById('standaloneLeaderboardModal').classList.remove('hidden');
  });

  document.getElementById('lbStageFilter').addEventListener('change', (e) => {
    renderLeaderboardRows(document.getElementById('standaloneLbBody'), getTop10ForStage(e.target.value));
  });

  document.getElementById('btnCloseStandaloneLb').addEventListener('click', () => {
    document.getElementById('standaloneLeaderboardModal').classList.add('hidden');
  });

  // 4. Custom Confirmation Dialog
  function showCustomConfirm({ title, message, icon = '⚠️', onConfirm }) {
    const modal = document.getElementById('customConfirmModal');
    document.getElementById('confirmModalIcon').textContent = icon;
    document.getElementById('confirmModalTitle').textContent = title;
    document.getElementById('confirmModalMessage').textContent = message;
    modal.classList.remove('hidden');

    const btnCancel = document.getElementById('btnConfirmCancel');
    const btnProceed = document.getElementById('btnConfirmProceed');

    const cleanup = () => {
      modal.classList.add('hidden');
      btnCancel.onclick = null;
      btnProceed.onclick = null;
    };

    btnCancel.onclick = cleanup;
    btnProceed.onclick = () => {
      cleanup();
      if (onConfirm) onConfirm();
    };
  }

  // 5. Preview Question Modal in Admin
  function openPreviewQuizModal(q, idx = 0) {
    document.getElementById('quizBadge').textContent = `📖 ตัวอย่างคำถามข้อที่ ${idx + 1}`;
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

    q.options.forEach((optText, optIdx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'btn-3d w-full text-left px-4 py-3 rounded-2xl bg-white hover:bg-purple-50 border-2 border-purple-300 font-bold text-sm sm:text-base text-purple-950 shadow-sm flex items-center gap-3 transition';
      btn.innerHTML = `
        <span class="w-8 h-8 rounded-xl bg-purple-100 text-purple-800 font-extrabold flex items-center justify-center shrink-0">${labels[optIdx]}</span>
        <span class="flex-1">${optText}</span>
      `;
      btn.addEventListener('click', () => {
        const isCorrect = optIdx === Number(q.correctIndex);
        document.querySelectorAll('#quizOptionsContainer button').forEach((b, i) => {
          b.disabled = true;
          if (i === Number(q.correctIndex)) {
            b.classList.add('border-emerald-500', 'bg-emerald-100', 'text-emerald-950');
          } else if (i === optIdx && !isCorrect) {
            b.classList.add('border-rose-500', 'bg-rose-100', 'text-rose-950');
          } else {
            b.classList.add('opacity-60');
          }
        });

        const resultBox = document.getElementById('quizResultBox');
        resultBox.classList.remove('hidden', 'bg-emerald-50', 'border-emerald-400', 'text-emerald-950', 'bg-rose-50', 'border-rose-400', 'text-rose-950');
        if (isCorrect) {
          resultBox.classList.add('bg-emerald-50', 'border-emerald-400', 'text-emerald-950');
          document.getElementById('quizResultIcon').textContent = '🎉';
          document.getElementById('quizResultTitle').textContent = `ถูกต้อง! รับไปเลย +${q.stars || 10} ⭐`;
          document.getElementById('quizExplanationText').textContent = q.explanation || 'ยอดเยี่ยมมาก!';
        } else {
          const correctLabel = `${labels[q.correctIndex]} ${q.options[q.correctIndex]}`;
          resultBox.classList.add('bg-rose-50', 'border-rose-400', 'text-rose-950');
          document.getElementById('quizResultIcon').textContent = '😢';
          document.getElementById('quizResultTitle').textContent = 'ตอบผิด! พลังชีวิตลดลง -1 ❤️';
          document.getElementById('quizExplanationText').innerHTML = `<strong>เฉลยที่ถูกต้อง:</strong> ${correctLabel}<br/><strong>คำอธิบาย:</strong> ${q.explanation || ''}`;
        }
      });
      optContainer.appendChild(btn);
    });

    document.getElementById('quizResultBox').classList.add('hidden');
    document.getElementById('quizModal').classList.remove('hidden');
  }

  document.getElementById('btnQuizContinue').addEventListener('click', () => {
    document.getElementById('quizModal').classList.add('hidden');
  });

  // 6. Admin Login & Dashboard
  document.getElementById('btnOpenAdmin').addEventListener('click', () => {
    document.getElementById('adminPasswordInput').value = '';
    document.getElementById('adminLoginError').classList.add('hidden');
    document.getElementById('adminLoginModal').classList.remove('hidden');
    setTimeout(() => document.getElementById('adminPasswordInput').focus(), 50);
  });

  document.getElementById('btnCancelAdminLogin').addEventListener('click', () => {
    document.getElementById('adminLoginModal').classList.add('hidden');
  });

  function attemptAdminLogin() {
    const pwd = document.getElementById('adminPasswordInput').value;
    if (pwd === 'Libbuu70') {
      document.getElementById('adminLoginModal').classList.add('hidden');
      openAdminDashboard();
    } else {
      document.getElementById('adminLoginError').classList.remove('hidden');
    }
  }

  document.getElementById('btnSubmitAdminLogin').addEventListener('click', attemptAdminLogin);
  document.getElementById('adminPasswordInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') attemptAdminLogin();
  });

  function openAdminDashboard() {
    const stages = Store.getStages();
    if (!adminSelectedStageId || !stages.some(s => s.id === adminSelectedStageId)) {
      adminSelectedStageId = stages[0].id;
    }
    renderAdminStages();
    renderAdminQuestions();
    document.getElementById('adminDashboardModal').classList.remove('hidden');
  }

  document.getElementById('btnCloseAdminDashboard').addEventListener('click', () => {
    document.getElementById('adminDashboardModal').classList.add('hidden');
    populateStartStageDropdown();
    validateStartNameInput();
  });

  document.getElementById('btnAdminResetScores').addEventListener('click', () => {
    showCustomConfirm({
      icon: '🗑️',
      title: 'รีเซ็ตคะแนนทั้งหมด (ขั้นที่ 1/2)',
      message: 'คุณต้องการล้างสถิติอันดับคะแนน Top 10 และรายชื่อผู้เล่นทั้งหมดใช่หรือไม่?',
      onConfirm: () => {
        showCustomConfirm({
          icon: '🚨',
          title: 'ยืนยันครั้งสุดท้าย (ขั้นที่ 2/2)',
          message: 'ข้อมูลคะแนนทั้งหมดจะถูกลบถาวรและไม่สามารถกู้คืนได้ ยืนยันการลบใช่หรือไม่?',
          onConfirm: () => {
            Store.resetAllScores();
            validateStartNameInput();
            showCustomConfirm({
              icon: '✅',
              title: 'รีเซ็ตคะแนนเรียบร้อยแล้ว',
              message: 'สถิติคะแนนทั้งหมดถูกล้างเรียบร้อยแล้ว'
            });
          }
        });
      }
    });
  });

  function renderAdminStages() {
    const stages = Store.getStages();
    const listEl = document.getElementById('adminStageList');
    listEl.innerHTML = '';

    const themeNames = {
      opac: '🔍 OPAC Detective',
      explorer: '📚 Library Explorer',
      haunted: '👻 Smart Study Challenge',
      master: '👑 The Library Master'
    };

    stages.forEach(st => {
      const isSelected = st.id === adminSelectedStageId;
      const card = document.createElement('div');
      card.className = `p-3 rounded-2xl border-2 cursor-pointer transition ${
        isSelected ? 'bg-purple-100 border-purple-600 shadow-sm' : 'bg-slate-50 border-slate-200 hover:border-purple-300'
      }`;

      card.innerHTML = `
        <div class="flex items-start justify-between gap-2">
          <div class="flex-1 min-w-0">
            <div class="font-extrabold text-sm text-purple-950 truncate">${st.name}</div>
            <div class="text-[11px] font-semibold text-purple-700 mt-0.5">${themeNames[st.theme] || st.theme}</div>
          </div>
          <div class="flex items-center gap-1 shrink-0">
            <button data-action="edit" class="px-2 py-1 rounded-lg bg-amber-200 hover:bg-amber-300 text-amber-950 text-xs font-bold">แก้ไข</button>
            ${stages.length > 1 ? `<button data-action="delete" class="px-2 py-1 rounded-lg bg-rose-200 hover:bg-rose-300 text-rose-900 text-xs font-bold">ลบ</button>` : ''}
          </div>
        </div>
      `;

      card.addEventListener('click', (e) => {
        const action = e.target.dataset.action;
        if (action === 'edit') {
          e.stopPropagation();
          openStageForm(st);
        } else if (action === 'delete') {
          e.stopPropagation();
          showCustomConfirm({
            title: 'ยืนยันการลบด่าน',
            message: `ต้องการลบด่าน "${st.name}" และคำถามทั้งหมดในด่านนี้ใช่หรือไม่?`,
            onConfirm: () => {
              const updated = Store.getStages().filter(s => s.id !== st.id);
              Store.saveStages(updated);
              const allQ = Store.getAllQuestions();
              delete allQ[st.id];
              Store.saveAllQuestions(allQ);
              if (adminSelectedStageId === st.id) {
                adminSelectedStageId = updated[0].id;
              }
              renderAdminStages();
              renderAdminQuestions();
            }
          });
        } else {
          adminSelectedStageId = st.id;
          document.getElementById('adminQuestionFormBox').classList.add('hidden');
          renderAdminStages();
          renderAdminQuestions();
        }
      });

      listEl.appendChild(card);
    });
  }

  function openStageForm(stageObj = null) {
    const box = document.getElementById('adminStageFormBox');
    document.getElementById('adminStageFormTitle').textContent = stageObj ? 'แก้ไขข้อมูลด่าน' : 'เพิ่มด่านใหม่';
    document.getElementById('editStageId').value = stageObj ? stageObj.id : '';
    document.getElementById('editStageName').value = stageObj ? stageObj.name : '';
    document.getElementById('editStageTheme').value = stageObj ? stageObj.theme : 'explorer';
    box.classList.remove('hidden');
  }

  document.getElementById('btnNewStageForm').addEventListener('click', () => openStageForm(null));
  document.getElementById('btnCancelStageForm').addEventListener('click', () => {
    document.getElementById('adminStageFormBox').classList.add('hidden');
  });

  document.getElementById('btnSaveStageForm').addEventListener('click', () => {
    const id = document.getElementById('editStageId').value;
    const name = document.getElementById('editStageName').value.trim();
    const theme = document.getElementById('editStageTheme').value;
    if (!name) return;

    const stages = Store.getStages();
    if (id) {
      const target = stages.find(s => s.id === id);
      if (target) {
        target.name = name;
        target.theme = theme;
      }
    } else {
      const newId = 'stage_' + Date.now();
      stages.push({ id: newId, name, theme, randomize: false });
      Store.saveStageQuestions(newId, [
        {
          id: 'q_' + Date.now(),
          active: true,
          stars: 10,
          image: '',
          question: 'ตัวอย่างคำถามสำหรับด่านใหม่: ระบบสืบค้นทรัพยากรห้องสมุดเรียกว่าอะไร?',
          options: ['OPAC', 'GPS', 'USB', 'PDF'],
          correctIndex: 0,
          explanation: 'OPAC ย่อมาจาก Online Public Access Catalog'
        }
      ]);
      adminSelectedStageId = newId;
    }
    Store.saveStages(stages);
    document.getElementById('adminStageFormBox').classList.add('hidden');
    renderAdminStages();
    renderAdminQuestions();
  });

  function renderAdminQuestions() {
    const stages = Store.getStages();
    const stage = stages.find(s => s.id === adminSelectedStageId) || stages[0];
    adminSelectedStageId = stage.id;

    document.getElementById('adminSelectedStageTitle').textContent = stage.name;
    document.getElementById('chkRandomizeQuestions').checked = !!stage.randomize;

    const questions = Store.getStageQuestions(stage.id);
    const activeCount = questions.filter(q => q.active !== false).length;
    document.getElementById('adminQuestionCountLabel').textContent =
      `จำนวนคำถามทั้งหมด: ${questions.length} ข้อ (เปิดใช้งาน ${activeCount} ข้อ)`;

    const listEl = document.getElementById('adminQuestionList');
    listEl.innerHTML = '';

    const labels = ['ก.', 'ข.', 'ค.', 'ง.'];
    questions.forEach((q, idx) => {
      const isActive = q.active !== false;
      const card = document.createElement('div');
      card.className = `bg-white border-2 rounded-2xl p-3.5 shadow-sm transition ${
        isActive ? 'border-purple-200' : 'border-slate-200 opacity-60 bg-slate-100'
      }`;

      card.innerHTML = `
        <div class="flex flex-wrap items-start justify-between gap-2">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-0.5 rounded-full bg-purple-700 text-white text-xs font-extrabold">ข้อ ${idx + 1}</span>
            <span class="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300 text-xs font-extrabold">⭐ ${q.stars || 10}</span>
            ${q.image ? '<span class="px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 text-xs font-bold">🖼️ มีภาพประกอบ</span>' : ''}
          </div>
          <div class="flex flex-wrap items-center gap-1">
            <button data-act="up" ${idx === 0 ? 'disabled' : ''} class="px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-30 text-xs font-bold" title="เลื่อนขึ้น">▲</button>
            <button data-act="down" ${idx === questions.length - 1 ? 'disabled' : ''} class="px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-30 text-xs font-bold" title="เลื่อนลง">▼</button>
            <button data-act="toggle" class="px-2.5 py-1 rounded-lg ${isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-300 text-slate-700'} text-xs font-bold">
              ${isActive ? 'เปิดใช้งาน' : 'ปิดอยู่'}
            </button>
            <button data-act="preview" class="px-2.5 py-1 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold">👁️ Preview</button>
            <button data-act="edit" class="px-2.5 py-1 rounded-lg bg-purple-100 hover:bg-purple-200 text-purple-900 text-xs font-bold">✏️ แก้ไข</button>
            <button data-act="delete" class="px-2.5 py-1 rounded-lg bg-rose-100 hover:bg-rose-200 text-rose-800 text-xs font-bold">🗑️ ลบ</button>
          </div>
        </div>
        <p class="mt-2 font-bold text-sm text-slate-900">${q.question}</p>
        <div class="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs">
          ${q.options.map((o, oIdx) => `
            <div class="px-2.5 py-1 rounded-lg ${oIdx === Number(q.correctIndex) ? 'bg-emerald-50 border border-emerald-300 text-emerald-900 font-bold' : 'bg-slate-50 text-slate-600'}">
              ${labels[oIdx]} ${o} ${oIdx === Number(q.correctIndex) ? '✓' : ''}
            </div>
          `).join('')}
        </div>
      `;

      card.addEventListener('click', (e) => {
        const act = e.target.dataset.act;
        if (!act) return;
        const list = Store.getStageQuestions(stage.id);

        if (act === 'up' && idx > 0) {
          [list[idx - 1], list[idx]] = [list[idx], list[idx - 1]];
          Store.saveStageQuestions(stage.id, list);
          renderAdminQuestions();
        } else if (act === 'down' && idx < list.length - 1) {
          [list[idx + 1], list[idx]] = [list[idx], list[idx + 1]];
          Store.saveStageQuestions(stage.id, list);
          renderAdminQuestions();
        } else if (act === 'toggle') {
          list[idx].active = !(list[idx].active !== false);
          Store.saveStageQuestions(stage.id, list);
          renderAdminQuestions();
        } else if (act === 'preview') {
          openPreviewQuizModal(list[idx], idx);
        } else if (act === 'edit') {
          openQuestionForm(list[idx]);
        } else if (act === 'delete') {
          showCustomConfirm({
            title: 'ยืนยันการลบคำถาม',
            message: `ต้องการลบคำถามข้อที่ ${idx + 1} ใช่หรือไม่?`,
            onConfirm: () => {
              list.splice(idx, 1);
              Store.saveStageQuestions(stage.id, list);
              renderAdminQuestions();
            }
          });
        }
      });

      listEl.appendChild(card);
    });
  }

  document.getElementById('chkRandomizeQuestions').addEventListener('change', (e) => {
    const stages = Store.getStages();
    const st = stages.find(s => s.id === adminSelectedStageId);
    if (st) {
      st.randomize = e.target.checked;
      Store.saveStages(stages);
    }
  });

  function openQuestionForm(qObj = null) {
    const box = document.getElementById('adminQuestionFormBox');
    document.getElementById('adminQuestionFormTitle').textContent = qObj ? 'แก้ไขคำถาม' : 'เพิ่มคำถามใหม่';
    document.getElementById('editQuestionId').value = qObj ? qObj.id : '';
    document.getElementById('editQText').value = qObj ? qObj.question : '';
    document.getElementById('editQOpt0').value = qObj ? (qObj.options[0] || '') : '';
    document.getElementById('editQOpt1').value = qObj ? (qObj.options[1] || '') : '';
    document.getElementById('editQOpt2').value = qObj ? (qObj.options[2] || '') : '';
    document.getElementById('editQOpt3').value = qObj ? (qObj.options[3] || '') : '';
    document.getElementById('editQExplanation').value = qObj ? (qObj.explanation || '') : '';
    document.getElementById('editQStars').value = qObj ? (qObj.stars || 10) : 10;
    document.getElementById('editQImageUrl').value = qObj ? (qObj.image || '') : '';
    document.getElementById('editQActive').checked = qObj ? (qObj.active !== false) : true;

    const correctVal = qObj ? String(qObj.correctIndex) : '0';
    document.querySelectorAll('input[name="correctOpt"]').forEach(r => {
      r.checked = r.value === correctVal;
    });

    box.classList.remove('hidden');
    box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  document.getElementById('btnAddQuestion').addEventListener('click', () => openQuestionForm(null));
  document.getElementById('btnCloseQuestionForm').addEventListener('click', () => {
    document.getElementById('adminQuestionFormBox').classList.add('hidden');
  });

  document.getElementById('editQImageFile').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      document.getElementById('editQImageUrl').value = ev.target.result;
    };
    reader.readAsDataURL(file);
  });

  document.getElementById('btnClearQImage').addEventListener('click', () => {
    document.getElementById('editQImageUrl').value = '';
    document.getElementById('editQImageFile').value = '';
  });

  function readQuestionDraftFromForm() {
    const question = document.getElementById('editQText').value.trim();
    const options = [
      document.getElementById('editQOpt0').value.trim(),
      document.getElementById('editQOpt1').value.trim(),
      document.getElementById('editQOpt2').value.trim(),
      document.getElementById('editQOpt3').value.trim()
    ];
    const checkedRadio = document.querySelector('input[name="correctOpt"]:checked');
    const correctIndex = checkedRadio ? Number(checkedRadio.value) : 0;
    const explanation = document.getElementById('editQExplanation').value.trim();
    const stars = Math.max(1, Number(document.getElementById('editQStars').value) || 10);
    const image = document.getElementById('editQImageUrl').value.trim();
    const active = document.getElementById('editQActive').checked;

    return {
      id: document.getElementById('editQuestionId').value || ('q_' + Date.now()),
      question,
      options,
      correctIndex,
      explanation,
      stars,
      image,
      active
    };
  }

  document.getElementById('btnPreviewDraftQuestion').addEventListener('click', () => {
    const draft = readQuestionDraftFromForm();
    if (!draft.question) return;
    openPreviewQuizModal(draft, 0);
  });

  document.getElementById('btnSaveQuestion').addEventListener('click', () => {
    const draft = readQuestionDraftFromForm();
    if (!draft.question || draft.options.some(o => !o)) return;

    const list = Store.getStageQuestions(adminSelectedStageId);
    const existingIdx = list.findIndex(item => item.id === draft.id);
    if (existingIdx >= 0) {
      list[existingIdx] = draft;
    } else {
      list.push(draft);
    }
    Store.saveStageQuestions(adminSelectedStageId, list);
    document.getElementById('adminQuestionFormBox').classList.add('hidden');
    renderAdminQuestions();
  });

  document.getElementById('btnExportJson').addEventListener('click', () => {
    const list = Store.getStageQuestions(adminSelectedStageId);
    const blob = new Blob([JSON.stringify(list, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `buu_library_questions_${adminSelectedStageId}.json`;
    a.click();
    URL.revokeObjectURL(url);
  });

  document.getElementById('inputImportJson').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target.result);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const sanitized = parsed.map((item, i) => ({
            id: item.id || `imp_${Date.now()}_${i}`,
            active: item.active !== false,
            stars: Number(item.stars) || 10,
            image: item.image || '',
            question: String(item.question || ''),
            options: Array.isArray(item.options) && item.options.length === 4
              ? item.options.map(String)
              : ['ตัวเลือก 1', 'ตัวเลือก 2', 'ตัวเลือก 3', 'ตัวเลือก 4'],
            correctIndex: Number(item.correctIndex) || 0,
            explanation: String(item.explanation || '')
          }));
          Store.saveStageQuestions(adminSelectedStageId, sanitized);
          renderAdminQuestions();
        }
      } catch (err) {
        showCustomConfirm({
          icon: '❌',
          title: 'ไฟล์ JSON ไม่ถูกต้อง',
          message: 'ไม่สามารถอ่านข้อมูลคำถามจากไฟล์ที่เลือกได้'
        });
      }
      e.target.value = '';
    };
    reader.readAsText(file);
  });

  document.getElementById('btnResetStageQuestions').addEventListener('click', () => {
    showCustomConfirm({
      title: 'คืนค่าคำถามเริ่มต้นของด่านนี้',
      message: 'ต้องการรีเซ็ตคำถามทั้งหมดในด่านนี้กลับเป็นค่าเริ่มต้นใช่หรือไม่?',
      onConfirm: () => {
        const defaults = createDefaultQuestions();
        const fallback = defaults[adminSelectedStageId] || defaults.stage_1;
        Store.saveStageQuestions(adminSelectedStageId, JSON.parse(JSON.stringify(fallback)));
        renderAdminQuestions();
      }
    });
  });

  // Boot Index Page
  window.addEventListener('DOMContentLoaded', () => {
    populateStartStageDropdown();
    const session = Store.getActiveSession();
    if (session && session.playerName && !Store.isNameTaken(session.playerName)) {
      nameInput.value = session.playerName;
    }
    validateStartNameInput();
    requestAnimationFrame(renderStartPreview);
  });
})();
