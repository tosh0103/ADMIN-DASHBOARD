/* =====================================================
   LUCIDE ICONS
===================================================== */

lucide.createIcons();



/* =====================================================
   LIVE CLOCK
===================================================== */

function updateClock() {

    const now = new Date();


    let hours = now.getHours();

    const minutes =
        String(now.getMinutes()).padStart(2, "0");

    const seconds =
        String(now.getSeconds()).padStart(2, "0");


    const ampm =
        hours >= 12 ? "PM" : "AM";


    hours = hours % 12;

    hours = hours ? hours : 12;


    const time =
        `${hours}:${minutes}:${seconds} ${ampm}`;


    document.getElementById("clock").textContent = time;

}


updateClock();


setInterval(updateClock, 1000);



/* =====================================================
   CURRENT DATE
===================================================== */

function updateDate() {

    const now = new Date();


    const options = {

        weekday: "long",

        year: "numeric",

        month: "long",

        day: "numeric"

    };


    const date =
        now.toLocaleDateString(
            "en-US",
            options
        );


    document.getElementById(
        "currentDate"
    ).textContent = date;

}


updateDate();



/* =====================================================
   ATTENDANCE DATA
===================================================== */

let attendance = {

    clockIn: null,

    breakStart: null,

    breakEnd: null,

    clockOut: null,

    status: "Not Started"

};



/* =====================================================
   FORMAT TIME
===================================================== */

function formatTime(date) {

    if (!date) {

        return "--:--";

    }


    return date.toLocaleTimeString(
        "en-US",
        {

            hour: "numeric",

            minute: "2-digit",

            hour12: true

        }
    );

}



/* =====================================================
   CLOCK IN
===================================================== */

function clockIn() {


    // Prevent multiple clock-ins

    if (attendance.clockIn) {

        return;

    }


    // Record current time

    attendance.clockIn = new Date();


    // Change status

    attendance.status = "Working";


    // Display clock-in time

    document.getElementById(
        "clockInTime"
    ).textContent =
        formatTime(attendance.clockIn);


    // Update status badge

    updateStatus();


    // Disable Clock In

    document.getElementById(
        "clockInBtn"
    ).disabled = true;


    // Enable Break

    document.getElementById(
        "breakBtn"
    ).disabled = false;


    // Enable Clock Out

    document.getElementById(
        "clockOutBtn"
    ).disabled = false;

}



/* =====================================================
   BREAK BUTTON
===================================================== */

function handleBreak() {


    /*
        If break hasn't started,
        start the break.
    */

    if (!attendance.breakStart) {

        startBreak();

        return;

    }


    /*
        If break started but hasn't ended,
        end the break.
    */

    if (!attendance.breakEnd) {

        endBreak();

        return;

    }

}



/* =====================================================
   START BREAK
===================================================== */

function startBreak() {


    // Record break start

    attendance.breakStart =
        new Date();


    // Change status

    attendance.status =
        "On Break";


    // Display break start time

    document.getElementById(
        "breakStartTime"
    ).textContent =
        formatTime(
            attendance.breakStart
        );


    // Update status badge

    updateStatus();


    /*
        Change button text

        Start Break
             ↓
        End Break
    */

    document.getElementById(
        "breakBtnText"
    ).textContent =
        "End Break";


    /*
        Change button appearance
    */

    document.getElementById(
        "breakBtn"
    ).classList.add(
        "end-break"
    );

}



/* =====================================================
   END BREAK
===================================================== */

function endBreak() {


    // Record break end

    attendance.breakEnd =
        new Date();


    // Change status

    attendance.status =
        "Working";


    // Display break end time

    document.getElementById(
        "breakEndTime"
    ).textContent =
        formatTime(
            attendance.breakEnd
        );


    /*
        Change button back

        End Break
             ↓
        Start Break
    */

    document.getElementById(
        "breakBtnText"
    ).textContent =
        "Start Break";


    /*
        Change button appearance back
    */

    document.getElementById(
        "breakBtn"
    ).classList.remove(
        "end-break"
    );


    // Update status badge

    updateStatus();

}



/* =====================================================
   CLOCK OUT
===================================================== */

function clockOut() {


    // Check if employee has clocked in

    if (!attendance.clockIn) {

        alert(
            "Please clock in first."
        );

        return;

    }


    /*
        Don't allow clock-out
        while employee is on break.
    */

    if (
        attendance.breakStart &&
        !attendance.breakEnd
    ) {

        alert(
            "Please end your break before clocking out."
        );

        return;

    }


    // Record clock-out

    attendance.clockOut =
        new Date();


    // Change status

    attendance.status =
        "Checked Out";


    // Display clock-out time

    document.getElementById(
        "clockOutTime"
    ).textContent =
        formatTime(
            attendance.clockOut
        );


    // Update status

    updateStatus();


    // Disable all attendance buttons

    document.getElementById(
        "clockInBtn"
    ).disabled = true;


    document.getElementById(
        "breakBtn"
    ).disabled = true;


    document.getElementById(
        "clockOutBtn"
    ).disabled = true;

}



/* =====================================================
   UPDATE STATUS
===================================================== */

