import newsElements from './newsletterSelector';
import Templates from '../../common/Templates';
import NewsletterTemplate from '../../templates/admin/newsletterTemplate';
import getInfo from '../../utils/fetchUserDetails.js';

const newsletterList = new NewsletterTemplate();
const displayToast = new Templates();

export default async function setData(data) {
	try {
		const {
			newsletters,
			currentUser,
			totalSubscriptions,
			activeSubscriptions,
			blockedSubscriptions,
			inactiveSubscriptions,
		} = data;
		const name = currentUser.name;
		const image = `https://ui-avatars.com/api/?name=${name.split(' ').join('+')}&background=2c8c99&color=fff&size=200`;

		newsElements.userImage.src = currentUser.imagePath || image;
		newsElements.userName.innerHTML = name;

		// Dashboard Cards
		newsElements.totalSubs.innerHTML = String(totalSubscriptions).padStart(
			2,
			'0',
		);
		newsElements.activeSubs.innerHTML = String(activeSubscriptions).padStart(
			2,
			'0',
		);
		newsElements.blockedSubs.innerHTML = String(blockedSubscriptions).padStart(
			2,
			'0',
		);
		newsElements.nonActive.innerHTML = String(inactiveSubscriptions).padStart(
			2,
			'0',
		);

		newsElements.newsletterContainer.innerHTML = '';

		if (newsletters.length === 0) {
			newsElements.newsletterContainer.innerHTML = newsletterList.emptySubs();
			return;
		}

		// Use for...of to handle async getInfo calls properly
		for (const item of newsletters) {
			let user = null;
			try {
				const userResponse = await getInfo(item.email);
				if (userResponse.ok) {
					const userResult = await userResponse.json();
					user = userResult.data.userInfo;
				}
			} catch (e) {
				console.log('Guest or error fetching user info');
			}

			newsElements.newsletterContainer.innerHTML +=
				newsletterList.newsSubscriptions(item, user);
		}
	} catch (err) {
		newsElements.toastSection.innerHTML = displayToast.errorToast(err.message);
	} finally {
		setTimeout(() => {
			newsElements.toastSection.innerHTML = '';
		}, 3000);
	}
}
