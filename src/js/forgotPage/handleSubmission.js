import configaration from '../config/config.js';
import Api from '../api/Api.js';
import Templates from '../common/Templates.js';

const api = new Api();
const displayToast = new Templates();
const resetEmail = document.getElementById('resetEmail');
const toastSection = document.getElementById('toastSection');
const resetBtn = document.getElementById('resetBtn');
const spinnerContainer = document.getElementById('spinnerContainer');
const forgotForm = document.getElementById('forgotForm');

export default async function resetFormHandler(e) {
	try {
		e.preventDefault();

		resetBtn.classList.add('disabled');
		spinnerContainer.innerHTML = `<div class="spinner-border text-dark custom-spinner" role="status"></div>`;

		const response = await api.postApi(
			`${configaration.BASE_URL}/user/auth/forgot-password`,
			{ email: resetEmail.value.trim() }
		);

		const result = await response.json();

		if (result.success) {
			forgotForm.reset();

			toastSection.innerHTML = displayToast.successToast(result.message);
		} else {
			toastSection.innerHTML = displayToast.errorToast(result.message);
		}
	} catch (err) {
		toastSection.innerHTML = displayToast.errorToast(err.message);
	} finally {
		resetBtn.classList.remove('disabled');
		spinnerContainer.innerHTML = ``;

		setTimeout(() => {
			toastSection.innerHTML = '';
		}, 3000);
	}
}
