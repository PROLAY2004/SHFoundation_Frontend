import Api from '../api/Api';
import configaration from '../config/config.js';
import profileElements from './profileSelector.js';
import setData from './setProfileData.js';

const api = new Api();

export default async function displayProfileData() {
	try {
		profileElements.profilePageBody.style.display = 'block';

		const response = await api.getApi(
			`${configaration.BASE_URL}/user/account/getUserData`,
			localStorage.getItem('SHF_access_token'),
		);
		const result = await response.json();
		console.log(result);

		if (result.success) {
			setData(result.data);
		}
	} catch (err) {
		console.log(err.message);
	}
}
