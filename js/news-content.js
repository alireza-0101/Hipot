const dateBox = $.querySelector('#date-box')
const writerNameBox = $.querySelector('#writer-name-box')
const newsImg = $.querySelector('#news-img')
const newsTitle = $.querySelector('#news-title')
const contentBox = $.querySelector('#content-box')

let search = new URLSearchParams(location.search)
let getIdSearch = search.get('id')

function getMainNews() {
    axios({
        method: 'get',
        url: `https://web-backend.iran.liara.run/hipot/news/${getIdSearch}.json`
    })
        .then(res => {
            let targetNewsData = res.data

            newsImg.src = targetNewsData.coverLink
            contentBox.innerHTML = targetNewsData.htmlTemplate
            dateBox.innerHTML = targetNewsData.newsCreatTime
            writerNameBox.innerHTML = targetNewsData.newsWriterName
            newsTitle.innerHTML = targetNewsData.title
            $.title = `هیپوت - ${targetNewsData.title}`

        })
        .catch(err => {
            console.log(err)
        })
}

window.addEventListener('load', getMainNews)