let current = 0;
const pages = document.querySelectorAll(".page");
const totalPages = pages.length;

/* Assign initial z-index */
pages.forEach((page, index) => {
    page.style.zIndex = totalPages - index;
});

function updatePages() {
    pages.forEach((page, index) => {
        if (index < current) {
            page.classList.add("flipped");
            page.style.zIndex = index; // send behind
        } else {
            page.classList.remove("flipped");
            page.style.zIndex = totalPages - index; // bring front
        }
    });
}

function nextPage() {
    if (current < totalPages) {
        current++;
        updatePages();
    }
}

function prevPage() {
    if (current > 0) {
        current--;
        updatePages();
    }
}

/* Mobile swipe */
let startX = 0;

document.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
});

document.addEventListener("touchend", e => {
    let endX = e.changedTouches[0].clientX;
    if (startX - endX > 60) nextPage();
    if (endX - startX > 60) prevPage();
});
document.addEventListener("click", () => {
    const music = document.getElementById("bgMusic");
    if (music.paused) {
        music.volume = 0.4;
        music.play();
    }
}, { once: true });

