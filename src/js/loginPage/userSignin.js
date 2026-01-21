import configaration from '../config/config';
import Templates from '../common/Templates';
import Api from '../api/Api.js';
import authPageLoader from './login.js';

const displayToast = new Templates();
const api = new Api();

const toastSection = document.getElementById('toastSection');
const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');
const loginForm = document.getElementById('loginForm');
const signinBtn = document.getElementById('signinBtn');
const spinnerContainer = document.getElementById('spinnerContainer');

export default async function userLogin(e) {
	try {
		e.preventDefault();

		const userData = {
			email: loginEmail.value.trim(),
			password: loginPassword.value.trim(),
		};

		signinBtn.classList.add('disabled');
		spinnerContainer.innerHTML = `<div class="spinner-border text-dark custom-spinner" role="status"></div>`;

		const response = await api.postApi(
			`${configaration.BASE_URL}/user/auth/login`,
			null,
			userData,
		);

		const result = await response.json();

		if (result.success) {
			toastSection.innerHTML = displayToast.successToast(result.message);
			loginForm.reset();

			localStorage.setItem('SHF_access_token', result.access_token);
			localStorage.setItem('SHF_refresh_token', result.refresh_token);

			setTimeout(() => {
				authPageLoader();
			}, 1000);
		} else {
			toastSection.innerHTML = displayToast.errorToast(result.message);
		}
	} catch (err) {
		toastSection.innerHTML = displayToast.errorToast(err.message);
	} finally {
		signinBtn.classList.remove('disabled');
		spinnerContainer.innerHTML = ``;

		setTimeout(() => {
			toastSection.innerHTML = '';
		}, 3000);
	}
}
