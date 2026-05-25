# Câu A1 — Viewport & Mobile-First

## 1. Thẻ meta viewport chuẩn

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

Giải thích từng thuộc tính
-name="viewport": khai báo đây là thẻ cấu hình vùng hiển thị của trình duyệt
-width=device-width: đặt chiều rộng viewport bằng chiều rộng thật của thiết bị
-initial-scale=1.0: đặt mức zoom ban đầu là 100%, không phóng to hoặc thu nhỏ

Nếu thiếu thẻ viewport, iPhone sẽ coi trang web như một trang desktop. Trang sẽ bị thu nhỏ lại để vừa với màn hình điện thoại

Kết quả:
Chữ rất nhỏ
Người dùng phải zoom để đọc
Layout dễ bị vỡ
Có thể xuất hiện scroll ngang
Trải nghiệm mobile rất kém

Mobile-First

Mobile-First là cách viết CSS cho màn hình nhỏ trước, sau đó dùng @media (min-width) để mở rộng layout cho tablet hoặc desktop.

```css
.card {
  width: 100%;
}

@media (min-width: 768px) {
  .card {
    width: 50%;
  }
}
```

Desktop-First

Desktop-First là cách viết CSS cho màn hình lớn trước, sau đó dùng @media (max-width) để giảm layout cho màn hình nhỏ.

```css
.card {
  width: 50%;
}

@media (max-width: 768px) {
  .card {
    width: 100%;
  }
}
```

Mobile-First được khuyên dùng vì:

Phù hợp với thực tế nhiều người truy cập web bằng điện thoại
CSS mặc định nhẹ hơn cho mobile
Dễ mở rộng layout từ nhỏ lên lớn

# Câu A2 — Breakpoints

| Breakpoint | Kích thước | Thiết bị đại diện | Ví dụ lưới sản phẩm |
| ---------- | ---------- | ----------------- | ------------------- |
| xs         | < 576px    | Điện thoại dọc    | 1 cột               |
| sm         | ≥ 576px    | Điện thoại ngang  | 2 cột               |
| md         | ≥ 768px    | Tablet            | 2 cột               |
| lg         | ≥ 992px    | Desktop nhỏ       | 4 cột               |
| xl         | ≥ 1200px   | Desktop lớn       | 4 hoặc 5 cột        |

# Câu A3 — Media Queries

CSS:

```css
.container {
  width: 100%;
  padding: 10px;
}

@media (min-width: 576px) {
  .container {
    width: 540px;
  }
}

@media (min-width: 768px) {
  .container {
    width: 720px;
  }
}

@media (min-width: 992px) {
  .container {
    width: 960px;
  }
}

@media (min-width: 1200px) {
  .container {
    width: 1140px;
  }
}
```

# Câu A4 — SCSS Basics

## Variables

Variables cho phép lưu trữ giá trị để tái sử dụng nhiều lần trong dự án.

Ví dụ:

```scss
$primary-color: #667eea;

.btn {
  background: $primary-color;
}
```

## Nesting

SCSS cho phép viết selector lồng nhau giống cấu trúc HTML

```scss
.navbar {
  background: #333;

  a {
    color: white;

    &:hover {
      color: yellow;
    }
  }
}
```

## Mixins

Mixin giống như một hàm CSS có thể tái sử dụng

```scss
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero {
  @include flex-center;
  height: 100vh;
}
```

## Inheritance

Cho phép một class kế thừa toàn bộ style của class khác

```scss
.btn {
  padding: 12px 24px;
  border-radius: 8px;
}

.btn-primary {
  @extend .btn;
  background: blue;
  color: white;
}
```

SCSS là ngôn ngữ tiền xử lý (CSS Preprocessor), chứa các cú pháp mở rộng, mà trình duyệt lại không hiểu được các cú pháp mở rộng này.
