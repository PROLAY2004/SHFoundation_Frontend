import profileElements from './profileSelector.js';
import apiInterceptor from '../api/interceptor.js';
import Templates from '../common/Templates.js';
import displayProfileData from './fetchUserData.js';

const displayToast = new Templates();

export default async function updateProfileData(e) {
	try {
		e.preventDefault();

		profileElements.updateSpinner.innerHTML = `<div class="spinner-border spinner-border-sm text-white" role="status"></div>`;
		profileElements.editBtn.classList.add('disabled');

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
		profileElements.updateSpinner.innerHTML = ``;
		profileElements.editBtn.classList.remove('disabled');

		setTimeout(() => {
			profileElements.toastSection.innerHTML = '';
		}, 3000);
	}
}
