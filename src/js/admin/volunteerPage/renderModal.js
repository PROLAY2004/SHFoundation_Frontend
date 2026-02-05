import Templates from '../../common/Templates.js';
import volunteerElements from './volunteerSelector.js';
import formatMessageTime from '../../utils/dateFormater.js';

const displayToast = new Templates();

export default async function setModalData(userData, voluenteerData) {
	try {
		const name = userData.name;
		const image = `https://ui-avatars.com/api/?name=${name.split(' ').join('+')}&background=2c8c99&color=fff&size=200`;
		const status =
			voluenteerData.status.charAt(0).toUpperCase() +
			voluenteerData.status.slice(1);

		let statusClass;

		if (status === 'Pending') {
			statusClass = 'bg-warning';
		} else if (status === 'Rejected') {
			statusClass = 'bg-danger';
		} else {
			statusClass = 'bg-success';
		}

		volunteerElements.volunteerName.innerHTML = name;
		volunteerElements.modalApplicantName.innerHTML = name;
		volunteerElements.modalApplicantEmail.innerHTML = userData.email;
		volunteerElements.userAvattar.src = userData.imagePath || image;
		volunteerElements.modalApplicationStatus.innerHTML = status;
		volunteerElements.modalApplicationStatus.classList.add(statusClass);
		volunteerElements.modalApplicationTime.innerHTML = formatMessageTime(
			voluenteerData.createdAt,
		);
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
