/* GPS Map Camera — vanilla JS PWA
 * Captures camera frames and burns a location stamp (mini map, address,
 * coordinates, timestamp) into the photo, like the classic GPS Map Camera app.
 */

'use strict';

// ---------- DOM ----------
const video = document.getElementById('video');
const stageMsg = document.getElementById('stageMsg');
const startBtn = document.getElementById('startBtn');
const flipBtn = document.getElementById('flipBtn');
const settingsBtn = document.getElementById('settingsBtn');
const settingsSheet = document.getElementById('settingsSheet');
const closeSettings = document.getElementById('closeSettings');
const shutterBtn = document.getElementById('shutterBtn');
const shareBtn = document.getElementById('shareBtn');
const gallery = document.getElementById('gallery');
const gpsPill = document.getElementById('gpsPill');
const gpsPillText = document.getElementById('gpsPillText');
const stampPreview = document.getElementById('stampPreview');
const stampMapCanvas = document.getElementById('stampMapCanvas');
const stampTitle = document.getElementById('stampTitle');
const stampAddress = document.getElementById('stampAddress');
const stampCoords = document.getElementById('stampCoords');
const stampTime = document.getElementById('stampTime');
const captureCanvas = document.getElementById('captureCanvas');

// ---------- State ----------
let stream = null;
let facingMode = 'environment';
let watchId = null;
let fix = null;                 // last GeolocationPosition
let address = null;             // { title, full } from reverse geocoding
let lastGeocode = { lat: null, lon: null, at: 0 };
let lastPhotoBlob = null;
let mapTiles = [];              // decoded tile images for the mini map
let mapTilesKey = '';           // cache key "z/x/y" of the centre tile

const MAP_ZOOM = 16;
const TILE = 256;
const GEOCODE_MIN_INTERVAL_MS = 30_000;
const GEOCODE_MIN_MOVE_M = 40;

// ---------- Settings (persisted) ----------
const defaults = {
  map: true, address: true, coords: true, time: true,
  altitude: false, coordFmt: 'dd', note: '',
};
const settings = { ...defaults, ...JSON.parse(localStorage.getItem('gmc-settings') || '{}') };

const optEls = {
  map: document.getElementById('optMap'),
  address: document.getElementById('optAddress'),
  coords: document.getElementById('optCoords'),
  time: document.getElementById('optTime'),
  altitude: document.getElementById('optAltitude'),
  coordFmt: document.getElementById('optCoordFmt'),
  note: document.getElementById('optNote'),
};

function loadSettingsUI() {
  optEls.map.checked = settings.map;
  optEls.address.checked = settings.address;
  optEls.coords.checked = settings.coords;
  optEls.time.checked = settings.time;
  optEls.altitude.checked = settings.altitude;
  optEls.coordFmt.value = settings.coordFmt;
  optEls.note.value = settings.note;
}

function saveSettings() {
  settings.map = optEls.map.checked;
  settings.address = optEls.address.checked;
  settings.coords = optEls.coords.checked;
  settings.time = optEls.time.checked;
  settings.altitude = optEls.altitude.checked;
  settings.coordFmt = optEls.coordFmt.value;
  settings.note = optEls.note.value.trim();
  localStorage.setItem('gmc-settings', JSON.stringify(settings));
  renderStampPreview();
}

// ---------- Camera ----------
async function startCamera() {
  stopCamera();
  const constraints = {
    audio: false,
    video: {
      facingMode,
      width: { ideal: 1920 },
      height: { ideal: 1080 },
    },
  };
  stream = await navigator.mediaDevices.getUserMedia(constraints);
  video.srcObject = stream;
  video.classList.toggle('mirror', facingMode === 'user');
  await video.play();
}

function stopCamera() {
  if (stream) {
    stream.getTracks().forEach((t) => t.stop());
    stream = null;
  }
}

// ---------- Geolocation ----------
function startGeolocation() {
  if (!('geolocation' in navigator)) {
    setGpsState('err', 'No GPS support');
    return;
  }
  setGpsState('wait', 'Locating…');
  watchId = navigator.geolocation.watchPosition(onFix, onFixError, {
    enableHighAccuracy: true,
    maximumAge: 5_000,
    timeout: 20_000,
  });
}

function onFix(pos) {
  fix = pos;
  const acc = Math.round(pos.coords.accuracy);
  setGpsState('ok', `GPS ±${acc} m`);
  maybeReverseGeocode(pos.coords.latitude, pos.coords.longitude);
  loadMapTiles(pos.coords.latitude, pos.coords.longitude);
  renderStampPreview();
}

