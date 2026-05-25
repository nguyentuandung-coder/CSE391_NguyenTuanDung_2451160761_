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
