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

    // Hide every page
    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });


    // Hide main menu
    mainMenu.classList.remove("active");


    // Selected page
    const selectedPage = document.getElementById(pageId);

    if (!selectedPage) {
        console.error("Page not found:", pageId);
        return;
    }


    // Show selected page
    setTimeout(() => {

        selectedPage.classList.add("active");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }, 100);


    // Create P&L graph whenever P&L page opens
    if (pageId === "pnlPage") {

        setTimeout(() => {
            createPNLGraph();
        }, 200);

    }

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

    ID       : RAMPAGE/OFFICER
    PASSWORD : Rampage@domain
*/

const earningsID = "RAMPAGE/OFFICER";
const earningsPassword = "Rampage@domain";


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
   EARNINGS DATA
===================================================== */

const organisationData = {

    name: "RAMPAGE ESPORTS ACCOUNT",

    amountOfSlots: 4210,

    totalEarning: 4985,

    profitLoss: 935

};


/* =====================================================
   MONEY FORMAT
===================================================== */

function formatMoney(amount) {

    const sign =
        amount < 0 ? "-" : "";


    const formatted =
        Math.abs(amount).toLocaleString("en-IN");


    return sign + "₹" + formatted;

}


/* =====================================================
   UPDATE ORGANISATION CARD
===================================================== */

function updateOrganisationCard() {

    const cards =
        document.querySelectorAll(".organisation-card");


    if (!cards.length) {
        return;
    }


    cards.forEach(card => {

        const stats =
            card.querySelectorAll(".stats strong");


        if (stats.length >= 3) {

            stats[0].textContent =
                organisationData.amountOfSlots
                .toLocaleString("en-IN");


            stats[1].textContent =
                formatMoney(
                    organisationData.totalEarning
                );


            stats[2].textContent =
                (organisationData.profitLoss >= 0 ? "+" : "") +
                formatMoney(
                    organisationData.profitLoss
                );

        }

    });

}


/* =====================================================
   P&L DATA
   CHANGE ONLY VALUES HERE
===================================================== */

const pnlData = [

    {
        month: "May 2026",
        value: 743
    },

    {
        month: "June 2026",
        value: 315
    },

    {
        month: "July 2026",
        value: 427
    },

    {
        month: "August 2026",
        value: 0
    }

];


/* =====================================================
   CALCULATE TOTAL P&L
===================================================== */

function calculatePNLTotal() {

    return pnlData.reduce(
        (total, item) => {

            return total + item.value;

        },
        0
    );

}


/* =====================================================
   CREATE P&L GRAPH
===================================================== */

