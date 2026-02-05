import displaySidebar from '../../templates/admin/sidebarTemplate.js';
import volunteerElements from './volunteerSelector.js';
import apiInterceptor from '../../api/interceptor.js';
import setVoluenteerData from './displayVoluenteerDetails.js';
import Templates from '../../common/Templates.js';

const displayToast = new Templates();

export default async function displayVoluenteerDetails() {
	try {
		volunteerElements.volunteerSidebar.innerHTML = displaySidebar('voluenteer');
		volunteerElements.volunteerBody.style.display = 'block';
		volunteerElements.volunteerBody.classList.add('loading');

		const response = await apiInterceptor('POST', '/user/admin/volunteer', {});
		const result = await response.json();

		if (result.success) {
			await setVoluenteerData(result.data);
		} else {
			if (result.message === 'Not an Admin') {
				window.location.href = '/src/pages/account/profile.html';
			}

			volunteerElements.toastSection.innerHTML = displayToast.errorToast(
				result.message,
			);
		}

		volunteerElements.volunteerBody.classList.remove('loading');
	} catch (err) {
		volunteerElements.toastSection.innerHTML = displayToast.errorToast(
			err.message,
		);
	} finally {
		setTimeout(() => {
			volunteerElements.toastSection.innerHTML = '';
		}, 3000);
	}
}
