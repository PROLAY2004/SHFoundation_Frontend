import * as bootstrap from 'bootstrap';

import '../../scss/loginPage/login.scss';

import './tabSwiching.js';
import userRegistration from './userSignup.js';
import userLogin from './userSignin.js';
import isAuthenticated from '../common/checkAuthentication.js';

const loginPageBody = document.getElementById('loginPageBody');
const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');

document.addEventListener('DOMContentLoaded', () => {
	if (isAuthenticated()) {
		window.location.href = '/src/pages/account/dashboard.html';
	} else {
		loginPageBody.style.display = 'flex';
	}
});

registerForm.addEventListener('submit', userRegistration);
loginForm.addEventListener('submit', userLogin);
