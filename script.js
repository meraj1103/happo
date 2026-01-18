let current = 0;
const pages = document.querySelectorAll(".page");
const totalPages = pages.length;

/* Music setup */
const music = document.getElementById("bgMusic");
let musicStarted = false;

function startMusic() {
    if (!musicStarted) {
        music.volume = 0.4; // soft background
        music.play();
        musicStarted = true;
    }
}

/* Assign initial z-index */
pages.forEach((page, index) => {
    page.style.zIndex = totalPages - index;
});

function updatePages() {
    pages.forEach((page, index) => {
        if (index < current) {
            page.classList.add("flipped");
            page.style.zIndex = index;
        } else {
            page.classList.remove("flipped");
            page.style.zIndex = totalPages - index;
        }
    });
}

function nextPage() {
    startMusic(); // 🎵 start music on page flip
    if (current < totalPages) {
        current++;
        updatePages();
    }
}

function prevPage() {
    startMusic(); // 🎵 start music on page flip
    if (current > 0) {
        current--;
        updatePages();
    }
}

/* Mobile swipe */
let startX = 0;

document.addEventListener("touchstart", e => {
    startMusic(); // 🎵 start on first touch
    startX = e.touches[0].clientX;
}, { once: true });

document.addEventListener("touchend", e => {
    let endX = e.changedTouches[0].clientX;
    if (startX - endX > 60) nextPage();
    if (endX - startX > 60) prevPage();
});

/* Start music on first click anywhere */
document.addEventListener("click", startMusic, { once: true });
