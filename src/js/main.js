import * as bootstrap from 'bootstrap';

import '../scss/index.scss';
import landingPageScroll from './landingPage/landingPageScroll.js';
import displayCharts from './landingPage/displayCharts.js';

const landingPageBody = document.getElementById('landingPageBody');

document.addEventListener('DOMContentLoaded', () => {
	landingPageBody.style.display = 'block';
});

document.addEventListener('DOMContentLoaded', landingPageScroll);
document.addEventListener('DOMContentLoaded', displayCharts);
