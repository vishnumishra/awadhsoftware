# GPS Map Camera (PWA)

A web-based GPS Map Camera: take photos with your live location **burned into
the image** — mini map, address, coordinates, timestamp, altitude/accuracy and
an optional custom note. Works on Android, iPhone and desktop from a single
codebase, and can be installed to the home screen like a native app.

## Features

- **Live camera viewfinder** (back/front camera switch) via `getUserMedia`
- **Real-time GPS** with accuracy indicator via the Geolocation API
- **Reverse geocoding** (address lookup) using OpenStreetMap Nominatim
- **Mini map stamp** rendered from OpenStreetMap tiles with a location pin,
  centred on your position
- **Location stamp burned into the photo** (not just overlaid on screen):
  place title, full address, coordinates (decimal or DMS), date/time with
  timezone, optional altitude & accuracy, optional custom note
- **Capture → auto-download** as JPEG, session gallery strip, and native
  **share sheet** support (Web Share API) where available
- **Configurable stamp** — toggle each element; settings persist in
  `localStorage`
- **PWA**: installable, app-shell cached offline by a service worker

## Running it

Camera and GPS require a **secure context** — HTTPS or `localhost`.

Local test:

```bash
cd gps-map-camera
python3 -m http.server 8000
# open http://localhost:8000
```

To test from a phone, deploy anywhere that serves HTTPS (GitHub Pages,
Netlify, Vercel, Cloudflare Pages — all free, no build step needed since this
is plain HTML/CSS/JS).

### Deploying to GitHub Pages

Enable Pages for the repo (Settings → Pages → deploy from branch), then open
`https://<user>.github.io/<repo>/gps-map-camera/` on your phone and use the
browser's "Add to Home screen".

## How the stamp works

1. On capture, the current video frame is drawn to a canvas at full camera
   resolution.
2. A semi-transparent card is drawn along the bottom: a 3×3 block of OSM
   tiles is composited and cropped so your exact position sits under the pin,
   and the address/coordinate/time lines are laid out beside it.
3. The canvas is encoded to JPEG (92% quality) and downloaded / shared.

Because the stamp is part of the pixels, it survives uploads, messengers and
screenshots — the same guarantee the native GPS Map Camera apps give.

## External services

| Service | Used for | Notes |
|---|---|---|
| `tile.openstreetmap.org` | Mini-map tiles | Subject to the [OSM tile usage policy](https://operations.osmfoundation.org/policies/tiles/); for heavy production traffic switch to a commercial tile provider (MapTiler, Thunderforest, etc.) |
| `nominatim.openstreetmap.org` | Reverse geocoding | Rate-limited (1 req/s); the app throttles lookups to once per 30 s or 40 m of movement. For production use a paid geocoder (LocationIQ, OpenCage, Google) |

No data is sent anywhere else. Photos never leave the device unless you share
them.

## Browser support

Chrome/Edge/Samsung Internet on Android, Safari on iOS 15+, and all modern
desktop browsers. iOS Safari does not support the `install` banner but "Add
to Home Screen" works.

## Project structure

```
gps-map-camera/
├── index.html            UI: viewfinder, stamp preview, controls, settings
├── styles.css            Dark camera-style UI
├── app.js                Camera, GPS, geocoding, map tiles, stamp renderer
├── manifest.webmanifest  PWA install metadata
├── sw.js                 Offline app-shell service worker
└── icon.svg              App icon
```
