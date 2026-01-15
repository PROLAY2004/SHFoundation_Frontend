import * as bootstrap from 'bootstrap';

import '../../scss/forgotPage/forgot.scss';
import resetFormHandler from './handleSubmission.js';

const forgotPageBody = document.getElementById('forgotPageBody');
const forgotForm = document.getElementById('forgotForm');

forgotForm.addEventListener('submit', resetFormHandler);
document.addEventListener('DOMContentLoaded', () => {
	forgotPageBody.style.display = 'flex';
});
