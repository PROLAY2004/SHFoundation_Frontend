import apiInterceptor from '../api/interceptor.js';
import Templates from '../common/Templates.js';
import profileElements from './profileSelector.js';
import displayProfileData from './fetchUserData.js';

const displayToast = new Templates();

export default async function updateNewsletterPreference(e) {
	try {
		e.preventDefault();

		const selected = document.querySelector(
			'input[name="newsletter"]:checked',
		)?.value;

		const response = await apiInterceptor(
			'PATCH',
			'/user/account/setNewsLetter',
			{
				type: selected,
			},
		);

		const result = await response.json();

		if (result.success) {
			displayProfileData();

			profileElements.toastSection.innerHTML = displayToast.successToast(
				result.message,
			);
		} else {
			profileElements.toastSection.innerHTML = displayToast.errorToast(
				result.message,
			);
		}
	} catch (err) {
		profileElements.toastSection.innerHTML = displayToast.errorToast(
			err.message,
		);
	} finally {
		setTimeout(() => {
			profileElements.toastSection.innerHTML = '';
		}, 3000);
	}
}
