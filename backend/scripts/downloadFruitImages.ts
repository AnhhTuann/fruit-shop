/**
 * Script tải ảnh trái cây từ Pollinations AI về thư mục local.
 * Chạy 1 lần duy nhất: npx ts-node scripts/downloadFruitImages.ts
 */
import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';

const OUTPUT_DIR = path.resolve(__dirname, '../../frontend/public/fruits');

// Hàm format tên: "Navel Orange" -> "navel-orange"
const formatFruitName = (name: string) =>
  name.toLowerCase().replace(/\s+/g, '-');

// Hàm tải ảnh từ URL và lưu về local
function downloadImage(url: string, destPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    const protocol = url.startsWith('https') ? https : http;

    const request = protocol.get(url, (response) => {
      // Theo redirect nếu có (Pollinations thường redirect)
      if (response.statusCode === 301 || response.statusCode === 302) {
        const redirectUrl = response.headers.location!;
        file.close();
        fs.unlinkSync(destPath); // Xóa file rỗng
        downloadImage(redirectUrl, destPath).then(resolve).catch(reject);
        return;
      }

      if (response.statusCode !== 200) {
        file.close();
        fs.unlinkSync(destPath);
        reject(new Error(`HTTP ${response.statusCode} for ${url}`));
        return;
      }

      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    });

    request.on('error', (err) => {
      fs.unlink(destPath, () => {});
      reject(err);
    });

    // Timeout 60s cho mỗi ảnh AI (thường cần 5-15s để generate)
    request.setTimeout(60000, () => {
      request.destroy();
      fs.unlink(destPath, () => {});
      reject(new Error(`Timeout downloading: ${url}`));
    });
  });
}

async function main() {
  // Tạo thư mục output nếu chưa có
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`📁 Created directory: ${OUTPUT_DIR}`);
  }

  // Lấy danh sách trái cây từ Fruityvice API
  console.log('🌐 Fetching fruit list from Fruityvice API...');
  const response = await fetch('https://www.fruityvice.com/api/fruit/all');
  const fruits: Array<{ name: string }> = await response.json();
  console.log(`✅ Found ${fruits.length} fruits to download.\n`);

  let success = 0;
  let failed = 0;

  for (const fruit of fruits) {
    const formattedName = formatFruitName(fruit.name);
    const destPath = path.join(OUTPUT_DIR, `${formattedName}.jpg`);

    // Skip nếu đã tải về rồi
    if (fs.existsSync(destPath)) {
      console.log(`⏭  Skipped (already exists): ${formattedName}.jpg`);
      success++;
      continue;
    }

    const prompt = `A highly detailed studio photography of a fresh ${fruit.name} fruit, isolated on a clean solid white background`;
    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=600&height=400&nologo=true`;

    try {
      process.stdout.write(`📥 Downloading: ${fruit.name} ... `);
      await downloadImage(imageUrl, destPath);
      console.log(`✅ Done`);
      success++;

      // Delay nhỏ để không spam API
      await new Promise(r => setTimeout(r, 500));
    } catch (err: any) {
      console.log(`❌ Failed: ${err.message}`);
      failed++;
    }
  }

  console.log(`\n🎉 Finished! Success: ${success}, Failed: ${failed}`);
  console.log(`📂 Images saved to: ${OUTPUT_DIR}`);

  if (failed > 0) {
    console.log(`\n⚠️  Re-run the script to retry failed downloads (they will be skipped if already downloaded).`);
  }
}

main().catch(console.error);
