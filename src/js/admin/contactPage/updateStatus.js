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
				return newResult;
			} else {
				console.log(newResult.message);
			}
		} else {
			console.log(result.message);
		}
	} catch (err) {
		console.log(err.message);
	}
}
