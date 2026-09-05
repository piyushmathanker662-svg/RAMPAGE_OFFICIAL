/* =====================================================
   RAMPAGE OFFICIAL
   COMPLETE SCRIPT.JS
===================================================== */


/* =====================================================
   GLOBAL ELEMENTS
===================================================== */

const intro = document.getElementById("intro");
const nextPage = document.getElementById("nextPage");
const mainMenu = document.getElementById("mainMenu");
const nextBtn = document.getElementById("nextBtn");


/* =====================================================
   INTRO
   INTRO → TAGLINE → MAIN MENU
===================================================== */

if (nextBtn) {

    nextBtn.addEventListener("click", () => {

        nextBtn.disabled = true;

        // Hide intro
        intro.classList.add("hide");

        // Show tagline page
        setTimeout(() => {

            nextPage.classList.add("show");

        }, 700);


        // Hide tagline
        setTimeout(() => {

            nextPage.classList.remove("show");

        }, 3500);


        // Open main menu
        setTimeout(() => {

            mainMenu.classList.add("active");

        }, 4200);

    });

}


/* =====================================================
   OPEN ANY PAGE
===================================================== */

function openPage(pageId) {

    // Hide all pages
    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    // Hide main menu
    if (mainMenu) {
        mainMenu.classList.remove("active");
    }

    // Find selected page
    const selectedPage = document.getElementById(pageId);

    if (!selectedPage) {
        console.error("Page not found:", pageId);
        return;
    }

    // Open selected page
    setTimeout(() => {

        selectedPage.classList.add("active");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }, 100);

}


/* =====================================================
   GO BACK TO MAIN MENU
===================================================== */

function goHome() {

    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });


    mainMenu.classList.add("active");


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =====================================================
   EARNINGS LOGIN
===================================================== */

/*
    LOGIN DETAILS

    ID       : RAMPAGE
    PASSWORD : rg@2304
*/

const earningsID = "RAMPAGE";
const earningsPassword = "rg@2304";


function loginEarnings() {

    const idInput = document.getElementById("loginId");
    const passwordInput = document.getElementById("loginPassword");
    const error = document.getElementById("loginError");


    if (!idInput || !passwordInput || !error) {
        return;
    }


    const enteredID = idInput.value.trim();
    const enteredPassword = passwordInput.value;


    // Correct login
    if (
        enteredID === earningsID &&
        enteredPassword === earningsPassword
    ) {

        error.style.display = "none";


        // Clear inputs
        idInput.value = "";
        passwordInput.value = "";


        // Open earnings
        openPage("earningsPage");

    }

    // Wrong login
    else {

        error.style.display = "block";


        // Small shake animation
        const loginBox =
            document.querySelector(".login-box");

        if (loginBox) {

            loginBox.classList.remove("login-shake");

            void loginBox.offsetWidth;

            loginBox.classList.add("login-shake");

        }

    }

}


/* =====================================================
   ENTER KEY LOGIN
===================================================== */

const passwordInput =
    document.getElementById("loginPassword");


if (passwordInput) {

    passwordInput.addEventListener("keydown", event => {

        if (event.key === "Enter") {

            loginEarnings();

        }

    });

}


/* =====================================================
   FLIP EARNINGS CARDS
===================================================== */

function flipCard(button) {

    const card =
        button.closest(".earning-card");


    if (!card) {
        return;
    }


    card.classList.toggle("flipped");

}

/* =====================================================
   FLIP LINEUP CARDS
===================================================== */

function flipLineupCard(button) {

    const card =
        button.closest(".flip-lineup-card");


    if (!card) {
        return;
    }


    card.classList.toggle("flipped");

}





/* =====================================================
   INITIALIZE WEBSITE
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        // Organisation
        if (typeof updateOrganisationCard === "function") {
            updateOrganisationCard();
        }

        // Monthly cards
        if (typeof updateMonthlyCards === "function") {
            updateMonthlyCards();
        }

        // P&L removed — no P&L functions needed

        // Weekend MVP
        if (typeof createMVPCards === "function") {
            createMVPCards();
        }

        console.log(
            "RAMPAGE OFFICIAL WEBSITE LOADED."
        );

    }
);


/* =====================================================
   ESC KEY
   RETURN TO MENU
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            goHome();

        }

    }
);


/* =====================================================
   PREVENT EMPTY SOCIAL LINKS
===================================================== */

document.querySelectorAll(
    '.social-btn[href="#"]'
).forEach(link => {

    link.addEventListener("click", event => {

        event.preventDefault();

    });

});


/* =====================================================
   CONSOLE BRANDING
===================================================== */

console.log(`
========================================
        RAMPAGE ESPORTS
        THE NEXT PAGE IS RAMPAGE
========================================
`);

/* =====================================================
   WEEKEND MVP DATA
   ADD NEW MVP HERE IN FUTURE
===================================================== */

const weekendMVPData = [

    {
        week: "AUGUST WEEK 04",
        poster: "./mvp-aug-w04.jpeg"
    },

];


/* =====================================================
   CREATE MVP CARDS
===================================================== */

function createMVPCards() {

    const grid =
        document.getElementById("mvpGrid");

    if (!grid) {
        return;
    }

    grid.innerHTML = "";


    weekendMVPData.forEach(function(mvp, index) {

        const card =
            document.createElement("div");

        card.className =
            "mvp-card";


        card.innerHTML = `

            <!-- FRONT -->

            <div class="mvp-card-front">

                <div class="mvp-number">
                    ${String(index + 1).padStart(2, "0")}
                </div>

                <div class="mvp-trophy">
                    🏆
                </div>

                <div class="mvp-date">
                    RAMPAGE WEEKEND MVP
                </div>

                <h2>
                    ${mvp.week}
                    <span>MVP</span>
                </h2>

                <button
                    class="mvp-view-btn"
                    onclick="flipMVPCard(this)"
                >
                    VIEW MVP ↻
                </button>

            </div>


            <!-- BACK -->

            <div class="mvp-card-back">

                <img
                    src="${mvp.poster}"
                    class="mvp-poster"
                    alt="${mvp.week} MVP Poster"
                >

                <button
                    class="mvp-back-btn"
                    onclick="flipMVPCard(this)"
                >
                    ← BACK
                </button>

            </div>

        `;


        grid.appendChild(card);

    });

}


/* =====================================================
   FLIP MVP CARD
===================================================== */

function flipMVPCard(button) {

    const card =
        button.closest(".mvp-card");

    if (!card) {
        return;
    }

    card.classList.toggle("flipped");

}


/* =====================================================
   INITIALIZE MVP
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        createMVPCards();

    }
);
