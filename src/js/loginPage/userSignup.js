import configaration from '../config/config';
import Templates from '../common/Templates';
import Api from '../api/Api.js';

const displayToast = new Templates();
const api = new Api();

const toastSection = document.getElementById('toastSection');
const signupName = document.getElementById('signupName');
const signupEmail = document.getElementById('signupEmail');
const signupPassword = document.getElementById('signupPassword');
const registerForm = document.getElementById('registerForm');
const signupBtn = document.getElementById('signupBtn');
const spinnerContainer = document.getElementById('signupSpinnerContainer');

export default async function userRegistration(e) {
	try {
		e.preventDefault();

		const userData = {
			name: signupName.value.trim(),
			email: signupEmail.value.trim(),
			password: signupPassword.value.trim(),
		};

		signupBtn.classList.add('disabled');
		spinnerContainer.innerHTML = `<div class="spinner-border text-dark custom-spinner" role="status"></div>`;

		const response = await api.postApi(
			`${configaration.BASE_URL}/user/auth/signup`,
			userData
		);

		const result = await response.json();

		if (result.success) {
			toastSection.innerHTML = displayToast.successToast(result.message);
			registerForm.reset();
		} else {
			toastSection.innerHTML = displayToast.errorToast(result.message);
		}
	} catch (err) {
		toastSection.innerHTML = displayToast.errorToast(err.message);
	} finally {
		signupBtn.classList.remove('disabled');
		spinnerContainer.innerHTML = ``;

		setTimeout(() => {
			toastSection.innerHTML = '';
		}, 3000);
	}
}
