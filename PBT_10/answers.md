## Câu A1

### Dự đoán output

```text
1 - Start
4 - End
3 - Promise
6 - Promise 2
2 - Timeout 0ms
7 - Nested timeout
5 - Timeout 100ms
```

## Câu A2

## giải thích

Dòng 1
async function getData()

Khai báo hàm async.

Đặc điểm:

Cho phép dùng await bên trong
Luôn trả về Promise

Dòng 2
const response = await fetch("https://api.example.com/data");
fetch() trả về gì?

fetch() trả về:

Promise<Response>

Dòng 3
if (!response.ok)
response.ok là gì?

Là thuộc tính boolean.

true

khi status:

200 - 299
Khi nào false?

Dòng 4
throw new Error(`HTTP ${response.status}`);

Tự tạo lỗi.

Dòng 5
const data = await response.json();

response.json()

trả về:

Promise<Object>

Dòng 6
return data;

Trả dữ liệu cho nơi gọi hàm.

Dòng 7
catch(error)

Bắt lỗi phát sinh trong khối try.

### await fetch(...) trả về gì?

`fetch()` trả về Promise<Response>.

`await` dùng để đợi Promise resolve và lấy object Response thực tế.

### response.ok khi nào false?

`response.ok` false khi status không thuộc 200-299.

Ví dụ:

- 400 Bad Request
- 404 Not Found
- 500 Internal Server Error

### Tại sao response.json() cần await?

Vì `response.json()` cũng trả về Promise.

Phải dùng:

```javascript
const data = await response.json();
```

### try...catch bắt lỗi gì?

Network Error (mất mạng, server không tồn tại)
Error được throw thủ công
JSON Parse Error

## Câu A3

### Sơ đồ Promise States

```text
            PENDING
           /       \
          /         \
         ▼           ▼
   FULFILLED     REJECTED

   resolve()      reject()
```

### Callback Hell là gì?

Callback Hell là tình trạng callback lồng nhiều cấp:

### Refactor bằng async/await

```javascript
async function loadData() {
  try {
    const user = await getUser();

    const orders = await getOrders(user.id);

    const product = await getProduct(orders[0].productId);

    const reviews = await getReviews(product.id);

    console.log(reviews);
  } catch (error) {
    console.error(error);
  }
}
```

Async/Await giúp code đọc từ trên xuống như code đồng bộ và dễ bảo trì hơn.
