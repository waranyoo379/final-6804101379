import { test, expect } from '@playwright/test';

test('ST-01: complete purchase of two products', {
  annotation: {
    type: 'description',
    description: 'ทดสอบการซื้อ Backpack และ Bike Light ตั้งแต่ Login จนสั่งซื้อสำเร็จ'
  }
}, async ({ page }) => {
  await test.step('Login และตรวจสอบ Inventory', async () => {
    await page.goto('/');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await expect(page).toHaveURL(/.*inventory\.html/);
  });

  await test.step('เพิ่มสินค้าสองรายการ', async () => {
    await page.locator('#add-to-cart-sauce-labs-backpack').click();
    await page.locator('#add-to-cart-sauce-labs-bike-light').click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
  });

  await test.step('ตรวจสอบ Cart', async () => {
    await page.locator('.shopping_cart_link').click();
    await expect(page).toHaveURL(/.*cart\.html/);
    const cartItems = page.locator('.inventory_item_name');
    await expect(cartItems).toHaveCount(2);
    await expect(cartItems.nth(0)).toHaveText('Sauce Labs Backpack');
    await expect(cartItems.nth(1)).toHaveText('Sauce Labs Bike Light');
  });

  await test.step('กรอก Checkout Information', async () => {
    await page.locator('#checkout').click();
    await expect(page).toHaveURL(/.*checkout-step-one\.html/);

    await page.locator('#first-name').fill('Somchai');
    await page.locator('#last-name').fill('Jaidee');
    await page.locator('#postal-code').fill('10200');
    await page.locator('#continue').click();
  });

  await test.step('ตรวจสอบ Overview และสั่งซื้อ', async () => {
    await expect(page).toHaveURL(/.*checkout-step-two\.html/);
    const overviewItems = page.locator('.inventory_item_name');
    await expect(overviewItems).toHaveCount(2);
    await expect(overviewItems.nth(0)).toHaveText('Sauce Labs Backpack');
    await expect(overviewItems.nth(1)).toHaveText('Sauce Labs Bike Light');

    await page.locator('#finish').click();
  });

  await test.step('ตรวจสอบ Order Complete', async () => {
    await expect(page).toHaveURL(/.*checkout-complete\.html/);
    const completeHeader = page.locator('.complete-header');
    await expect(completeHeader).toBeVisible();
    await expect(completeHeader).toHaveText('Thank you for your order!');
  });
});