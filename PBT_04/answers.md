# Câu A1

static |Có | Không dùng top/right/bottom/left |Có |Mặc định

relative |Có | Chính vị trí ban đầu của nó |Có |Dịch chuyển nhẹ, làm mốc cho absolute

absolute |Không | Parent gần nhất có position khác static |Có |Badge, tooltip, dropdowncho

fixed |Không |Viewport (màn hình trình duyệt) |Không |Chat button, Back to Top

sticky |Có (ban đầu) |Viewport khi đạt ngưỡng sticky |Không khi đã dính |Sticky header, sticky sidebar

# Câu A2

ảnh ở screenshots

# Bài B1

- Header dùng position: fixed nên luôn nằm trên cùng màn hình khi scroll

- Sidebar dùng position: sticky; top: 80px;
  nên khi cuộn tới vị trí 80px dưới header, sidebar sẽ dính lại

- Product card dùng position: relative
  để tạo mốc tọa độ.

- Badge HOT dùng position: absolute
  nên nằm ở góc trên phải card

- Nút Scroll To Top dùng position: fixed
  nên luôn xuất hiện ở góc phải dưới viewport

# Câu C1 — Flexbox vs Grid

## 1. Navigation bar ngang

Dùng: **Flexbox**

Giải thích: Navbar là layout một chiều theo hàng ngang. Flexbox phù hợp để căn logo bên trái, menu ở giữa và buttons bên phải bằng justify-content và align-items

## 2. Lưới ảnh Instagram

Dùng: **Grid**

Giải thích: Lưới ảnh là layout hai chiều gồm hàng và cột, grid phù hợp để tạo 3 cột đều nhau và tự động xuống hàng khi có nhiều ảnh

## 3. Layout blog: main content + sidebar

Dùng: **Grid**

Giải thích: Blog layout có cấu trúc rõ ràng theo cột, ví dụ main content chiếm phần lớn và sidebar chiếm phần nhỏ. Grid giúp chia layout tổng thể dễ hơn

## 4. Footer với 4 cột thông tin

Dùng: **Grid**

Giải thích: Footer có 4 cột thông tin đều nhau. Grid phù hợp để chia 4 cột rõ ràng và giữ bố cục ổn định

## 5. Card sản phẩm

Dùng: **Flexbox**

Giải thích: Card sản phẩm là layout một chiều theo cột: ảnh ở trên, text ở giữa, nút ở dưới. Flexbox với flex-direction: column và margin-top: auto giúp nút luôn dính đáy card

# Câu C2 — Debug Flexbox

## Lỗi 1: Cards không đều chiều cao — nút "Mua" bị nhảy lên/xuống

### Nguyên nhân

Các card có nội dung dài ngắn khác nhau nên chiều cao không đều. Nút "Mua" nằm ngay sau nội dung, vì vậy nút bị nhảy lên hoặc xuống tùy theo lượng text trong card

### Code sửa

```css
.card-container {
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
}

.card {
  width: 30%;
  margin: 1.5%;

  display: flex;
  flex-direction: column;
}

.card img {
  width: 100%;
}

.card h3 {
  font-size: 18px;
}

.card .btn {
  padding: 10px;
  margin-top: auto;
}
```

## Lỗi 2: Item không nằm giữa container 100vh

### Nguyên nhân

.hero đã có display: flex nhưng chưa có thuộc tính căn giữa. Mặc định Flexbox căn item ở đầu trục chính và đầu trục phụ, nên nội dung vẫn dính góc trái trên

```css
.hero {
  height: 100vh;
  display: flex;

  justify-content: center;
  align-items: center;
}

.hero-content {
  text-align: center;
}
```

## Lỗi 3: Sidebar bị co lại khi content quá dài

### Nguyên nhân

Trong Flexbox, item mặc định có thể co lại vì 'flex-shrink: 1'. Khi '.content' quá dài hoặc chiếm nhiều không gian, .sidebar có thể bị ép nhỏ hơn 250px

```css
.layout {
  display: flex;
}

.sidebar {
  width: 250px;
  flex-shrink: 0;
}

.content {
  flex: 1;
  min-width: 0;
}
```

link video:
https://drive.google.com/drive/folders/13bsPh0zfOpShwlsFTHAcvViXK5fb1mzu?usp=drive_link
