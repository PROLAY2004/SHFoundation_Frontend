import configaration from '../config/config.js';
import Api from '../api/Api.js';

const api = new Api();

const tokenMissingCard = document.getElementById('tokenMissingCard');
const tokenExpiredCard = document.getElementById('tokenExpiredCard');
const successCard = document.getElementById('successCard');

export default async function displaySignupCards() {
	const params = new URLSearchParams(window.location.search);
	const token = params.get('token');

	if (!token) {
		tokenMissingCard.classList.remove('d-none');
	} else {
		try {
			const response = await api.patchApi(
				`${configaration.BASE_URL}/user/auth/signup`,
				token
			);

			const result = await response.json();

			if (result.success) {
				successCard.classList.remove('d-none');
			} else {
				tokenExpiredCard.classList.remove('d-none');
			}
		} catch (error) {
			tokenMissingCard.classList.remove('d-none');
		}
	}
}