function onFixError(err) {
  const msg = { 1: 'Location denied', 2: 'Location unavailable', 3: 'GPS timeout' }[err.code] || 'GPS error';
  setGpsState('err', msg);
}

function setGpsState(state, text) {
  gpsPill.dataset.state = state;
  gpsPillText.textContent = text;
}

// ---------- Reverse geocoding (OpenStreetMap Nominatim) ----------
async function maybeReverseGeocode(lat, lon) {
  const now = Date.now();
  const moved = lastGeocode.lat === null
    ? Infinity
    : haversineM(lastGeocode.lat, lastGeocode.lon, lat, lon);
  if (now - lastGeocode.at < GEOCODE_MIN_INTERVAL_MS && moved < GEOCODE_MIN_MOVE_M) return;
  lastGeocode = { lat, lon, at: now };

  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`;
    const res = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!res.ok) throw new Error(`geocode HTTP ${res.status}`);
    const data = await res.json();
    const a = data.address || {};
    const locality = a.city || a.town || a.village || a.suburb || a.county || '';
    const region = a.state || '';
    const country = a.country || '';
    address = {
      title: [locality, region, country].filter(Boolean).join(', ') || 'Unknown location',
      full: data.display_name || '',
    };
  } catch {
    address = null; // stamp falls back to coordinates only
  }
  renderStampPreview();
}

function haversineM(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const s = Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
}

// ---------- Mini map (OSM tiles) ----------
function latLonToTile(lat, lon, z) {
  const n = 2 ** z;
  const x = ((lon + 180) / 360) * n;
  const latRad = (lat * Math.PI) / 180;
  const y = ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * n;
  return { x, y };
}

function loadTileImage(z, x, y) {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = `https://tile.openstreetmap.org/${z}/${x}/${y}.png`;
  });
}

async function loadMapTiles(lat, lon) {
  const { x, y } = latLonToTile(lat, lon, MAP_ZOOM);
  const cx = Math.floor(x);
  const cy = Math.floor(y);
  const key = `${MAP_ZOOM}/${cx}/${cy}`;
  if (key === mapTilesKey && mapTiles.length) return;
  mapTilesKey = key;

  // 3×3 tile block around the fix so the map can be centred on it.
  const jobs = [];
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      jobs.push(loadTileImage(MAP_ZOOM, cx + dx, cy + dy).then((img) => ({ img, dx, dy })));
    }
  }
  mapTiles = await Promise.all(jobs);
  renderStampPreview();
}

