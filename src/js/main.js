import * as bootstrap from 'bootstrap';

import '../scss/index.scss';
import landingPageScroll from './landingPage/landingPageScroll.js';
import displayCharts from './landingPage/displayCharts.js';
import isAuthenticated from './common/checkAuthentication.js';

const landingPageBody = document.getElementById('landingPageBody');
const mainLoginBtn = document.getElementById('mainLoginBtn');

document.addEventListener('DOMContentLoaded', () => {
	landingPageBody.style.display = 'block';

	if (isAuthenticated()) {
		mainLoginBtn.innerHTML = 'Profile';
	}
});

document.addEventListener('DOMContentLoaded', landingPageScroll);
document.addEventListener('DOMContentLoaded', displayCharts);
