import * as bootstrap from 'bootstrap';
import chnageStatus from './updateStatus.js';
import contactElements from './contactSelector.js';
import formatMessageTime from '../../utils/dateFormater.js';
import getInfo from '../../utils/fetchUserDetails.js';
import getMsg from './getAllMessages.js';

const msgModal = new bootstrap.Modal(contactElements.messageModal);

async function showMessage(messageId, userId) {
	try {
		const message = await chnageStatus(messageId);
		const statusBadgeClass = message.status == 'new' ? 'bg-warning' : 'bg-info';
		const msgDateTime = formatMessageTime(message.createdAt);

		msgModal.show();

		contactElements.modalSenderAvatar.innerHTML = `<i class="bi bi-person-circle"></i>`;
		contactElements.modalSenderName.innerHTML = message.name;
		contactElements.modalSenderEmail.innerHTML = message.email;
		contactElements.messageSubject.innerHTML = message.subject;
		contactElements.modalMessageStatus.classList.add(statusBadgeClass);
		contactElements.modalUserType.innerHTML = userId ? 'User' : 'Guest';
		contactElements.modalMessageTime.innerHTML = msgDateTime;
		contactElements.modalMessageText.innerHTML = message.message;
		contactElements.modalReceivedDate.innerHTML = msgDateTime.split(',')[0];
		contactElements.modalReceivedTime.innerHTML = msgDateTime.split(',')[1];
		contactElements.userInfoSection.classList.add('d-none');
		contactElements.modalMessageStatus.innerHTML =
			message.status.charAt(0).toUpperCase() + message.status.slice(1);

		if (userId) {
			const userResponse = await getInfo(userId, 'userId');
			const userResult = await userResponse.json();
			const userData = userResult.data.userInfo;
			const messages = await getMsg();
			let userStatus = '';
			let addBadgeColor = '';
			let removeBadgeColor = '';
			let userMsgCount = 0;

			messages.contactDetails.map((msg) => {
				if (msg.email === userData.email) {
					userMsgCount++;
				}
			});

			if (userData.imagePath) {
				contactElements.modalSenderAvatar.innerHTML = `<img id="msgModalImage" src='${userData.imagePath}' class="w-100 h-100 rounded-circle object-fit-cover" alt="Avatar">`;
			}

			if (userData.isVerified) {
				userStatus = 'Verified';
				addBadgeColor = 'bg-success';
				removeBadgeColor = 'bg-danger';
			} else {
				userStatus = 'Non-Verified';
				addBadgeColor = 'bg-danger';
				removeBadgeColor = 'bg-success';
			}

			contactElements.userNameModal.innerHTML = userData.name;
			contactElements.userStatus.innerHTML = userStatus;
			contactElements.userStatus.classList.add(addBadgeColor);
			contactElements.userStatus.classList.remove(removeBadgeColor);
			contactElements.userInfoSection.classList.remove('d-none');
			contactElements.userMessageCount.innerHTML = `${userMsgCount} ${userMsgCount === 1 ? 'Message' : 'Messages'}`;
			contactElements.userJoinDate.innerHTML = formatMessageTime(
				userData.createdAt,
			);
		}
	} catch (err) {
		console.log(err.message);
	}
}

window.showMessage = showMessage;
