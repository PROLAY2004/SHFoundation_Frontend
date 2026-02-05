export default class voluenteerTemplate {
	recentVoluenteer = ({ email, skills, status }) => {
		const displayStatus = status.charAt(0).toUpperCase() + status.slice(1);

		return `<div class="request-item">
                    <div class="request-info">
                            <h6>${email}</h6>
                            <p>${skills}</p>
                        </div>
                    <div class="request-status status-${status}">${displayStatus}</div>
                </div>`;
	};

	rejectedVoluenteer = (data, user = '') => {
		const avatar = user
			? `<img src="${user.imagePath}" alt="user avatar"
                                    class="w-100 h-100 rounded-circle object-fit-cover">`
			: ` <i class="bi bi-person"></i>`;

		const skillsHTML = data.skills
			.map((skill) => `<span class="skill-badge">${skill}</span>`)
			.join('');

		return `
            <div class="volunteer-card status-rejected mb-3">
                <div class="volunteer-content d-flex flex-column gap-3 p-3 flex-sm-row">
                    <div
                        class="d-flex flex-column gap-2 w-100 flex-md-row justify-content-evenly justify-content-xl-between">
                        <div class="applicant-info">
                            <div class="applicant-avatar">
                                ${avatar}
                            </div>
                            <div class="applicant-details">
                                <h6 class="applicant-name">${user.name}</h6>
                                <p class="applicant-email">${data.email}</p>
                            </div>
                        </div>
                        <div class="volunteer-skills d-flex">
                            <div class="skills-list justify-content-md-center">
                                ${skillsHTML}
                            </div>
                        </div>

                        <div
                            class="d-flex gap-2 flex-row flex-md-column my-auto me-xl-3 flex-xl-row align-items-center">
                            <div class="volunteer-availability">
                                <span class="availability-badge">${data.availability} hours</span>
                            </div>
                            <div class="application-status">
                                <span class="status-badge rejected">Rejected</span>
                            </div>
                        </div>
                    </div>
                    <div class="volunteer-actions m-0 m-sm-auto align-self-sm-end">
                        <button class="btn-action view-btn" onclick="showModal('${data._id}','${user._id}')">
                            <i class="bi bi-eye"></i>
                            <span>View</span>
                        </button>
                    </div>
                </div>
            </div>`;
	};

	approvedVoluenteers = (data, user = '') => {
		const avatar = user
			? `<img src="${user.imagePath}" alt="user avatar"
                                    class="w-100 h-100 rounded-circle object-fit-cover">`
			: ` <i class="bi bi-person"></i>`;

		const skillsHTML = data.skills
			.map((skill) => `<span class="skill-badge">${skill}</span>`)
			.join('');

		return `<div class="volunteer-card status-approved mb-3">
                    <div class="volunteer-content d-flex flex-column gap-3 p-3 flex-sm-row">
                        <div
                            class="d-flex flex-column gap-2 w-100 flex-md-row justify-content-evenly justify-content-xl-between">
                            <div class="applicant-info">
                                <div class="applicant-avatar">
                                    ${avatar}
                                </div>
                                <div class="applicant-details">
                                    <h6 class="applicant-name">${user.name}</h6>
                                    <p class="applicant-email">${data.email}</p>
                                </div>
                            </div>
                            <div class="volunteer-skills d-flex">
                                <div class="skills-list justify-content-md-center">
                                    ${skillsHTML}
                                </div>
                            </div>
                            <div
                                class="d-flex gap-2 flex-row flex-md-column my-auto me-xl-3 flex-xl-row align-items-center">
                                <div class="volunteer-availability">
                                    <span class="availability-badge">${data.availability} hours</span>
                                </div>
                                <div class="application-status">
                                    <span class="status-badge approved">Approved</span>
                                </div>
                            </div>
                        </div>

                        <div class="volunteer-actions m-0 m-sm-auto align-self-sm-end">
                            <button class="btn-action view-btn" onclick="showModal('${data._id}','${user._id}')">
                                <i class="bi bi-eye"></i>
                                <span>View</span>
                            </button>
                        </div>
                    </div>
                </div>`;
	};

	pendingVoluenteers = (data, user = '') => {
		const avatar = user
			? `<img src="${user.imagePath}" alt="user avatar"
                                    class="w-100 h-100 rounded-circle object-fit-cover">`
			: ` <i class="bi bi-person"></i>`;

		const skillsHTML = data.skills
			.map((skill) => `<span class="skill-badge">${skill}</span>`)
			.join('');

		return `<div class="volunteer-card status-pending mb-3">
                    <div class="volunteer-content d-flex flex-column gap-3 p-3 flex-sm-row">
                        <div
                            class="d-flex flex-column gap-2 w-100 flex-md-row  justify-content-evenly justify-content-xl-between">
                            <div class="applicant-info">
                                <div class="applicant-avatar">
                                    ${avatar}
                                </div>
                                <div class="applicant-details">
                                    <h6 class="applicant-name">${user.name}</h6>
                                    <p class="applicant-email">${data.email}</p>
                                </div>
                            </div>
                            <div class="volunteer-skills d-flex">
                                <div class="skills-list justify-content-md-center">
                                    ${skillsHTML}
                                </div>
                            </div>
                            <div
                                class="d-flex gap-2 flex-row flex-md-column my-auto me-xl-3 flex-xl-row align-items-center">
                                <div class="volunteer-availability">
                                    <span class="availability-badge">${data.availability} hours</span>
                                </div>
                                <div class="application-status">
                                    <span class="status-badge pending">Pending</span>
                                </div>
                            </div>
                        </div>
                        <div class="volunteer-actions m-0 m-sm-auto align-self-sm-end">
                            <button class="btn-action view-btn" onclick="showModal('${data._id}','${user._id}')">
                                <i class="bi bi-eye"></i>
                                <span>View</span>
                            </button>
                        </div>
                    </div>
                </div>`;
	};

	emptyVolunteersMessage = () => {
		return ` <div class="card text-center shadow-sm border-0">
                <div class="card-body py-5">
                    <i class="bi bi-people display-4 text-muted mb-3"></i>
                    <h5 class="text-muted">No volunteers found</h5>
                    <p class="text-muted mb-0">There are currently no volunteers available.</p>
                </div>
            </div>`;
	};
}
