const catSVGs = [
    'assets/Black Cat.svg',
    'assets/Grumpy Cat.svg',
    'assets/Scared Cat.svg',
    'assets/Sleepy Cat.svg'
];

const SECONDS_PER_CAT = 1;
const TOTAL_DURATION = catSVGs.length * SECONDS_PER_CAT * 1000;
const CHANGE_INTERVAL = SECONDS_PER_CAT * 1000;

let currentCatIndex = 0;
const catElement = document.getElementById('changing-cat');

function changeCat() {
    if (!catElement) return;
    
    currentCatIndex = (currentCatIndex + 1) % catSVGs.length;
    catElement.src = catSVGs[currentCatIndex];
    catElement.classList.add('changing');
    
    setTimeout(() => {
        catElement.classList.remove('changing');
    }, 400);
}

const noResponses = [
    { text: "Why not? Please click Yes!😿"},
    { text: "The cats will be sad! Click Yes!😢"},
    { text: "Are you sure? They're really cute!😔"},
    { text: "But they need your love!🥺"},
    { text: "Just one little click on Yes?🙏"},
    { text: "Pretty please with catnip on top?🐱"},
    { text: "They're waiting for you!⏳"},
    { text: "Don't make them beg!🙀"},
    { text: "You wouldn't abandon these kittens, would you?😾"},
    { text: "They've already picked out matching sweaters for you!😿" }
];

const happyEmojis = ["😻", "❤️", "🐱", "💕", "😽", "🐾", "🥰", "😺", "😸", "😹"];

let noClickCount = 0;
let emojiInterval;
const music = document.getElementById('celebrationMusic');

function showMessage() {
    const notification = document.getElementById('notificationContainer');
    const message = document.getElementById('message');
    const packageContainer = document.getElementById('packageContainer');
    
    notification.style.display = 'none';
    message.style.display = 'block';
    
    setTimeout(() => {
        message.style.display = 'none';
        packageContainer.style.display = 'flex';
    }, 2000);
}

function openPackage() {
    const box = document.getElementById('box');
    const instruction = document.querySelector('.instruction');
    const questionContainer = document.getElementById('questionContainer');
    
    if (box.classList.contains('open')) return;
    
    box.classList.add('open');
    instruction.textContent = 'Package opened!';
    
    setTimeout(() => {
        instruction.style.display = 'none';
        questionContainer.style.display = 'flex';
    }, 1500);
}

function createFloatingEmoji(emoji) {
    const emojiElement = document.createElement('div');
    emojiElement.className = 'floating-emoji';
    emojiElement.textContent = emoji;
    
    const startX = Math.random() * window.innerWidth;
    emojiElement.style.left = `${startX}px`;
    emojiElement.style.bottom = '0';
    
    const size = Math.random() * 2 + 1;
    emojiElement.style.fontSize = `${size}rem`;
    
    document.body.appendChild(emojiElement);
    
    setTimeout(() => {
        emojiElement.remove();
    }, 3000);
}

function startEmojiCelebration() {
    emojiInterval = setInterval(() => {
        const randomEmoji = happyEmojis[Math.floor(Math.random() * happyEmojis.length)];
        createFloatingEmoji(randomEmoji);
    }, 300);
}

function stopEmojiCelebration() {
    clearInterval(emojiInterval);
}

function showCelebration() {
    const celebrationContainer = document.getElementById('celebrationContainer');
    const packageContainer = document.getElementById('packageContainer');
    
    packageContainer.style.display = 'none';
    celebrationContainer.style.display = 'flex';
    music.play();
    
    setTimeout(() => {
        stopEmojiCelebration();
    }, 10000);
}

if (catElement) {
    const catInterval = setInterval(changeCat, CHANGE_INTERVAL);
    setTimeout(changeCat, 100);
    
    window.addEventListener('load', function() {
        setTimeout(function() {
            clearInterval(catInterval);
            document.body.classList.add('loaded');
            
            setTimeout(function() {
                const preloader = document.getElementById('preloader');
                if (preloader) preloader.remove();
                document.getElementById('notificationContainer').style.display = 'block';
            }, 500);
        }, TOTAL_DURATION);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const btnYes = document.getElementById('btnYes');
    const btnNo = document.getElementById('btnNo');
    const happyEmoji = document.querySelector('.happy-emoji');
    const sadEmoji = document.querySelector('.sad-emoji');
    const question = document.querySelector('.question');
    const notificationContainer = document.getElementById('notificationContainer');
    const box = document.getElementById('box');
    
    notificationContainer.addEventListener('click', showMessage);
    box.addEventListener('click', openPackage);
    
    btnYes.addEventListener('click', function() {
        this.classList.add('clicked');
        happyEmoji.classList.add('visible');
        sadEmoji.classList.remove('visible');
        this.parentElement.style.display = 'none';
        question.textContent = 'Yay! Let\'s take care of them together!';
        startEmojiCelebration();
        setTimeout(showCelebration, 5000);
    });
    
    btnNo.addEventListener('click', function() {
        sadEmoji.classList.add('visible');
        happyEmoji.classList.remove('visible');
        
        if (noClickCount >= noResponses.length) {
            question.textContent = "Oh no, you broke the button! Press Yes!";
            this.style.display = 'none';
            return;
        }
        
        const response = noResponses[noClickCount];
        question.textContent = response.text;
        noClickCount++;
        
        if (noClickCount >= noResponses.length) {
            setTimeout(() => {
                question.textContent = "Oh no, you broke the button! Press Yes!";
                this.style.display = 'none';
            }, 500);
        }
    });
});