function createPNLGraph() {

    const graphBox =
        document.querySelector(".graph-box");


    if (!graphBox) {
        return;
    }


    // Clear old graph
    graphBox.innerHTML = "";


    /* =================================================
       GRAPH WRAPPER
    ================================================= */

    const graph =
        document.createElement("div");

    graph.className =
        "pnl-chart";


    /* =================================================
       GRAPH TITLE
    ================================================= */

    const title =
        document.createElement("div");

    title.className =
        "pnl-chart-title";

    title.textContent =
        "RAMPAGE FINANCIAL PERFORMANCE";


    graph.appendChild(title);


    /* =================================================
       GRAPH AREA
    ================================================= */

    const chartArea =
        document.createElement("div");

    chartArea.className =
        "pnl-chart-area";


    /* =================================================
       VALUES
    ================================================= */

    const values =
        pnlData.map(item => item.value);


    let maxValue =
        Math.max(...values, 0);


    let minValue =
        Math.min(...values, 0);


    // Graph padding
    const range =
        Math.max(
            Math.abs(maxValue),
            Math.abs(minValue),
            100
        );


    maxValue =
        range * 1.25;


    minValue =
        -range * 1.25;


    /* =================================================
       ZERO LINE
    ================================================= */

    const zeroPercent =
        ((maxValue) /
        (maxValue - minValue)) * 100;


    const zeroLine =
        document.createElement("div");

    zeroLine.className =
        "pnl-zero-line";


    zeroLine.style.top =
        zeroPercent + "%";


    chartArea.appendChild(zeroLine);


    /* =================================================
       Y AXIS LABELS
    ================================================= */

    const maxLabel =
        document.createElement("div");

    maxLabel.className =
        "pnl-y-label pnl-max";

    maxLabel.textContent =
        "+" + Math.round(maxValue);


    const zeroLabel =
        document.createElement("div");

    zeroLabel.className =
        "pnl-y-label pnl-zero";

    zeroLabel.textContent =
        "₹0";


    const minLabel =
        document.createElement("div");

    minLabel.className =
        "pnl-y-label pnl-min";

    minLabel.textContent =
        Math.round(minValue);


    chartArea.appendChild(maxLabel);
    chartArea.appendChild(zeroLabel);
    chartArea.appendChild(minLabel);


    /* =================================================
       CREATE POINTS
    ================================================= */

    pnlData.forEach((item, index) => {

        const wrapper =
            document.createElement("div");


        wrapper.className =
            "pnl-point-wrapper";


        const x =
            pnlData.length === 1
            ? 50
            : (index /
            (pnlData.length - 1)) *
            90 + 5;


        const y =
            ((maxValue - item.value) /
            (maxValue - minValue)) *
            100;


        wrapper.style.left =
            x + "%";


        wrapper.style.top =
            y + "%";


        /* POINT */

        const point =
            document.createElement("div");


        point.className =
            "pnl-point";


        if (item.value < 0) {

            point.classList.add("loss");

        }

        else {

            point.classList.add("profit");

        }


        /* VALUE */

        const value =
            document.createElement("div");


        value.className =
            "pnl-value";


        value.textContent =
            item.value === 0
            ? "₹0"
            : (item.value > 0 ? "+" : "-") +
              "₹" +
              Math.abs(item.value);


        /* MONTH */

        const month =
            document.createElement("div");


        month.className =
            "pnl-month";


        month.textContent =
            item.month;


        wrapper.appendChild(value);

        wrapper.appendChild(point);

        wrapper.appendChild(month);


        chartArea.appendChild(wrapper);

    });


    /* =================================================
       CONNECT POINTS
    ================================================= */

    for (
        let i = 0;
        i < pnlData.length - 1;
        i++
    ) {

        const current =
            pnlData[i];

        const next =
            pnlData[i + 1];


        const currentX =
            (i /
            (pnlData.length - 1)) *
            90 + 5;


        const nextX =
            ((i + 1) /
            (pnlData.length - 1)) *
            90 + 5;


        const currentY =
            ((maxValue - current.value) /
            (maxValue - minValue)) *
            100;


        const nextY =
            ((maxValue - next.value) /
            (maxValue - minValue)) *
            100;


        const dx =
            nextX - currentX;


        const dy =
            nextY - currentY;


        const distance =
            Math.sqrt(
                dx * dx + dy * dy
            );


        const angle =
            Math.atan2(dy, dx) *
            180 / Math.PI;


        const line =
            document.createElement("div");


        line.className =
            "pnl-connection";


        line.style.width =
            distance + "%";


        line.style.left =
            currentX + "%";


        line.style.top =
            currentY + "%";


        line.style.transform =
            `rotate(${angle}deg)`;


        chartArea.insertBefore(
            line,
            chartArea.firstChild
        );

    }


    /* =================================================
       ADD GRAPH
    ================================================= */

    graph.appendChild(chartArea);


    /* =================================================
       TOTAL P&L
    ================================================= */

    const total =
        calculatePNLTotal();


    const totalBox =
        document.createElement("div");


    totalBox.className =
        "pnl-total";


    const totalStatus =
        total > 0
        ? "PROFIT"
        : total < 0
        ? "LOSS"
        : "NO DATA";


    totalBox.innerHTML = `

        <small>TOTAL P&L</small>

        <strong class="${
            total > 0
            ? "green"
            : total < 0
            ? "red"
            : "orange"
        }">

            ${total >= 0 ? "+" : ""}
            ${formatMoney(total)}

        </strong>

        <span>${totalStatus}</span>

    `;


    graph.appendChild(totalBox);


    graphBox.appendChild(graph);

}


/* =====================================================
   UPDATE MONTHLY P&L CARDS
===================================================== */

function updateMonthlyCards() {

    const cards =
        document.querySelectorAll(".monthly-card");


    if (!cards.length) {
        return;
    }


    cards.forEach((card, index) => {

        if (!pnlData[index]) {
            return;
        }


        const data =
            pnlData[index];


        const value =
            card.querySelector("strong");


        const status =
            card.querySelector("span");


        if (value) {

            value.textContent =
                formatMoney(data.value);

        }


        if (status) {

            if (data.value > 0) {

                status.textContent =
                    "PROFIT";

                status.className =
                    "profit-text";

            }

            else if (data.value < 0) {

                status.textContent =
                    "LOSS";

                status.className =
                    "loss-text";

            }

            else {

                status.textContent =
                    "NO DATA";

                status.className =
                    "neutral-text";

            }

        }

    });

}


/* =====================================================
   UPDATE P&L SUMMARY
===================================================== */

function updatePNLSummary() {

    const total =
        calculatePNLTotal();


    const totalElement =
        document.getElementById("totalPnl");


    const statusElement =
        document.getElementById("pnlStatus");


    if (totalElement) {

        totalElement.textContent =
            formatMoney(total);

    }


    if (statusElement) {

        if (total > 0) {

            statusElement.textContent =
                "PROFIT";

            statusElement.className =
                "green";

        }

        else if (total < 0) {

            statusElement.textContent =
                "LOSS";

            statusElement.className =
                "red";

        }

        else {

            statusElement.textContent =
                "NO DATA";

            statusElement.className =
                "orange";

        }

    }

}


/* =====================================================
   INITIALIZE WEBSITE
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        updateOrganisationCard();

        updateMonthlyCards();

        updatePNLSummary();

        createPNLGraph();


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
        poster: "./mvp-aug-w04.png"
    },

   {
        week: "AUGUST WEEK 05",
        poster: "./mvp-aug-w04.png"
    }

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
