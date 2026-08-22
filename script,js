const nextBtn = document.getElementById("nextBtn");

const intro = document.getElementById("intro");
const nextPage = document.getElementById("nextPage");
const mainMenu = document.getElementById("mainMenu");


nextBtn.addEventListener("click", function () {

    // Hide intro
    intro.style.opacity = "0";

    setTimeout(() => {

        intro.style.visibility = "hidden";

        // Show THE NEXT PAGE
        nextPage.classList.add("show");

        // Keep it visible for 3 seconds
        setTimeout(() => {

            nextPage.classList.remove("show");

            // Show main menu
            setTimeout(() => {
                mainMenu.classList.add("show");
            }, 500);

        }, 3000);

    }, 600);

});
