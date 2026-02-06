import getInfo from '../../utils/fetchUserDetails.js';
import * as bootstrap from 'bootstrap';
import volunteerElements from './volunteerSelector.js';
import apiInterceptor from '../../api/interceptor.js';
import Templates from '../../common/Templates.js';
import setModalData from './renderModal.js';

const displayToast = new Templates();
const modal = new bootstrap.Modal(volunteerElements.volunteerDetails);

async function showModal(responseId, userId) {
	try {
		volunteerElements.volunteerBody.classList.add('loading');

		const userDataResponse = await getInfo(userId, 'userId');
		const userData = await userDataResponse.json();
		const response = await apiInterceptor(
			'POST',
			'/user/admin/volunteer/getVoluenteerInfo',
			{ responseId },
		);
		const result = await response.json();
		const voluenteerData = result.data;

		if (result.success) {
			await setModalData(userData.data.userInfo, voluenteerData);

			volunteerElements.volunteerBody.classList.remove('loading');
			modal.show();
		} else {
			volunteerElements.toastSection.innerHTML = displayToast.errorToast(
				result.message,
			);
		}
	} catch (err) {
		volunteerElements.toastSection.innerHTML = displayToast.errorToast(
			err.message,
		);
	} finally {
		setTimeout(() => {
			volunteerElements.toastSection.innerHTML = '';
		}, 3000);
	}
}

window.showModal = showModal;
