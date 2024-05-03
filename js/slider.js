const swiperWrapper = $.querySelector('.swiper-wrapper')

function getSlides() {
    axios({
        method: 'get',
        url: 'https://web-backend.iran.liara.run/hipot/slider'
    })
        .then(res => {
            let sliderDatas = Object.entries(res.data)

            swiperWrapper.innerHTML = ''

            sliderDatas.forEach(sliderData => {
            swiperWrapper.insertAdjacentHTML('afterbegin', `
                    <div class="swiper-slide">
                        <a target="_blank" href="${sliderData[1].sliderLink}">
                            <img src="${sliderData[1].sliderPhotoLink}" alt="main-slide">
                        </a>
                    </div>
                `)
            })

            const swiper = new Swiper('.swiper', {
                loop: true,
                lazy: true,
            
                autoplay: {
                    delay: 2500,
                },
            
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                },
            
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                },
            })
        })
        .catch(err => {
            console.log(err)
        })
}

window.addEventListener('load', getSlides)