/** Draw the centred mini map (with pin) into ctx at (px, py, size). */
function drawMiniMap(ctx, px, py, size) {
  ctx.save();
  roundedRectPath(ctx, px, py, size, size, size * 0.08);
  ctx.clip();

  ctx.fillStyle = '#24314d';
  ctx.fillRect(px, py, size, size);

  if (fix && mapTiles.length) {
    const { x, y } = latLonToTile(fix.coords.latitude, fix.coords.longitude, MAP_ZOOM);
    const cx = Math.floor(x);
    const cy = Math.floor(y);
    // Offset (in px at tile scale) of the fix inside the centre tile.
    const fx = (x - cx) * TILE;
    const fy = (y - cy) * TILE;
    // We want the fix at the centre of the size×size viewport.
    for (const t of mapTiles) {
      if (!t.img) continue;
      const tx = px + size / 2 - fx + t.dx * TILE;
      const ty = py + size / 2 - fy + t.dy * TILE;
      try {
        ctx.drawImage(t.img, tx, ty, TILE, TILE);
      } catch { /* tainted/broken tile — keep placeholder background */ }
    }
    drawPin(ctx, px + size / 2, py + size / 2, size * 0.16);
  } else {
    ctx.fillStyle = '#9fb0c9';
    ctx.font = `${Math.round(size * 0.11)}px system-ui, sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillText('map loading…', px + size / 2, py + size / 2);
  }
  ctx.restore();

  // Border
  ctx.save();
  roundedRectPath(ctx, px, py, size, size, size * 0.08);
  ctx.strokeStyle = 'rgba(255,255,255,0.85)';
  ctx.lineWidth = Math.max(1, size * 0.015);
  ctx.stroke();
  ctx.restore();
}

function drawPin(ctx, x, y, r) {
  ctx.save();
  // Teardrop pin: circle head + triangle tail, tip at (x, y).
  ctx.fillStyle = '#e5382f';
  ctx.beginPath();
  ctx.arc(x, y - r * 1.6, r, Math.PI * 0.85, Math.PI * 0.15);
  ctx.lineTo(x, y);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(x, y - r * 1.6, r * 0.42, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function roundedRectPath(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

// ---------- Formatting ----------
function fmtCoord(lat, lon) {
  if (settings.coordFmt === 'dms') return `${toDMS(lat, 'NS')} ${toDMS(lon, 'EW')}`;
  return `Lat ${lat.toFixed(6)}°, Long ${lon.toFixed(6)}°`;
}

function toDMS(deg, axis) {
  const dir = axis === 'NS' ? (deg >= 0 ? 'N' : 'S') : (deg >= 0 ? 'E' : 'W');
  const abs = Math.abs(deg);
  const d = Math.floor(abs);
  const mFloat = (abs - d) * 60;
  const m = Math.floor(mFloat);
  const s = ((mFloat - m) * 60).toFixed(1);
  return `${d}°${String(m).padStart(2, '0')}'${s}"${dir}`;
}

function fmtTimestamp(date) {
  const tz = -date.getTimezoneOffset();
  const sign = tz >= 0 ? '+' : '-';
  const tzh = String(Math.floor(Math.abs(tz) / 60)).padStart(2, '0');
  const tzm = String(Math.abs(tz) % 60).padStart(2, '0');
  const d = date.toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' });
  const t = date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  return `${d} ${t} GMT${sign}${tzh}:${tzm}`;
}

// ---------- Stamp preview (live, in the viewfinder) ----------
function renderStampPreview() {
  if (!stream) return;
  stampPreview.hidden = false;

  if (fix) {
    const { latitude, longitude, altitude, accuracy } = fix.coords;
    stampTitle.textContent = address ? address.title : 'Locating address…';
    stampAddress.textContent = address ? address.full : '';
    let coordLine = fmtCoord(latitude, longitude);
    if (settings.altitude) {
      const parts = [];
      if (altitude != null) parts.push(`Alt ${altitude.toFixed(0)} m`);
      parts.push(`±${Math.round(accuracy)} m`);
      coordLine += `  •  ${parts.join(' ')}`;
    }
    stampCoords.textContent = coordLine;
  } else {
    stampTitle.textContent = 'Locating…';
    stampAddress.textContent = 'Waiting for GPS fix';
    stampCoords.textContent = '—';
  }
  stampTime.textContent = fmtTimestamp(new Date());

  stampAddress.hidden = !settings.address;
  stampCoords.hidden = !settings.coords;
  stampTime.hidden = !settings.time;
  stampMapCanvas.style.display = settings.map ? '' : 'none';

  const mctx = stampMapCanvas.getContext('2d');
  mctx.clearRect(0, 0, stampMapCanvas.width, stampMapCanvas.height);
  drawMiniMap(mctx, 0, 0, stampMapCanvas.width);
}

setInterval(() => { if (stream) renderStampPreview(); }, 1000);

// ---------- Capture ----------
function capture() {
  if (!stream) return;
  const w = video.videoWidth;
  const h = video.videoHeight;
  if (!w || !h) return;

  captureCanvas.width = w;
  captureCanvas.height = h;
  const ctx = captureCanvas.getContext('2d');
  ctx.drawImage(video, 0, 0, w, h);

  drawStamp(ctx, w, h);

  captureCanvas.toBlob((blob) => {
    if (!blob) return;
    lastPhotoBlob = blob;
    shareBtn.disabled = !(navigator.canShare && navigator.canShare({ files: [blobToFile(blob)] }));
    downloadBlob(blob);
    addToGallery(blob);
  }, 'image/jpeg', 0.92);

  video.classList.remove('flash');
  void video.offsetWidth; // restart animation
  video.classList.add('flash');
}

/** Burn the location stamp card into the bottom of the photo. */
function drawStamp(ctx, w, h) {
  const now = new Date();
  const pad = Math.round(w * 0.02);
  const cardPad = Math.round(w * 0.018);
  const mapSize = settings.map ? Math.round(w * 0.17) : 0;
  const titleSize = Math.round(w * 0.028);
  const lineSize = Math.round(w * 0.02);
  const lineGap = Math.round(lineSize * 0.55);
  const brandSize = Math.round(w * 0.016);

  // Compose text lines
  const lines = [];
  const lat = fix?.coords.latitude;
  const lon = fix?.coords.longitude;
  const title = fix ? (address ? address.title : 'Address unavailable') : 'Location unavailable';
  if (settings.address && address?.full) lines.push(address.full);
  if (settings.coords && fix) {
    lines.push(fmtCoord(lat, lon));
    if (settings.altitude) {
      const parts = [];
      if (fix.coords.altitude != null) parts.push(`Altitude ${fix.coords.altitude.toFixed(0)} m`);
      parts.push(`Accuracy ±${Math.round(fix.coords.accuracy)} m`);
      lines.push(parts.join('  •  '));
    }
  }
  if (settings.time) lines.push(fmtTimestamp(now));
  if (settings.note) lines.push(settings.note);

  const textH = titleSize + lines.length * (lineSize + lineGap) + brandSize + lineGap;
  const cardH = Math.max(mapSize, textH) + cardPad * 2;
  const cardW = w - pad * 2;
  const cardX = pad;
  const cardY = h - pad - cardH;

  // Card background
  ctx.save();
  roundedRectPath(ctx, cardX, cardY, cardW, cardH, Math.round(w * 0.012));
  ctx.fillStyle = 'rgba(8, 12, 22, 0.68)';
  ctx.fill();
  ctx.restore();

  // Mini map
  let textX = cardX + cardPad;
  if (settings.map) {
    drawMiniMap(ctx, cardX + cardPad, cardY + (cardH - mapSize) / 2, mapSize);
    textX += mapSize + cardPad;
  }

  // Text
  const maxTextW = cardX + cardW - cardPad - textX;
  ctx.save();
  ctx.textBaseline = 'top';
  ctx.textAlign = 'left';
  ctx.shadowColor = 'rgba(0,0,0,0.6)';
  ctx.shadowBlur = 3;

  let ty = cardY + (cardH - textH) / 2;
  ctx.fillStyle = '#ffffff';
  ctx.font = `700 ${titleSize}px system-ui, sans-serif`;
  ctx.fillText(fitText(ctx, title, maxTextW), textX, ty);
  ty += titleSize + lineGap;

  ctx.fillStyle = '#e8edf7';
  ctx.font = `400 ${lineSize}px system-ui, sans-serif`;
  for (const line of lines) {
    ctx.fillText(fitText(ctx, line, maxTextW), textX, ty);
    ty += lineSize + lineGap;
  }

  ctx.fillStyle = 'rgba(255,255,255,0.55)';
  ctx.font = `600 ${brandSize}px system-ui, sans-serif`;
  ctx.fillText('GPS Map Camera', textX, ty);
  ctx.restore();
}

function fitText(ctx, text, maxW) {
  if (ctx.measureText(text).width <= maxW) return text;
  let t = text;
  while (t.length > 1 && ctx.measureText(t + '…').width > maxW) t = t.slice(0, -1);
  return t + '…';
}

// ---------- Output ----------
function blobToFile(blob) {
  const stampName = `GPS-Photo-${new Date().toISOString().replace(/[:.]/g, '-')}.jpg`;
  return new File([blob], stampName, { type: 'image/jpeg' });
}

function downloadBlob(blob) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = blobToFile(blob).name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 30_000);
}

