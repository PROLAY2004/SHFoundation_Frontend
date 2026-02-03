import getInfo from '../../utils/fetchUserDetails';
import ContactTemplate from '../../templates/admin/ContactTemplate.js';
import contactElements from './contactSelector.js';

const messageList = new ContactTemplate();

export default async function displayMsgList(totalMsg, messages) {
	try {
		let imagePath;
		let userId;

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
	} catch (err) {
		console.log(err.message);
	}
}
