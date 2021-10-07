// Service Worker Register
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('service-worker.js')
            .then(registration => {
                //console.log('Service Worker is registered', registration);
            })
            .catch(err => {
                //console.error('Registration failed:', err);
            });
    });
}


window.addEventListener('load', function () {
    let imggal = document.getElementsByClassName("single-image-gallery")


    for (let y = 0; y < imggal.length; y++) {
        imggal[y].classList.add("display-none");
    }
    let photoTab = document.getElementById("photo-tab")
    if (photoTab) {
        photoTab.onclick = function () {
            setTimeout(() => {
                let galleryMenuActiveBtn = document.getElementById("gallery-menu-active-btn")
                galleryMenuActiveBtn.click()
                for (let y = 0; y < imggal.length; y++) {
                    imggal[y].classList.remove("display-none");
                }
                galleryMenuActiveBtn.click()
            }, 300)
        }
    }
    setTimeout(() => {
        if (photoTab.classList.indexOf("active") != -1) {
            let galleryMenuActiveBtn = document.getElementById("gallery-menu-active-btn")
            galleryMenuActiveBtn.click()
            for (let y = 0; y < imggal.length; y++) {
                imggal[y].classList.remove("display-none");
            }
            galleryMenuActiveBtn.click()
        }
    }, 5000)


})


window.addEventListener('load', function () {
    let phototab = document.getElementById("photo-tab")
    if (phototab.classList.contains("active")) {
        setTimeout(() => {
            phototab.click()
        }, 500)
    }
})