import newsElements from './newsletterSelector';
import Templates from '../../common/Templates.js';
import displaySidebar from '../../templates/admin/sidebarTemplate.js';

const displayToast = new Templates();

export default async function displayNewsletters() {
	try {
		newsElements.newsletterBody.style.display = 'block';
		newsElements.newsletterBody.classList.add('loading');
		newsElements.newsletterSidebar.innerHTML = displaySidebar('newsletter');

		newsElements.newsletterBody.classList.remove('loading');
	} catch (err) {
		newsElements.toastSection.innerHTML = displayToast.errorToast(err.message);
	} finally {
		setTimeout(() => {
			newsElements.toastSection.innerHTML = '';
		}, 3000);
	}
}
