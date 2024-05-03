const videosSugestWrapper = $.querySelector('.video-sugest-slider')
const reloadVideosSugest = $.querySelector('.reload-videos-sugest')
const newsSugestWrapper = $.querySelector('.news-sugest-slider')
const reloadNewsSugest = $.querySelector('.reload-news-sugest')
const plansWrapper = $.querySelector('.web-disign-plans')

window.addEventListener('load', () => {
    getVideos()
    getPlans()
    getNews()
})

function randomNumber(length) {
    return Math.floor(Math.random() * (length))
}

function givStar(number) {
    if (+number === 1) {
        return '<i class="bi bi-star-fill"></i>'
    } else if (+number === 2) {
        return '<i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i>'
    } else if (+number === 3) {
        return '<i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i>'
    } else if (+number === 4) {
        return '<i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i>'
    } else if (+number === 5) {
        return '<i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i>'
    }
}

function getVideos() {
    axios({
        method: 'get',
        url: 'https://web-backend.iran.liara.run/hipot/videos.json'
    })
        .then(res => {
            let videosData = Object.entries(res.data)

            let firstVideoSugest = videosData[randomNumber(videosData.length)][1]
            let secondVideoSugest = videosData[randomNumber(videosData.length)][1]
            let thirdVideoSugest = videosData[randomNumber(videosData.length)][1]

            $.querySelectorAll('.video-sugest').forEach(item => item.remove())

            videosSugestWrapper.insertAdjacentHTML('beforeend', `
                <div class="video-sugest" data-aos="zoom-in-up" data-aos-once="true">
                    <video class="video" playsinline controls data-poster="${firstVideoSugest.coverLink}">
                        <source src="${firstVideoSugest.videoLink}" type="video/mp4" />
                    </video>
                </div>

                <div  class="video-sugest" data-aos="zoom-in-up" data-aos-once="true">
                    <video class="video" playsinline controls data-poster="${secondVideoSugest.coverLink}">
                        <source src="${secondVideoSugest.videoLink}" type="video/mp4" />
                    </video>
                </div>

                <div class="video-sugest" data-aos="zoom-in-up" data-aos-once="true">
                    <video class="video" playsinline controls data-poster="${thirdVideoSugest.coverLink}">
                        <source src="${thirdVideoSugest.videoLink}" type="video/mp4" />
                    </video>
                </div>
            `)

            let videos = document.querySelectorAll('.video')

            videos.forEach(video => {
                const player = new Plyr(video);
            })
        })
        .catch(err => {
            console.log(err)
        })
}

function getNews() {
    axios({
        method: 'get',
        url: 'https://web-backend.iran.liara.run/hipot/news.json'
    })
        .then(res => {
            let newsData = Object.entries(res.data)

            let firstNewsSugest = newsData[randomNumber(newsData.length)]
            let secondNewsSugest = newsData[randomNumber(newsData.length)]
            let thirdNewsSugest = newsData[randomNumber(newsData.length)]

            $.querySelectorAll('.news-sugest').forEach(item => item.remove())

            newsSugestWrapper.insertAdjacentHTML('beforeend', `
                <div class="news-sugest" data-aos="zoom-in-up" data-aos-once="true">
                    <a target="_blank" class="news-item" href="news-content.html?id=${firstNewsSugest[0]}">
                        <div class="news-sugest-img">
                            <img src="${firstNewsSugest[1].coverLink}">
                        </div>
                        <div class="news-sugest-title">
                            <h2>${firstNewsSugest[1].title}</h2>
                        </div>
                        <span class="news-sugest-category">- ${firstNewsSugest[1].category} -</span>
                    </a>
                </div>
                <div class="news-sugest" data-aos="zoom-in-up" data-aos-once="true">
                    <a target="_blank" class="news-item" href="news-content.html?id=${secondNewsSugest[0]}">
                        <div class="news-sugest-img">
                            <img src="${secondNewsSugest[1].coverLink}">
                        </div>
                        <div class="news-sugest-title">
                            <h2>${secondNewsSugest[1].title}</h2>
                        </div>
                        <span class="news-sugest-category">- ${secondNewsSugest[1].category} -</span>
                    </a>
                </div>
                <div class="news-sugest" data-aos="zoom-in-up" data-aos-once="true">
                    <a target="_blank" class="news-item" href="news-content.html?id=${thirdNewsSugest[0]}">
                        <div class="news-sugest-img">
                            <img src="${thirdNewsSugest[1].coverLink}">
                        </div>
                        <div class="news-sugest-title">
                            <h2>${thirdNewsSugest[1].title}</h2>
                        </div>
                        <span class="news-sugest-category">- ${thirdNewsSugest[1].category} -</span>
                    </a>
                </div>
            `)

        })
        .catch(err => {
            console.log(err)
        })
}

