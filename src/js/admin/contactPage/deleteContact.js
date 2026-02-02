import * as bootstrap from 'bootstrap';

import contactElements from './contactSelector';
import apiInterceptor from '../../api/interceptor';
import Templates from '../../common/Templates.js';
import displayContact from './fetchContactData.js';

const displayToast = new Templates();
const deleteModal = new bootstrap.Modal(contactElements.deleteModal);

function setMsgId(messageId) {
	contactElements.confirmDeleteBtn.setAttribute('data-messageId', messageId);
}

window.setMsgId = setMsgId;

export default async function deleteMsg() {
	try {
		const messageId =
			contactElements.confirmDeleteBtn.getAttribute('data-messageId');
		const response = await apiInterceptor('DELETE', `/user/admin/contact`, {
			messageId,
		});
		const result = await response.json();

		if (result.success) {
			await displayContact();
			deleteModal.hide();

			contactElements.toastSection.innerHTML = displayToast.successToast(
				result.message,
			);
		} else {
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
