import apiInterceptor from '../../api/interceptor.js';
import Templates from '../../common/Templates.js';
import contactElements from './contactSelector.js';

const displayToast = new Templates();

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

			contactElements.toastSection.innerHTML = displayToast.errorToast(
				result.message,
			);
		}
	} catch (err) {
		contactElements.toastSection.innerHTML = displayToast.errorToast(
			err.message,
		);
	} finally {
		setTimeout(() => {
			contactElements.toastSection.innerHTML = '';
		}, 3000);
	}
}
