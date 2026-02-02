import apiInterceptor from '../api/interceptor.js';
import configaration from '../config/config.js';

export default async function getInfo(email) {
	try {
		const response = await apiInterceptor('POST', `/user/admin/info`, {
			email,
		});

		if (response.status === 404) {
			return false;
		}

		return response;
	} catch (err) {
		console.log(err.message);
	}
}
