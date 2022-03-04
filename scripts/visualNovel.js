"use strict";
let sentenceIndex = 1;
let allowNext = false;
let aClicked = false;
let askName = false;
let askAnswer = false;
let username = "Visitor";
let printingTimer;
let pausePrinting = false;

const sentences = ["Before you start your adventure, a few helpful tips:<br>To continue dialogue, click anywhere on this box when you see this icon",
"If you don’t want to see how the text is typing, just click anywhere on this box.",
"That’s it for the tutorial, hope you would enjoy this mini quest!",
"-narrator+The year is 2035, humanity found planets that are suitable for living and were able to colonize them. Later, they found other habitat planets and through diplomacy were able to secure peace between civilizations.",
"You are one of the first civilian that were able to travel to the newest space station that was built in cooperation with other civilizations.",
"Welcome to the SST-Connor!",
"After you’ve arrived, one of the workers of the station met you and showed the way to the main hub where you started to gather information about the station. When suddenly…",
"*Someone bumped into you*",
"-stressed+It was a young man with dark hair and blue eyes. He looked stressed.",
"-???+Oh, sorry, my bad. I was so in my head, that I was not looking where I was going. There so many things still that needs to be done. Ugh…",
"-surprised+Huh... Wait! I think I saw you somewhere. Have we met before?",
"-smile1+Ah, I see. Then I must say congratulations and welcome to the STT-Connor. Oh, where are my manners, my name is Roman. How can I call you?",
"-smile1+Oh, yeah, I remember now. Don’t think you remember my name, it’s Roman. Nice to meet you! How can I call you?",
" that’s a nice name, I like it!",
"-smile1+I will open you a secret, I am the head of this space station, so how about a small excursion? No one knows this station better than me.",
"Our space station is divided into 5 sections. The Home section, which is a main hub where we are now.",
"<a id='sectionAnchor' href='#projects'>“Projects”</a> section, where are exhibited selections of my projects for the space station.",
"<a id='sectionAnchor' href='#about'>“About”</a> section, where you can find more information about myself and what experience I have. I think someone would love to know more about the head of the station, right?",
"<a id='sectionAnchor' href='#skills'>“Skills”</a> section, where you can find technologies and platforms that we are working with. Of course, I personally, constantly learning more and improving already existing skills, so I always opened to new studies!",
"And <a id='sectionAnchor' href='#contact'>“Contact”</a> section, where… you got it, you can contact me if you found our station interesting. We would love to hear from you!",
"-smile3+I hope you enjoyed this little excursion. Sorry, that it was so short, but I got to go. Hope I will hear from you soon! Good luck and enjoy your visit on STT-Connor!",
"-narrator+I see you've met head of the station Roman. Hope you liked him, I guess he told you about the station sections.",
"So, where do you want to go?"];

/*Novel functions starts here*/

function userInteraction(isUsername = false, answerNum = 0)
{
    document.getElementById("userInteractionWrapper").style.display = "none";
    document.getElementById("dialogueBox").style.pointerEvents = "auto";

    if(isUsername)
    {
        if(document.getElementById("username").value !== "")
        {
            username = document.getElementById("username").value;
            document.getElementById("name").value = username;
        }
        askName = false;
        document.getElementById("username").value = "";
    }else if(answerNum === 1)
    {
        askAnswer = false;
        sentences.splice(12, 1);
    }else if(answerNum === 2)
    {
        askAnswer = false;
        sentences.splice(11, 1);
    }

    document.getElementById('dialogueBox').click();
}

function spriteChange(sprite)
{
    const spriteCont = document.getElementById("spriteCont");
    const nameCont = document.getElementById("dialoguePersonName");

    switch (sprite)
    {
        case 'smile1':
        {
            spriteCont.src = "images/sprites/smile1.png";
            break;
        }
        case 'smile2':
        {
            spriteCont.src = "images/sprites/smile2.png";
            break;
        }
        case 'smile3':
        {
            spriteCont.src = "images/sprites/smile3.png";
            break;
        }
        case 'stressed':
        {
            spriteCont.src = "images/sprites/stressed.png";
            break;
        }
        case 'surprised':
        {
            spriteCont.src = "images/sprites/surprised.png";
            break;
        }

        // Since in this visual novel only me (Roman) and "Tutorial" will speak, I combined name changing with sprite changing
        case '???':
        {
            nameCont.innerHTML = "???";
            break;
        }
        case 'narrator':
        {
            nameCont.innerHTML = "Narrator";
            spriteCont.src = "images/sprites/narrator.png";
            break;
        }
        case 'roman':
        {
            nameCont.innerHTML = "Roman";
            spriteCont.src = "images/sprites/smile2.png";
            break;
        }
    }
}

