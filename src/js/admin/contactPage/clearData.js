import contactElements from './contactSelector.js';

export default function clearPage() {
	contactElements.userName.innerHTML = '';
	contactElements.userImage.src = '';

	contactElements.totalMessages.innerHTML = '00';
	contactElements.totalNewMessages.innerHTML = '00';
	contactElements.userMessages.innerHTML = '00';
	contactElements.guestMessages.innerHTML = '00';

    contactElements.messageContainer.innerHTML = '';
}
