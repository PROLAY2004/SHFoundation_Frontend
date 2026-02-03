import contactElements from './contactSelector.js';
import displaySidebar from '../../templates/admin/sidebarTemplate.js';
import getMsg from './getAllMessages.js';

import setContactData from './displayContact.js';

export default async function displayContact() {
	try {
		contactElements.contactBody.style.display = 'block';
		contactElements.contactBody.classList.add('loading');
		contactElements.contactSidebar.innerHTML = displaySidebar('contact');

		const message = await getMsg();

		await setContactData(message);
		contactElements.contactBody.classList.remove('loading');
	} catch (err) {
		console.log(err.message);
	}
}
