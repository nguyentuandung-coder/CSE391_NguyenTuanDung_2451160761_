const refreshBtn = document.querySelector("#refreshBtn");
const loadTime = document.querySelector("#loadTime");

const widgets = [
    {
        id: "usersWidget",
        title: "Users"
    },
    {
        id: "weatherWidget",
        title: "Weather"
    },
    {
        id: "dogWidget",
        title: "Random Dog"
    }
];

function getWidgetBody(index) {
    return document.querySelector(`#${widgets[index].id} .widget-body`);
}

function setWidgetLoading(index) {
    const body = getWidgetBody(index);
    body.textContent = "";

    const loading = document.createElement("p");
    loading.className = "loading";
    loading.textContent = "Đang tải...";

    body.appendChild(loading);
}

function renderWidgetError(index, message) {
    const body = getWidgetBody(index);
    body.textContent = "";

    const error = document.createElement("p");
    error.className = "error";
    error.textContent = `Lỗi: ${message}`;

    body.appendChild(error);
}

function renderUsers(data) {
    const body = getWidgetBody(0);
    body.textContent = "";

    data.slice(0, 5).forEach(user => {
        const item = document.createElement("div");
        item.className = "user-item";

        const name = document.createElement("strong");
        name.textContent = user.name;

        const email = document.createElement("p");
        email.textContent = user.email;

        item.appendChild(name);
        item.appendChild(email);
        body.appendChild(item);
    });
}

function renderWeather(data) {
    const body = getWidgetBody(1);
    body.textContent = "";

    const title = document.createElement("p");
    title.textContent = "Hà Nội";

    const temp = document.createElement("div");
    temp.className = "weather-temp";
    temp.textContent = `${data.current_weather.temperature}°C`;

    const wind = document.createElement("p");
    wind.textContent = `Wind speed: ${data.current_weather.windspeed} km/h`;

    body.appendChild(title);
    body.appendChild(temp);
    body.appendChild(wind);
}

function renderDog(data) {
    const body = getWidgetBody(2);
    body.textContent = "";

    const text = document.createElement("p");
    text.textContent = "Random dog image";

    const img = document.createElement("img");
    img.className = "dog-img";
    img.src = data.message;
    img.alt = "Random dog";

    body.appendChild(text);
    body.appendChild(img);
}

function renderWidget(index, data) {
    if (index === 0) {
        renderUsers(data);
    }

    if (index === 1) {
        renderWeather(data);
    }

    if (index === 2) {
        renderDog(data);
    }
}

async function fetchJson(url) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }

    return response.json();
}

async function loadDashboard() {
    const startTime = Date.now();

    loadTime.textContent = "Đang tải dashboard...";

    for (let i = 0; i < widgets.length; i++) {
        setWidgetLoading(i);
    }

    const results = await Promise.allSettled([
        fetchJson("https://jsonplaceholder.typicode.com/users"),
        fetchJson("https://api.open-meteo.com/v1/forecast?latitude=21.03&longitude=105.85&current_weather=true"),
        fetchJson("https://dog.ceo/api/breeds/image/random")
    ]);

    results.forEach((result, index) => {
        if (result.status === "fulfilled") {
            renderWidget(index, result.value);
        } else {
            renderWidgetError(index, result.reason.message);
        }
    });

    loadTime.textContent = `Data loaded in ${Date.now() - startTime} ms`;
}

refreshBtn.addEventListener("click", loadDashboard);

loadDashboard();