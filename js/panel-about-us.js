const submitBtn = $.querySelector('#submit-btn')
const textBox = document.querySelector('#text-box')

let editorRes = null

function creatEditor() {
    ClassicEditor.create(textBox, {
        language: 'fa'
    })
        .then(res => editorRes = res)
        .catch(err => {
            Swal.fire({
                title: 'ارور در ایجاد کردن ادیتور!',
                text: 'نمیتوانیم ادیتور را ایجاد کنیم! صفحه را رفرش یا بعدا امتحان کنید..',
                icon: 'error',
                focusConfirm: false,
                confirmButtonText: 'حله فهمیدم',
            })
        })
}

function showAboutus() {
    axios({
        method: 'get',
        url: 'https://web-backend.iran.liara.run/hipot/aboutus.json'
    })
        .then(res => {
            let aboutUsData = res.data.HTMLTemplate

            editorRes.setData(aboutUsData)
        })
        .catch(err => {
            Swal.fire({
                title: 'ارور در بارگیری کردن درباره ما!',
                text: 'نمیتوانیم درباره ما را بارگیری کنیم! مشکلی در اینترنت یا دیتابیس وجود دارد.',
                icon: 'error',
                focusConfirm: false,
                confirmButtonText: 'حله فهمیدم',
            })
        })
}

function updateAboutUs() {
    $.body.style.filter = 'blur(3px)'

    let aboutUsObj = {
        HTMLTemplate: editorRes.getData()
    }

    axios({
        method: 'put',
        url: 'https://web-backend.iran.liara.run/hipot/aboutus.json',
        data: JSON.stringify(aboutUsObj)
    })
        .then(res => {
            $.body.style.filter = 'blur(0px)'
            Swal.fire({
                title: 'درباره ما با موفقیت ویرایش شد.',
                text: 'عملیات ویرایش با موفقیت انجام شد و اماده نمایش داده شدن در سایت هست.',
                icon: 'success',
                focusConfirm: false,
                confirmButtonText: 'حله فهمیدم',
            })
            showAboutus()
        })
        .catch(err => {
            $.body.style.filter = 'blur(0px)'
            Swal.fire({
                title: 'عملیات انجام نشد!',
                text: 'ظاهرا اروری داریم و عملیات ویرایش انجام نمیشه! لطفا دوباره امتحان کنید.',
                icon: 'error',
                focusConfirm: false,
                confirmButtonText: 'حله فهمیدم',
            })
        })
}

submitBtn.addEventListener('click', () => {
    if (editorRes.getData()) {
        updateAboutUs()
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

window.addEventListener('load', () => {
    creatEditor()
    showAboutus()
})
