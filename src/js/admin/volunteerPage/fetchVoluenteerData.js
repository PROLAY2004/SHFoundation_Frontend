import displaySidebar from '../../templates/admin/sidebarTemplate.js';
import volunteerElements from './volunteerSelector.js';
import apiInterceptor from '../../api/interceptor.js';
import setVoluenteerData from './displayVoluenteerDetails.js';
import Templates from '../../common/Templates.js';

const displayToast = new Templates();
let currentState = {
	page: 1,
	limit: 5,
	filter: 'all',
	availability: 'all',
	query: '',
};

export default async function displayVoluenteerDetails(
	resetPage = false,
	specificPage = null,
) {
	if (resetPage) currentState.page = 1;
	if (specificPage) currentState.page = specificPage;

	currentState.query = volunteerElements.volunteerSearch.value.trim();
	currentState.filter = volunteerElements.statusFilter.value;
	currentState.availability = volunteerElements.availabilityFilter.value;

	try {
		volunteerElements.volunteerBody.style.display = 'block';
		volunteerElements.volunteerSidebar.innerHTML = displaySidebar('voluenteer');
		volunteerElements.volunteerBody.classList.add('loading');

		const response = await apiInterceptor(
			'POST',
			'/user/admin/volunteer',
			currentState,
		);
		const result = await response.json();

		if (result.success) {
			await setVoluenteerData(result.data, currentState);
		} else {
			if (result.message === 'Not an Admin') {
				window.location.href = '/src/pages/account/profile.html';
			}
			volunteerElements.toastSection.innerHTML = displayToast.errorToast(
				result.message,
			);
		}
	} catch (err) {
		volunteerElements.toastSection.innerHTML = displayToast.errorToast(
			err.message,
		);
	} finally {
		volunteerElements.volunteerBody.classList.remove('loading');
		setTimeout(() => {
			volunteerElements.toastSection.innerHTML = '';
		}, 3000);
	}
}
