const envelope = document.getElementById('envelope');
const openBtn = document.getElementById('openBtn');
const closeBtn = document.getElementById('closeBtn');
const hearts = document.querySelectorAll('.heart');

let isOpen = false;

function openEnvelope() {
    if (isOpen) return;
    envelope.classList.add('open');
    isOpen = true;

    // Animate hearts with staggered delay
    hearts.forEach((heart, index) => {
        setTimeout(() => {
            heart.classList.remove('animate');
            void heart.offsetWidth; // Force reflow
            heart.classList.add('animate');
        }, index * 200 + 300);
    });
}

function closeEnvelope() {
    if (!isOpen) return;
    envelope.classList.remove('open');
    isOpen = false;
    hearts.forEach(heart => heart.classList.remove('animate'));
}

openBtn.addEventListener('click', openEnvelope);
closeBtn.addEventListener('click', closeEnvelope);
envelope.addEventListener('click', () => isOpen ? closeEnvelope() : openEnvelope());
