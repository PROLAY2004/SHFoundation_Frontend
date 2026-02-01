import * as bootstrap from 'bootstrap';
import '../scss/index.scss';

import isAuthenticated from './common/checkAuthentication.js';
import landingPageScroll from './landingPage/landingPageScroll.js';
import displayCharts from './landingPage/displayCharts.js';
import mainPageElements from './landingPage/landingSelector.js';
import contactSubmit from './landingPage/contactFormSubmit.js';
import subscribeNews from './landingPage/newsletterSubmit.js';

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
mainPageElements.contactForm.addEventListener('submit', contactSubmit);
mainPageElements.newsletterForm.addEventListener('submit', subscribeNews);
