const gallery = document.getElementById("gallery");
const loadMoreBtn = document.getElementById("loadMore");
const clearGalleryBtn = document.getElementById("clearGallery");
const removeLastBtn = document.getElementById("removeLast");
const reverseGalleryBtn = document.getElementById("reverseGallery");

let currentPage = 1;
const limit = 4;

async function loadImages() {
  try {
    const response = await fetch(
      `https://picsum.photos/v2/list?page=${currentPage}&limit=${limit}`
    );
    const data = await response.json();

    data.forEach((img) => {
      const imageElement = document.createElement("img");
      imageElement.src = img.download_url;
      imageElement.alt = img.author;
      gallery.appendChild(imageElement);
    });

    currentPage++;
  } catch (error) {
    console.error("Помилка при завантаженні зображень:", error);
  }
}

function clearGallery() {
  gallery.innerHTML = "";
  currentPage = 1;
}

function removeLastImage() {
  if (gallery.lastChild) {
    gallery.removeChild(gallery.lastChild);
  }
}
 
function reverseGallery() {
  const images = Array.from(gallery.children);
  gallery.innerHTML = "";
  images.reverse().forEach((img) => gallery.appendChild(img));
}

loadMoreBtn.addEventListener("click", loadImages);
clearGalleryBtn.addEventListener("click", clearGallery);
removeLastBtn.addEventListener("click", removeLastImage);
reverseGalleryBtn.addEventListener("click", reverseGallery);

loadImages();
