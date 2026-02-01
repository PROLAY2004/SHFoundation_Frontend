import * as bootstrap from 'bootstrap';

import '../../scss/loginPage/login.scss';

import './tabSwiching.js';
import userRegistration from './userSignup.js';
import userLogin from './userSignin.js';
import isAuthenticated from '../common/checkAuthentication.js';

const loginPageBody = document.getElementById('loginPageBody');
const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');

document.addEventListener('DOMContentLoaded', authPageLoader);
registerForm.addEventListener('submit', userRegistration);
loginForm.addEventListener('submit', userLogin);

export default function authPageLoader() {
	if (isAuthenticated()) {
		const redirectUrl = localStorage.getItem('SHF_redirect_route');

		localStorage.removeItem('SHF_redirect_route');
		
		window.location.href = redirectUrl || '/src/pages/account/profile.html';
	} else {
		loginPageBody.style.display = 'flex';
	}
}
