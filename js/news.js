let config = {
    apiKey: "1f1b22a9cb874f339df64ce242f221e7",
    apiBase: "https://newsapi.org/v2/",
    apiEndpoint: "top-headlines",
    country: 'ca',
    pageSize: 50,
    refreshRate: 20*1000,
    getNewHeadlinesRate: 2*60*60*1000,
    headlineIndex: 0,
    headlines: []
};

function refreshHeadline() {
    var refresh_rate = config.refreshRate;
    const my_time = setTimeout(updateHeadline, refresh_rate);
}

function getNewHeadlines() {
    var refresh_rate = config.getNewHeadlinesRate;
    const my_time = setTimeout(getNews, refresh_rate);
}

export function getNews() {
    var params = "?" + "apiKey=" + config.apiKey + "&country=" + config.country + "&pageSize=" + config.pageSize;

    var url = config.apiBase + config.apiEndpoint + params;

    var newsRequest = new XMLHttpRequest();
    newsRequest.open("GET", url, true);
    newsRequest.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            processNews(JSON.parse(this.response));
        }
    
    };
    newsRequest.send();
}

function processNews(data) {
    console.log(data);

    config.headlines = [];

    for (const article of data.articles) {
        config.headlines.push(article.title)
    }

    updateHeadline();

    getNewHeadlines();
}

function updateHeadline() {
    document.getElementById("news").innerHTML = config.headlines[config.headlineIndex];
    config.headlineIndex= (config.headlineIndex + 1) % config.pageSize;

    refreshHeadline();
}