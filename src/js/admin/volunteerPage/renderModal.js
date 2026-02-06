import Templates from '../../common/Templates.js';
import volunteerElements from './volunteerSelector.js';
import formatMessageTime from '../../utils/dateFormater.js';

const displayToast = new Templates();

export default async function setModalData(userData, voluenteer) {
	try {
		const voluenteerData = voluenteer.voluenteerInfo;
		const name = userData.name;
		const voluenteerDateTime = formatMessageTime(voluenteerData.createdAt);
		const parts = voluenteerDateTime.split(',');
		const time = parts.pop().trim();
		const date = parts.join(',').trim();
		const userTime = formatMessageTime(userData.createdAt);
		const image = `https://ui-avatars.com/api/?name=${name.split(' ').join('+')}&background=2c8c99&color=fff&size=200`;
		const status =
			voluenteerData.status.charAt(0).toUpperCase() +
			voluenteerData.status.slice(1);
		const skillsHTML = voluenteerData.skills
			.map((skill) => `<span class="skill-badge">${skill}</span>`)
			.join('');

		volunteerElements.modalFooter.classList.add('d-none');
		volunteerElements.volunteerName.innerHTML = name;
		volunteerElements.modalApplicantName.innerHTML = name;
		volunteerElements.modalApplicantEmail.innerHTML = userData.email;
		volunteerElements.userAvattar.src = userData.imagePath || image;
		volunteerElements.modalApplicationStatus.innerHTML = status;
		volunteerElements.modalApplicationTime.innerHTML = voluenteerDateTime;
		volunteerElements.userJoinDate.innerHTML = userTime;
		volunteerElements.totalApplications.innerHTML = voluenteer.applicationCount;
		volunteerElements.modalAvailability.innerHTML = `${voluenteerData.availability} Hours / week`;
		volunteerElements.modalMotivation.innerHTML = voluenteerData.details;
		volunteerElements.modalSubmittedDate.innerHTML = date;
		volunteerElements.modalSubmittedTime.innerHTML = time;
		volunteerElements.modalSkills.innerHTML = skillsHTML;

		if (status === 'Pending') {
			volunteerElements.modalApplicationStatus.classList.add('bg-warning');
			volunteerElements.modalApplicationStatus.classList.remove('bg-danger');
			volunteerElements.modalApplicationStatus.classList.remove('bg-success');
			volunteerElements.modalFooter.classList.remove('d-none');
			volunteerElements.modalFooter.setAttribute(
				'data-applicationId',
				voluenteerData._id,
			);
		} else if (status === 'Rejected') {
			volunteerElements.modalApplicationStatus.classList.remove('bg-warning');
			volunteerElements.modalApplicationStatus.classList.add('bg-danger');
			volunteerElements.modalApplicationStatus.classList.remove('bg-success');
		} else if (status === 'Approved') {
			volunteerElements.modalApplicationStatus.classList.remove('bg-warning');
			volunteerElements.modalApplicationStatus.classList.remove('bg-danger');
			volunteerElements.modalApplicationStatus.classList.add('bg-success');
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
