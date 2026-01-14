import * as bootstrap from 'bootstrap';

import '../../scss/loginPage/login.scss';

import './tabSwiching.js';
import userRegistration from './userSignup.js';

const loginPageBody = document.getElementById('loginPageBody');
const registerForm = document.getElementById('registerForm');

document.addEventListener('DOMContentLoaded', () => {
	loginPageBody.style.display = 'flex';
});

registerForm.addEventListener('submit', userRegistration);
