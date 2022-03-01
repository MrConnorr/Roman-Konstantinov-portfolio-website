window.onresize = function ()
{
    changeNavbar();
    changeVNPosition();
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

document.addEventListener("DOMContentLoaded", () =>
{
    changeVNPosition();
})