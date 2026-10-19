import { test, expect } from '@playwright/test';

test('UT-02: product button state Add to cart -> Remove -> Add to cart', {
  annotation: {
    type: 'description',
    description: 'ตรวจสอบสถานะปุ่ม Add to cart และ Remove รวมถึง Cart Badge'
  }
}, async ({ page }) => {
  await test.step('Login เข้าสู่ระบบ', async () => {
    await page.goto('/');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await expect(page).toHaveURL(/.*inventory\.html/);
  });

  const backpackBtn = page.locator('#add-to-cart-sauce-labs-backpack');
  const removeBackpackBtn = page.locator('#remove-sauce-labs-backpack');
  const cartBadge = page.locator('.shopping_cart_badge');

  await test.step('ตรวจสอบปุ่มก่อนเพิ่มสินค้า', async () => {
    await expect(backpackBtn).toBeVisible();
    await expect(backpackBtn).toHaveText('Add to cart');
    await expect(cartBadge).toHaveCount(0);
  });

  await test.step('เพิ่มสินค้าเข้า Cart', async () => {
    await backpackBtn.click();
    await expect(removeBackpackBtn).toBeVisible();
    await expect(removeBackpackBtn).toHaveText('Remove');
    await expect(cartBadge).toHaveText('1');
  });

  await test.step('ลบสินค้าออกจาก Cart', async () => {
    await removeBackpackBtn.click();
    await expect(backpackBtn).toBeVisible();
    await expect(backpackBtn).toHaveText('Add to cart');
    await expect(cartBadge).toHaveCount(0);
  });
});