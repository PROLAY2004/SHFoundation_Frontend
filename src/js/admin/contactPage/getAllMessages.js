import apiInterceptor from '../../api/interceptor.js';

export default async function getMsg() {
	try {
		// Change GET to POST to match your new backend controller
		const response = await apiInterceptor(
			`POST`,
			`/user/admin/contact/loader`,
			{
				page: 1,
				limit: 1000,
				filter: 'all',
				query: '',
			},
		);

		// Safety check: if response is not OK, don't try to parse JSON
		if (!response.ok) {
			throw new Error(`Server returned ${response.status}`);
		}

		const result = await response.json();

		if (result.success) {
			return result.data;
		} else {
			if (result.message === 'Not an Admin') {
				window.location.href = '/src/pages/account/profile.html';
			}
			return null;
		}
	} catch (err) {
		console.error('getMsg Error:', err.message);
		return null;
	}
}
