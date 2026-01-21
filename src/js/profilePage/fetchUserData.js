import apiInterceptor from '../api/interceptor.js';
import profileElements from './profileSelector.js';
import setData from './setProfileData.js';
import displayTerm from '../templates/Profile/termTemplate.js';

export default async function displayProfileData() {
	try {
		profileElements.termModalBody.innerHTML = displayTerm();

		const response = await apiInterceptor(`GET`, `/user/account/getUserData`);
		const result = await response.json();

		if (result.success) {
			profileElements.profilePageBody.style.display = 'block';
			setData(result.data);
		}
	} catch (err) {
		console.log(err.message);
	}
}
