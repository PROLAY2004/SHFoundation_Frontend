import Api from '../api/Api';
import Templates from '../common/Templates.js';
import configaration from '../config/config';

const displayToast = new Templates();
const api = new Api();

const newPassword = document.getElementById('newPassword');
const confirmPassword = document.getElementById('confirmPassword');
const resetForm = document.getElementById('resetForm');
const toastSection = document.getElementById('toastSection');
const spinnerContainer = document.getElementById('spinnerContainer');

const params = new URLSearchParams(window.location.search);
const token = params.get('token');

export default async function setPassword(e) {
	try {
		e.preventDefault();

		spinnerContainer.innerHTML = `<div class="spinner-border spinner-border-sm text-white" role="status"></div>`;
		resetForm.classList.add('disabled');

		if (newPassword.value.trim() !== confirmPassword.value.trim()) {
			toastSection.innerHTML = displayToast.errorToast(
				'Confirm Password not matched',
			);

			return;
		}

		const response = await api.patchApi(
			`${configaration.BASE_URL}/user/auth/forgot-password`,
			token,
			{ password: newPassword.value.trim() },
		);

		const result = await response.json();

		if (result.success) {
			resetForm.reset();

			toastSection.innerHTML = displayToast.successToast(result.message);

			setTimeout(() => {
				window.location.href = '/src/pages/auth/login.html';
			}, 1000);
		} else {
			toastSection.innerHTML = displayToast.errorToast(result.message);
		}
	} catch (err) {
		toastSection.innerHTML = displayToast.errorToast(err.message);
	} finally {
		spinnerContainer.innerHTML = '';
		resetForm.classList.remove('disabled');

		setTimeout(() => {
			toastSection.innerHTML = '';
		}, 3000);
	}
}
