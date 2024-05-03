const videosWrapper = $.querySelector('#videos-wrapper')

function getVideos() {
    axios({
        method: 'get',
        url: 'https://web-backend.iran.liara.run/hipot/videos.json'
    })
        .then(res => {
            let videosData = Object.entries(res.data)

            videosData.forEach(video => {
                videosWrapper.insertAdjacentHTML('beforeend', `
                    <div class="video-item">
                        <div class="video-wrap">
                            <span class="category">${video[1].category}</span>
                            <video class="video" playsinline controls data-poster="${video[1].coverLink}">
                                <source src="${video[1].videoLink}" type="video/mp4" />
                            </video>
                        </div>
                        <div class="video-data">
                            <h2>${video[1].title}</h2>
                            <p>${video[1].descraption}</p>
                        </div>
                    </div>
                `)
            })

            let videos = document.querySelectorAll('.video')

            videos.forEach(video => {
                const player = new Plyr(video);
            })
        })
        .catch(err => {
            console.log(err)
        })
}

window.addEventListener('load', getVideos)