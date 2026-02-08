import newsElements from './newsletterSelector';
import Templates from '../../common/Templates.js';
import displaySidebar from '../../templates/admin/sidebarTemplate.js';
import apiInterceptor from '../../api/interceptor.js';
import setData from './setNewsletterData.js';

const displayToast = new Templates();

export default async function displayNewsletters() {
	try {
		newsElements.newsletterBody.style.display = 'block';
		newsElements.newsletterBody.classList.add('loading');
		newsElements.newsletterSidebar.innerHTML = displaySidebar('newsletter');

		const res = await apiInterceptor('POST', '/user/admin/newsletter', {});
		const result = await res.json();

		await setData(result.data);

		newsElements.newsletterBody.classList.remove('loading');
	} catch (err) {
		newsElements.toastSection.innerHTML = displayToast.errorToast(err.message);
	} finally {
		setTimeout(() => {
			newsElements.toastSection.innerHTML = '';
		}, 3000);
	}
}
