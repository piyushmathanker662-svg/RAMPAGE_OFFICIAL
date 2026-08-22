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

if (nextBtn) {

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

}


/* =====================================================
   OPEN PAGE
===================================================== */

function openPage(pageId) {

    document.querySelectorAll(".page").forEach(function(page) {

        page.classList.remove("active");

    });


    const selectedPage = document.getElementById(pageId);

    if (pageId === "pnlPage") {

    setTimeout(() => {
        createPnlChart();
    }, 100);

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
   EARNINGS LOGIN

   ID       : RAMPAGE
   PASSWORD : 1234
*/

const earningsID = "RAMPAGE";
const earningsPassword = "1234";


function loginEarnings() {

    const idElement =
        document.getElementById("loginId");

    const passwordElement =
        document.getElementById("loginPassword");

    const error =
        document.getElementById("loginError");


    if (!idElement || !passwordElement || !error) {
        return;
    }


    const id =
        idElement.value.trim();

    const password =
        passwordElement.value;


    if (
        id === earningsID &&
        password === earningsPassword
    ) {

        error.style.display = "none";

        idElement.value = "";
        passwordElement.value = "";

        openPage("earningsPage");

    }

    else {

        error.style.display = "block";

    }

}


/* =====================================================
   ENTER KEY LOGIN
===================================================== */

const loginPassword =
    document.getElementById("loginPassword");


if (loginPassword) {

    loginPassword.addEventListener(
        "keydown",
        function(event) {

            if (event.key === "Enter") {

                loginEarnings();

            }

        }
    );

}


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
   ORGANISATION DATA
===================================================== */

const organisationData = {

    name: "RAMPAGE ESPORTS ACCOUNT",

    amountOfSlots: 4045,

    totalEarning: 4985,

    profitLoss: 1100

};


/* =====================================================
   FORMAT MONEY
===================================================== */

function formatMoney(amount) {

    const sign = amount < 0 ? "-" : "";

    const value =
        Math.abs(amount).toLocaleString("en-IN");


    return sign + "₹" + value;

}


/* =====================================================
   UPDATE ORGANISATION CARD
===================================================== */

function updateOrganisationCard() {

    const cards =
        document.querySelectorAll(
            ".organisation-card"
        );


    if (!cards.length) return;


    cards.forEach(function(card) {

        const stats =
            card.querySelectorAll(
                ".stats strong"
            );


        if (stats.length >= 3) {

            stats[0].textContent =
                organisationData.amountOfSlots.toLocaleString("en-IN");

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
   JUST CHANGE VALUES HERE IN FUTURE
===================================================== */

const pnlData = [

    {
        month: "May 2026",
        value: 245
    },

    {
        month: "June 2026",
        value: 743
    },

    {
        month: "July 2026",
        value: -315
    },

    {
        month: "August 2026",
        value: 427
    }

];


/* =====================================================
   P&L TOTAL
===================================================== */

function calculatePNLTotal() {

    return pnlData.reduce(
        function(total, item) {

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


    if (!graphBox) return;


    graphBox.innerHTML = "";


    const graph =
        document.createElement("div");

    graph.className = "pnl-chart";


    /* ---------------------------------------------
       HEADER
    --------------------------------------------- */

    const title =
        document.createElement("div");

    title.className = "pnl-chart-title";

    title.textContent =
        "P&L VS MONTH";


    graph.appendChild(title);


    /* ---------------------------------------------
       GRAPH AREA
    --------------------------------------------- */

    const chartArea =
        document.createElement("div");

    chartArea.className = "pnl-chart-area";


    /* ---------------------------------------------
       FIND MAX / MIN
    --------------------------------------------- */

    const values =
        pnlData.map(item => item.value);


    let maxValue =
        Math.max(...values, 0);

    let minValue =
        Math.min(...values, 0);


    const padding =
        Math.max(
            Math.abs(maxValue),
            Math.abs(minValue)
        ) * 0.25;


    maxValue += padding;
    minValue -= padding;


    /* ---------------------------------------------
       ZERO LINE
    --------------------------------------------- */

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


    /* ---------------------------------------------
       Y AXIS LABELS
    --------------------------------------------- */

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
        "0";


    const minLabel =
        document.createElement("div");

    minLabel.className =
        "pnl-y-label pnl-min";

    minLabel.textContent =
        Math.round(minValue);


    chartArea.appendChild(maxLabel);
    chartArea.appendChild(zeroLabel);
    chartArea.appendChild(minLabel);


    /* ---------------------------------------------
       POINTS
    --------------------------------------------- */

    pnlData.forEach(function(item, index) {

        const wrapper =
            document.createElement("div");

        wrapper.className =
            "pnl-point-wrapper";


        const percent =
            ((maxValue - item.value) /
            (maxValue - minValue)) * 100;


        wrapper.style.left =
            (index /
            Math.max(pnlData.length - 1, 1)) *
            90 + 5 + "%";


        wrapper.style.top =
            percent + "%";


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
            (item.value >= 0 ? "+" : "") +
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


    /* ---------------------------------------------
       CONNECTING LINES
    --------------------------------------------- */

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
            Math.max(pnlData.length - 1, 1)) *
            90 + 5;


        const nextX =
            ((i + 1) /
            Math.max(pnlData.length - 1, 1)) *
            90 + 5;


        const currentY =
            ((maxValue - current.value) /
            (maxValue - minValue)) * 100;


        const nextY =
            ((maxValue - next.value) /
            (maxValue - minValue)) * 100;


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
            "rotate(" +
            angle +
            "deg)";


        chartArea.insertBefore(
            line,
            chartArea.firstChild
        );

    }


    graph.appendChild(chartArea);


    /* ---------------------------------------------
       TOTAL
    --------------------------------------------- */

    const total =
        calculatePNLTotal();


    const totalBox =
        document.createElement("div");


    totalBox.className =
        "pnl-total";


    totalBox.innerHTML =

        "TOTAL P&L " +

        "<strong class='" +
        (total >= 0 ? "green" : "red") +
        "'>" +

        (total >= 0 ? "+" : "") +

        formatMoney(total) +

        "</strong>";


    graph.appendChild(totalBox);


    graphBox.appendChild(graph);

}


/* =====================================================
   INITIALIZE DATA
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateOrganisationCard();

        createPNLGraph();

        console.log(
            "RAMPAGE OFFICIAL PORTAL INITIALIZED."
        );

    }
);


/* =====================================================
   ESC KEY
===================================================== */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {

            goHome();

        }

    }
);