function updateStatus() {


    const badge =
        document.getElementById(
            "statusBadge"
        );


    const status =
        attendance.status;


    badge.innerHTML = `

        <span></span>

        ${status}

    `;



    /* NOT STARTED */

    if (
        status === "Not Started"
    ) {

        badge.style.background =
            "#e8edf4";

        badge.style.color =
            "#1d3a5d";

    }



    /* WORKING */

    else if (
        status === "Working"
    ) {

        badge.style.background =
            "#dff3ff";

        badge.style.color =
            "#087bd8";

    }



    /* ON BREAK */

    else if (
        status === "On Break"
    ) {

        badge.style.background =
            "#fff2d7";

        badge.style.color =
            "#c77700";

    }



    /* CHECKED OUT */

    else if (
        status === "Checked Out"
    ) {

        badge.style.background =
            "#e6e9ff";

        badge.style.color =
            "#5264b8";

    }

}



/* =====================================================
   PAGE NAVIGATION
===================================================== */

function showPage(
    pageId,
    clickedNav = null
) {


    // Get all pages

    const pages =
        document.querySelectorAll(
            ".page"
        );


    // Hide all pages

    pages.forEach(
        page => {

            page.classList.remove(
                "active-page"
            );

        }
    );


    // Show selected page

    const selectedPage =
        document.getElementById(
            pageId
        );


    if (selectedPage) {

        selectedPage.classList.add(
            "active-page"
        );

    }


    // Get navigation items

    const navItems =
        document.querySelectorAll(
            ".nav-item"
        );


    // Remove active class

    navItems.forEach(
        item => {

            item.classList.remove(
                "active"
            );

        }
    );


    // Add active class

    if (clickedNav) {

        clickedNav.classList.add(
            "active"
        );

    }


    /*
        Prevent # from appearing
        in the URL.
    */

    if (event) {

        event.preventDefault();

    }

}



/* =====================================================
   ATTENDANCE HISTORY DATA
===================================================== */

const records = [


    {
        date: "2026-09-28",

        clockIn: "10:05 AM",

        breakStart: "--:--",

        breakEnd: "--:--",

        clockOut: "--:--",

        status: "Working"

    },


    {
        date: "2026-09-27",

        clockIn: "08:03 AM",

        breakStart: "12:30 PM",

        breakEnd: "01:00 PM",

        clockOut: "05:02 PM",

        status: "Checked Out"

    },


    {
        date: "2026-09-26",

        clockIn: "08:15 AM",

        breakStart: "01:00 PM",

        breakEnd: "01:30 PM",

        clockOut: "05:10 PM",

        status: "Checked Out"

    }

];



/* =====================================================
   DISPLAY HISTORY
===================================================== */

function displayHistory(
    data = records
) {


    const table =
        document.getElementById(
            "historyTable"
        );


    // Clear table

    table.innerHTML = "";



    // If no records

    if (data.length === 0) {

        table.innerHTML = `

            <tr>

                <td
                    colspan="6"
                    style="
                        text-align:center;
                        padding:30px;
                        color:#7890ad;
                    "
                >

                    No attendance records found.

                </td>

            </tr>

        `;

    }



    data.forEach(
        record => {


            const row =
                document.createElement(
                    "tr"
                );


            let statusClass =
                "working-status";


            if (
                record.status ===
                "On Break"
            ) {

                statusClass =
                    "break-status";

            }


            if (
                record.status ===
                "Checked Out"
            ) {

                statusClass =
                    "checked-status";

            }


            row.innerHTML = `

                <td>
                    ${formatDate(record.date)}
                </td>

                <td>
                    ${record.clockIn}
                </td>

                <td>
                    ${record.breakStart}
                </td>

                <td>
                    ${record.breakEnd}
                </td>

                <td>
                    ${record.clockOut}
                </td>

                <td>

                    <span
                        class="${statusClass}"
                    >

                        <span></span>

                        ${record.status}

                    </span>

                </td>

            `;


            table.appendChild(row);

        }
    );



    // Update record count

    document.getElementById(
        "recordCount"
    ).textContent =

        `${data.length} record${
            data.length !== 1
                ? "s"
                : ""
        }`;

}


displayHistory();



/* =====================================================
   FORMAT DATE
===================================================== */

function formatDate(
    dateString
) {


    const date =
        new Date(
            dateString +
            "T00:00:00"
        );


    return date.toLocaleDateString(
        "en-US",
        {

            month: "short",

            day: "numeric",

            year: "numeric"

        }
    );

}



/* =====================================================
   FILTER ATTENDANCE
===================================================== */

function filterAttendance() {


    const date =
        document.getElementById(
            "dateFilter"
        ).value;


    const status =
        document.getElementById(
            "statusFilter"
        ).value;


    const filtered =
        records.filter(
            record => {


                const dateMatches =

                    !date ||
                    record.date === date;



                const statusMatches =

                    status === "all" ||
                    record.status === status;



                return (
                    dateMatches &&
                    statusMatches
                );

            }
        );


    displayHistory(
        filtered
    );

}



/* =====================================================
   EMPLOYEE SEARCH
===================================================== */

function searchEmployees() {


    const search =
        document.getElementById(
            "employeeSearch"
        )
        .value
        .toLowerCase();



    const rows =
        document.querySelectorAll(
            "#employeeTable tr"
        );



    rows.forEach(
        row => {


            const name =
                row
                .querySelector("td")
                .textContent
                .toLowerCase();



            if (
                name.includes(search)
            ) {

                row.style.display =
                    "";

            }

            else {

                row.style.display =
                    "none";

            }

        }
    );

}



/* =====================================================
   SIGN OUT
===================================================== */

function signOut() {


    const confirmLogout =
        confirm(
            "Are you sure you want to sign out?"
        );


    if (confirmLogout) {

        alert(
            "You have been signed out."
        );

    }

}