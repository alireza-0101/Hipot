const $ = document
const mobileMenu = $.querySelector('.mobile-menu')
const menuBtnToggle = $.querySelector('.open-menu-btn')
const closeMenuBtn = $.querySelector('.close-menu-btn')
const searchDisplay = $.querySelector('.search-display')
const searchInput = $.querySelector('.search-display input')
const openSearchDisplay = $.querySelector('.search-btn')
const closeSearchDisplay = $.querySelector('.close-search-btn')
const alarmBtn = $.querySelector('.alarm-btn')


function toggleMobileMenu() {
    mobileMenu.classList.toggle('hide')
}

function closeOfSearch() {
    searchDisplay.classList.add('hide')
    clearSearchInput()
}

function closeOfMobileMenu() {
    mobileMenu.classList.add('hide')
}

function searchValue(value) {
    window.open(`https://www.google.com/search?sitesearch=${location.host}&q=${value}`)
    clearSearchInput()
}

function showSearchDisplay() {
    searchInput.focus()
    searchDisplay.classList.remove('hide')
}

function clearSearchInput() {
    searchInput.value = ''
}

function alarmBtnHandeller() {
    axios({
        method: 'get',
        url: 'https://web-backend.iran.liara.run/hipot/alarm.json'
    })
        .then(res => {
            let alarmData = res.data

            alarmBtn.style.animation = 'unset'
            Swal.fire({
                title: alarmData.alarmTitle,
                text: alarmData.descraption,
                imageUrl: alarmData.photoLink,
                imageWidth: 400,
                imageAlt: 'alarm image',
                showConfirmButton: true,
                showDenyButton: true,
                denyButtonText: alarmData.cancelBtnText,
                confirmButtonText: alarmData.confirmBtnText,
            }).then(result => {
                if (result.isConfirmed) {
                    window.open(alarmData.confirmBtnLink)
                }
            })
        })
        .catch(err => {
            console.log(err)
        })
}

searchInput.addEventListener('keyup', event => {
    if (event.keyCode === 13) {
        searchValue(event.target.value)
        closeOfSearch()
    }
})

document.addEventListener('keyup', event => {
    if (event.keyCode === 27) {
        closeOfSearch()
        closeOfMobileMenu()
    }
})

menuBtnToggle.addEventListener('click', toggleMobileMenu)
closeMenuBtn.addEventListener('click', closeOfMobileMenu)
openSearchDisplay.addEventListener('click', showSearchDisplay)
closeSearchDisplay.addEventListener('click', closeOfSearch)
alarmBtn.addEventListener('click', alarmBtnHandeller)

window.addEventListener('load', () => $.querySelector('.web-loader').remove())