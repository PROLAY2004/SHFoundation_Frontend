import apiInterceptor from '../api/interceptor.js';
import profileElements from './profileSelector.js';
import setData from './setProfileData.js';
import Templates from '../common/Templates.js';

const displayToast = new Templates();

export default async function displayProfileData() {
	try {
		const response = await apiInterceptor(`GET`, `/user/account/getUserData`);
		const result = await response.json();

		if (result.success) {
			profileElements.profilePageBody.style.display = 'block';
			setData(result.data);
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
