## Câu A1

1.Inline CSS

<p style="color: red; font-size: 20px;">
    Hello World
</p>
-Ưu điểm
Nhanh, đơn giản
Áp dụng trực tiếp cho một phần tử
Có độ ưu tiên cao
-Nhược điểm
Khó bảo trì khi website lớn
Trùng lặp code
Không tách biệt giao diện và nội dung
-Khi nào nên dùng
Thử nghiệm nhanh
Chỉnh sửa tạm thời cho một phần tử cụ thể

2. Internal CSS
<head>
    <style>
        p {
            color: blue;
            font-size: 18px;
        }
    </style>
</head>
-Ưu điểm
Không cần file CSS riêng
Phù hợp cho trang web nhỏ
-Nhược điểm
Không tái sử dụng được cho nhiều trang
File HTML trở nên dài và khó đọc
-Khi nào nên dùng
Website chỉ có một trang

3. External CSS
<link rel="stylesheet" href="style.css">
-Ưu điểm
Dễ bảo trì
Tái sử dụng cho nhiều trang
Tách riêng nội dung và giao diện
Trình duyệt có thể cache file CSS giúp tải nhanh hơn
-Nhược điểm
Cần thêm file CSS riêng
Nếu file CSS lỗi hoặc không tải được thì giao diện sẽ bị ảnh hưởng
-Khi nào nên dùng
Hầu hết các website thực tế
Dự án vừa và lớn

## Câu A2 CSS Selectors

1. h1
   Chọn: ShopTLU

Vì selector h1 chọn tất cả thẻ <h1> trong trang

2. .price
   Chọn:

- 25.990.000đ
- 45.990.000đ

Vì selector .price chọn tất cả phần tử có class price

3. #app header
   Chọn:

- Toàn bộ phần tử <header class="top-bar dark">

Nội dung bên trong:

ShopTLU
Home
Products
About

Vì selector này chọn thẻ header nằm bên trong phần tử có id app

4. nav a:first-child
   Chọn: Home

Vì a:first-child là thẻ <a> đầu tiên bên trong <nav>.

5. .product.featured h2
   Chọn: MacBook Pro

Vì:

<article class="product featured">

có đồng thời 2 class:

product
featured

và selector lấy thẻ h2 bên trong article đó

6. article > p
   Chọn:

- 25.990.000đ
- Mô tả sản phẩm...
- 45.990.000đ
- Mô tả sản phẩm...

Vì selector > chỉ chọn các thẻ p là con trực tiếp của article

Mỗi article có 2 thẻ p

Tổng cộng:

4 phần tử p

7. a[href="/"]
   Chọn: Home

Vì đây là thẻ:

<a href="/">Home</a>

8. .top-bar.dark h1
   Chọn: ShopTLU

Vì:

<header class="top-bar dark">

có đồng thời class:

top-bar
dark

và selector lấy thẻ h1 nằm bên trong

## Câu A3— Box Model

Trường hợp 1: content-box
Chiều rộng hiển thị = 450px
Không gian chiếm trên trang = 470px

Trường hợp 2: border-box
Chiều rộng hiển thị = 400px
Content thực tế = 350px
Không gian chiếm trên trang = 420px

Trường hợp 3: Margin Collapse
Khoảng cách giữa hai box = 40px

## Câu A4 Specificity

1.  Rule A (0, 0, 1)
    Rule B (0, 1, 0)
    Rule C (1, 0, 0)
    Rule D (0, 1, 1)

2.Element
Element sẽ có màu: red
Vì Rule C dùng selector #main-price, có specificity là (1, 0, 0), cao nhất trong 4 rule

3.Element sẽ có màu:orange
Vì inline CSS có độ ưu tiên cao hơn selector trong file CSS thông thường

4. Nếu Rule A thêm !important
   Element sẽ có màu:black
   Vì !important làm cho thuộc tính đó được ưu tiên hơn các rule CSS bình thường, kể cả selector có id.

## Bài B1 — Các loại selector đã sử dụng

Trong file style.css đã sử dụng các loại selector sau:

1. Element selector:
   - body
   - header
   - table
   - footer

2. Class selector:
   - .active

3. ID selector:
   - #about
   - #skills
   - #contact

4. Descendant selector:
   - nav a
   - #about h1
   - tfoot td

5. Pseudo-class selector:
   - nav a:hover
   - tr:nth-child(even)
   - tr:hover

6. Group selector:
   - section, aside
   - th, td
   - #about h1, #skills h2, #contact h3

## Bài B2 — Box Model Lab

### Phần 1: Content-box vs Border-box

Hai hộp đều có:

- width: 300px
- padding: 20px
- border: 5px solid

#### Hộp 1: content-box

Công thức:

300 + 20 + 20 + 5 + 5 = 350px

Hộp 1 (content-box): chiều rộng thực tế = 350px

#### Hộp 2: border-box

Với border-box, width đã bao gồm content + padding + border.

Hộp 2 (border-box): chiều rộng thực tế = 300px

### Phần 2: Layout 3 cột

Container có width: 1000px

#### Trường hợp không dùng border-box

Sidebar:

250 + 15 + 15 + 2 + 2 = 284px

Content:

500 + 20 + 20 + 2 + 2 = 544px

Ads:

250 + 15 + 15 + 2 + 2 = 284px

Tổng:

284 + 544 + 284 = 1112px

Vì 1112px > 1000px nên layout bị vỡ, cột có thể bị rơi xuống dòng mới

#### Trường hợp dùng border-box

Sidebar = 250px

Content = 500px

Ads = 250px

Tổng:

250 + 500 + 250 = 1000px

Vì tổng đúng bằng 1000px nên layout không bị vỡ

## Bài B3 — Specificity Battle

Phần tử được target:

<p id="demo" class="text highlight">Hello World</p>

p { color: black; }
.text { color: blue; }
.highlight { color: green; }
p.text { color: orange; }
p.highlight { color: purple; }
.text.highlight { color: brown; }
p.text.highlight { color: pink; }
#demo { color: red; }
p#demo { color: navy; }
p#demo.text.highlight { color: crimson; }

# Element hiển thị màu:

crimson
Vì rule:
p#demo.text.highlight { color: crimson; }

có specificity cao nhất là (1,2,1)
Nếu chỉ đổi thứ tự các rule nhưng rule 'p#demo.text.highlight' vẫn tồn tại, kết quả không đổi
