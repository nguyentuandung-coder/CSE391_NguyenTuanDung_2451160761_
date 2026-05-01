Câu A1:
Nguồn tham chiếu ở 1.1 ,1.2,1.3

khi ấn enter thì các bước thứ tự sau là:
-Trình duyệt gửi yêu cầu DNS lookup để tìm địa chỉ IP của shopee.vn
-Request được gửi từ máy tính đến qua router WiFi đến nhà mạng
-Lại tiếp đó đến internet đến sever shoppe
-Sever nhận yêu cầu , xử lý và chuẩn bị dữ liệu
-sever gửi phản hồi trở lại trình duyệt
-trình duyệt nhận dữ liệu và bắt đầu render

câu 2 đã chụp

Câu A2:
Nguồn tham chiếu chương 04
các lỗi semantic
-Lỗi dùng '<div class ="header">' mà ko phải là <header> như thế thì sẽ ko rõ là phần đầu trang
-Nội dung chính dùng '<div class="main">' mà ko phải là '<main>' nó sẽ không xác định được nội dung chính của trang
-Ảnh không có '<figure>'và '<figcaption>'
-Footer dùng <div> thay vì <footer>

Câu A4:
Nguồn tham chiếu chương 5
khác nhau của 3 cái <thead>,<tbody>, <tfoot>: -<thead>:  
 +Chứa phần tiêu đề của bảng thường là tên các cột giúp người đọc và trình duyệt hiểu cấu trúc bảng -<tbody>:  
 +Chứa dữ liệu chính của bảng. Đây là phần lớn nội dung hiển thị -<tfoot>:  
 +Chứa phần tổng kết ví dụ tổng số lượng tổng tiền thường nằm cuối bảng
tại sao ko dùng table để layout cho trang web:
-Table chỉ dùng cho dữ liệu dạng bảng dùng cho layout làm code sai mục đích
-không thích ghi với màn hình điện thoạt đc kiểu trên máy tính thì đc còn trên điện thoại sẽ dễ lỗi
-Và khó thích ghi đc vì code bằng table rất dài và dễ rối
-Hiệu năng kém

Câu A3:
Nguồn tham chiếu Chương 04 — Block vs Inline Elements
Kết quả hiển thị :

Hộp 1  
Text A Text B  
Hộp 2  
Text C Text D  
Hộp 3

Giải thích: -<div>Hộp 1</div> hiển thị riêng 1 dòng ,vì là 1 block element nên là nó chiếm toàn bộ chiều ngang , và kết thúc nó sẽ xuống dòng mới -<span> </span> là inline element chỉ chiếm phần nội dung và nằm cùng dòng với nhau -<strong> là để nhấn mạnh và cũng tương tự như <span> cũng là inline element.

Bài B3:
Các lỗi:
Lỗi 1: Dòng 1 — Sai DOCTYPE (`<!DOCTYPE>`) — Sửa thành `<!DOCTYPE html>`

Lỗi 2: Dòng 4 — Thiếu đóng thẻ `<title>` — Thêm `</title>`

Lỗi 3: Dòng 5 — charset sai (`utf8`) — Sửa thành `UTF-8`

Lỗi 4: Dòng 8 — Thẻ `<h1>` không đóng đúng — Sửa thành `</h1>`

Lỗi 5:Dòng 12 — Thẻ `<a>` không đóng — Thêm `</a>`

Lỗi 6: Dòng 18 — Thiếu dấu ngoặc kép trong `src=iphone.jpg` — Sửa thành `src="iphone.jpg"`

Lỗi 7: Dòng 18 — Thiếu thuộc tính `alt` cho `<img>` — Thêm `alt="iPhone 16 Pro"`

Lỗi 8:Dòng 20 — Sai thứ tự đóng thẻ `<b>` và `<p>` — Sửa lại đúng nesting hoặc dùng `<strong>`

Lỗi 9:Dòng 25 — Table thiếu `<thead>` và `<tbody>` — Thêm cấu trúc chuẩn

Lỗi 10: Dòng 33 — Dùng 2 thẻ `<main>` — Chỉ được dùng 1 → đổi thành `<aside>`

Lỗi 11: Dòng 38 — Thẻ `<p>` trong footer không đóng — Thêm `</p>`

Lỗi 12: Thiếu `<html lang="vi">` — Thêm thuộc tính ngôn ngữ

Bài B4:

link video:
https://drive.google.com/drive/folders/1iNEXHS-qGxd-rUeVciymBtbeb4I_dv49?usp=drive_link
