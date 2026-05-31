const images = [
  { title: "Mountain", src: "https://placehold.co/800x450?text=Image+1" },
  { title: "Forest", src: "https://placehold.co/800x450?text=Image+2" },
  { title: "Ocean", src: "https://placehold.co/800x450?text=Image+3" },
  { title: "City", src: "https://placehold.co/800x450?text=Image+4" },
  { title: "Desert", src: "https://placehold.co/800x450?text=Image+5" },
  { title: "River", src: "https://placehold.co/800x450?text=Image+6" },
  { title: "Snow", src: "https://placehold.co/800x450?text=Image+7" },
  { title: "Night", src: "https://placehold.co/800x450?text=Image+8" },
  { title: "Sunset", src: "https://placehold.co/800x450?text=Image+9" },
];

const mainImage = document.querySelector("#mainImage");
const imageTitle = document.querySelector("#imageTitle");
const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");
const playBtn = document.querySelector("#playBtn");
const openModalBtn = document.querySelector("#openModal");

const imageModal = document.querySelector("#imageModal");
const modalImage = document.querySelector("#modalImage");
const closeModalBtn = document.querySelector("#closeModal");

const openPaletteBtn = document.querySelector("#openPalette");
const palette = document.querySelector("#palette");
const commandInput = document.querySelector("#commandInput");
const commandList = document.querySelector("#commandList");

let currentIndex = 0;
let isPlaying = false;
let slideTimer = null;
let lastFocusedElement = null;

const commands = [
  { name: "Next image", action: nextImage },
  { name: "Previous image", action: prevImage },
  { name: "Play slideshow", action: playSlideshow },
  { name: "Pause slideshow", action: pauseSlideshow },
  { name: "Open image modal", action: openImageModal },
];

function renderImage() {
  const image = images[currentIndex];

  mainImage.src = image.src;
  mainImage.alt = image.title;
  imageTitle.textContent = `${currentIndex + 1}. ${image.title}`;

  modalImage.src = image.src;
  modalImage.alt = image.title;
}

function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  renderImage();
}

function prevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  renderImage();
}

function goToImage(index) {
  if (index >= 0 && index < images.length) {
    currentIndex = index;
    renderImage();
  }
}

function playSlideshow() {
  if (isPlaying) return;

  isPlaying = true;
  playBtn.textContent = "⏸ Pause";

  slideTimer = setInterval(function () {
    nextImage();
  }, 1500);
}

function pauseSlideshow() {
  isPlaying = false;
  playBtn.textContent = "▶ Play";

  clearInterval(slideTimer);
}

function toggleSlideshow() {
  if (isPlaying) {
    pauseSlideshow();
  } else {
    playSlideshow();
  }
}

function openImageModal() {
  lastFocusedElement = document.activeElement;
  imageModal.classList.remove("hidden");
  closeModalBtn.focus();
}

function closeImageModal() {
  imageModal.classList.add("hidden");

  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

function renderCommands(keyword = "") {
  commandList.textContent = "";

  const filteredCommands = commands.filter((command) =>
    command.name.toLowerCase().includes(keyword.toLowerCase()),
  );

  filteredCommands.forEach((command, index) => {
    const li = document.createElement("li");
    li.className = "command-item";
    li.textContent = command.name;
    li.dataset.index = index;

    if (index === 0) {
      li.classList.add("active");
    }

    commandList.appendChild(li);
  });
}

function openCommandPalette() {
  lastFocusedElement = document.activeElement;

  palette.classList.remove("hidden");
  commandInput.value = "";
  renderCommands();

  commandInput.focus();
}

function closeCommandPalette() {
  palette.classList.add("hidden");

  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

function executeActiveCommand() {
  const activeItem = commandList.querySelector(".command-item.active");

  if (!activeItem) return;

  const commandName = activeItem.textContent;

  const command = commands.find((item) => item.name === commandName);

  if (command) {
    command.action();
    closeCommandPalette();
  }
}

prevBtn.addEventListener("click", prevImage);
nextBtn.addEventListener("click", nextImage);
playBtn.addEventListener("click", toggleSlideshow);
openModalBtn.addEventListener("click", openImageModal);
closeModalBtn.addEventListener("click", closeImageModal);
openPaletteBtn.addEventListener("click", openCommandPalette);

imageModal.addEventListener("click", function (event) {
  if (event.target === imageModal) {
    closeImageModal();
  }
});

palette.addEventListener("click", function (event) {
  if (event.target === palette) {
    closeCommandPalette();
  }
});

commandInput.addEventListener("input", function () {
  renderCommands(commandInput.value);
});

commandInput.addEventListener("keydown", function (event) {
  const items = Array.from(commandList.querySelectorAll(".command-item"));
  const currentActiveIndex = items.findIndex((item) =>
    item.classList.contains("active"),
  );

  if (event.key === "ArrowDown") {
    event.preventDefault();

    const nextIndex = Math.min(currentActiveIndex + 1, items.length - 1);

    items.forEach((item) => item.classList.remove("active"));

    if (items[nextIndex]) {
      items[nextIndex].classList.add("active");
    }
  }

  if (event.key === "ArrowUp") {
    event.preventDefault();

    const prevIndex = Math.max(currentActiveIndex - 1, 0);

    items.forEach((item) => item.classList.remove("active"));

    if (items[prevIndex]) {
      items[prevIndex].classList.add("active");
    }
  }

  if (event.key === "Enter") {
    event.preventDefault();
    executeActiveCommand();
  }
});

commandList.addEventListener("click", function (event) {
  if (!event.target.classList.contains("command-item")) {
    return;
  }

  const commandName = event.target.textContent;
  const command = commands.find((item) => item.name === commandName);

  if (command) {
    command.action();
    closeCommandPalette();
  }
});

document.addEventListener("keydown", function (event) {
  const isPaletteOpen = !palette.classList.contains("hidden");
  const isModalOpen = !imageModal.classList.contains("hidden");

  if (event.ctrlKey && event.key.toLowerCase() === "k") {
    event.preventDefault();
    openCommandPalette();
    return;
  }

  if (event.key === "Escape") {
    if (isPaletteOpen) {
      closeCommandPalette();
      return;
    }

    if (isModalOpen) {
      closeImageModal();
      return;
    }
  }

  if (isPaletteOpen || isModalOpen) {
    return;
  }

  if (event.key === "ArrowRight") {
    nextImage();
  }

  if (event.key === "ArrowLeft") {
    prevImage();
  }

  if (event.key >= "1" && event.key <= "9") {
    goToImage(Number(event.key) - 1);
  }

  if (event.code === "Space") {
    event.preventDefault();
    toggleSlideshow();
  }
});

renderImage();
