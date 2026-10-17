const SECRET_PASSWORD = "MAHALNAKAPATID";



const passwordScreen =
    document.getElementById("password-screen");

const passwordForm =
    document.getElementById("password-form");

const passwordInput =
    document.getElementById("password");

const passwordError =
    document.getElementById("password-error");

const mainContent =
    document.getElementById("main-content");

const music =
    document.getElementById("background-music");

const surpriseButton =
    document.getElementById("surprise-button");

const finalMessage =
    document.getElementById("final-message");


/* =========================================
   INITIAL STATE
========================================= */

document.body.classList.add("locked");

mainContent.style.display = "none";




passwordForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();

        const enteredPassword =
            passwordInput.value.trim();


        if (enteredPassword === SECRET_PASSWORD) {

            unlockWebsite();

        } else {

            wrongPassword();

        }

    }
);



function unlockWebsite() {

    passwordError.textContent = "";

    passwordScreen.classList.add("hidden");

    document.body.classList.remove("locked");

    mainContent.style.display = "block";


    setTimeout(() => {

        document.getElementById("welcome")
            .scrollIntoView({
                behavior: "smooth"
            });

    }, 500);


    // Try to start music
    playMusic();

    // Start floating hearts
    startFloatingHearts();

}




function wrongPassword() {

    passwordError.textContent =
        "That's not the password ♡";

    passwordInput.value = "";

    passwordInput.focus();


    passwordInput.animate(
        [
            {
                transform: "translateX(0)"
            },
            {
                transform: "translateX(-8px)"
            },
            {
                transform: "translateX(8px)"
            },
            {
                transform: "translateX(-5px)"
            },
            {
                transform: "translateX(5px)"
            },
            {
                transform: "translateX(0)"
            }
        ],
        {
            duration: 400
        }
    );

}




const scrollButtons =
    document.querySelectorAll("[data-scroll]");


scrollButtons.forEach(button => {

    button.addEventListener(
        "click",
        function () {

            const targetId =
                button.getAttribute("data-scroll");

            const target =
                document.getElementById(targetId);


            if (!target) {
                return;
            }


            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }
    );

});




if (surpriseButton) {

    surpriseButton.addEventListener(
        "click",
        function () {

            finalMessage.classList.add("show");

            surpriseButton.style.display =
                "none";

            createHeartExplosion();

        }
    );

}




function createHeartExplosion() {

    for (let i = 0; i < 25; i++) {

        setTimeout(() => {

            createHeart();

        }, i * 80);

    }

}




function startFloatingHearts() {

    setInterval(() => {

        createHeart();

    }, 3000);

}


function createHeart() {

    const heart =
        document.createElement("div");


    heart.className =
        "floating-heart";

    heart.textContent = "♡";


    heart.style.left =
        Math.random() * 100 + "vw";


    heart.style.fontSize =
        (Math.random() * 15 + 15) + "px";


    document.body.appendChild(heart);


    const duration =
        4500 + Math.random() * 3000;


    const animation =
        heart.animate(

            [
                {
                    transform:
                        "translateY(0) rotate(0deg)",
                    opacity: 0
                },

                {
                    transform:
                        "translateY(-40vh) rotate(15deg)",
                    opacity: 0.7
                },

                {
                    transform:
                        "translateY(-100vh) rotate(-15deg)",
                    opacity: 0
                }
            ],

            {
                duration:
                    duration,

                easing:
                    "ease-out"
            }

        );


    animation.onfinish =
        () => {

            heart.remove();

        };

}


/* =========================================
   MUSIC
========================================= */

function playMusic() {

    if (!music) {
        return;
    }


    music.volume = 0.25;


    music.play().catch(() => {

        console.log(
            "Music was blocked by the browser."
        );

    });

}


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements =
    document.querySelectorAll(
        ".content-container > *, " +
        ".appreciation-card, " +
        ".message-list article, " +
        ".photo"
    );


revealElements.forEach(element => {

    element.classList.add("reveal");

});


const observer =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target.classList.add(
                        "visible"
                    );

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: 0.15
        }

    );


revealElements.forEach(element => {

    observer.observe(element);

});