import * as bootstrap from 'bootstrap';

import volunteerElements from './volunteerSelector';
import Templates from '../../common/Templates';
import apiInterceptor from '../../api/interceptor';
import displayVoluenteerDetails from './fetchVoluenteerData.js';

const displayToast = new Templates();
const modalInstance = bootstrap.Modal.getInstance(
	volunteerElements.volunteerDetails,
);

async function changeStatus(status) {
	try {
		const applicationId =
			volunteerElements.modalFooter.getAttribute('data-applicationId');
		const response = await apiInterceptor('PATCH', '/user/admin/voluenteer', {
			applicationId,
			status,
		});
		const result = await response.json();

		if (result.success) {
			await displayVoluenteerDetails();

			modalInstance?.hide();

			volunteerElements.toastSection.innerHTML = displayToast.successToast(
				result.message,
			);
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
		}, 5000);
	}
}

window.changeStatus = changeStatus;
