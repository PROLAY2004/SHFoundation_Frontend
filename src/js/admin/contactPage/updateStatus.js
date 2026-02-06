import apiInterceptor from '../../api/interceptor';
import displayContact from './fetchContactData';

export default async function chnageStatus(messageId) {
	try {
		const response = await apiInterceptor('POST', `/user/admin/contact`, {
			messageId,
		});

		const result = await response.json();

		if (result.success && result.data.messageInfo.status === 'new') {
			const res = await apiInterceptor('PATCH', `/user/admin/contact`, {
				messageId,
			});
			const newResult = await res.json();

			if (newResult.success) {
				await displayContact();
				return result.data.messageInfo;
			} else {
				console.log(newResult.message);
			}
		} else {
			return result.data.messageInfo;
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
