import clearPage from './clearData.js';
import contactElements from './contactSelector.js';
import ContactTemplate from '../../templates/admin/ContactTemplate.js';
import displayMsgList from './setMessageList.js';

const messageList = new ContactTemplate();

export default async function setContactData(data) {
	const name = data.currentUser.name;
	const messages = data.contactDetails;
	const totalMsg = data.totalContact;
	const newMsg = data.newContact;
	const userCount = data.userMessageCount;
	const guestMsg = data.guestMessageCount;
	const image = `https://ui-avatars.com/api/?name=${name.split(' ').join('+')}&background=2c8c99&color=fff&size=200`;

	const savedScrollTop = contactElements.messageContainer.scrollTop;
	clearPage();

	//display navbar
	contactElements.userName.innerHTML = name;
	contactElements.userImage.src = data.currentUser.imagePath || image;

	// display cards
	contactElements.totalMessages.innerHTML = String(totalMsg).padStart(2, '0');
	contactElements.totalNewMessages.innerHTML = String(newMsg).padStart(2, '0');
	contactElements.guestMessages.innerHTML = String(guestMsg).padStart(2, '0');
	contactElements.userMessages.innerHTML = String(userCount).padStart(2, '0');

	if (totalMsg) {
		await displayMsgList(totalMsg, messages);
	} else {
		contactElements.messageContainer.innerHTML = messageList.emptyMessages();
	}

	contactElements.messageContainer.scrollTop = savedScrollTop;
}
