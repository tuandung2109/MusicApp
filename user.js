const options = document.querySelectorAll('.nav-bottom__btn')
const items = document.querySelectorAll('.item')
const switchElement = document.querySelector(".switch");
const bodyElement = document.querySelector('body')
const appElement = document.querySelector('.app')
const textElement = document.querySelector('.content__sub-title span')
console.log(textElement)

// xử lý dark mode
switchElement.addEventListener('click', function() {
    bodyElement.classList.toggle('body-darkMode')
    appElement.classList.toggle('dark-mode')
})

// xử lý chuyển đổi qua lại nav bottom
options.forEach((option, index) => {
    const item = items[index]
    option.addEventListener('click', function() {
        document.querySelector('.item.active').classList.remove('active')
        document.querySelector('.nav-bottom__btn.active').classList.remove('active')
        this.classList.add('active')
        item.classList.add('active')
    })
})

// xử lý animation text
const textContent = ['Front-End Developer', 'Student studying at HOU']
let index = 0
const animationText = ((element, text, isReversed) => {
    let currentIndex = isReversed ? text.length : 0
    const interve = isReversed ? -1 : 1

    const animate = setInterval(() => {
        element.textContent = text.substring(0, currentIndex)
        currentIndex += interve

        if (isReversed ? currentIndex < 0 : currentIndex > text.length) {
            clearInterval(animate)
            setTimeout(() => {
                if (isReversed) {
                    index = (index + 1) % textContent.length
                }
                animationText(element, textContent[index], !isReversed)
            }, 1000)
        }
    }, 80)
})
animationText(textElement, textContent[index], false)

// xử lý khi người dùng reload trang hoặc nhấn phím f5
window.addEventListener('beforeunload', function (e) {
    // Hủy bỏ sự kiện mặc định (hiển thị hộp thoại xác nhận)
    e.preventDefault();
});



