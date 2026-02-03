import apiInterceptor from '../api/interceptor.js';

export default async function getInfo(key, type = 'email') {
	try {
		const response = await apiInterceptor('POST', `/user/admin/info`, {
			key,
			type,
		});

		if (response.status === 404) {
			return false;
		}

		return response;
	} catch (err) {
		console.log(err.message);
	}
}
