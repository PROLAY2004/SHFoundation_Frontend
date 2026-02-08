import * as bootstrap from 'bootstrap';

import newsElements from './newsletterSelector';
import Templates from '../../common/Templates';
import apiInterceptor from '../../api/interceptor';
import displayNewsletters from './fetchNewsletterDetails';

const updateModal = new bootstrap.Modal(newsElements.actionModal);
const displayToast = new Templates();

function setSubId(subId) {
	newsElements.confirmActionBtn.setAttribute('data-subId', subId);
}

window.setSubId = setSubId;

export default async function changeStatus() {
	try {
		const subId = newsElements.confirmActionBtn.getAttribute('data-subId');
		const res = await apiInterceptor('PATCH', '/user/admin/newsletter', {
			subId,
		});
		const result = await res.json();

		if (result.success) {
			await displayNewsletters();

			updateModal.hide();

			newsElements.toastSection.innerHTML = displayToast.successToast(
				result.message,
			);
		} else {
			newsElements.toastSection.innerHTML = displayToast.errorToast(
				result.message,
			);
		}
	} catch (err) {
		newsElements.toastSection.innerHTML = displayToast.errorToast(err.message);
	} finally {
		setTimeout(() => {
			newsElements.toastSection.innerHTML = '';
		}, 3000);
	}
}
