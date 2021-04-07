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
