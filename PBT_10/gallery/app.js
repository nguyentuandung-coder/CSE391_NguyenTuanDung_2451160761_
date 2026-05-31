const gallery = document.querySelector("#gallery");
const loading = document.querySelector("#loading");
const loadTrigger = document.querySelector("#load-trigger");

const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightboxImage");
const closeLightbox = document.querySelector("#closeLightbox");

let page = 1;
let isLoading = false;
const limit = 20;

async function fetchPhotos(pageNumber) {
  const url = `https://picsum.photos/v2/list?page=${pageNumber}&limit=${limit}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.json();
}

function showLoading() {
  loading.classList.remove("hidden");
}

function hideLoading() {
  loading.classList.add("hidden");
}

function createPhotoCard(photo) {
  const card = document.createElement("article");
  card.className = "photo-card";

  const img = document.createElement("img");
  img.alt = `Photo by ${photo.author}`;
  img.dataset.src = photo.download_url;
  img.src = "";
  img.className = "lazy-img";

  const author = document.createElement("p");
  author.textContent = `Photo by ${photo.author}`;

  card.appendChild(img);
  card.appendChild(author);

  card.addEventListener("click", function () {
    openLightbox(photo.download_url, img.alt);
  });

  imageObserver.observe(img);

  return card;
}

function renderPhotos(photos) {
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const card = createPhotoCard(photo);
    fragment.appendChild(card);
  });

  gallery.appendChild(fragment);
}

async function loadMorePhotos() {
  if (isLoading) return;

  isLoading = true;
  showLoading();

  try {
    const photos = await fetchPhotos(page);
    renderPhotos(photos);
    page++;
  } catch (error) {
    console.error(error);
    loading.textContent = "Không tải được ảnh. Vui lòng thử lại.";
  } finally {
    isLoading = false;
    hideLoading();
  }
}

function openLightbox(src, alt) {
  lightboxImage.src = src;
  lightboxImage.alt = alt;
  lightbox.classList.remove("hidden");
}

function closeLightboxModal() {
  lightbox.classList.add("hidden");
  lightboxImage.src = "";
}

const imageObserver = new IntersectionObserver(
  function (entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;

        img.src = img.dataset.src;

        observer.unobserve(img);
      }
    });
  },
  {
    root: null,
    threshold: 0.1,
  },
);

const scrollObserver = new IntersectionObserver(
  function (entries) {
    if (entries[0].isIntersecting) {
      loadMorePhotos();
    }
  },
  {
    root: null,
    rootMargin: "200px",
    threshold: 0,
  },
);

scrollObserver.observe(loadTrigger);

closeLightbox.addEventListener("click", closeLightboxModal);

lightbox.addEventListener("click", function (event) {
  if (event.target === lightbox) {
    closeLightboxModal();
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeLightboxModal();
  }
});

loadMorePhotos();
