import * as bootstrap from 'bootstrap';

import '../scss/index.scss';

import landingPageScroll from './landingPage/landingPageScroll.js';
import displayCharts from './landingPage/displayCharts.js';

document.addEventListener('DOMContentLoaded', landingPageScroll);
document.addEventListener('DOMContentLoaded', displayCharts);
