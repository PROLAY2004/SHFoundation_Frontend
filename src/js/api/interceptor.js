import Api from './Api.js';
import configaration from '../config/config.js';

const api = new Api();

export default async function apiInterceptor(method, endpoint, body = null) {
	try {
		const access_token = localStorage.getItem('SHF_access_token');
		const refresh_token = localStorage.getItem('SHF_refresh_token');
		let response;

		if (!access_token && !refresh_token) {
			window.location.href = '/';
		}

		switch (method) {
			case 'POST':
				response = await api.postApi(
					`${configaration.BASE_URL}${endpoint}`,
					body,
				);
				break;

			case 'PATCH':
				response = await api.patchApi(
					`${configaration.BASE_URL}${endpoint}`,
					access_token,
					body,
				);
				break;

			case 'GET':
				response = await api.getApi(
					`${configaration.BASE_URL}${endpoint}`,
					access_token,
				);
				break;

			default:
				throw new Error('No Method Provided');
		}

		if (response.status === 401) {
			const res = await api.getApi(
				`${configaration.BASE_URL}/user/auth/refresh`,
				refresh_token,
			);

			if (res.status === 401) {
				localStorage.clear();
			} else {
				const result = await res.json();

				localStorage.setItem('SHF_access_token', result.access_token);
				localStorage.setItem('SHF_refresh_token', result.refresh_token);
			}

			return apiInterceptor(method, endpoint, body);
		}

		return response;
	} catch (err) {
		throw new Error(err);
	}
}
