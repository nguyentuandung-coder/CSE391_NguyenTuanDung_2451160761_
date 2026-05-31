const searchForm = document.querySelector("#searchForm");
const cityInput = document.querySelector("#cityInput");
const stateBox = document.querySelector("#stateBox");
const historyList = document.querySelector("#historyList");

let searchHistory = JSON.parse(localStorage.getItem("weatherHistory")) || [];

function showLoading() {
  stateBox.textContent = "";

  const card = document.createElement("div");
  card.className = "loading-card";

  const spinner = document.createElement("div");
  spinner.className = "spinner";

  const text = document.createElement("p");
  text.textContent = "Đang tải...";

  card.appendChild(spinner);
  card.appendChild(text);
  stateBox.appendChild(card);
}

function showError(message) {
  stateBox.textContent = "";

  const card = document.createElement("div");
  card.className = "error-card";
  card.textContent = message;

  stateBox.appendChild(card);
}

function showWeather(data, city) {
  stateBox.textContent = "";

  const current = data.current_condition[0];

  const card = document.createElement("div");
  card.className = "weather-card";

  const title = document.createElement("h2");
  title.textContent = city;

  const icon = document.createElement("img");
  icon.src = current.weatherIconUrl[0].value;
  icon.alt = current.weatherDesc[0].value;

  const temp = document.createElement("div");
  temp.className = "temp";
  temp.textContent = `${current.temp_C}°C`;

  const humidity = document.createElement("p");
  humidity.textContent = `Độ ẩm: ${current.humidity}%`;

  const desc = document.createElement("p");
  desc.className = "desc";
  desc.textContent = current.weatherDesc[0].value;

  card.appendChild(title);
  card.appendChild(icon);
  card.appendChild(temp);
  card.appendChild(humidity);
  card.appendChild(desc);

  stateBox.appendChild(card);
}

function saveHistory(city) {
  searchHistory = searchHistory.filter(
    (item) => item.toLowerCase() !== city.toLowerCase(),
  );

  searchHistory.unshift(city);

  if (searchHistory.length > 5) {
    searchHistory.pop();
  }

  localStorage.setItem("weatherHistory", JSON.stringify(searchHistory));
  renderHistory();
}

function renderHistory() {
  historyList.textContent = "";

  searchHistory.forEach((city) => {
    const button = document.createElement("button");
    button.className = "history-btn";
    button.textContent = city;
    button.dataset.city = city;

    historyList.appendChild(button);
  });
}

async function getWeather(city) {
  showLoading();

  try {
    const url = `https://wttr.in/${encodeURIComponent(city)}?format=j1`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();

    if (!data.current_condition || data.current_condition.length === 0) {
      throw new Error("Không tìm thấy dữ liệu thời tiết.");
    }

    showWeather(data, city);
    saveHistory(city);
  } catch (error) {
    console.error(error);
    showError(
      "Không lấy được thời tiết. Kiểm tra tên thành phố hoặc kết nối mạng.",
    );
  }
}

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const city = cityInput.value.trim();

  if (city === "") {
    showError("Vui lòng nhập tên thành phố.");
    return;
  }

  getWeather(city);
  cityInput.value = "";
});

historyList.addEventListener("click", function (event) {
  if (!event.target.classList.contains("history-btn")) {
    return;
  }

  const city = event.target.dataset.city;
  getWeather(city);
});

renderHistory();
