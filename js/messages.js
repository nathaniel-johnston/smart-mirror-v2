
let compliments = {
    anytime: ["Hey there, gorgeous!", "Ayo can I get your number?", "I know I'm just a mirror, but I'm simping", "DAYUM"],
    morning: ["Good morning, beautiful!", "Have a great day, today!", "How was your sleep?"],
    night: ["Good night, sweetums", "Sweet dreams!"],
    new_year: ["Happy new year!"]
}

function messageRefresher() {
    var refresh_rate = 60*60*1000;
    const my_time = setTimeout(changeMessage, refresh_rate)
}

export function changeMessage() {
    var now = new Date();
    var hour = now.getHours();
    let compliment_arr;

    if (now.getMonth() === 0 && now.getDate === 1) {
        compliment_arr = compliments.new_year;
    }
    else if (hour >= 7 && hour < 12) {
        compliment_arr = compliments.morning;
    }
    else if (hour >= 22 || hour < 7) {
        compliment_arr = compliments.night;
    }
    else {
        compliment_arr = compliments.anytime;
    }

    var idx = Math.floor(Math.random() * compliment_arr.length);

    var message = document.getElementById("message");
    message.innerHTML = compliment_arr[idx];

    messageRefresher();
}