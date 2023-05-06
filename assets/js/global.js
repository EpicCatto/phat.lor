// navbar

navbarsmall = false

function handleNavbarSize(){
    if (window.innerWidth <= 768){
        if (!navbarsmall){
            navbarsmall = true
            // document.getElementById("navbar").classList.add("navbar-small")
        }
    } else {
        if (navbarsmall){
            navbarsmall = false
        }
    }
}

function setSectionQuery(section){
    var url = new URL(window.location.href)
    url.searchParams.set("section", section)
    window.history.pushState({}, "", url)
}


// detect which section is in view
function detectSection(){
    var home = document.getElementById("home")
    var about = document.getElementById("about")
    var projects = document.getElementById("projects")
    var achievement = document.getElementById("achievement")
    var homeRect = home.getBoundingClientRect()
    var aboutRect = about.getBoundingClientRect()
    var projectsRect = projects.getBoundingClientRect()
    var achievementRect = achievement.getBoundingClientRect()
    var navbarLinks = document.getElementsByClassName("navbar-link")
    if (homeRect.top <= 0 && homeRect.bottom > 0){
        navbarLinks[0].classList.add("navbar-link-active")
        navbarLinks[1].classList.remove("navbar-link-active")
        navbarLinks[2].classList.remove("navbar-link-active")
        navbarLinks[3].classList.remove("navbar-link-active")
        // setSectionQuery("home")
    } else if (aboutRect.top <= 0 && aboutRect.bottom > 0){
        navbarLinks[0].classList.remove("navbar-link-active")
        navbarLinks[1].classList.add("navbar-link-active")
        navbarLinks[2].classList.remove("navbar-link-active")
        navbarLinks[3].classList.remove("navbar-link-active")
        // setSectionQuery("about")
    } else if (projectsRect.top <= 0 && projectsRect.bottom > 0){
        navbarLinks[0].classList.remove("navbar-link-active")
        navbarLinks[1].classList.remove("navbar-link-active")
        navbarLinks[2].classList.add("navbar-link-active")
        navbarLinks[3].classList.remove("navbar-link-active")
        // setSectionQuery("projects")
    } else if(achievementRect.top <= 0 && achievementRect.bottom > 0){
        navbarLinks[0].classList.remove("navbar-link-active")
        navbarLinks[1].classList.remove("navbar-link-active")
        navbarLinks[2].classList.remove("navbar-link-active")
        navbarLinks[3].classList.add("navbar-link-active")
        // setSectionQuery("achievement")
    }else {
        navbarLinks[0].classList.add("navbar-link-active")
        navbarLinks[1].classList.remove("navbar-link-active")
        navbarLinks[2].classList.remove("navbar-link-active")
        navbarLinks[3].classList.remove("navbar-link-active")
    }
}

// handle url query
function handleUrlQuery(){
    var url = new URL(window.location.href)
    var query = url.searchParams.get("section")
    if (query == "about"){
        toabout()
    } else if (query == "projects"){
        toprojects()
    } else if (query == "achievement"){
        toachievement()
    }else {
        tohome()
    }
}


function tohome(){
    console.log("tohome")
    document.getElementById("home").scrollIntoView({behavior: "smooth"})
    setSectionQuery("home")
}

function toabout(){
    console.log("toabout")
    document.getElementById("about").scrollIntoView({behavior: "smooth"})
    setSectionQuery("about")
}

function toprojects(){
    console.log("toprojects")
    document.getElementById("projects").scrollIntoView({behavior: "smooth"})
    setSectionQuery("projects")
}

function toachievement(){
    console.log("toachievement")
    document.getElementById("achievement").scrollIntoView({behavior: "smooth"})
    setSectionQuery("achievement")
}
var lastScrollTop = 0
var currentSectionIndex = 0
var lastScrolled = 0
// 
function lockScrollToSection(){
    // disable scrolling


    var st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
    if (st > lastScrollTop) {
       if (Date.now() - lastScrolled > 1000){
        console.log("scrolling down")
           if (currentSectionIndex < 3){
               currentSectionIndex += 1
               setIndexSection(currentSectionIndex)
           }
           lastScrolled = Date.now()
       }
    } else if (st < lastScrollTop) {
        if (Date.now() - lastScrolled > 1000){
            console.log("scrolling up")
            if (currentSectionIndex > 0){
                currentSectionIndex -= 1
                setIndexSection(currentSectionIndex)
            }
            lastScrolled = Date.now()
        }
    } // else was horizontal scroll
    lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
}

function setIndexSection(index){
    console.log("setIndexSection " + index)
    switch (index) {
        case 0:
            tohome()
            break;
        case 1:
            toabout()
            break;
        case 2:
            toprojects()
            break;
        case 3:
            toachievement()
            break;
    }
}

// window.addEventListener("scroll", lockScrollToSection)
window.addEventListener("load", handleUrlQuery)
window.addEventListener("load", detectSection)
window.addEventListener("scroll", detectSection)
window.addEventListener("resize", handleNavbarSize)