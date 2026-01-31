import dashboardElements from './dashboardSelector.js';

export default function setDashboardData(data) {
	const name = data.currentUser.name;
	const userCount = data.allUsers.length;
	const newsCount = data.newsLetters.length;
	const voluenteerCount = data.volunteers.length;
	const image = `https://ui-avatars.com/api/?name=${name.split(' ').join('+')}&background=2c8c99&color=fff&size=200`;

	//topbar details
	dashboardElements.userName.innerHTML = name;
	dashboardElements.userImage.src = data.currentUser.imagePath || image;

	//user cards details
	dashboardElements.totalUsers.innerHTML = String(userCount).padStart(2, '0');
	dashboardElements.totalUsersVerified.innerHTML = data.verifiedCount;
	dashboardElements.totalUsersPending.innerHTML = data.pendingCount;

	// newsletter card details
	dashboardElements.totalNews.innerHTML = String(newsCount).padStart(2, '0');
	dashboardElements.activeNews.innerHTML = data.activeNewsletter;
	dashboardElements.blockedNews.innerHTML = data.blockedNewsletter;

	//voluenteer card detsils
	dashboardElements.totalVoluenteer.innerHTML = String(
		voluenteerCount,
	).padStart(2, '0');
	dashboardElements.approvedVoluenteer.innerHTML = data.approvedVoluenteer;
	dashboardElements.pendingVoluenteer.innerHTML = data.pendingVoluenteer;

    
	console.log(data);

	dashboardElements.dashboardBody.style.display = 'block';
}
