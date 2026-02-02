import contactElements from './contactSelector.js';
import displaySidebar from '../../templates/admin/sidebarTemplate.js';
import apiInterceptor from '../../api/interceptor.js';
import setContactData from './displayContact.js';

export default async function displayContact() {
	try {
		contactElements.contactBody.style.display = 'block';
		contactElements.contactBody.classList.add('loading');
		contactElements.contactSidebar.innerHTML = displaySidebar('contact');

		const response = await apiInterceptor(`GET`, `/user/admin/contact`);
		const result = await response.json();

		if (result.message === 'Not an Admin') {
			window.location.href = '/src/pages/account/profile.html';
		}

		await setContactData(result.data);
		contactElements.contactBody.classList.remove('loading');
	} catch (err) {
		console.log(err.message);
	}
}
