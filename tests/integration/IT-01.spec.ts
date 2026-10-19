import { test, expect } from '@playwright/test';

test('IT-01: top-down REAL Login -> browser-level Inventory STUB', {
  annotation: {
    type: 'description',
    description: 'ทดสอบ Login จริงร่วมกับ Inventory Stub ที่จำลองด้วย page.setContent()'
  }
}, async ({ page }) => {
  await test.step('Login ผ่านหน้าเว็บไซต์จริง', async () => {
    await page.goto('/');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await expect(page).toHaveURL(/.*inventory\.html/);
  });

  await test.step('สร้าง Inventory Stub', async () => {
    // ใช้ page.setContent() จำลอง DOM ของ Inventory Stub
    await page.setContent(`
      <div id="mock-inventory">
        <h1>Mock Inventory Ready</h1>
        <div class="inventory_item">
          <div class="inventory_item_name">Mock Backpack</div>
        </div>
        <div class="inventory_item">
          <div class="inventory_item_name">Mock Bike Light</div>
        </div>
      </div>
    `);
  });

  await test.step('ตรวจสอบผลจาก Stub', async () => {
    await expect(page.locator('h1')).toHaveText('Mock Inventory Ready');
    const items = page.locator('.inventory_item_name');
    await expect(items).toHaveCount(2);
    await expect(items.nth(0)).toHaveText('Mock Backpack');
    await expect(items.nth(1)).toHaveText('Mock Bike Light');
  });
});