#!/usr/bin/env tsx

import * as cheerio from 'cheerio';
import { Command } from 'commander';
import { writeFile } from 'fs/promises';
import * as path from 'path';

const program = new Command();

program
  .name('web-scraper')
  .description(
    'CLI trích xuất nội dung từ web bằng CSS selector và lưu kết quả ra file'
  )
  .argument('<url>', 'URL trang web')
  .argument('<selectors...>', 'Một hoặc nhiều CSS selector')
  .option('-o, --output <file>', 'Tên file để lưu kết quả', 'results.json')
  .action(
    async (url: string, selectors: string[], options: { output: string }) => {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Lỗi HTTP ${res.status}`);

        const html = await res.text();
        const $ = cheerio.load(html);

        // Thu thập kết quả cho từng selector
        const results: Record<string, string[]> = {};

        selectors.forEach((selector) => {
          const elements = $(selector);
          results[selector] = [];

          if (elements.length === 0) {
            results[selector].push('❌ Không tìm thấy phần tử nào.');
          } else {
            elements.each((i, el) => {
              results[selector].push($(el).text().trim());
            });
          }
        });

        // Lưu kết quả ra file JSON
        const outputPath = path.resolve(process.cwd(), options.output);
        await writeFile(outputPath, JSON.stringify(results, null, 2), 'utf-8');
        console.log(`✅ Đã lưu kết quả vào file: ${outputPath}`);
      } catch (err) {
        console.error('🚨 Lỗi:', (err as Error).message);
      }
    }
  );

program.parse();
