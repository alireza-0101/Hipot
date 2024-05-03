const submitBtn = $.querySelector('#submit-btn')
const adminName = $.querySelector('#admin-name')
const adminUsername = $.querySelector('#admin-username')
const adminPassword = $.querySelector('#admin-password')
const adminConfirmPassword = $.querySelector('#admin-confirm-password')
const adminEmail = $.querySelector('#admin-email')
const adminPhoneNumber = $.querySelector('#admin-phone-number')
const adminProfile = $.querySelector('#admin-profile')
const adminAccess = $.querySelector('#admin-access')
const adminsBoxWraper = $.querySelector('#admins-box-wraper')

let emailRegex = /^\w+@\w{3,20}\.\w{2,3}$/
let phoneNumberRegex = /^0?9[0-9]{9}$/

function showAdmins() {
    axios({
        method: 'get',
        url: 'https://web-backend.iran.liara.run/hipot/admins.json'
    })
        .then(res => {
            let adminsDatas = Object.entries(res.data)

            adminsBoxWraper.innerHTML = ''

            adminsDatas.forEach(adminData => {
                adminsBoxWraper.insertAdjacentHTML('afterbegin', `
                    <div class="admin-item">
                        <img src="${adminData[1].profile}" alt="profile">
                        <div class="admin-data">
                            <span><b>نام ادمین:</b> ${adminData[1].name}</span>
                            <span><b>نام کاربری:</b> ${adminData[1].username}</span>
                            <span><b>پسورد:</b> ${adminData[1].password}</span>
                            <span><b>ایمیل:</b> ${adminData[1].email}</span>
                            <span><b>شماره تلفن:</b> ${adminData[1].phonenumber}</span>
                            <span><b>دسترسی:</b> ${adminData[1].access === 'full' ? 'کامل' : 'محدود'}</span>
                        </div>
                        <div class="btns">
                            <i onclick="removeAdmin('${adminData[0]}')" class="bi bi-trash"></i>
                        </div>
                    </div>
                `)
            })
        })
        .catch(err => {
            Swal.fire({
                title: 'ارور در بارگیری کردن ادمین ها!',
                text: 'نمیتوانیم ادمین هارا بارگیری کنیم! مشکلی در اینترنت یا دیتابیس وجود دارد.',
                icon: 'error',
                focusConfirm: false,
                confirmButtonText: 'حله فهمیدم',
            })
        })
}

function setAdmin() {
    $.body.style.filter = 'blur(3px)'

    let adminDataObj = {
        name: adminName.value,
        username: adminUsername.value,
        password: adminPassword.value,
        email: adminEmail.value,
        phonenumber: adminPhoneNumber.value,
        profile: adminProfile.value,
        access: adminAccess.value,
    }

    axios({
        method: 'post',
        url: 'https://web-backend.iran.liara.run/hipot/admins.json',
        data: JSON.stringify(adminDataObj)
    })
        .then(res => {
            $.body.style.filter = 'blur(0px)'
            Swal.fire({
                title: 'ادمین با موفقیت افزوده شد.',
                text: 'عملیات ثبت با موفقیت انجام شد و اماده نمایش داده شدن در سایت هست.',
                icon: 'success',
                focusConfirm: false,
                confirmButtonText: 'حله فهمیدم',
            })
            showAdmins()
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

function clearInputs() {
    adminName.value = ''
    adminUsername.value = ''
    adminPassword.value = ''
    adminConfirmPassword.value = ''
    adminEmail.value = ''
    adminPhoneNumber.value = ''
    adminProfile.value = ''
    adminAccess.value = ''
}

function valueValidator() {
    if (adminName.value.trim() && adminUsername.value.trim() && adminPassword.value.trim() && adminConfirmPassword.value.trim() && adminEmail.value.trim() && adminPhoneNumber.value.trim() && adminProfile.value.trim() && adminAccess.value.trim()) {
        if (adminPassword.value === adminConfirmPassword.value && adminPassword.value.length >= 6 && adminUsername.value.length >= 6) {
            if (emailRegex.test(adminEmail.value) && phoneNumberRegex.test(adminPhoneNumber.value)) {
                setAdmin()
            } else {
                Swal.fire({
                    title: 'شماره تلفن یا ایمیل معتبر نیست!',
                    text: 'شماره تلفن یا ایمیل شما معتبر نیست! لطفا این دو مقدار را بررسی کنید و دوباره امتحان کنید.',
                    icon: 'warning',
                    focusConfirm: false,
                    confirmButtonText: 'حله فهمیدم',
                })
            }
        } else {
            Swal.fire({
                title: 'پسورد یا نام کاربری معتبر نیست!',
                text: 'نام کاربری و پسورد باید حداقل 6 کاراکتر باشد و تایید پسورد مثل خود پسورد باشد.',
                icon: 'warning',
                focusConfirm: false,
                confirmButtonText: 'حله فهمیدم',
            })
        }
    } else {
        Swal.fire({
            title: 'مقادیر وارد نشده!',
            text: 'لطفا تمامی مقدار هارا وارد کنید.',
            icon: 'warning',
            focusConfirm: false,
            confirmButtonText: 'حله فهمیدم',
        })
    }
}

function removeAdmin(adminId) {
    Swal.fire({
        title: 'از حذف مطمئنی؟',
        text: "آیا مطمئن هستید که میخواهید این ادمین رو حذف کنید؟",
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
                url: `https://web-backend.iran.liara.run/hipot/admins/${adminId}.json`,
            })
                .then(res => {
                    console.log(res);
                    Swal.fire({
                        title: 'عملیات موفقیت آمیز بود.',
                        text: 'ادمین به درستی از سایت حذف شد و مشکلی وجود ندارد.',
                        icon: 'success',
                        focusConfirm: false,
                        confirmButtonText: 'حله فهمیدم',
                    })
                    showAdmins()
                })
                .catch(err => {
                    console.log(err);
                    Swal.fire({
                        title: 'عملیات به درستی انجام نشد!',
                        text: 'عملیات حذف ادمین به درستی به اتمام نرسید، مشکل را بررسی و دوباره امتحان کنید.',
                        icon: 'error',
                        focusConfirm: false,
                        confirmButtonText: 'حله فهمیدم',
                    })
                })
        }
    })
}

function clearInputs() {
    
}

submitBtn.addEventListener('click', valueValidator)
window.addEventListener('load', showAdmins)