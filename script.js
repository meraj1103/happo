let current = 0;
const pages = document.querySelectorAll(".page");
const totalPages = pages.length;

const music = document.getElementById("bgMusic");
let musicStarted = false;

function startMusic() {
    if (!musicStarted) {
        music.volume = 0.4;
        music.play().catch(()=>{});
        musicStarted = true;
    }
}

function toggleMusic() {
    if (music.paused) music.play();
    else music.pause();
}

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
    startMusic();
    if (current < totalPages) {
        current++;
        updatePages();
    }
}

function prevPage() {
    startMusic();
    if (current > 0) {
        current--;
        updatePages();
    }
}

document.addEventListener("click", startMusic, { once: true });
document.addEventListener("touchstart", startMusic, { once: true });

let startX = 0;
document.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
});
document.addEventListener("touchend", e => {
    let endX = e.changedTouches[0].clientX;
    if (startX - endX > 60) nextPage();
    if (endX - startX > 60) prevPage();
});
