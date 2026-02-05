import apiInterceptor from '../api/interceptor.js';
import Templates from '../common/Templates.js';

const displayToast = new Templates();
const toastSection = document.getElementById('toastSection');

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
		toastSection.innerHTML = displayToast.errorToast(err.message);
	} finally {
		setTimeout(() => {
			toastSection.innerHTML = '';
		}, 3000);
	}
}
