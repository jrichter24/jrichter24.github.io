// Regenerate the optimized hero assets from the source art.
// Usage: node scripts/optimize-hero.mjs <source.png>
import sharp from 'sharp';

const src = process.argv[2] ?? 'temp_assets/me_abstract_areas.png';

await sharp(src)
  .resize({ width: 1448, withoutEnlargement: true })
  .webp({ quality: 80 })
  .toFile('public/me_abstract_areas.webp');

await sharp(src)
  .resize({ width: 1200, withoutEnlargement: true })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile('public/me_abstract_areas.jpg');

const info = (f) => sharp(f).metadata();
for (const f of ['public/me_abstract_areas.webp', 'public/me_abstract_areas.jpg']) {
  const m = await info(f);
  console.log(f, `${m.width}x${m.height}`, m.format);
}
console.log('done');
