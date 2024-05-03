const $ = document

const openMenuBtn = $.querySelector('.open-menu')
const openMenuInWelcomePage = $.querySelector('.open-menu-welcome-page')
const menuNav = $.querySelector('.navbar')
const content = $.querySelector('.content')
const headerTitle = $.querySelector('.header-title')
const adminWelcome = $.querySelector('.login-user-name')
const logOutBtn = $.querySelector('.bi-box-arrow-left')

function isUserLogin() {
    let userLocalstorage = localStorage.getItem('admin')

    if (userLocalstorage) {
        axios({
            method: 'get',
            url: 'https://web-backend.iran.liara.run/hipot/admins.json'
        })
            .then(res => {
                let adminsDatas = Object.entries(res.data)

                let targetAdmin = adminsDatas.find(admin => {
                    return admin[0] === localStorage.getItem('admin')
                })

                if (targetAdmin) {
                    if (targetAdmin[1].access === 'full') {
                        console.log('Your panel is full option');
                    } else {
                        unFullAccess()
                    }

                    adminWelcome.innerHTML = `خوش آمدید ${targetAdmin[1].name}`
                } else {
                    location.pathname = 'login.html'
                }

            })
            .catch(err => {
                console.log(err);
            })
    } else {
        location.pathname = 'login.html'
    }
}

function unFullAccess() {
    document.querySelectorAll('.full-menu-item').forEach(item => {
        item.remove()
    })

    if (location.pathname === '/panel-plans.html' || location.pathname === '/panel-alarm.html' || location.pathname === 'panel-about-us.html' || location.pathname === '/panel-admins.html') {
        location.pathname = '/panel.html'
    }
}

function openMenu() {
    menuNav.classList.toggle('hide')
    content.classList.toggle('biger')
}

function headerTime() {
    setInterval(() => {
        headerTitle.innerHTML = getNowDate()
    }, 1000);
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

function logOut() {
    localStorage.removeItem('admin')
    isUserLogin()
}


window.addEventListener('load', () => {
    isUserLogin()
    headerTime()
})
openMenuBtn.addEventListener('click', openMenu)
logOutBtn.addEventListener('click', logOut)
if (openMenuInWelcomePage) {
    openMenuInWelcomePage.addEventListener('click', openMenu)
}