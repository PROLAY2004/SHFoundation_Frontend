import apiInterceptor from '../../api/interceptor';
import contactElements from './contactSelector';

export default async function searchContacts(e) {
	try {
		const response = await apiInterceptor(
			'POST',
			'/user/admin/contact/search',
			{
				query: contactElements.contactSearch.value.trim(),
			},
		);
		const result = await response.json();

		if (result.success) {
			console.log(result);
		} else {
			console.log(result.message);
		}
	} catch (err) {
		console.log(err);
	}
}
