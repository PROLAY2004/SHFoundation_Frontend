import dashboardElements from './dashboardSelector.js';
import newsChart from './displayNewsletterChart.js';
import userChart from './displayUserChart.js';
import voluenteerTemplate from '../../templates/admin/VoluenteerTemplate.js';

const volenteerListTemplate = new voluenteerTemplate();

export default function setDashboardData(data) {
	const name = data.currentUser.name;
	const userCount = data.allUsersCount;
	const verifiedCount = data.verifiedCount;
	const pendingCount = data.pendingCount;
	const newsCount = data.newsLetterCount;
	const voluenteerCount = data.volunteerCount;
	const activeNewsCount = data.activeNewsletter;
	const blockedNewsCount = data.blockedNewsletter;
	const usage = data.usage;
	const LIMIT = 25 * 1024 * 1024 * 1024;
	const totalAssets = usage.resources;
	const storagePercent = ((usage.storage.usage / LIMIT) * 100).toFixed(2);
	const bandwidthPercent = ((usage.bandwidth.usage / LIMIT) * 100).toFixed(2);
	const apiRemaining = usage.rate_limit_remaining;
	const apiLimit = usage.rate_limit_allowed;
	const creditsUsedPercent = usage.credits.used_percent;

	const image = `https://ui-avatars.com/api/?name=${name.split(' ').join('+')}&background=2c8c99&color=fff&size=200`;

	//topbar details
	dashboardElements.userName.innerHTML = name;
	dashboardElements.userImage.src = data.currentUser.imagePath || image;

	//user cards details
	dashboardElements.totalUsers.innerHTML = String(userCount).padStart(2, '0');
	dashboardElements.totalUsersVerified.innerHTML = verifiedCount;
	dashboardElements.totalUsersPending.innerHTML = pendingCount;
	userChart(userCount, verifiedCount, pendingCount);

	// newsletter card details
	dashboardElements.totalNews.innerHTML = String(newsCount).padStart(2, '0');
	dashboardElements.activeNews.innerHTML = activeNewsCount;
	dashboardElements.blockedNews.innerHTML = blockedNewsCount;
	newsChart(
		activeNewsCount,
		newsCount - activeNewsCount - blockedNewsCount,
		blockedNewsCount,
	);

	//voluenteer card detsils
	dashboardElements.totalVoluenteer.innerHTML = String(
		voluenteerCount,
	).padStart(2, '0');
	dashboardElements.approvedVoluenteer.innerHTML = data.approvedVoluenteer;
	dashboardElements.pendingVoluenteer.innerHTML = data.pendingVoluenteer;

	// voluenteer list
	for (let i = 0; i < data.volunteers.length; i++) {
		dashboardElements.voluenteerList.innerHTML +=
			volenteerListTemplate.recentVoluenteer(data.volunteers[i]);
	}

	if (!data.volunteers.length) {
		dashboardElements.voluenteerList.innerHTML =
			volenteerListTemplate.emptyRecentVolunteer();
	}

	//contact card details
	dashboardElements.newContact.innerHTML = data.newContactCount;
	dashboardElements.oldContact.innerHTML = data.oldContactCount;
	dashboardElements.totalContacts.innerHTML = String(
		data.contactCount,
	).padStart(2, '0');

	// platform details
	dashboardElements.storageUsed.innerHTML = `${storagePercent}%`;
	dashboardElements.bandwidth.innerHTML = `${bandwidthPercent}%`;
	dashboardElements.assetsCount.innerHTML = `${totalAssets}`;
	dashboardElements.apiLimit.innerHTML = `${apiRemaining} / ${apiLimit}`;
	dashboardElements.creditLimit.innerHTML = `${creditsUsedPercent}%`;
}
