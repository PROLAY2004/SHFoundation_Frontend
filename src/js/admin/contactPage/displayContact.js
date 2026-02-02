import clearPage from './clearData.js';
import contactElements from './contactSelector.js';
import ContactTemplate from '../../templates/admin/ContactTemplate.js';
import getInfo from '../../utils/fetchUserDetails.js';

const messageList = new ContactTemplate();

export default async function setContactData(data) {
	let imagePath;
	let userId;

	const name = data.currentUser.name;
	const messages = data.contactDetails;
	const totalMsg = data.totalContact;
	const newMsg = data.newContact;
	const userCount = data.userMessageCount;
	const guestMsg = data.guestMessageCount;
	const image = `https://ui-avatars.com/api/?name=${name.split(' ').join('+')}&background=2c8c99&color=fff&size=200`;

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
		for (let i = 0; i < totalMsg; i++) {
			const userData = await getInfo(messages[i].email);
			imagePath = '';
			userId = '';

			if (userData) {
				const resultData = await userData.json();

				imagePath = resultData.data.userInfo.imagePath;
				userId = resultData.data.userInfo._id;
			}

			if (messages[i].status === 'new') {
				contactElements.messageContainer.innerHTML += messageList.newMessages({
					message: messages[i],
					imagePath,
					userId,
				});
			} else if (messages[i].status === 'viewed') {
				contactElements.messageContainer.innerHTML += messageList.oldMessages({
					message: messages[i],
					imagePath,
					userId,
				});
			}
		}
	} else {
		contactElements.messageContainer.innerHTML = messageList.emptyMessages();
	}
}
