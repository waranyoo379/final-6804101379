import { test, expect } from '@playwright/test';

test('IT-02: DRIVER login state -> REAL Inventory and Cart', {
  annotation: {
    type: 'description',
    description: 'ใช้ Driver เตรียมสถานะ Login เพื่อทดสอบ Inventory และ Cart จริง'
  }
}, async ({ browser }) => {
  await test.step('สร้าง Driver และเปิด Inventory', async () => {
    // สร้าง BrowserContext และใช้ driverOpenInventory() ตั้งค่า Cookie
  });
  await test.step('ตรวจสอบ Inventory จริง', async () => {
    // ตรวจสอบสินค้า 6 รายการ
  });
  await test.step('เพิ่มสินค้า 2 รายการ', async () => {
    // เพิ่ม Backpack และ Bike Light แล้วตรวจสอบ Cart Badge = 2
  });
  await test.step('ตรวจสอบสินค้าใน Cart', async () => {
    // เปิด Cart และตรวจสอบชื่อสินค้าทั้งสองรายการ
  });
  // ปิด BrowserContext ที่สร้างเองเมื่อสิ้นสุดการทดสอบ
});
