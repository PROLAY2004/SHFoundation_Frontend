import contactElements from './contactSelector.js';
import ContactTemplate from '../../templates/admin/ContactTemplate.js';
import displayMsgList from './setMessageList.js';

const messageList = new ContactTemplate();

export default async function setContactData(data) {
	try {
		const { contactDetails } = data;
		const name = data.currentUser.name;
		const totalMsg = data.totalContact;
		const newMsg = data.newContact;
		const userCount = data.userMessageCount;
		const guestMsg = data.guestMessageCount;
		const image = `https://ui-avatars.com/api/?name=${name.split(' ').join('+')}&background=2c8c99&color=fff&size=200`;

		contactElements.messageContainer.innerHTML = '';

		//display navbar
		contactElements.userName.innerHTML = name;
		contactElements.userImage.src = data.currentUser.imagePath || image;

		// display cards
		contactElements.totalMessages.innerHTML = String(totalMsg).padStart(2, '0');
		contactElements.totalNewMessages.innerHTML = String(newMsg).padStart(
			2,
			'0',
		);
		contactElements.guestMessages.innerHTML = String(guestMsg).padStart(2, '0');
		contactElements.userMessages.innerHTML = String(userCount).padStart(2, '0');

		if (contactDetails.length > 0) {
			await displayMsgList(contactDetails.length, contactDetails);
		} else {
			// Show empty state
			contactElements.messageContainer.innerHTML = messageList.emptyMessages();
		}
	} catch (err) {
		console.log(err.message);
	}
}
