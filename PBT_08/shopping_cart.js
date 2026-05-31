function createCart() {
  // Private Data
  let items = [];
  let discount = {
    type: null,
    value: 0,
  };

  function formatMoney(amount) {
    return amount.toLocaleString("vi-VN") + "đ";
  }

  return {
    addItem(product, quantity = 1) {
      const existingItem = items.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        items.push({
          ...product,
          quantity,
        });
      }
    },

    removeItem(productId) {
      items = items.filter((item) => item.id !== productId);
    },

    updateQuantity(productId, newQuantity) {
      const item = items.find((item) => item.id === productId);

      if (!item) return;

      if (newQuantity <= 0) {
        this.removeItem(productId);
        return;
      }

      item.quantity = newQuantity;
    },

    getTotal() {
      let total = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );

      if (discount.type === "percent") {
        total -= (total * discount.value) / 100;
      }

      if (discount.type === "fixed") {
        total -= discount.value;
      }

      return Math.max(total, 0);
    },

    applyDiscount(code) {
      switch (code) {
        case "SALE10":
          discount = {
            type: "percent",
            value: 10,
          };
          break;

        case "SALE20":
          discount = {
            type: "percent",
            value: 20,
          };
          break;

        case "FREESHIP":
          discount = {
            type: "fixed",
            value: 30000,
          };
          break;

        default:
          console.log("Mã giảm giá không hợp lệ");
      }
    },

    printCart() {
      console.log("\n================ GIỎ HÀNG ================\n");

      console.log("# | Sản phẩm        | SL | Đơn giá       | Thành tiền");

      items.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;

        console.log(
          `${index + 1} | ` +
            `${item.name.padEnd(15)} | ` +
            `${String(item.quantity).padStart(2)} | ` +
            `${item.price.toLocaleString("vi-VN").padStart(12)} | ` +
            `${itemTotal.toLocaleString("vi-VN")}`,
        );
      });

      console.log("------------------------------------------");

      console.log("Tổng cộng:", formatMoney(this.getTotal()));

      console.log("\n==========================================\n");
    },

    getItemCount() {
      return items.reduce((sum, item) => sum + item.quantity, 0);
    },

    clearCart() {
      items = [];

      discount = {
        type: null,
        value: 0,
      };
    },
  };
}

// =======================
// TEST
// =======================

const cart = createCart();

cart.addItem(
  {
    id: 1,
    name: "iPhone 16",
    price: 25990000,
  },
  1,
);

cart.addItem(
  {
    id: 3,
    name: "AirPods Pro",
    price: 6990000,
  },
  2,
);

cart.addItem(
  {
    id: 1,
    name: "iPhone 16",
    price: 25990000,
  },
  1,
);

cart.printCart();

cart.applyDiscount("SALE10");

cart.printCart();

console.log("Số SP:", cart.getItemCount());

cart.removeItem(3);

console.log("Sau xóa:", cart.getItemCount());
