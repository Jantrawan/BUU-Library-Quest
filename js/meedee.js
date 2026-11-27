/* =========================================================================
 * CUTE 3D-STYLED MEEDEE CHARACTER RENDERER
 * (Procedural HTML5 Canvas Vector Graphics - No external PNG required)
 * ========================================================================= */
function drawMeedee(ctx, opts) {
  const {
    x, y, width, height,
    facing = 1,
    anim = 'idle',
    emotion = 'normal',
    time = 0,
    hasMagnifier = false,
    invulnFlash = false
  } = opts;

  if (invulnFlash && Math.floor(time * 18) % 2 === 0) {
    ctx.save();
    ctx.globalAlpha = 0.45;
  } else {
    ctx.save();
  }

  let bobY = 0;
  let squashX = 1;
  let squashY = 1;
  let tiltAngle = 0;
  let leftFootOffset = { x: 0, y: 0 };
  let rightFootOffset = { x: 0, y: 0 };
  let bookBobY = 0;
  let armRaise = 0;

  if (anim === 'idle') {
    bobY = Math.sin(time * 4.2) * 2.5;
    squashY = 1 + Math.sin(time * 4.2) * 0.025;
    squashX = 1 - Math.sin(time * 4.2) * 0.02;
    bookBobY = Math.sin(time * 4.2 - 0.6) * 2;
  } else if (anim === 'walk') {
    const cycle = time * 10;
    bobY = -Math.abs(Math.sin(cycle)) * 3.5;
    tiltAngle = facing * 0.05;
    leftFootOffset.x = Math.sin(cycle) * 6;
    leftFootOffset.y = Math.min(0, Math.cos(cycle) * 4);
    rightFootOffset.x = -Math.sin(cycle) * 6;
    rightFootOffset.y = Math.min(0, -Math.cos(cycle) * 4);
    bookBobY = Math.sin(cycle * 2) * 1.8;
  } else if (anim === 'run') {
    const cycle = time * 16;
    bobY = -Math.abs(Math.sin(cycle)) * 5;
    tiltAngle = facing * 0.13;
    squashX = 1.04;
    squashY = 0.96;
    leftFootOffset.x = Math.sin(cycle) * 9;
    leftFootOffset.y = Math.min(0, Math.cos(cycle) * 6);
    rightFootOffset.x = -Math.sin(cycle) * 9;
    rightFootOffset.y = Math.min(0, -Math.cos(cycle) * 6);
    bookBobY = Math.sin(cycle * 2) * 2.5;
  } else if (anim === 'jump') {
    squashX = 0.91;
    squashY = 1.1;
    leftFootOffset.y = 3;
    rightFootOffset.y = -2;
    armRaise = -4;
    bookBobY = -3;
  } else if (anim === 'fall') {
    squashX = 0.95;
    squashY = 1.06;
    leftFootOffset.y = -3;
    rightFootOffset.y = 2;
    armRaise = -6;
    bookBobY = -4;
  } else if (anim === 'happy') {
    bobY = -Math.abs(Math.sin(time * 12)) * 8;
    squashY = 1 + Math.sin(time * 12) * 0.06;
    armRaise = -5;
  } else if (anim === 'hurt') {
    tiltAngle = -facing * 0.18;
    bobY = Math.sin(time * 28) * 2;
  }

  const cx = x + width / 2;
  const bottomY = y + height;

  // Ground shadow
  ctx.fillStyle = 'rgba(28, 12, 54, 0.28)';
  ctx.beginPath();
  ctx.ellipse(cx, bottomY - 1, width * 0.36, 5.5, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.translate(cx, bottomY + bobY);
  ctx.rotate(tiltAngle);
  ctx.scale(facing * squashX, squashY);

  const s = height / 88;
  ctx.scale(s, s);

  const draw3DPill = (px, py, pw, ph, r, cLight, cMid, cDark) => {
    const grad = ctx.createLinearGradient(px, py, px + pw, py + ph);
    grad.addColorStop(0, cLight);
    grad.addColorStop(0.55, cMid);
    grad.addColorStop(1, cDark);
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.roundRect(px, py, pw, ph, r);
    ctx.fill();
  };

  // 1. FEET & YELLOW ANKLE CUFFS
  ctx.save();
  ctx.translate(-9 + leftFootOffset.x, -9 + leftFootOffset.y);
  draw3DPill(-8, -7, 16, 10, 5, '#FACC15', '#EAB308', '#CA8A04');
  draw3DPill(-9, -3, 19, 12, 6, '#FFFFFF', '#F1F5F9', '#CBD5E1');
  ctx.restore();

  ctx.save();
  ctx.translate(10 + rightFootOffset.x, -8 + rightFootOffset.y);
  draw3DPill(-8, -7, 16, 10, 5, '#FACC15', '#EAB308', '#CA8A04');
  draw3DPill(-8, -3, 20, 12, 6, '#FFFFFF', '#F8FAFC', '#CBD5E1');
  ctx.restore();

  // 2. CHUBBY PURPLE 3D TORSO & BACKPACK STRAPS
  draw3DPill(-18, -39, 36, 27, 13, '#A855F7', '#7E22CE', '#581C87');
  ctx.fillStyle = 'rgba(255,255,255,0.22)';
  ctx.beginPath();
  ctx.ellipse(-6, -30, 6, 9, -0.3, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 4.2;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(-13, -39);
  ctx.quadraticCurveTo(-17, -30, -12, -23);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(11, -39);
  ctx.quadraticCurveTo(15, -30, 10, -23);
  ctx.stroke();

  // Yellow Neck Collar Ring
  draw3DPill(-16, -42, 32, 6.5, 3.2, '#FEF08A', '#FACC15', '#CA8A04');

  // 3. LARGE ROUND 3D HELMET HEAD
  const headCenterY = -62;
  const headRx = 26;
  const headRy = 22.5;

  // Far ear-horn & headphone cup
  ctx.save();
  ctx.translate(22, headCenterY - 8);
  ctx.rotate(0.16);
  draw3DPill(-4, -15, 8, 17, 4, '#FEF08A', '#FACC15', '#CA8A04');
  ctx.restore();
  draw3DPill(18, headCenterY - 6, 9, 15, 4.5, '#9333EA', '#6B21A8', '#4C1D95');
  draw3DPill(22, headCenterY - 3, 5.5, 9, 2.8, '#FEF08A', '#FACC15', '#EAB308');

  // Main Helmet Sphere
  const helmetGrad = ctx.createRadialGradient(-7, headCenterY - 10, 4, 0, headCenterY, 28);
  helmetGrad.addColorStop(0, '#C084FC');
  helmetGrad.addColorStop(0.5, '#7E22CE');
  helmetGrad.addColorStop(1, '#4C1D95');
  ctx.fillStyle = helmetGrad;
  ctx.beginPath();
  ctx.ellipse(0, headCenterY, headRx, headRy, 0, 0, Math.PI * 2);
  ctx.fill();

  // Dark Charcoal Top Center Stripe
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(0, headCenterY, headRx, headRy, 0, 0, Math.PI * 2);
  ctx.clip();
  const stripeGrad = ctx.createLinearGradient(0, headCenterY - 23, 0, headCenterY - 8);
  stripeGrad.addColorStop(0, '#475569');
  stripeGrad.addColorStop(1, '#1E293B');
  ctx.fillStyle = stripeGrad;
  ctx.beginPath();
  ctx.moveTo(-5, headCenterY - 24);
  ctx.lineTo(7, headCenterY - 24);
  ctx.lineTo(5, headCenterY - 10);
  ctx.lineTo(-3, headCenterY - 10);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // Glossy top highlight
  ctx.fillStyle = 'rgba(255, 255, 255, 0.28)';
  ctx.beginPath();
  ctx.ellipse(-8, headCenterY - 14, 9, 4, -0.25, 0, Math.PI * 2);
  ctx.fill();

  // Silver Visor Frame
  const visorGrad = ctx.createLinearGradient(-18, headCenterY - 10, 18, headCenterY + 16);
  visorGrad.addColorStop(0, '#F1F5F9');
  visorGrad.addColorStop(0.5, '#CBD5E1');
  visorGrad.addColorStop(1, '#94A3B8');
  ctx.fillStyle = visorGrad;
  ctx.beginPath();
  ctx.roundRect(-17.5, headCenterY - 9, 37, 25, 12.5);
  ctx.fill();

  // Inner Lavender Face Screen
  const faceGrad = ctx.createRadialGradient(2, headCenterY + 2, 2, 2, headCenterY + 3, 18);
  faceGrad.addColorStop(0, '#C084FC');
  faceGrad.addColorStop(1, '#9333EA');
  ctx.fillStyle = faceGrad;
  ctx.beginPath();
  ctx.roundRect(-14.5, headCenterY - 6.5, 31, 20, 10);
  ctx.fill();

  // 4. EXPRESSIVE EYES & MOUTH
  const eyeY = headCenterY + 1.5;
  if (emotion === 'happy') {
    ctx.strokeStyle = '#1E1B4B';
    ctx.lineWidth = 2.6;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.arc(-5.5, eyeY + 1, 4.2, Math.PI * 1.1, Math.PI * 1.9);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(8.5, eyeY + 1, 4.2, Math.PI * 1.1, Math.PI * 1.9);
    ctx.stroke();

    ctx.fillStyle = 'rgba(244, 114, 182, 0.55)';
    ctx.beginPath();
    ctx.ellipse(-9, eyeY + 4.5, 3, 1.8, 0, 0, Math.PI * 2);
    ctx.ellipse(12, eyeY + 4.5, 3, 1.8, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#4C0519';
    ctx.beginPath();
    ctx.arc(1.5, eyeY + 5.5, 4.8, 0, Math.PI);
    ctx.fill();
    ctx.fillStyle = '#FB7185';
    ctx.beginPath();
    ctx.arc(1.5, eyeY + 8, 2.8, Math.PI, 0);
    ctx.fill();
  } else if (emotion === 'sad') {
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.ellipse(-5, eyeY, 4.4, 5, 0, 0, Math.PI * 2);
    ctx.ellipse(8.5, eyeY, 4.4, 5, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#1E1B4B';
    ctx.beginPath();
    ctx.arc(-4.5, eyeY + 1, 2.8, 0, Math.PI * 2);
    ctx.arc(9, eyeY + 1, 2.8, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#3B0764';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-9, eyeY - 4);
    ctx.lineTo(-2, eyeY - 6);
    ctx.moveTo(5, eyeY - 6);
    ctx.lineTo(12, eyeY - 4);
    ctx.stroke();

    ctx.strokeStyle = '#4C0519';
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.arc(1.8, eyeY + 10.5, 3.8, Math.PI * 1.15, Math.PI * 1.85);
    ctx.stroke();

    const tearDrop = (time * 18) % 10;
    ctx.fillStyle = '#38BDF8';
    ctx.beginPath();
    ctx.arc(-7.5, eyeY + 4 + tearDrop * 0.6, 2.2, 0, Math.PI * 2);
    ctx.arc(11, eyeY + 4 + ((tearDrop + 5) % 10) * 0.6, 2.2, 0, Math.PI * 2);
    ctx.fill();
  } else {
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.ellipse(-4.8, eyeY, 4.6, 5.4, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#1E1B4B';
    ctx.beginPath();
    ctx.ellipse(-4.2, eyeY + 0.5, 3.1, 3.8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(-5.3, eyeY - 1.2, 1.3, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.ellipse(8.2, eyeY, 4.6, 5.4, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#1E1B4B';
    ctx.beginPath();
    ctx.ellipse(8.8, eyeY + 0.5, 3.1, 3.8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(7.7, eyeY - 1.2, 1.3, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#4C0519';
    ctx.beginPath();
    ctx.arc(1.8, eyeY + 6.2, 3.8, 0, Math.PI);
    ctx.fill();
    ctx.fillStyle = '#F472B6';
    ctx.beginPath();
    ctx.arc(1.8, eyeY + 8.3, 2.1, Math.PI, 0);
    ctx.fill();
  }

  // 5. LEFT HEADPHONE & TALL YELLOW EAR-HORN
  ctx.save();
  ctx.translate(-22, headCenterY - 2);
  ctx.save();
  ctx.translate(0, -6);
  ctx.rotate(-0.14);
  draw3DPill(-4.5, -18, 9, 20, 4.5, '#FEF08A', '#FACC15', '#CA8A04');
  ctx.restore();
  draw3DPill(-7, -8, 14, 17, 7, '#475569', '#1E293B', '#0F172A');
  draw3DPill(-6, -7, 12, 15, 6, '#A855F7', '#7E22CE', '#581C87');
  draw3DPill(-4.5, -4, 7, 9, 3.5, '#FEF08A', '#FACC15', '#EAB308');
  ctx.restore();

  // 6. ARMS, HANDS & OPEN PURPLE BOOK
  ctx.save();
  ctx.translate(0, bookBobY + armRaise);

  draw3DPill(12, -31, 9, 7, 3.5, '#FEF08A', '#FACC15', '#CA8A04');
  draw3DPill(17, -32, 9, 9, 4.5, '#FFFFFF', '#F1F5F9', '#CBD5E1');

  ctx.save();
  ctx.translate(11, -27);
  ctx.fillStyle = '#FEFCE8';
  ctx.beginPath();
  ctx.moveTo(-10, -7);
  ctx.quadraticCurveTo(0, -11, 12, -8);
  ctx.lineTo(12, 5);
  ctx.quadraticCurveTo(0, 2, -10, 6);
  ctx.closePath();
  ctx.fill();

  const bookGrad = ctx.createLinearGradient(-11, -5, 13, 8);
  bookGrad.addColorStop(0, '#7E22CE');
  bookGrad.addColorStop(1, '#4C1D95');
  ctx.fillStyle = bookGrad;
  ctx.beginPath();
  ctx.moveTo(-11, -5);
  ctx.lineTo(1, -2);
  ctx.lineTo(13, -6);
  ctx.lineTo(13, 7);
  ctx.lineTo(1, 11);
  ctx.lineTo(-11, 7);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 1.2;
  ctx.strokeRect(4, -1, 5, 4);
  ctx.restore();

  draw3DPill(-17, -34, 15, 10, 5, '#9333EA', '#7E22CE', '#581C87');
  draw3DPill(-5, -34, 7, 10, 3.5, '#FEF08A', '#FACC15', '#CA8A04');
  draw3DPill(0, -34, 10, 10, 5, '#FFFFFF', '#F8FAFC', '#CBD5E1');

  // Stage 1 Special Prop: Detective Magnifying Glass
  if (hasMagnifier) {
    ctx.save();
    ctx.translate(21, -37);
    ctx.rotate(-0.35 + Math.sin(time * 5) * 0.08);
    draw3DPill(-2, 4, 4, 11, 2, '#92400E', '#78350F', '#451A03');
    ctx.strokeStyle = '#FACC15';
    ctx.lineWidth = 3;
    ctx.fillStyle = 'rgba(186, 230, 253, 0.65)';
    ctx.beginPath();
    ctx.arc(0, -2, 7.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.arc(-2, -4, 3.5, Math.PI * 1.1, Math.PI * 1.6);
    ctx.stroke();
    ctx.restore();
  }

  ctx.restore();
  ctx.restore();
}
