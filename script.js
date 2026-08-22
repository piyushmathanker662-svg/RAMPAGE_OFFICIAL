/* =====================================================
   RAMPAGE OFFICIAL
   MAIN SCRIPT
===================================================== */


/* =====================================================
   ELEMENTS
===================================================== */

const intro = document.getElementById("intro");
const nextBtn = document.getElementById("nextBtn");
const nextPage = document.getElementById("nextPage");
const mainMenu = document.getElementById("mainMenu");


/* =====================================================
   INTRO → NEXT PAGE → MENU
===================================================== */

nextBtn.addEventListener("click", function () {

    intro.classList.add("hide");

    setTimeout(function () {

        nextPage.classList.add("show");

        setTimeout(function () {

            nextPage.classList.remove("show");

            setTimeout(function () {

                mainMenu.classList.add("active");

            }, 600);

        }, 3000);

    }, 700);

});


/* =====================================================
   OPEN PAGE
===================================================== */

function openPage(pageId) {

    document.querySelectorAll(".page").forEach(function(page) {

        page.classList.remove("active");

    });


    const selectedPage = document.getElementById(pageId);

    if (selectedPage) {

        selectedPage.classList.add("active");

    }

}


/* =====================================================
   GO HOME
===================================================== */

function goHome() {

    document.querySelectorAll(".page").forEach(function(page) {

        page.classList.remove("active");

    });


    mainMenu.classList.add("active");

}


/* =====================================================
   EARNINGS LOGIN
===================================================== */


/*
   TEMPORARY LOGIN

   ID       : RAMPAGE
   PASSWORD : 1234

   Later we will replace this with
   proper authentication.
*/


const earningsID = "RAMPAGE";
const earningsPassword = "1234";


function loginEarnings() {

    const id =
        document.getElementById("loginId").value.trim();

    const password =
        document.getElementById("loginPassword").value;


    const error =
        document.getElementById("loginError");


    if (
        id === earningsID &&
        password === earningsPassword
    ) {

        error.style.display = "none";


        document.getElementById("loginId").value = "";
        document.getElementById("loginPassword").value = "";


        openPage("earningsPage");

    }

    else {

        error.style.display = "block";

    }

}


/* =====================================================
   ENTER KEY LOGIN
===================================================== */

document
    .getElementById("loginPassword")
    .addEventListener("keydown", function(event) {

        if (event.key === "Enter") {

            loginEarnings();

        }

    });


/* =====================================================
   FLIP EARNING CARDS
===================================================== */

function flipCard(button) {

    const card =
        button.closest(".earning-card");


    if (!card) return;


    card.classList.toggle("flipped");

}


/* =====================================================
   ESC KEY
===================================================== */

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        goHome();

    }

});


/* =====================================================
   CONSOLE
===================================================== */

console.log(
    "RAMPAGE OFFICIAL PORTAL INITIALIZED."
);
