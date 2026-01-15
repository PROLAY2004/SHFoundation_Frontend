import * as bootstrap from 'bootstrap';

import '../../scss/verificationPage/signupVerification.scss';
import displaySignupCards from './displaySignupCards';

const verifyPageContainer = document.getElementById('verifyPageContainer');

document.addEventListener('DOMContentLoaded', () => {
	verifyPageContainer.style.display = 'flex';
	displaySignupCards();
});
