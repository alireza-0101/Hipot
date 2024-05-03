const submitBtn = $.querySelector('#submit-btn')
const alarmTitle = $.querySelector('#alarm-title')
const photoLink = $.querySelector('#photo-link')
const confirmBtnText = $.querySelector('#confirm-btn-text')
const cancelBtnText = $.querySelector('#cancel-btn-text')
const confirmBtnLink = $.querySelector('#confirm-btn-link')
const descraption = $.querySelector('#descraption')

function showAlarm() {
    axios({
        method: 'get',
        url: 'https://web-backend.iran.liara.run/hipot/alarm.json'
    })
        .then(res => {
            let alarmData = res.data

            alarmTitle.value = alarmData.alarmTitle
            photoLink.value = alarmData.photoLink
            confirmBtnText.value = alarmData.confirmBtnText
            cancelBtnText.value = alarmData.cancelBtnText
            confirmBtnLink.value = alarmData.confirmBtnLink
            descraption.value = alarmData.descraption
        })
        .catch(err => {
            Swal.fire({
                title: 'ارور در بارگیری کردن آلارم!',
                text: 'نمیتوانیم آلارم بارگیری کنیم! مشکلی در اینترنت یا دیتابیس وجود دارد.',
                icon: 'error',
                focusConfirm: false,
                confirmButtonText: 'حله فهمیدم',
            })
        })
}

function updateAlarm() {
    $.body.style.filter = 'blur(3px)'

    let alarmDataObj = {
        alarmTitle: alarmTitle.value,
        photoLink: photoLink.value,
        confirmBtnText: confirmBtnText.value,
        cancelBtnText: cancelBtnText.value,
        confirmBtnLink: confirmBtnLink.value,
        descraption: descraption.value,
    }

    axios({
        method: 'put',
        url: 'https://web-backend.iran.liara.run/hipot/alarm.json',
        data: JSON.stringify(alarmDataObj)
    })
        .then(res => {
            $.body.style.filter = 'blur(0px)'
            Swal.fire({
                title: 'اخطار با موفقیت ویرایش شد.',
                text: 'عملیات ویرایش با موفقیت انجام شد و اماده نمایش داده شدن در سایت هست.',
                icon: 'success',
                focusConfirm: false,
                confirmButtonText: 'حله فهمیدم',
            })
            showAlarm()
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
    if (alarmTitle.value.trim() && photoLink.value.trim() && confirmBtnText.value.trim() && cancelBtnText.value.trim() && confirmBtnLink.value.trim() && descraption.value.trim()) {
        updateAlarm()
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

window.addEventListener('load', showAlarm)