import configaration from '../config/config.js';
import Api from '../api/Api.js';

const api = new Api();
const tokenExpiredCard = document.getElementById('tokenExpiredCard');
const resetForm = document.getElementById('resetForm');

export default async function displayCard(token) {
	if (token) {
		try {
			const response = await api.getApi(
				`${configaration.BASE_URL}/user/auth/forgot-password`,
				token
			);

			const result = await response.json();

			if (result.success) {
				resetForm.classList.remove('d-none');
				tokenExpiredCard.classList.add('d-none');
			}
		} catch (error) {
			tokenExpiredCard.classList.add('d-none');
		}
	}
}
