const submitBtn = $.querySelector('#submit-btn')
const sliderPhotoLink = $.querySelector('#slider-photo-link')
const sliderLink = $.querySelector('#slider-link')
const sliderBoxWraper = $.querySelector('#slider-box-wraper')

function showSlider() {
    axios({
        method: 'get',
        url: 'https://web-backend.iran.liara.run/hipot/slider.json'
    })
        .then(res => {
            let sliderDatas = Object.entries(res.data)

            sliderBoxWraper.innerHTML = ''

            sliderDatas.forEach(sliderData => {
                console.log(sliderData);
                sliderBoxWraper.insertAdjacentHTML('afterbegin', `
                    <div class="slide">
                        <div class="slide-icons">
                            <a target="_blank" href="${sliderData[1].sliderLink}"><i class="bi bi-box-arrow-up-right"></i></a>
                            <i onclick="removeSlide('${sliderData[0]}')" class="bi bi-x-circle"></i>
                        </div>
                        <img src="${sliderData[1].sliderPhotoLink}" alt="slider">
                    </div>
                `)
            })
        })
        .catch(err => {
            Swal.fire({
                title: 'ارور در بارگیری کردن اسلایدر!',
                text: 'نمیتوانیم اسلایدر را بارگیری کنیم! مشکلی در اینترنت یا دیتابیس وجود دارد.',
                icon: 'error',
                focusConfirm: false,
                confirmButtonText: 'حله فهمیدم',
            })
        })
}

function setSlide() {
    $.body.style.filter = 'blur(3px)'

    let slideDataObj = {
        sliderPhotoLink: sliderPhotoLink.value,
        sliderLink: sliderLink.value,
    }

    axios({
        method: 'post',
        url: 'https://web-backend.iran.liara.run/hipot/slider.json',
        data: JSON.stringify(slideDataObj)
    })
        .then(res => {
            $.body.style.filter = 'blur(0px)'
            Swal.fire({
                title: 'اسلاید با موفقیت افزوده شد.',
                text: 'عملیات ثبت با موفقیت انجام شد و اماده نمایش داده شدن در سایت هست.',
                icon: 'success',
                focusConfirm: false,
                confirmButtonText: 'حله فهمیدم',
            })
            showSlider()
            clearInputs()
        })
        .catch(err => {
            $.body.style.filter = 'blur(0px)'
            Swal.fire({
                title: 'عملیات انجام نشد!',
                text: 'ظاهرا اروری داریم و عملیات ثبت انجام نمیشه! لطفا دوباره امتحان کنید.',
                icon: 'error',
                focusConfirm: false,
                confirmButtonText: 'حله فهمیدم',
            })
        })
}

function removeSlide(slideId) {
    Swal.fire({
        title: 'از حذف مطمئنی؟',
        text: "آیا مطمئن هستید که میخواهید این اسلاید رو حذف کنید؟",
        icon: 'info',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        confirmButtonText: 'حله بزن بریم',
        focusConfirm: false,
        cancelButtonText: 'نه اشتباه شده'
    }).then((result) => {
        if (result.isConfirmed) {
            axios({
                method: 'delete',
                url: `https://web-backend.iran.liara.run/hipot/slider/${slideId}.json`,
            })
                .then(res => {
                    console.log(res);
                    Swal.fire({
                        title: 'عملیات موفقیت آمیز بود.',
                        text: 'اسلاید به درستی از سایت حذف شد و مشکلی وجود ندارد.',
                        icon: 'success',
                        focusConfirm: false,
                        confirmButtonText: 'حله فهمیدم',
                    })
                    showSlider()
                })
                .catch(err => {
                    console.log(err);
                    Swal.fire({
                        title: 'عملیات به درستی انجام نشد!',
                        text: 'عملیات حذف اسلاید به درستی به اتمام نرسید، مشکل را بررسی و دوباره امتحان کنید.',
                        icon: 'error',
                        focusConfirm: false,
                        confirmButtonText: 'حله فهمیدم',
                    })
                })
        }
    })
}

function clearInputs() {
    sliderPhotoLink.value = ''
    sliderLink.value = ''
}

submitBtn.addEventListener('click', () => {
    if (sliderPhotoLink.value.trim() && sliderLink.value.trim()) {
        setSlide()
    } else {
        Swal.fire({
            title: 'مقادیر وارد نشده!',
            text: 'لطفا تمامی مقدار هارا وارد کنید.',
            icon: 'warning',
            focusConfirm: false,
            confirmButtonText: 'حله فهمیدم',
        })
    }
})

window.addEventListener('load', showSlider)
