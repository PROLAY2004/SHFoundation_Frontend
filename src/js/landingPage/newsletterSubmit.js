import mainPageElements from './landingSelector';
import Api from '../api/Api.js';
import configaration from '../config/config.js';
import Templates from '../common/Templates.js';

const displayToast = new Templates();
const api = new Api();

export default async function subscribeNews(e) {
	try {
		e.preventDefault();

		const response = await api.postApi(
			`${configaration.BASE_URL}/user/main/subscribe`,
			'',
			{
				email: mainPageElements.newsletterEmail.value.trim(),
			},
		);
		const result = await response.json();

		if (result.success) {
			mainPageElements.newsletterForm.reset();
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
		setTimeout(() => {
			mainPageElements.toastSection.innerHTML = '';
		}, 3000);
	}
}
