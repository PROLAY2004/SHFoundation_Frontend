import apiInterceptor from '../../api/interceptor';
import contactElements from './contactSelector';
import ContactTemplate from '../../templates/admin/ContactTemplate.js';
import displayMsgList from './setMessageList.js';
import displayContact from './fetchContactData.js';

const messageList = new ContactTemplate();

export default async function searchContacts() {
	try {
		const searchInput = contactElements.contactSearch.value.trim();
		const response = await apiInterceptor(
			'POST',
			'/user/admin/contact/search',
			{
				query: searchInput,
			},
		);
		const result = await response.json();

		if (result.success) {
			const messages = result.data.messageInfo;
			const msgCount = messages.length;
			contactElements.messageContainer.innerHTML = '';

			if (msgCount) {
				await displayMsgList(msgCount, messages);
			} else {
				contactElements.messageContainer.innerHTML =
					messageList.emptySearchMessages();
			}
		} else {
			console.log(result.message);
		}
	} catch (err) {
		console.log(err);
	} finally {
		if (!searchInput) {
			await displayContact();
		}
	}
}
