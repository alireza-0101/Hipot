const newsWrapper = $.querySelector('#news-wrapper')

function getNews() {
    axios({
        method: 'get',
        url: 'https://web-backend.iran.liara.run/hipot/news.json'
    })
        .then(res => {
            let newsData = Object.entries(res.data)

            newsData.forEach(video => {
                newsWrapper.insertAdjacentHTML('beforeend', `
                    <a target="_blank" href="news-content.html?id=${video[0]}">
                        <div class="news-item">
                            <div class="news-wrap">
                                <span class="category">${video[1].category}</span>
                                <img src="${video[1].coverLink}" alt="news-image">
                            </div>

                            <div class="news-data">
                                <h2>${video[1].title}</h2>
                                <p>${video[1].descraption}</p>
                            </div>
                        </div>
                    </a>
                `)
            })

        })
        .catch(err => {
            console.log(err)
        })
}

window.addEventListener('load', getNews)