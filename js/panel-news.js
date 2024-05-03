const submitBtn = $.querySelector('#submit-btn')
const newsTitle = $.querySelector('#news-title')
const newsWriterName = $.querySelector('#news-writer-name')
const newsCoverLink = $.querySelector('#news-cover-link')
const newsCategory = $.querySelector('#news-category')
const newsDescraption = $.querySelector('#news-descraption')
const textBox = $.querySelector('#text-box')
const newsBoxWraper = $.querySelector('#news-box-wraper')

let newsHtmlTemplate = null

ClassicEditor.create(textBox, {
    language: 'fa'
})
    .then(res => newsHtmlTemplate = res)
    .catch(err => console.log(err))


function setNews() {
    $.body.style.filter = 'blur(3px)'

    let newsDataObj = {
        title: newsTitle.value,
        newsWriterName: newsWriterName.value,
        coverLink: newsCoverLink.value,
        category: newsCategory.value,
        descraption: newsDescraption.value,
        htmlTemplate: newsHtmlTemplate.getData(),
        newsCreatTime: getNowDate(),
    }

    axios({
        method: 'post',
        url: 'https://web-backend.iran.liara.run/hipot/news.json',
        data: JSON.stringify(newsDataObj)
    })
        .then(res => {
            $.body.style.filter = 'blur(0px)'
            Swal.fire({
                title: 'خبر با موفقیت افزوده شد.',
                text: 'عملیات ثبت با موفقیت انجام شد و اماده نمایش داده شدن در سایت هست.',
                icon: 'success',
                focusConfirm: false,
                confirmButtonText: 'حله فهمیدم',
            })
            showNews()
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

function showNews() {
    axios({
        method: 'get',
        url: 'https://web-backend.iran.liara.run/hipot/news.json'
    })
        .then(res => {
            let newsDatas = Object.entries(res.data)

            newsBoxWraper.innerHTML = ''

            newsDatas.forEach(newsData => {
                newsBoxWraper.insertAdjacentHTML('afterbegin', `
                    <div class="news-item">
                        <div class="news-wrapper">
                            <img src="${newsData[1].coverLink}" alt="news-image">
                        </div>
                        
                        <div class="list-item-data">
                            <h2>${newsData[1].title}</h2>
                            <p>${newsData[1].descraption}</p>
                            <span>- ${newsData[1].category} -</span>
                        </div>

                        <div class="edit-and-remove-btns">
                            <span>ویرایش به علت تاثیر منفی در سئو حذف شده است.</span>
                            <button onclick="removeNews('${newsData[0]}')" class="remove"><i class="bi bi-x-octagon"></i> حذف</button>
                        </div>
                    </div>
                `)
            })
        })
        .catch(err => {
            Swal.fire({
                title: 'ارور در بارگیری کردن خبر ها!',
                text: 'نمیتوانیم خبر هارا بارگیری کنیم! مشکلی در اینترنت یا دیتابیس وجود دارد.',
                icon: 'error',
                focusConfirm: false,
                confirmButtonText: 'حله فهمیدم',
            })
        })
}

function removeNews(newsId) {
    Swal.fire({
        title: 'از حذف مطمئنی؟',
        text: "آیا مطمئن هستید که میخواهید این خبر رو حذف کنید؟",
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
                url: `https://web-backend.iran.liara.run/hipot/news/${newsId}.json`,
            })
                .then(res => {
                    console.log(res);
                    Swal.fire({
                        title: 'عملیات موفقیت آمیز بود.',
                        text: 'خبر به درستی از سایت حذف شد و مشکلی وجود ندارد.',
                        icon: 'success',
                        focusConfirm: false,
                        confirmButtonText: 'حله فهمیدم',
                    })
                    showNews()
                })
                .catch(err => {
                    console.log(err);
                    Swal.fire({
                        title: 'عملیات به درستی انجام نشد!',
                        text: 'عملیات حذف خبر به درستی به اتمام نرسید، مشکل را بررسی و دوباره امتحان کنید.',
                        icon: 'error',
                        focusConfirm: false,
                        confirmButtonText: 'حله فهمیدم',
                    })
                })
        }
    })
}

function clearInputs() {
    newsTitle.value = ''
    newsWriterName.value = ''
    newsCoverLink.value = ''
    newsCategory.value = ''
    newsDescraption.value = ''
    newsHtmlTemplate.setData('')
}

function getNowDate() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const now = new Date()

    let nowMonthNum = now.getMonth()
    let nowDayOfMonth = now.getDate()
    let nowYear = now.getFullYear()
    let nowDayNum = now.getDay()
    let nowHours = now.getHours()
    let nowMinutes = now.getMinutes()
    let nowSeconds = now.getSeconds()

    return `${months[nowMonthNum]} ${nowDayOfMonth}, ${nowYear} (${days[nowDayNum]}) - ${nowHours}:${nowMinutes}:${nowSeconds}`
}

submitBtn.addEventListener('click', () => {
    if (newsTitle.value.trim() && newsWriterName.value.trim() && newsCoverLink.value.trim() && newsCategory.value.trim() && newsDescraption.value.trim()) {
        setNews()
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
window.addEventListener('load', showNews)