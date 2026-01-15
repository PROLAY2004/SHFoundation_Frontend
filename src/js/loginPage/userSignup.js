import configaration from '../config/config';
import Templates from '../common/Templates';

const displayToast = new Templates();
const toastSection = document.getElementById('toastSection');
const signupName = document.getElementById('signupName');
const signupEmail = document.getElementById('signupEmail');
const signupPassword = document.getElementById('signupPassword');
const registerForm = document.getElementById('registerForm');
const signupBtn = document.getElementById('signupBtn');
const spinnerContainer = document.getElementById('spinnerContainer');

export default async function userRegistration(e) {
	try {
		e.preventDefault();

		signupBtn.classList.add('disabled');
		spinnerContainer.innerHTML = `<div class="spinner-border text-dark" role="status"></div>`;

		const response = await fetch(`${configaration.BASE_URL}/user/auth/signup`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: signupName.value.trim(),
				email: signupEmail.value.trim(),
				password: signupPassword.value.trim(),
			}),
		});

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
