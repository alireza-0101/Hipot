const submitBtn = $.querySelector('#submit-btn')

const basePlanPrice = $.querySelector('#base-plan-price')
const basePlanInstallment = $.querySelector('#base-plan-installment')
const basePlanGivTime = $.querySelector('#base-plan-giv-time')
const basePlanSuport = $.querySelector('#base-plan-suport')
const basePlanBtnText = $.querySelector('#base-plan-btn-text')
const basePlanBtnLink = $.querySelector('#base-plan-btn-link')
const basePlanSiteSpeed = $.querySelector('#base-plan-site-speed')
const basePlanPersonalization = $.querySelector('#base-plan-personalization')

const proPlanPrice = $.querySelector('#pro-plan-price')
const proPlanInstallment = $.querySelector('#pro-plan-installment')
const proPlanGivTime = $.querySelector('#pro-plan-giv-time')
const proPlanSuport = $.querySelector('#pro-plan-suport')
const proPlanBtnText = $.querySelector('#pro-plan-btn-text')
const proPlanBtnLink = $.querySelector('#pro-plan-btn-link')
const proPlanSiteSpeed = $.querySelector('#pro-plan-site-speed')
const proPlanPersonalization = $.querySelector('#pro-plan-personalization')

const vipPlanPrice = $.querySelector('#vip-plan-price')
const vipPlanInstallment = $.querySelector('#vip-plan-installment')
const vipPlanGivTime = $.querySelector('#vip-plan-giv-time')
const vipPlanSuport = $.querySelector('#vip-plan-suport')
const vipPlanBtnText = $.querySelector('#vip-plan-btn-text')
const vipPlanBtnLink = $.querySelector('#vip-plan-btn-link')
const vipPlanSiteSpeed = $.querySelector('#vip-plan-site-speed')
const vipPlanPersonalization = $.querySelector('#vip-plan-personalization')

function showPlans() {
    axios({
        method: 'get',
        url: 'https://web-backend.iran.liara.run/hipot/plans.json'
    })
        .then(res => {
            let plansDatas = res.data
            
            basePlanPrice.value = plansDatas.basePlanPrice
            basePlanInstallment.value = plansDatas.basePlanInstallment
            basePlanGivTime.value = plansDatas.basePlanGivTime
            basePlanSuport.value = plansDatas.basePlanSuport
            basePlanBtnText.value = plansDatas.basePlanBtnText
            basePlanBtnLink.value = plansDatas.basePlanBtnLink
            basePlanSiteSpeed.value = plansDatas.basePlanSiteSpeed
            basePlanPersonalization.value = plansDatas.basePlanPersonalization
            proPlanPrice.value = plansDatas.proPlanPrice
            proPlanInstallment.value = plansDatas.proPlanInstallment
            proPlanGivTime.value = plansDatas.proPlanGivTime
            proPlanSuport.value = plansDatas.proPlanSuport
            proPlanBtnText.value = plansDatas.proPlanBtnText
            proPlanBtnLink.value = plansDatas.proPlanBtnLink
            proPlanSiteSpeed.value = plansDatas.proPlanSiteSpeed
            proPlanPersonalization.value = plansDatas.proPlanPersonalization
            vipPlanPrice.value = plansDatas.vipPlanPrice
            vipPlanInstallment.value = plansDatas.vipPlanInstallment
            vipPlanGivTime.value = plansDatas.vipPlanGivTime
            vipPlanSuport.value = plansDatas.vipPlanSuport
            vipPlanBtnText.value = plansDatas.vipPlanBtnText
            vipPlanBtnLink.value = plansDatas.vipPlanBtnLink
            vipPlanSiteSpeed.value = plansDatas.vipPlanSiteSpeed
            vipPlanPersonalization.value = plansDatas.vipPlanPersonalization
        })
        .catch(err => {
            Swal.fire({
                title: 'ارور در بارگیری کردن پلن ها!',
                text: 'نمیتوانیم پلن هارا بارگیری کنیم! مشکلی در اینترنت یا دیتابیس وجود دارد.',
                icon: 'error',
                focusConfirm: false,
                confirmButtonText: 'حله فهمیدم',
            })
        })
}

