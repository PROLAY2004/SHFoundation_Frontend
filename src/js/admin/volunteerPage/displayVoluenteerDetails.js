import volunteerElements from './volunteerSelector.js';
import voluenteerTemplate from '../../templates/admin/VoluenteerTemplate.js';
import getInfo from '../../utils/fetchUserDetails.js';
import Templates from '../../common/Templates.js';

const displayToast = new Templates();
const voluenteerList = new voluenteerTemplate();

export default async function setVoluenteerData(data) {
	try {
		const userDetails = data.currentUser;
		const name = userDetails.name;
		const voluenteers = data.voluenteerDetails;
		const pending = data.pendingCount;
		const ok = data.approvedCount;
		const reject = data.rejectedCount;
		const all = data.requestsCount;
		const image = `https://ui-avatars.com/api/?name=${name.split(' ').join('+')}&background=2c8c99&color=fff&size=200`;

		volunteerElements.userName.innerHTML = name;
		volunteerElements.userImage.src = userDetails.imagePath || image;
		volunteerElements.totalPending.innerHTML = String(pending).padStart(2, '0');
		volunteerElements.totalApproved.innerHTML = String(ok).padStart(2, '0');
		volunteerElements.totalRejected.innerHTML = String(reject).padStart(2, '0');
		volunteerElements.totalVolunteers.innerHTML = String(all).padStart(2, '0');
		volunteerElements.volunteerContainer.innerHTML = '';

		if (data.requestsCount === 0) {
			volunteerElements.volunteerContainer.innerHTML =
				voluenteerList.emptyVolunteersMessage();
		}

		for (let i = 0; i < data.requestsCount; i++) {
			const specificUserRes = await getInfo(voluenteers[i].email);
			const specificUserData = await specificUserRes.json();
			const user = specificUserData.data.userInfo;

			if (voluenteers[i].status === 'pending') {
				volunteerElements.volunteerContainer.innerHTML +=
					voluenteerList.pendingVoluenteers(voluenteers[i], user);
			} else if (voluenteers[i].status === 'rejected') {
				volunteerElements.volunteerContainer.innerHTML +=
					voluenteerList.rejectedVoluenteer(voluenteers[i], user);
			} else if (voluenteers[i].status === 'approved') {
				volunteerElements.volunteerContainer.innerHTML +=
					voluenteerList.approvedVoluenteers(voluenteers[i], user);
			}
		}
	} catch (err) {
		volunteerElements.toastSection.innerHTML = displayToast.errorToast(
			err.message,
		);
	} finally {
		setTimeout(() => {
			volunteerElements.toastSection.innerHTML = '';
		}, 3000);
	}
}
