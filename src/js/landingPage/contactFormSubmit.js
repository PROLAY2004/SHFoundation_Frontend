import mainPageElements from './landingSelector';
import Api from '../api/Api.js';
import configaration from '../config/config.js';
import Templates from '../common/Templates.js';

const displayToast = new Templates();
const api = new Api();

export default async function contactSubmit(e) {
	try {
		e.preventDefault();

		mainPageElements.contactFormBtn.classList.add('disabled');
		mainPageElements.contactFormSpinner.innerHTML =
			'<div class="spinner-border spinner-border-sm text-white" role="status"></div>';

		const response = await api.postApi(
			`${configaration.BASE_URL}/user/main/contact`,
			'',
			{
				name: mainPageElements.name.value.trim(),
				email: mainPageElements.email.value.trim(),
				subject: mainPageElements.subject.value.trim(),
				message: mainPageElements.message.value.trim(),
			},
		);
		const result = await response.json();

		if (result.success) {
			mainPageElements.contactForm.reset();
			mainPageElements.toastSection.innerHTML = displayToast.successToast(
				result.message,
			);
		} else {
			mainPageElements.toastSection.innerHTML = displayToast.errorToast(
				result.message,
			);
		}
	} catch (err) {
		mainPageElements.toastSection.innerHTML = displayToast.errorToast(
			err.message,
		);
	} finally {
		mainPageElements.contactFormBtn.classList.remove('disabled');
		mainPageElements.contactFormSpinner.innerHTML = '';

		setTimeout(() => {
			mainPageElements.toastSection.innerHTML = '';
		}, 3000);
	}
}