function updatePlans() {
    $.body.style.filter = 'blur(3px)'

    let plansDataObj = {
        basePlanPrice: basePlanPrice.value,
        basePlanInstallment: basePlanInstallment.value,
        basePlanGivTime: basePlanGivTime.value,
        basePlanSuport: basePlanSuport.value,
        basePlanBtnText: basePlanBtnText.value,
        basePlanBtnLink: basePlanBtnLink.value,
        basePlanSiteSpeed: basePlanSiteSpeed.value,
        basePlanPersonalization: basePlanPersonalization.value,
        proPlanPrice: proPlanPrice.value,
        proPlanInstallment: proPlanInstallment.value,
        proPlanGivTime: proPlanGivTime.value,
        proPlanSuport: proPlanSuport.value,
        proPlanBtnText: proPlanBtnText.value,
        proPlanBtnLink: proPlanBtnLink.value,
        proPlanSiteSpeed: proPlanSiteSpeed.value,
        proPlanPersonalization: proPlanPersonalization.value,
        vipPlanPrice: vipPlanPrice.value,
        vipPlanInstallment: vipPlanInstallment.value,
        vipPlanGivTime: vipPlanGivTime.value,
        vipPlanSuport: vipPlanSuport.value,
        vipPlanBtnText: vipPlanBtnText.value,
        vipPlanBtnLink: vipPlanBtnLink.value,
        vipPlanSiteSpeed: vipPlanSiteSpeed.value,
        vipPlanPersonalization: vipPlanPersonalization.value,
    }

    axios({
        method: 'put',
        url: 'https://web-backend.iran.liara.run/hipot/plans.json',
        data: JSON.stringify(plansDataObj)
    })
        .then(res => {
            $.body.style.filter = 'blur(0px)'
            Swal.fire({
                title: 'پلن ها با موفقیت ویرایش شدند.',
                text: 'عملیات ویرایش با موفقیت انجام شد و اماده نمایش داده شدن در سایت هست.',
                icon: 'success',
                focusConfirm: false,
                confirmButtonText: 'حله فهمیدم',
            })
            showPlans()
        })
        .catch(err => {
            $.body.style.filter = 'blur(0px)'
            Swal.fire({
                title: 'عملیات انجام نشد!',
                text: 'ظاهرا اروری داریم و عملیات ویرایش انجام نمیشه! لطفا دوباره امتحان کنید.',
                icon: 'error',
                focusConfirm: false,
                confirmButtonText: 'حله فهمیدم',
            })
        })
}

submitBtn.addEventListener('click', () => {
    if (basePlanPrice.value.trim() && basePlanInstallment.value.trim() && basePlanGivTime.value.trim() && basePlanSuport.value.trim() && basePlanBtnText.value.trim() && basePlanBtnLink.value.trim() && basePlanSiteSpeed.value.trim() && basePlanPersonalization.value.trim() && proPlanPrice.value.trim() && proPlanInstallment.value.trim() && proPlanGivTime.value.trim() && proPlanSuport.value.trim() && proPlanBtnText.value.trim() && proPlanBtnLink.value.trim() && proPlanSiteSpeed.value.trim() && proPlanPersonalization.value.trim() && vipPlanPrice.value.trim() && vipPlanInstallment.value.trim() && vipPlanGivTime.value.trim() && vipPlanSuport.value.trim() && vipPlanBtnText.value.trim() && vipPlanBtnLink.value.trim() && vipPlanSiteSpeed.value.trim() && vipPlanPersonalization.value.trim()) {
        updatePlans()
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

window.addEventListener('load', showPlans)
