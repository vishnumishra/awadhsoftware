// One-off asset pipeline: copies the design-bundle PNGs into public/images,
// converting the heavy photos/screenshots to WebP. Logos and line-art stay PNG.
// Usage: node scripts/optimize-images.mjs <path-to-design-bundle-assets>
import sharp from 'sharp';
import { mkdir, copyFile } from 'node:fs/promises';
import path from 'node:path';

const src = process.argv[2];
if (!src) {
  console.error('usage: node scripts/optimize-images.mjs <assets-dir>');
  process.exit(1);
}
const out = path.resolve('public/images');
await mkdir(out, { recursive: true });

// name -> { webp?: quality, maxWidth? }
const PLAN = {
  'hero-fade': { webp: 82, maxWidth: 1672 },
  'about-ayodhya': { webp: 84 },
  'team': { webp: 84 },
  'cta-banner': { webp: 80 },
  'case-ayodhyadham': { webp: 80, maxWidth: 1400 },
  'case-freeup': { webp: 80, maxWidth: 1400 },
  'case-adventureamore': { webp: 80, maxWidth: 1400 },
  'icon3d-web': { webp: 88, maxWidth: 256 },
  'icon3d-mobile': { webp: 88, maxWidth: 256 },
  'icon3d-ai': { webp: 88, maxWidth: 256 },
  'icon3d-chat': { webp: 88, maxWidth: 256 },
  'icon3d-mkt': { webp: 88, maxWidth: 256 },
  'icon3d-seo': { webp: 88, maxWidth: 256 },
  'footer-lineart': { copy: true },
  'awadh-logo': { copy: true },
  'awadh-logo-light': { copy: true },
};

for (const [name, opts] of Object.entries(PLAN)) {
  const from = path.join(src, `${name}.png`);
  if (opts.copy) {
    await copyFile(from, path.join(out, `${name}.png`));
    console.log('copied', name);
    continue;
  }
  let img = sharp(from);
  if (opts.maxWidth) img = img.resize({ width: opts.maxWidth, withoutEnlargement: true });
  const info = await img.webp({ quality: opts.webp, alphaQuality: 90 }).toFile(path.join(out, `${name}.webp`));
  console.log('webp', name, `${info.width}x${info.height}`, `${Math.round(info.size / 1024)}K`);
}

// Open Graph image: 1200x630 crop of the hero photo over the navy brand colour.
const og = await sharp(path.join(src, 'hero-fade.png'))
  .resize({ width: 1200, height: 630, fit: 'cover', position: 'right' })
  .flatten({ background: '#021532' })
  .jpeg({ quality: 84 })
  .toFile(path.join(out, 'og.jpg'));
console.log('og', `${og.width}x${og.height}`, `${Math.round(og.size / 1024)}K`);
