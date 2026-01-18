import profileElements from './profileSelector.js';
import apiInterceptor from '../api/interceptor.js';
import Templates from '../common/Templates.js';
import displayProfileData from './fetchUserData.js';

const displayToast = new Templates();

export default async function updateProfileData(e) {
	try {
		e.preventDefault();

		const response = await apiInterceptor(`PATCH`, `/user/account/updateData`, {
			name: profileElements.editName.value.trim(),
		});
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
