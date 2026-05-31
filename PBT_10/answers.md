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

# Câu C1 — Error Handling Strategy

## 1. Network Errors

Network errors xảy ra khi request không gửi được hoặc không nhận được phản hồi.

Trong JavaScript, lỗi network thường làm `fetch()` bị reject và nhảy vào `catch`.

### Cách xử lý

```javascript
async function loadProducts() {
  try {
    const response = await fetch("https://api.example.com/products");

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Network error:", error.message);
    alert("Không thể kết nối tới server. Vui lòng kiểm tra Internet.");
    return [];
  }
}
```

---

## 2. API Errors

Khác với network error, API error là khi server có phản hồi nhưng status code báo lỗi.

Lưu ý quan trọng:

```text
fetch() KHÔNG tự throw với 404, 500, 429.
```

Vì vậy phải tự kiểm tra:

```javascript
if (!response.ok) {
  throw new Error(`HTTP ${response.status}`);
}
```

---

## Xử lý từng loại status code

### 404 — Not Found

```text
Tài nguyên không tồn tại
Ví dụ: sản phẩm đã bị xóa
```

Cách xử lý:

```text
Hiện thông báo: "Không tìm thấy sản phẩm."
```

---

### 500 — Internal Server Error

```text
Lỗi phía server
```

Cách xử lý:

```text
Hiện thông báo: "Server đang gặp sự cố. Vui lòng thử lại sau."
```

---

### 429 — Too Many Requests

```text
Gửi quá nhiều request trong thời gian ngắn
```

Cách xử lý:

```text
Hiện thông báo: "Bạn thao tác quá nhanh. Vui lòng chờ rồi thử lại."
Có thể đọc header Retry-After nếu server có gửi.
```

---

## Hàm xử lý API error

```javascript
function handleApiError(response) {
  if (response.status === 404) {
    throw new Error("Không tìm thấy dữ liệu.");
  }

  if (response.status === 429) {
    throw new Error("Bạn gửi quá nhiều yêu cầu. Vui lòng thử lại sau.");
  }

  if (response.status >= 500) {
    throw new Error("Server đang gặp sự cố. Vui lòng thử lại sau.");
  }

  throw new Error(`Lỗi API: HTTP ${response.status}`);
}
```

Sử dụng:

```javascript
async function fetchProducts() {
  try {
    const response = await fetch("https://api.example.com/products");

    if (!response.ok) {
      handleApiError(response);
    }

    return await response.json();
  } catch (error) {
    console.error(error.message);
    return null;
  }
}
```

---

# 3. Timeout — API chậm hơn 10 giây

`fetch()` mặc định không có timeout rõ ràng.

Để tự tạo timeout, dùng:

```javascript
AbortController;
```

## Code fetchWithTimeout

```javascript
async function fetchWithTimeout(url, ms = 10000) {
  const controller = new AbortController();

  const timerId = setTimeout(() => {
    controller.abort();
  }, ms);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
    });

    clearTimeout(timerId);

    if (!response.ok) {
      handleApiError(response);
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timerId);

    if (error.name === "AbortError") {
      throw new Error("Request timeout. API phản hồi quá chậm.");
    }

    throw error;
  }
}
```

## Cách dùng

```javascript
fetchWithTimeout("https://api.example.com/products", 10000)
  .then((data) => console.log(data))
  .catch((error) => console.error(error.message));
```

---

# 4. Retry Logic — Thử lại 3 lần nếu lỗi network

Retry dùng khi lỗi có khả năng tạm thời.

Ví dụ nên retry:

```text
Mất mạng tạm thời
Server timeout
DNS lỗi tạm thời
```

Không nên retry bừa với:

```text
404 Not Found
400 Bad Request
401 Unauthorized
```

vì retry cũng không giải quyết được.

---

## Hàm delay

```javascript
function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
```

---

## Code fetchWithRetry

