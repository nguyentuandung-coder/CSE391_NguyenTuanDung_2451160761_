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
