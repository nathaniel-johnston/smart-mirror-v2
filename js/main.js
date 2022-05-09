import {displayTime} from './time.js';
import {changeMessage} from './messages.js';
import {getForecast} from './weather.js';
import {getNews} from './news.js';

window.onload = function start() {
    displayTime();
    changeMessage();
    getForecast();
    getNews();
}