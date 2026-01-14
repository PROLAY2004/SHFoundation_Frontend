import configaration from '../config/config';
import Templates from '../common/Templates';

const displayToast = new Templates();
const toastSection = document.getElementById('toastSection');
const signupName = document.getElementById('signupName');
const signupEmail = document.getElementById('signupEmail');
const signupPassword = document.getElementById('signupPassword');

export default async function userRegistration(e) {
	try {
		e.preventDefault();

		console.log(configaration.BASE_URL);

		const name = signupName.value.trim();
		const email = signupEmail.value.trim();
		const password = signupPassword.value.trim();

		console.log(name, email, password);
	} catch (err) {
		toastSection.innerHTML = displayToast.errorToast(err.message);
	} finally {
		setTimeout(() => {
			toastSection.innerHTML = '';
		}, 3000);
	}
}