```javascript
async function fetchWithRetry(url, maxRetries = 3) {
  let lastError;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Lần thử ${attempt}`);

      const response = await fetch(url);

      if (!response.ok) {
        if (
          response.status === 500 ||
          response.status === 502 ||
          response.status === 503 ||
          response.status === 504 ||
          response.status === 429
        ) {
          throw new Error(`Retryable HTTP ${response.status}`);
        }

        handleApiError(response);
      }

      return await response.json();
    } catch (error) {
      lastError = error;

      console.warn(`Lỗi lần ${attempt}:`, error.message);

      if (attempt === maxRetries) {
        break;
      }

      await delay(1000 * attempt);
    }
  }

  throw new Error(`Thất bại sau ${maxRetries} lần thử: ${lastError.message}`);
}
```

---

# 5. Kết hợp timeout + retry

Trong app thực tế nên kết hợp cả hai:

```javascript
async function fetchWithTimeoutAndRetry(url, maxRetries = 3, timeout = 10000) {
  let lastError;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Lần thử ${attempt}`);

      return await fetchWithTimeout(url, timeout);
    } catch (error) {
      lastError = error;

      console.warn(`Lỗi lần ${attempt}:`, error.message);

      if (attempt === maxRetries) {
        break;
      }

      await delay(1000 * attempt);
    }
  }

  throw new Error(`Thất bại sau ${maxRetries} lần thử: ${lastError.message}`);
}
```

---

# 6. Chiến lược xử lý lỗi trong E-Commerce App

## Với danh sách sản phẩm

Nếu API lỗi:

```text
Hiện skeleton/loading trước
Nếu lỗi → hiện error state + nút Retry
Không để trang trắng
```

---

## Với giỏ hàng

Nếu update cart lỗi:

```text
Giữ lại trạng thái cũ
Hiện toast: "Không cập nhật được giỏ hàng"
Không xóa dữ liệu local ngay
```

---

## Với thanh toán

Nếu API lỗi:

```text
Không retry tự động nhiều lần để tránh tạo đơn trùng
Disable nút submit khi đang xử lý
Hiện lỗi rõ ràng
Cho user bấm thử lại thủ công
```

---

## Với 429 Too Many Requests

```text
Disable nút thao tác tạm thời
Hiện thông báo cần chờ
Nếu có Retry-After header thì chờ đúng thời gian đó
```

---

# Câu C2 — Promise.all vs Promise.allSettled vs Promise.race vs Promise.any

## Bảng so sánh

| Method                 | Khi nào resolve?                                           | Khi nào reject?                              | Use case                                              |
| ---------------------- | ---------------------------------------------------------- | -------------------------------------------- | ----------------------------------------------------- |
| `Promise.all()`        | Khi tất cả Promise đều fulfilled                           | Khi chỉ cần 1 Promise rejected               | Dùng khi cần tất cả dữ liệu đều thành công            |
| `Promise.allSettled()` | Khi tất cả Promise đã hoàn tất, dù fulfilled hoặc rejected | Gần như không reject do lỗi của từng Promise | Dùng khi 1 API lỗi không được làm hỏng toàn bộ app    |
| `Promise.race()`       | Khi Promise đầu tiên hoàn tất là fulfilled                 | Khi Promise đầu tiên hoàn tất là rejected    | Dùng cho timeout hoặc lấy kết quả phản hồi nhanh nhất |
| `Promise.any()`        | Khi có Promise đầu tiên fulfilled                          | Khi tất cả Promise đều rejected              | Dùng khi chỉ cần một nguồn thành công                 |

---

# 1. Promise.all()

## Ý nghĩa

`Promise.all()` chạy nhiều Promise song song.

Nó chỉ thành công khi tất cả Promise đều thành công.

Nếu một Promise lỗi, toàn bộ `Promise.all()` sẽ lỗi.

## Scenario thực tế

Trang checkout cần tải đủ:

```text
Thông tin user
Giỏ hàng
Địa chỉ giao hàng
```

Nếu thiếu một trong ba dữ liệu thì không thể render checkout.

## Code

```javascript
async function loadCheckoutPage(userId) {
  try {
    const [user, cart, addresses] = await Promise.all([
      fetch(`/api/users/${userId}`).then((res) => {
        if (!res.ok) throw new Error("Không tải được user");
        return res.json();
      }),

      fetch(`/api/carts/${userId}`).then((res) => {
        if (!res.ok) throw new Error("Không tải được giỏ hàng");
        return res.json();
      }),

      fetch(`/api/addresses/${userId}`).then((res) => {
        if (!res.ok) throw new Error("Không tải được địa chỉ");
        return res.json();
      }),
    ]);

    renderCheckout(user, cart, addresses);
  } catch (error) {
    showError("Không thể tải trang thanh toán: " + error.message);
  }
}
```

## Khi nên dùng

```text
Khi tất cả request đều bắt buộc phải thành công.
```

---

# 2. Promise.allSettled()

## Ý nghĩa

`Promise.allSettled()` chờ tất cả Promise hoàn tất.

Mỗi kết quả sẽ có dạng:

```javascript
{
    status: "fulfilled",
    value: ...
}
```

hoặc:

```javascript
{
    status: "rejected",
    reason: ...
}
```

Một request lỗi không làm hỏng các request còn lại.

## Scenario thực tế

Dashboard gọi nhiều widget:

```text
User
Weather
News
Random Dog
```

Nếu Weather lỗi, User và News vẫn phải hiển thị.

## Code

```javascript
async function loadDashboard() {
  const results = await Promise.allSettled([
    fetch("/api/users").then((res) => {
      if (!res.ok) throw new Error("Users API lỗi");
      return res.json();
    }),

    fetch("/api/weather").then((res) => {
      if (!res.ok) throw new Error("Weather API lỗi");
      return res.json();
    }),

    fetch("/api/news").then((res) => {
      if (!res.ok) throw new Error("News API lỗi");
      return res.json();
    }),
  ]);

  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      renderWidget(index, result.value);
    } else {
      renderWidgetError(index, result.reason.message);
    }
  });
}
```

## Khi nên dùng

```text
Khi muốn xử lý thành công/thất bại riêng cho từng request.
```

---

# 3. Promise.race()

## Ý nghĩa

`Promise.race()` trả kết quả của Promise hoàn tất đầu tiên.

Hoàn tất ở đây có thể là:

```text
fulfilled
hoặc
rejected
```

Promise nào xong đầu tiên thì kết quả đó được dùng.

## Scenario thực tế

Dùng để tạo timeout cho API.

Nếu API phản hồi trước 10 giây thì lấy data.

Nếu timeout xảy ra trước thì báo lỗi.

## Code

```javascript
function timeout(ms) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error("Request timeout"));
    }, ms);
  });
}

async function fetchProductWithTimeout(productId) {
  try {
    const response = await Promise.race([
      fetch(`/api/products/${productId}`),
      timeout(10000),
    ]);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const product = await response.json();

    renderProduct(product);
  } catch (error) {
    showError("Không tải được sản phẩm: " + error.message);
  }
}
```

## Khi nên dùng

```text
Khi chỉ quan tâm Promise nào hoàn tất trước.
```

Ví dụ phổ biến nhất:

```text
Timeout API
```

---

# 4. Promise.any()

## Ý nghĩa

`Promise.any()` trả về Promise đầu tiên thành công.

Nó bỏ qua các Promise bị rejected.

Chỉ reject nếu tất cả Promise đều reject.

## Scenario thực tế

App có nhiều CDN/API mirror để lấy ảnh sản phẩm.

Chỉ cần một nguồn trả ảnh thành công là hiển thị.

## Code

```javascript
async function loadProductImage(productId) {
  try {
    const imageResponse = await Promise.any([
      fetch(`https://cdn1.example.com/products/${productId}.jpg`).then(
        (res) => {
          if (!res.ok) throw new Error("CDN 1 lỗi");
          return res.url;
        },
      ),

      fetch(`https://cdn2.example.com/products/${productId}.jpg`).then(
        (res) => {
          if (!res.ok) throw new Error("CDN 2 lỗi");
          return res.url;
        },
      ),

      fetch(`https://backup.example.com/products/${productId}.jpg`).then(
        (res) => {
          if (!res.ok) throw new Error("Backup CDN lỗi");
          return res.url;
        },
      ),
    ]);

    document.querySelector("#productImage").src = imageResponse;
  } catch (error) {
    showError("Không tải được ảnh từ bất kỳ nguồn nào.");
  }
}
```

linkvideo:https://drive.google.com/drive/folders/1flJ0QtTU4Ym8tTd_To6QQh1KSLetBh_2?usp=drive_link
