import * as bootstrap from 'bootstrap';

import '../../scss/forgotPage/reset-password.scss';
import displayCard from '../verificationPage/resetVerification.js';
import setPassword from './setNewPassword.js';

const resetPageBody = document.getElementById('resetPageBody');
const resetForm = document.getElementById('resetForm');
const params = new URLSearchParams(window.location.search);
const token = params.get('token');

resetForm.addEventListener('submit', setPassword);
document.addEventListener('DOMContentLoaded', () => {
	resetPageBody.style.display = 'flex';
	displayCard(token);
});
