import apiInterceptor from '../../api/interceptor.js';

export default async function getMsg() {
	try {
		const response = await apiInterceptor(`GET`, `/user/admin/contact`);
		const result = await response.json();

		if (result.success) {
			return result.data;
		} else {
			if (result.message === 'Not an Admin') {
				window.location.href = '/src/pages/account/profile.html';
			}

			console.log(response.message);
		}
	} catch (err) {
		console.log(err.message);
	}
}