function addToGallery(blob) {
  const img = document.createElement('img');
  const url = URL.createObjectURL(blob);
  img.src = url;
  img.alt = 'Captured photo';
  img.addEventListener('click', () => window.open(url, '_blank'));
  gallery.prepend(img);
  while (gallery.children.length > 12) {
    const last = gallery.lastElementChild;
    URL.revokeObjectURL(last.src);
    last.remove();
  }
}

async function shareLast() {
  if (!lastPhotoBlob || !navigator.canShare) return;
  const file = blobToFile(lastPhotoBlob);
  if (!navigator.canShare({ files: [file] })) return;
  try {
    await navigator.share({ files: [file], title: 'GPS Photo' });
  } catch { /* user cancelled */ }
}

// ---------- Wiring ----------
startBtn.addEventListener('click', async () => {
  startBtn.disabled = true;
  try {
    await startCamera();
    stageMsg.hidden = true;
    shutterBtn.disabled = false;
    startGeolocation();
    renderStampPreview();
  } catch (err) {
    startBtn.disabled = false;
    alert(`Could not start camera: ${err.message}\n\nMake sure you are on HTTPS (or localhost) and camera permission is allowed.`);
  }
});

flipBtn.addEventListener('click', async () => {
  if (!stream) return;
  facingMode = facingMode === 'environment' ? 'user' : 'environment';
  try {
    await startCamera();
  } catch {
    facingMode = facingMode === 'environment' ? 'user' : 'environment';
    await startCamera().catch(() => {});
  }
});

shutterBtn.addEventListener('click', capture);
shareBtn.addEventListener('click', shareLast);

settingsBtn.addEventListener('click', () => {
  loadSettingsUI();
  settingsSheet.showModal();
});
closeSettings.addEventListener('click', () => {
  saveSettings();
  settingsSheet.close();
});

document.addEventListener('visibilitychange', () => {
  // Free the camera when backgrounded; resume when visible again.
  if (document.hidden) {
    stopCamera();
  } else if (stageMsg.hidden && !stream) {
    startCamera().catch(() => {});
  }
});

loadSettingsUI();

// ---------- PWA ----------
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  });
}
