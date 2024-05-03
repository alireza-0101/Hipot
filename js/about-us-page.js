const aboutUsWrapper = $.querySelector('#about-us-wrapper')

function getAboutUs() {
    axios({
        method: 'get',
        url: 'https://web-backend.iran.liara.run/hipot/aboutus.json'
    })
        .then(res => {
            let aboutusTemplate = res.data.HTMLTemplate

            aboutUsWrapper.innerHTML = aboutusTemplate

        })
        .catch(err => {
            console.log(err)
        })
}

window.addEventListener('load', getAboutUs)