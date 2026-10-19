import { test, expect, BrowserContext, Page } from '@playwright/test';

// Driver function สำหรับเตรียม Cookie สถานะ Login และเปิดหน้า Inventory โดยตรง
async function driverOpenInventory(context: BrowserContext): Promise<Page> {
  await context.addCookies([
    {
      name: 'session-username',
      value: 'standard_user',
      domain: 'www.saucedemo.com',
      path: '/',
    },
  ]);
  const page = await context.newPage();
  await page.goto('https://www.saucedemo.com/inventory.html');
  return page;
}

test('IT-02: DRIVER login state -> REAL Inventory and Cart', {
  annotation: {
    type: 'description',
    description: 'ใช้ Driver เตรียมสถานะ Login เพื่อทดสอบ Inventory และ Cart จริง'
  }
}, async ({ browser }) => {
  const context = await browser.newContext();
  let page: Page;

  try {
    await test.step('สร้าง Driver และเปิด Inventory', async () => {
      page = await driverOpenInventory(context);
      await expect(page).toHaveURL(/.*inventory\.html/);
    });

    await test.step('ตรวจสอบ Inventory จริง', async () => {
      const inventoryItems = page.locator('.inventory_item');
      await expect(inventoryItems).toHaveCount(6);
    });

    await test.step('เพิ่มสินค้า 2 รายการ', async () => {
      await page.locator('#add-to-cart-sauce-labs-backpack').click();
      await page.locator('#add-to-cart-sauce-labs-bike-light').click();
      await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
    });

    await test.step('ตรวจสอบสินค้าใน Cart', async () => {
      await page.locator('.shopping_cart_link').click();
      await expect(page).toHaveURL(/.*cart\.html/);

      const cartItems = page.locator('.inventory_item_name');
      await expect(cartItems).toHaveCount(2);
      await expect(cartItems.nth(0)).toHaveText('Sauce Labs Backpack');
      await expect(cartItems.nth(1)).toHaveText('Sauce Labs Bike Light');
    });
  } finally {
    // ปิด BrowserContext ที่สร้างขึ้นเมื่อสิ้นสุดการทดสอบ
    await context.close();
  }
});