import newsElements from './newsletterSelector';
import Templates from '../../common/Templates';
import NewsletterTemplate from '../../templates/admin/newsletterTemplate';
import getInfo from '../../utils/fetchUserDetails.js';

const newsletterList = new NewsletterTemplate();
const displayToast = new Templates();

export default async function setData(data) {
	try {
		const name = data.currentUser.name;
		const newsLetterData = data.newsletters;
		const totalCount = data.totalSubscriptions;
		const activeCount = data.activeSubscriptions;
		const blockedCount = data.blockedSubscriptions;
		const inactiveCount = data.inactiveSubscriptions;
		const image = `https://ui-avatars.com/api/?name=${name.split(' ').join('+')}&background=2c8c99&color=fff&size=200`;

		newsElements.userImage.src = data.currentUser.imagePath || image;
		newsElements.userName.innerHTML = name;
		newsElements.totalSubs.innerHTML = String(totalCount).padStart(2, '0');
		newsElements.activeSubs.innerHTML = String(activeCount).padStart(2, '0');
		newsElements.blockedSubs.innerHTML = String(blockedCount).padStart(2, '0');
		newsElements.nonActive.innerHTML = String(inactiveCount).padStart(2, '0');
		newsElements.newsletterContainer.innerHTML = '';

		for (let i = 0; i < totalCount; i++) {
			const userResponse = await getInfo(newsLetterData[i].email);
			let user = null;

			if (userResponse) {
				const userResult = await userResponse.json();
				user = userResult.data.userInfo;
			}

			newsElements.newsletterContainer.innerHTML +=
				newsletterList.newsSubscriptions(newsLetterData[i], user);
		}

		if (!totalCount) {
			newsElements.newsletterContainer.innerHTML = newsletterList.emptySubs();
		}
	} catch (err) {
		newsElements.toastSection.innerHTML = displayToast.errorToast(err.message);
	} finally {
		newsElements.toastSection.innerHTML = '';
	}
}