function startCloseVN(hideElement, isFirstLaunch = false, isCloseVN = false)
{
    const elementsToHide = document.getElementById(hideElement);
    let showElement = "dialogueWrapper";
    let bgDisplayStyle = "none";
    let elementDisplayStyle = "grid";
    elementsToHide.classList.add("fadeOut");

    if (isFirstLaunch)
    {
        setTimeout(function()
        {
            elementsToHide.style.display = "none";
            document.getElementById(showElement).style.display = elementDisplayStyle;
            document.getElementById("welcomeBG").style.display = bgDisplayStyle;
            nextSentence();
        }, 2000);

        setTimeout(function()
        {
            printSentence(sentences[0]);
        },2500);
    } else if(isCloseVN)
    {
        showElement = "starterContent";
        elementDisplayStyle = "flex";
        bgDisplayStyle = "block";
        document.getElementById("startVNbtn").onclick = function() {closeVN();};
    } else
    {
        showElement = "dialogueWrapper";
        elementDisplayStyle = "grid";
        bgDisplayStyle = "none";
    }

    if (!isFirstLaunch)
    {
        pausePrinting = isCloseVN === true;
        elementsToHide.style.display = "none";
        document.getElementById(showElement).style.display = elementDisplayStyle;
        document.getElementById(showElement).style.opacity = "1";
        document.getElementById("welcomeBG").style.display = bgDisplayStyle;
    }

}

function closeVN()
{
    startCloseVN("starterContent");
}

//Print sentence function

function printSentence(sentence, speed = 50)
{
    let i = 0;
    let spriteIndex = 0;
    let sprite;
    let writeTo = document.getElementById("dialogueText");
    allowNext = false;
    aClicked = false;

    printingTimer = setInterval(function()
    {
        const char = sentence[i];

        //Removing HTML tags as well as removing custom tags for sprites while printing sentence.
        if (char === '<')
        {
            i = sentence.indexOf('>', i);
        } else if (char === '-')
        {
            spriteIndex = sentence.indexOf('+', spriteIndex);
            sprite = sentence.slice(1, spriteIndex);
            sentence = sentence.substring(spriteIndex+1);
        }

        spriteChange(sprite);

        if (!pausePrinting)
        {
            i++;
            writeTo.innerHTML = sentence.slice(0, i); // Writing sentence letter by letter
        }

        if (i === sentence.length) // Stop printing sentence
        {
            stopPrinting();
        }

        //Stop printing sentence function.
        if (i < sentence.length)
        {
            document.getElementById("dialogueBox").addEventListener('click', () =>
            {
                document.getElementById("dialogueText").innerHTML = "";
                document.getElementById("dialogueText").innerHTML = sentence;
                stopPrinting();
            })
        }

    }, speed);
}

// next sentence function

function nextSentence()
{
    document.getElementById("dialogueBox").addEventListener('click', () =>
    {
        if (allowNext && !aClicked)
        {
            setTimeout(function()
            {
                if (sentenceIndex === 11)
                {
                    askName = true;
                    enterBtnClicked();
                }else if (sentenceIndex === 12)
                {
                    sentences[sentenceIndex] = "-roman+" + username + sentences[sentenceIndex];
                }

                if (sentenceIndex === 10)
                {
                    askAnswer = true;
                }

                printSentence(sentences[sentenceIndex]);
                sentenceIndex++;

            }, 10)
        } else
        {
            setTimeout(function()
            {
                aClicked = false;
            }, 10)
        }
    })
}

//stop printing sentence function

function stopPrinting()
{
    allowNext = sentenceIndex < sentences.length; //Allow Next Sentence until there are sentences in array
    if (sentenceIndex === sentences.length) //Sentences in Array ended.
    {
        document.getElementById("scrollIconWrapper").style.visibility = "visible";
        document.getElementById("arrow").classList.add("scrollAnim");

        document.getElementById("userInteractionWrapper").style.display = "flex";
        document.getElementById("namePromptForm").style.display = "none";
        document.getElementById("finalChoice").style.display = "flex";

    } else
    {
        document.getElementById("dialogueText").innerHTML += " <span class='iconify' data-icon='mdi:rhombus' />"

        if(askAnswer || askName)
        {
            if(askName)
            {
                document.getElementById("userAnswer").style.display = "none";
                document.getElementById("namePromptForm").style.display = "flex";
            }

            document.getElementById("userInteractionWrapper").style.display = "block";
            document.getElementById("dialogueBox").style.pointerEvents = "none";
        }
    }

    clearInterval(printingTimer);

    const sectionAnchor = document.getElementById("sectionAnchor");

    if(sectionAnchor != null)
    {
        sectionAnchor.addEventListener('click', () =>
        {
            aClicked = true;
        });
    }
}

function changeVNPosition()
{
    if(window.innerWidth > 1920)
    {
        document.getElementById("dialogueContainer").style.marginTop = "250px";
        document.getElementById("userInteractionWrapper").style.marginTop = "250px";
        document.getElementById("closeVN").style.marginTop = "250px";
        document.getElementById("closeVN").style.marginRight = "500px";
        document.getElementById("scrollIconWrapper").style.marginTop = "1150px";
        document.getElementById("spriteImgContainer").style.marginBottom = "450px";
    } else
    {
        document.getElementById("dialogueContainer").style.marginTop = "300px";
        document.getElementById("userInteractionWrapper").style.marginTop = "80px";
        document.getElementById("closeVN").style.marginTop = "80px";
        document.getElementById("closeVN").style.marginRight = "300px";
        document.getElementById("scrollIconWrapper").style.marginTop = "800px";
        document.getElementById("spriteImgContainer").style.marginBottom = "400px";
    }
}

function enterBtnClicked()
{
    const nameInput = document.getElementById("username");

    if(nameInput != null)
    {
        nameInput.addEventListener("keyup", function (event)
        {
            if (event.keyCode === 13)
            {
                event.preventDefault();
                document.getElementById("acceptBtn").click();
            }
        });
    }
}

/*Novel functions ends here*/