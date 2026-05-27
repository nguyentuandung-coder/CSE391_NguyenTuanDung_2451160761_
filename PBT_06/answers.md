# Câu A1:

| Kích thước | < 768px | 768px - 991px | ≥ 992px      |
| ---------- | ------- | ------------- | ------------ |
| Số cột     | 1 cột   | 2 cột         | 4 cột        |
| Box layout | Xếp dọc | 2 box / hàng  | 4 box / hàng |

# Câu A2:

## 1. Giải thích class `d-none d-md-block`

### `d-none`

```css
display: none;
```

d-md-block
Từ breakpoint md (≥768px) trở lên: Hiện

```css
display: block;
```

## mt-3

<div class="mt-3"></div>

Nghĩa là:

margin-top: 1rem;

→ Tạo khoảng cách phía trên.

## mb-4

<div class="mb-4"></div>

Nghĩa là:

margin-bottom: 1.5rem;

→ Tạo khoảng cách phía dưới.

## px-4

<div class="px-4"></div>

Nghĩa là:

padding-left: 1.5rem;
padding-right: 1.5rem;

→ Padding ngang.

## py-2

<div class="py-2"></div>

Nghĩa là:

padding-top: 0.5rem;
padding-bottom: 0.5rem;

→ Padding dọc.

## mb-auto

<div class="mb-auto"></div>

Nghĩa là:

margin-bottom: auto;

→ Đẩy element theo Flexbox/Grid layout.

Thường dùng để:

căn giữa
đẩy footer xuống đáy
đẩy button xuống cuối card

## Bảng phân biệt .container, .container-fluid, .container-md

| Class              | Chiều rộng                                    | Responsive           | Khi nào dùng                         |
| ------------------ | --------------------------------------------- | -------------------- | ------------------------------------ |
| `.container`       | Có `max-width` theo breakpoint                | Có                   | Website thông thường                 |
| `.container-fluid` | Luôn `100%` màn hình                          | Không giới hạn width | Banner, dashboard, layout full width |
| `.container-md`    | Mobile: `100%`<br>Tablet/Desktop: fixed width | ✅ Có                | Mobile full width nhưng desktop gọn  |

---

## Ví dụ trực quan

| Class              | Mobile (<768px)       | Desktop (≥768px)              |
| ------------------ | --------------------- | ----------------------------- |
| `.container`       | Có khoảng trắng 2 bên | Có max-width, căn giữa        |
| `.container-fluid` | Full màn hình         | Full màn hình                 |
| `.container-md`    | Full màn hình         | Có max-width như `.container` |

---
