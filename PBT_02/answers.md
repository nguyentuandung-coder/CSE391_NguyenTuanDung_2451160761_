Phần A:

Câu A1:
1.type="email" là ô nhập text , tự kiểm tra có @ dùng cho form đăng ký
2.type="text" là ô nhập bình thường , dùng cho minlenght và maxlenght dùng cho form
3.type="password" là ô nhập nhưng bị ẩn chỉ có chấm dùng nhập mặt khẩu
4.type="number" là ô nhập số nút tăng or giảm , dùng nhập số lượng
5.type="tel"là ô nhập số điện thoại dùng pattern và dùng nhập SĐT khách hàng 6.type="date" hiển thị lịch để chọn ngày dùng chọn ngày giao hàng
7.type="file" nút upload file dùng upload ảnh sản phẩm
8.type="url" ô nhập link, tự kiểm tra định dạng URL dùng nhập link website hoặc sản phẩm
9.type="range" thanh trượt (slider) dùng lọc giá sản phẩm
10.type="checkbox" ô tick chọn nhiều lựa chọn dùng chọn đồng ý điều khoản hoặc chọn nhiều sản phẩm

câu A2:
th1: ko nhập gì thì sẽ báo lỗi là không đc để trống
th2: nếu nhập mỗi abc , thì sẽ báo lỗi thiếu @
th3:nếu nhập 15 thì sẽ báo lỗi vượt phạm vi của số
th4:yêu cầu nhập đủ 10 số nhưng ko nhập lên báo lỗi phải nhập đủ dữ liệu
th5:nhập đủ 8 , vậy nên sẽ báo lỗi nhập thiếu dữ liệu
câu A3:
1.Form không có <label> = người dùng screen reader không biết ô nhập gì. Accessibility không phải 'nice to have' — nhiều công ty bắt buộc. Apple, Google đều kiểm tra
2.dùng khi input nhiều chủ để như thông tin cá nhân , thông tin khách hàng, thông tin giao hàng ,<fieldset> dùng để nhóm các input liên quan thành một khối logic ,<legend> là tiêu đề của nhóm đó
Ví dụ: nhóm "Thông tin giao hàng", "Thanh toán"
3.dùng aria-label dùng khi phần tử không có text hiển thị nhưng vẫn cần cung cấp tên cho screen reader
Vì <label> đã cung cấp thông tin rõ ràng cho cả:
-Người dùng bình thường
-Screen reader
Dùng thêm aria-label sẽ bị trùng lặp thông tin

Câu A4:
1.thuộc tính loading="lazy" trên thẻ <img> có tác dụng trì hoãn việc tải ảnh , khi cuộn đến trang có ảnh thì mới tải ảnh , điều này giúp cho trang web dễ tải và mượt hơn , tăng hiệu năng
2.Vì mỗi trình duyệt hỗ trợ format video khác nhau,cung cấp nhiều <source> giúp đảm bảo video chạy được trên mọi trình duyệt
-3 format video web phổ biến:
-MP4
-WebM
-OGG
3.Thuộc tính alt dùng để mô tả ảnh khi ko tải đc ảnh
Ảnh sản phẩm iPhone 16
alt="iPhone 16 Pro Max màu Titan, màn hình 6.7 inch"

Câu A5:
<img> chỉ dùng để hiển thị mỗi ảnh ko có mô tả ảnh, ko có chú thích gì cả

<figure> thì có cả ảnh và có chú thích ảnh mô tả ảnh

2 ví dụ:
-Ảnh đơn giản dùng để trang trí hay cho đẹp thì dùng img
-Ảnh mà có nội dung có ý nghĩa thì dùng figure

Câu C1:
Lỗi 1: Dòng 2 — Input "Tên" không có <label> vi phạm accessibility, user không biết input này là gì
Sửa:<label for="name">Tên:</label>
<input type="text" id="name" name="name" required>
Lỗi 2: Dòng 3 — Input email không có <label>
Sửa:
<label for="email">Email:</label>
<input type="email" id="email" name="email" required>
Lỗi 3: Dòng 4–5 — Password không có <label>
Sửa:
<label for="pass">Mật khẩu:</label>
<input type="password" id="pass" name="password" required>

<label for="repass">Nhập lại mật khẩu:</label>
<input type="password" id="repass" name="repassword" required>
Lỗi 4: Dòng 6 — Phone dùng type="text"
Sửa:
<label for="phone">Phone:</label>
<input type="tel" id="phone" name="phone" pattern="[0-9]{10}" required>
Lỗi 5: Dòng 7 — <select> không có label + name
Sửa:
<label for="city">Thành phố:</label>
<select id="city" name="city" required>

<option value="">--Chọn--</option>
<option value="hn">Hà Nội</option>
<option value="hcm">TP.HCM</option>
</select>

link video: -https://drive.google.com/drive/u/0/folders/1ct0SF9Esx8tMCg4XpLqkzBs-bzP_zKvh
