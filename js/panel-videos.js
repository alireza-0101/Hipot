const submitBtn = $.querySelector('#submit-btn')
const videoTitle = $.querySelector('#video-title')
const videoLink = $.querySelector('#video-link')
const videoCoverLink = $.querySelector('#video-cover-link')
const videoCategory = $.querySelector('#video-category')
const videoDescraption = $.querySelector('#video-descraption')
const videosBoxWraper = $.querySelector('#videos-box-wraper')


function setVideo() {
    $.body.style.filter = 'blur(3px)'

    let videoDataObj = {
        title: videoTitle.value,
        videoLink: videoLink.value,
        coverLink: videoCoverLink.value,
        category: videoCategory.value,
        descraption: videoDescraption.value,
    }

    axios({
        method: 'post',
        url: 'https://web-backend.iran.liara.run/hipot/videos.json',
        data: JSON.stringify(videoDataObj)
    })
        .then(res => {
            $.body.style.filter = 'blur(0px)'
            Swal.fire({
                title: 'ویدیو با موفقیت افزوده شد.',
                text: 'عملیات ثبت با موفقیت انجام شد و اماده نمایش داده شدن در سایت هست.',
                icon: 'success',
                focusConfirm: false,
                confirmButtonText: 'حله فهمیدم',
            })
            showVideos()
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

function showVideos() {
    axios({
        method: 'get',
        url: 'https://web-backend.iran.liara.run/hipot/videos.json'
    })
        .then(res => {
            let videosData = Object.entries(res.data)

            videosBoxWraper.innerHTML = ''

            videosData.forEach(videoData => {
                videosBoxWraper.insertAdjacentHTML('afterbegin', `
                    <div class="video-item">
                        <div class="video-wrapper">
                            <video class="video" playsinline controls data-poster="${videoData[1].coverLink}">
                                <source src="${videoData[1].videoLink}" type="video/mp4" />
                            </video>
                        </div>
                    
                        <div class="list-item-data">
                            <h2>${videoData[1].title}</h2>
                            <p>${videoData[1].descraption}</p>
                            <span>- ${videoData[1].category} -</span>
                        </div>

                        <div class="edit-and-remove-btns">
                            <button onclick="editVideoData('${videoData[0]}')"><i class="bi bi-pencil-square"></i> ویرایش</button>
                            <button onclick="removeVideo('${videoData[0]}')" class="remove"><i class="bi bi-x-octagon"></i> حذف</button>
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
            Swal.fire({
                title: 'ارور در بارگیری کردن ویدیو ها!',
                text: 'نمیتوانیم ویدیو هارا بارگیری کنیم! مشکلی در اینترنت یا دیتابیس وجود دارد.',
                icon: 'error',
                focusConfirm: false,
                confirmButtonText: 'حله فهمیدم',
            })
        })
}

function removeVideo(videoId) {
    Swal.fire({
        title: 'از حذف مطمئنی؟',
        text: "آیا مطمئن هستید که میخواهید این ویدیو رو حذف کنید؟",
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
                url: `https://web-backend.iran.liara.run/hipot/videos/${videoId}.json`,
            })
                .then(res => {
                    console.log(res);
                    Swal.fire({
                        title: 'عملیات موفقیت آمیز بود.',
                        text: 'ویدیو به درستی از سایت حذف شد و مشکلی وجود ندارد.',
                        icon: 'success',
                        focusConfirm: false,
                        confirmButtonText: 'حله فهمیدم',
                    })
                    showVideos()
                })
                .catch(err => {
                    console.log(err);
                    Swal.fire({
                        title: 'عملیات به درستی انجام نشد!',
                        text: 'عملیات حذف ویدیو به درستی به اتمام نرسید، مشکل را بررسی و دوباره امتحان کنید.',
                        icon: 'error',
                        focusConfirm: false,
                        confirmButtonText: 'حله فهمیدم',
                    })
                })
        }
    })
}

function editVideoData(videoId) {
    let videoNewDataObj = null

    axios({
        method: 'get',
        url: `https://web-backend.iran.liara.run/hipot/videos/${videoId}.json`,
    })
        .then(res => {
            videoNewDataModul(res.data.title, res.data.videoLink, res.data.coverLink, res.data.category, res.data.descraption)
        });

    function videoNewDataModul(videoTitle, videoLink, videoCoverLink, videoCategory, videoDescraption) {
        Swal.fire({
            title: 'ویرایش ویدیو',
            html:
                `<input value="${videoTitle}" id="video-new-title" class="data-box-in-alert" placeholder="عنوان ویدیو..." type="text">` +
                `<input value="${videoLink}" id="video-new-url" class="data-box-in-alert" placeholder="لینک ویدیو..." type="url">` +
                `<input value="${videoCoverLink}" id="video-new-cover-box" class="data-box-in-alert" placeholder="لینک کاور..." type="url">` +
                `<select id="video-new-category" class="data-box-in-alert">
                    <option value="${videoCategory}">مقدار قبلی (${videoCategory})</option>
                    <option value="فرانت اند">فرانت اند</option>
                    <option value="بک اند">بک اند</option>
                    <option value="امنیت">امنیت</option>
                    <option value="سئو">سئو</option>
                    <option value="غیره">غیره</option>
                </select>` +
                `<textarea id="video-new-descraption" class="data-box-in-alert" placeholder="توضیح کوتاه...">${videoDescraption}</textarea>`,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'بروزرسانی کن',
            cancelButtonText: 'لغو کن',
            preConfirm: () => {
                videoNewDataObj = {
                    title: document.getElementById('video-new-title').value,
                    videoLink: document.getElementById('video-new-url').value,
                    coverLink: document.getElementById('video-new-cover-box').value,
                    category: document.getElementById('video-new-category').value,
                    descraption: document.getElementById('video-new-descraption').value,
                }
                setVideoNewData()
                clearInputs()
            }
        })
    }

    function setVideoNewData() {
        axios({
            method: 'put',
            url: `https://web-backend.iran.liara.run/hipot/videos/${videoId}.json`,
            data: JSON.stringify(videoNewDataObj)
        })
            .then(res => {
                Swal.fire({
                    title: 'ویدیو با موفقیت ویرایش شد.',
                    text: 'عملیات ویرایش با موفقیت انجام شد و اماده نمایش داده شدن در سایت هست.',
                    icon: 'success',
                    focusConfirm: false,
                    confirmButtonText: 'حله فهمیدم',
                })
                showVideos()
            })
            .catch(err => {
                Swal.fire({
                    title: 'عملیات انجام نشد!',
                    text: 'ظاهرا اروری داریم و عملیات ویرایش انجام نمیشه! لطفا دوباره امتحان کنید.',
                    icon: 'error',
                    focusConfirm: false,
                    confirmButtonText: 'حله فهمیدم',
                })
            })
    }
}

function clearInputs() {
    videoTitle.value = ''
    videoLink.value = ''
    videoCoverLink.value = ''
    videoCategory.value = ''
    videoDescraption.value = ''
    document.getElementById('video-new-title').value = ''
    document.getElementById('video-new-url').value = ''
    document.getElementById('video-new-cover-box').value = ''
    document.getElementById('video-new-category').value = ''
    document.getElementById('video-new-descraption').value = ''
}


submitBtn.addEventListener('click', () => {
    console.log(videoTitle.value.trim());
    if (videoTitle.value.trim() && videoLink.value.trim() && videoCoverLink.value.trim() && videoCategory.value.trim() && videoDescraption.value.trim()) {
        setVideo()
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
window.addEventListener('load', showVideos)