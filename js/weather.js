let config = {
    maxNumberOfDays: 5,
    showRainAmount: true,
    updateInterval: 10 * 60 * 1000,

    appid: "07620dbfe89df423b370527b248e6a35",
    apiVersion: "2.5",
    apiBase: "https://api.openweathermap.org/data/",
    forecastEndpoint: "onecall",
    toExclude: "minutely,hourly,current",
    lat:43.78,
    lon:-79.36,
    units: "metric",
    roundTemp: false,
    refreshRate: 60*60*1000
}

function refreshForecast() {
    var refresh_rate = config.refreshRate;
    const my_time = setTimeout(getForecast, refresh_rate);
}

export function getForecast() {
    if (config.appid === "") {
        Log.error("WeatherForecast: APPID not set!");
        return;
    }

    var url = config.apiBase + config.apiVersion + "/" + config.forecastEndpoint + getParams();

    var weatherRequest = new XMLHttpRequest();
    weatherRequest.open("GET", url, true);
    weatherRequest.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            processWeather(JSON.parse(this.response));
        }
    
    };
    weatherRequest.send();

    refreshForecast();
}

function getParams() {
    var params = "?" + "lat=" + config.lat + "&lon=" + config.lon;

    if(config.toExclude != null) {
        params += "&exclude=" + config.toExclude;
    }

    params += "&units=" + config.units;
    params += "&APPID=" + config.appid;

    return params;
}

function processWeather(data) {
    var forecastData;
    var forecast = [];

    for (const day of data.daily) {
        var curr_day;

        if (day.dt_txt) {
            curr_day = moment(day.dt_txt, "YYYY-MM-DD hh:mm:ss").format("ddd");
        } else {
            curr_day = moment(day.dt, "X").format("ddd");
        }

        forecastData = {
            "day": curr_day,
            maxTemp: roundValue(day.temp.max),
            minTemp: roundValue(day.temp.min),
            pop: String(day.pop*100)+"%"
        };

        forecast.push(forecastData);

        if (forecast.length === config.maxNumberOfDays) {
            break;
        }
    }

    createWeatherTable(forecast);
}

function roundValue(temperature) {
    var decimals = config.roundTemp ? 0 : 1;
    return parseFloat(temperature).toFixed(decimals);
}

function createWeatherTable(forecast) {
    var weather_module = document.getElementById("weather");
    weather_module.innerHTML = "";

    var table = document.createElement("table");
    var thead = document.createElement('thead');
    var tbody = document.createElement('tbody');

    table.appendChild(thead);
    table.appendChild(tbody);

    weather_module.appendChild(table);

    var heading_row = document.createElement("tr");
    table.appendChild(heading_row);

    var day_heading = document.createElement("td");
    day_heading.className = "heading";
    day_heading.innerHTML = "Day";
    heading_row.appendChild(day_heading);

    var high_heading = document.createElement("td");
    high_heading.className = "heading";
    high_heading.innerHTML = "High";
    heading_row.appendChild(high_heading);

    var low_heading = document.createElement("td");
    low_heading.className = "heading";
    low_heading.innerHTML = "Low";
    heading_row.appendChild(low_heading);

    var pop_heading = document.createElement("td");
    pop_heading.className = "heading";
    pop_heading.innerHTML= "PoP";
    heading_row.appendChild(pop_heading);

    for (const f of forecast) {
        var row = document.createElement("tr");
        table.appendChild(row);

        var dayCell = document.createElement("td");
        dayCell.className = "day";
        dayCell.innerHTML = f.day;
        row.appendChild(dayCell);

        var highCell = document.createElement("td");
        highCell.className = "temperature";
        highCell.innerHTML = f.maxTemp;
        row.appendChild(highCell);

        var lowCell = document.createElement("td");
        lowCell.className = "temperature";
        lowCell.innerHTML = f.minTemp;
        row.appendChild(lowCell);

        var popCell = document.createElement("td");
        popCell.className = "pop";
        popCell.innerHTML = f.pop;
        row.appendChild(popCell);
    }
}