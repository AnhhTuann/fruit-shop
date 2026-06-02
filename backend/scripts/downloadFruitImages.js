/**
 * Script tải ảnh trái cây về local dùng Unsplash Source API.
 * Không cần API key. Chạy: node scripts/downloadFruitImages.js
 */
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const OUTPUT_DIR = path.resolve(__dirname, '../../frontend/public/fruits');

const formatFruitName = (name) =>
  name.toLowerCase().replace(/\s+/g, '-');

// Hardcode Unsplash photo IDs cho từng loại trái cây - ảnh đẹp, chất lượng cao
const UNSPLASH_MAP = {
  'Apple':              'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600&q=80',
  'GreenApple':         'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=600&q=80',
  'Apricot':            'https://images.unsplash.com/photo-1600423115367-87ea7661688f?w=600&q=80',
  'Avocado':            'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=600&q=80',
  'Banana':             'https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=600&q=80',
  'Blackberry':         'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=600&q=80',
  'Blueberry':          'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=600&q=80',
  'Cherry':             'https://images.unsplash.com/photo-1528821128474-27f963b062bf?w=600&q=80',
  'Cranberry':          'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&q=80',
  'Dragonfruit':        'https://images.unsplash.com/photo-1527325678964-54921661f888?w=600&q=80',
  'Durian':             'https://images.unsplash.com/photo-1568051243858-533a607809a5?w=600&q=80',
  'Feijoa':             'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=600&q=80',
  'Fig':                'https://images.unsplash.com/photo-1574870111867-089730e5a72b?w=600&q=80',
  'Gooseberry':         'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=600&q=80',
  'Grape':              'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=600&q=80',
  'Guava':              'https://images.unsplash.com/photo-1536511132770-e5058c7e8c46?w=600&q=80',
  'Hazelnut':           'https://images.unsplash.com/photo-1567892737950-30c4db39e5c7?w=600&q=80',
  'Jackfruit':          'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=600&q=80',
  'Kiwi':               'https://images.unsplash.com/photo-1585059895524-72359e06133a?w=600&q=80',
  'Kiwifruit':          'https://images.unsplash.com/photo-1585059895524-72359e06133a?w=600&q=80',
  'Lemon':              'https://images.unsplash.com/photo-1576173640926-8c900f983d87?w=600&q=80',
  'Lime':               'https://images.unsplash.com/photo-1590502593747-42a996133562?w=600&q=80',
  'Lingonberry':        'https://images.unsplash.com/photo-1563746098251-d35aef196e83?w=600&q=80',
  'Lychee':             'https://images.unsplash.com/photo-1617112848923-cc2234396a8d?w=600&q=80',
  'Mango':              'https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&q=80',
  'Mangosteen':         'https://images.unsplash.com/photo-1599598425947-5202edd56bdb?w=600&q=80',
  'Melon':              'https://images.unsplash.com/photo-1589927986089-35812388d1f4?w=600&q=80',
  'Morus':              'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&q=80',
  'Orange':             'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=600&q=80',
  'Papaya':             'https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?w=600&q=80',
  'Passionfruit':       'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=600&q=80',
  'Peach':              'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=600&q=80',
  'Pear':               'https://images.unsplash.com/photo-1541199249251-f713e6145474?w=600&q=80',
  'Persimmon':          'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=600&q=80',
  'Pineapple':          'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=600&q=80',
  'Pitahaya':           'https://images.unsplash.com/photo-1527325678964-54921661f888?w=600&q=80',
  'Plum':               'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=600&q=80',
  'Pomegranate':        'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&q=80',
  'Pomelo':             'https://images.unsplash.com/photo-1571575173940-46da53aeadfc?w=600&q=80',
  'Pumpkin':            'https://images.unsplash.com/photo-1570586437263-ab629fccc818?w=600&q=80',
  'Raspberry':          'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=600&q=80',
  'Strawberry':         'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=600&q=80',
  'Tangerine':          'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=600&q=80',
  'Tomato':             'https://images.unsplash.com/photo-1546470427-e5e5e2e25d11?w=600&q=80',
  'Watermelon':         'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&q=80',
  'Annona':             'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=600&q=80',
  'Ceylon Gooseberry':  'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&q=80',
  'Horned Melon':       'https://images.unsplash.com/photo-1571575173940-46da53aeadfc?w=600&q=80',
  'Japanese Persimmon': 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=600&q=80',
};

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=600&q=80';

function downloadImage(url, destPath, redirectCount = 0) {
  return new Promise((resolve, reject) => {
    if (redirectCount > 5) return reject(new Error('Too many redirects'));
    const file = fs.createWriteStream(destPath);
    const protocol = url.startsWith('https') ? https : http;
    const request = protocol.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (response) => {
      if ([301, 302, 307, 308].includes(response.statusCode)) {
        file.close();
        try { fs.unlinkSync(destPath); } catch {}
        return downloadImage(response.headers.location, destPath, redirectCount + 1).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        file.close();
        try { fs.unlinkSync(destPath); } catch {}
        return reject(new Error(`HTTP ${response.statusCode}`));
      }
      response.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
      file.on('error', (err) => { fs.unlink(destPath, () => {}); reject(err); });
    });
    request.on('error', (err) => { fs.unlink(destPath, () => {}); reject(err); });
    request.setTimeout(20000, () => { request.destroy(); fs.unlink(destPath, () => {}); reject(new Error('Timeout')); });
  });
}

async function main() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`📁 Created: ${OUTPUT_DIR}`);
  }

  const fruits = Object.keys(UNSPLASH_MAP);
  console.log(`🎨 Downloading ${fruits.length} curated Unsplash fruit images...\n`);

  let success = 0, failed = 0, skipped = 0;

  for (let i = 0; i < fruits.length; i++) {
    const fruitName = fruits[i];
    const formattedName = formatFruitName(fruitName);
    const destPath = path.join(OUTPUT_DIR, `${formattedName}.jpg`);

    if (fs.existsSync(destPath) && fs.statSync(destPath).size > 5000) {
      console.log(`⏭  [${i+1}/${fruits.length}] Skip: ${fruitName}`);
      success++; skipped++;
      continue;
    }

    const imageUrl = UNSPLASH_MAP[fruitName] || DEFAULT_IMAGE;
    process.stdout.write(`📥 [${i+1}/${fruits.length}] ${fruitName} ... `);
    try {
      await downloadImage(imageUrl, destPath);
      const sizeKb = (fs.statSync(destPath).size / 1024).toFixed(1);
      console.log(`✅ ${sizeKb} KB`);
      success++;
      await new Promise(r => setTimeout(r, 100));
    } catch (err) {
      console.log(`❌ ${err.message}`);
      failed++;
    }
  }

  // Tạo default fallback image
  const defaultPath = path.join(OUTPUT_DIR, 'default-fruit.jpg');
  if (!fs.existsSync(defaultPath)) {
    process.stdout.write(`📥 default-fruit.jpg ... `);
    try {
      await downloadImage(DEFAULT_IMAGE, defaultPath);
      console.log(`✅`);
    } catch { console.log(`❌`); }
  }

  console.log(`\n${'='.repeat(55)}`);
  console.log(`✅ Success: ${success} (${skipped} skipped)  ❌ Failed: ${failed}`);
  console.log(`📂 Images saved to: ${OUTPUT_DIR}`);
}

main().catch(console.error);
