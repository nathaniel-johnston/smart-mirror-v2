function displayTimeHelper() {
    var refresh_rate = 1000;
    const my_time = setTimeout(displayTime, refresh_rate)
}

export function displayTime() {
    var date = new Date();
    var time = document.getElementById("hhmm");
    var am_pm = document.getElementById("ampm");

    var hour = date.getHours();
    var minutes = date.getMinutes().toString();

    if (hour > 12) {
        hour -= 12;
        am_pm.innerHTML = "PM";
    }
    else {
        am_pm.innerHTML = "AM";
    }

    hour = hour.toString();

    if(hour.length === 1) {
        hour = "0" + hour;
    }

    if(minutes.length === 1) {
        minutes = "0" + minutes;
    }

    time.innerHTML = hour + ":" + minutes;

    displayTimeHelper();
}
