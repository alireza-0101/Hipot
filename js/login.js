const $ = document

const usernameInput = $.querySelector('.username-input')
const passInput = $.querySelector('.password-2-input')
const submitBtn = $.querySelector('.submit-btn')
const form = $.querySelector('.box-singup-div')

let usernameIsValid, passIsValid = null

form.addEventListener('submit', event => event.preventDefault())

submitBtn.addEventListener('click', () => {
    axios({
        method: 'get',
        url: 'https://web-backend.iran.liara.run/hipot/admins.json'
    })
        .then(res => {
            let adminsDatas = Object.entries(res.data)

            let targetAdmin = adminsDatas.find(admin => {
                return admin[1].username === usernameInput.value && admin[1].password === passInput.value
            })

            if (targetAdmin) {
                localStorage.setItem('admin', targetAdmin[0])
                location.href = 'panel.html'
            } else {
                Swal.fire({
                    title: 'مقادیر اشتباه!',
                    text: 'نام کاربری یا رمزعبور اشتباه میباشد! لطفا مقادیر را بررسی کنید و دوباره امتحان کنید.',
                    icon: 'error',
                    focusConfirm: false,
                    confirmButtonText: 'حله فهمیدم',
                })
            }
            
            clearInputs()
        })
        .catch(err => {
            Swal.fire({
                title: 'ارور در ورود!',
                text: 'نمیتوانیم عملیات ورود را انجام بدیم! مشکلی در اینترنت یا دیتابیس وجود دارد.',
                icon: 'error',
                focusConfirm: false,
                confirmButtonText: 'حله فهمیدم',
            })
        })
})

function clearInputs() {
    usernameInput.value = ''
    passInput.value = ''
}