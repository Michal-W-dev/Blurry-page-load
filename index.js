// Blurry loading ------------------------------------
const bg = document.querySelector('.page-bg')
const loader = document.querySelector('.loader')
const searches = document.querySelectorAll('.search')

let load = 0;
let blur = 25;

bg.style.filter = `blur(${blur}px)`

searches.forEach(search => search.addEventListener('click', function (evt) {
    evt.stopPropagation()
    this.classList.toggle('active')
    this.querySelector('input').focus()
}))

document.body.addEventListener('click', () => {
    searches.forEach(search => search.classList.remove('active'))
})

const id = setInterval(() => {
    if (load < 100) {
        if (load % 4 === 0) blur--; bg.style.filter = `blur(${blur}px)`;
        load++;
        loader.textContent = load + '%';
        loader.style.opacity = 1 - load / 100
    }

    else {
        clearInterval(id);
        bg.style.transform = 'scale(1.05)';
        setTimeout(() => {
            let bgImg = new Image();
            bgImg.onload = (() => bg.style.background = `url('${bgImg.src}') center/cover`)
            bgImg.src = 'imgs/1-large.jpg'
        }, 250)
    }
}, 10)

// Progress bar ----------------------------------------
const progress = document.querySelector('.progress')
const prev = document.querySelector('.btn-prev')
const next = document.querySelector('.btn-next')
const circles = document.querySelectorAll('.circle')
const actives = document.querySelectorAll('.active')

let currentActive = 1;
const circlesLength = circles.length;


function disableBtns() {
    if (currentActive === 1) {
        prev.disabled = true;
    } else if (currentActive === circles.length) {
        next.disabled = true;
    } else {
        prev.disabled = false;
        next.disabled = false
    }
}

function update() {
    circles.forEach((circle, i) => {
        if (currentActive > i) {
            circle.classList.add('active');
        } else circle.classList.remove('active');
    })
    let width = ((currentActive - 1) / (circlesLength - 1)) * 99
    progress.style.width = width + '%'
    disableBtns()
}

next.addEventListener('click', () => {
    currentActive++
    if (currentActive > circles.length) {
        currentActive = circles.length;
    }
    update()
})

prev.addEventListener('click', () => {
    currentActive--

    if (currentActive <= 1) {
        currentActive = 1;
    }
    update()
})
