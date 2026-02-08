import Templates from '../../common/Templates.js';
import newsElements from './newsletterSelector';
import apiInterceptor from '../../api/interceptor.js';
import formatMessageTime from '../../utils/dateFormater.js';

const displayToast = new Templates();

async function showDetails(subId, userId) {
	try {
		const response = await apiInterceptor(
			'POST',
			'/user/admin/newsletter/getData',
			{
				subId,
				userId,
			},
		);
		const result = await response.json();
		const userData = result.data.userData;
		const subsData = result.data.subsData;
		let avatar = '';
		const DateTime = formatMessageTime(subsData.createdAt);
		const parts = DateTime.split(',');
		const time = parts.pop().trim();
		const date = parts.join(',').trim();

		newsElements.modalSubscriberEmail.innerHTML = 'Loading...';
		newsElements.modalSubscriberName.innerHTML = 'Loading...';
		newsElements.modalSubscriberEmailFull.innerHTML = 'Loading...';
		newsElements.modalSubscriptionStatus.innerHTML = 'Loading...';
		newsElements.modalSubscriptionStatus.classList.remove(
			subsData.isActive ? 'bg-danger' : 'bg-success',
		);
		newsElements.modalUserType.innerHTML = '';
		newsElements.modalSubscriptionTime.innerHTML = '';
		newsElements.modalSubscriberAvatar.innerHTML = '';
		newsElements.modalSubscriptionType.innerHTML = '';
		newsElements.modalDetailStatus.innerHTML = '';
		newsElements.modalDetailStatus.classList.remove(
			subsData.isActive ? 'blocked' : 'active',
		);
		newsElements.modalSubscribedDate.innerHTML = '';
		newsElements.modalUpdatedTime.innerHTML = '';

		if (userId) {
			if (userData.imagePath) {
				avatar = `<img src="${userData.imagePath}" alt="display picture">`;
			} else {
				avatar = `<i class="bi bi-person-circle"></i>`;
			}
		} else {
			avatar = `<i class="bi bi-person-circle"></i>`;
		}

		if (result.success) {
			newsElements.modalSubscriberEmail.innerHTML = subsData.email;
			newsElements.modalSubscriberName.innerHTML = userData
				? userData.name
				: 'Guest Subscriber';
			newsElements.modalSubscriberEmailFull.innerHTML = subsData.email;
			newsElements.modalSubscriptionStatus.innerHTML = subsData.isActive
				? 'Active'
				: 'Blocked';
			newsElements.modalSubscriptionStatus.classList.add(
				subsData.isActive ? 'bg-success' : 'bg-danger',
			);
			newsElements.modalUserType.innerHTML = userId ? 'User' : 'Guest';
			newsElements.modalSubscriptionTime.innerHTML = DateTime;
			newsElements.modalSubscriberAvatar.innerHTML = avatar;
			newsElements.modalSubscriptionType.innerHTML =
				subsData.type.charAt(0).toUpperCase() + subsData.type.slice(1);
			newsElements.modalDetailStatus.innerHTML = subsData.isActive
				? 'Active'
				: 'Blocked';
			newsElements.modalDetailStatus.classList.add(
				subsData.isActive ? 'active' : 'blocked',
			);
			newsElements.modalSubscribedDate.innerHTML = date;
			newsElements.modalUpdatedTime.innerHTML = time;
		} else {
			newsElements.toastSection.innerHTML = displayToast.errorToast(
				result.message,
			);
		}
	} catch (err) {
		newsElements.toastSection.innerHTML = displayToast.errorToast(err.message);
	} finally {
		setTimeout(() => {
			newsElements.toastSection.innerHTML = '';
		}, 3000);
	}
}

window.showDetails = showDetails;
