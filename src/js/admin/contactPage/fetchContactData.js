import contactElements from './contactSelector.js';
import displaySidebar from '../../templates/admin/sidebarTemplate.js';

export default async function displayContact() {
	try {
		contactElements.contactSidebar.innerHTML = displaySidebar('contact');
	} catch (err) {
		console.log(err.message);
	}
}
