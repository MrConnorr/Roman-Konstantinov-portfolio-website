window.onresize = function ()
{
    changeNavbar();
    changeVNPosition();
    hideVNOnResize();
}

window.onscroll = function()
{
    changeNavbar();
}

let navPXScroll;

function changeNavbar()
{
    const navbar = document.getElementById("navbar");

    if(window.innerHeight >= 1080)
    {
        navPXScroll = 280;
    } else
    {
        navPXScroll = 90;
    }

    if (document.body.scrollTop >= navPXScroll || document.documentElement.scrollTop >= navPXScroll)
    {
        navbar.classList.add("navScroll");
/*        for (let i = 0; i < navbar.getElementsByTagName("a").length; i++)
        {
            navbar.getElementsByTagName("a")[i].style.color = "#dd7c86";
        }*/
    } else
    {
        navbar.classList.remove("navScroll");
    }
}

function hideVNOnResize()
{
    if(isVNOpen && window.innerWidth <= 1199)
    {
        document.getElementById("dialogueWrapper").style.display = "none";
        document.getElementById("starterContent").classList.remove("fadeOut");
        document.getElementById("starterContent").style.display = "flex";
    } else if(isVNOpen)
    {
        document.getElementById("dialogueWrapper").style.display = "grid";
        document.getElementById("starterContent").style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", () =>
{
    changeVNPosition();
    vnSpritesPreload(
    "images/sprites/narrator.png",
    "images/sprites/smile1.png",
    "images/sprites/smile2.png",
    "images/sprites/smile3.png",
    "images/sprites/stressed.png",
    "images/sprites/surprised.png",
    "images/sprites/tutorial.png");
})


function vnSpritesPreload()
{
    const images = [];
    for (let i = 0; i < arguments.length; i++) {
        images[i] = new Image();
        images[i].src = vnSpritesPreload.arguments[i];
    }
}