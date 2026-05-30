const items = [
  { name: "Phở bò", price: 65000, quantity: 2 },
  { name: "Trà đá", price: 5000, quantity: 3 },
  { name: "Bún chả", price: 55000, quantity: 1 },
];

const isWednesday = false;
const hasTip = true;

let total = 0;

for (let i = 0; i < items.length; i++) {
  total += items[i].price * items[i].quantity;
}

let discountPercent = 0;

if (total > 1000000) {
  discountPercent = 15;
} else if (total > 500000) {
  discountPercent = 10;
}

if (isWednesday) {
  discountPercent += 5;
}

const discountAmount = (total * discountPercent) / 100;
const afterDiscount = total - discountAmount;

const vat = (afterDiscount * 8) / 100;

let tip = 0;
if (hasTip) {
  tip = (afterDiscount * 5) / 100;
}

const finalTotal = afterDiscount + vat + tip;

function formatMoney(amount) {
  return amount.toLocaleString("vi-VN") + "đ";
}

function formatK(amount) {
  return amount / 1000 + "k";
}

console.log("╔══════════════════════════════════════╗");
console.log("║        HÓA ĐƠN NHÀ HÀNG             ║");
console.log("╠══════════════════════════════════════╣");

for (let i = 0; i < items.length; i++) {
  const item = items[i];
  const itemTotal = item.price * item.quantity;

  console.log(
    `║ ${i + 1}. ${item.name.padEnd(10)} x${item.quantity}    @${formatK(item.price).padEnd(5)} = ${formatK(itemTotal).padEnd(5)} ║`,
  );
}

console.log("╠══════════════════════════════════════╣");
console.log(`║ Tổng cộng:              ${formatMoney(total).padStart(10)} ║`);
console.log(
  `║ Giảm giá (${discountPercent}%):       ${formatMoney(discountAmount).padStart(10)} ║`,
);
console.log(`║ VAT (8%):                ${formatMoney(vat).padStart(10)} ║`);
console.log(`║ Tip (5%):                ${formatMoney(tip).padStart(10)} ║`);
console.log("╠══════════════════════════════════════╣");
console.log(
  `║ THANH TOÁN:              ${formatMoney(finalTotal).padStart(10)} ║`,
);
console.log("╚══════════════════════════════════════╝");