function getPlans() {
    axios({
        method: 'get',
        url: 'https://web-backend.iran.liara.run/hipot/plans.json'
    })
        .then(res => {
            let plansDatas = res.data

            console.log(plansDatas);

            plansWrapper.innerHTML = ''

            plansWrapper.insertAdjacentHTML('afterbegin', `
                <div class="plan-normal plan" data-aos-easing="ease-out-cubic" data-aos-duration="1000"
                    data-aos="fade-left" data-aos-once="true">
                    <table>
                        <th>پلن طراحی پایه</th>
                        <td>سرعت سایت: <span>${givStar(plansDatas.basePlanSiteSpeed)}</span></td>
                        <td>شخصی سازی: <span>${givStar(plansDatas.basePlanPersonalization)}</span></td>
                        <td>زمان تحویل: <span>${plansDatas.basePlanGivTime}</span></td>
                        <td>پشتیبانی: <span>${plansDatas.basePlanSuport}</span></td>
                        <td>امکان پرداخت در <span>${plansDatas.basePlanInstallment}</span></td>
                        <td class="price">شروع قیمت از <span>${plansDatas.basePlanPrice}</span> تومان!</td>
                        <td class="start-conversation-btn"><a href="${plansDatas.basePlanBtnLink}">${plansDatas.basePlanBtnText}</a></td>
                    </table>
                </div>

                <div class="plan-pro plan" data-aos-easing="ease-out-cubic" data-aos-duration="1000" data-aos="fade-up"
                    data-aos-once="true">
                    <table>
                        <th>پلن طراحی حرفه ای</th>
                        <td>سرعت سایت: <span>${givStar(plansDatas.proPlanSiteSpeed)}</span></td>
                        <td>شخصی سازی: <span>${givStar(plansDatas.proPlanPersonalization)}</span></td>
                        <td>زمان تحویل: <span>${plansDatas.proPlanGivTime}</span></td>
                        <td>پشتیبانی: <span>${plansDatas.proPlanSuport}</span></td>
                        <td>امکان پرداخت در <span>${plansDatas.proPlanInstallment}</span></td>
                        <td class="price">شروع قیمت از <span>${plansDatas.proPlanPrice}</span> تومان!</td>
                        <td class="start-conversation-btn"><a href="${plansDatas.proPlanBtnLink}">${plansDatas.proPlanBtnText}</a></td>
                    </table>
                </div>

                <div class="plan-gold plan" data-aos-easing="ease-out-cubic" data-aos-duration="1000"
                    data-aos="fade-right" data-aos-once="true">
                    <table>
                        <th>پلن طراحی VIP</th>
                        <td>سرعت سایت: <span>${givStar(plansDatas.vipPlanSiteSpeed)}</span></td>
                        <td>شخصی سازی: <span>${givStar(plansDatas.vipPlanPersonalization)}</span></td>
                        <td>زمان تحویل: <span>${plansDatas.vipPlanGivTime}</span></td>
                        <td>پشتیبانی: <span>${plansDatas.vipPlanSuport}</span></td>
                        <td>امکان پرداخت در <span>${plansDatas.vipPlanInstallment}</span></td>
                        <td class="price">شروع قیمت از <span>${plansDatas.vipPlanPrice}</span> تومان!</td>
                        <td class="start-conversation-btn"><a href="${plansDatas.vipPlanBtnLink}">${plansDatas.vipPlanBtnText}</a></td>
                    </table>
                </div>
            `)
        })
        .catch(err => {
            console.log(err)
        })
}

reloadVideosSugest.addEventListener('click', getVideos)
reloadNewsSugest.addEventListener('click', getNews)
