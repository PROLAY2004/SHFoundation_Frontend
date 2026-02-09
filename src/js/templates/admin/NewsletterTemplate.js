import formatMessageTime from '../../utils/dateFormater.js';

export default class NewsletterTemplate {
	newsSubscriptions = (data, user = '') => {
		let avatar = '';

		if (user && user.imagePath) {
			avatar = `<img src="${user.imagePath}" alt="display picture">`;
		} else if (user && !user.imagePath) {
			avatar = '<i class="bi bi-person-circle"></i>';
		} else {
			avatar = '<i class="bi bi-envelope"></i>';
		}

		const type = data.type.charAt(0).toUpperCase() + data.type.slice(1);
		const name = user ? user.name : 'Guest Subscriber';
		const btn = data.isActive
			? `<button class="btn-action block-btn" data-bs-toggle="modal" data-bs-target="#actionModal" onclick="setSubId('${data._id}')">
                    <i class="bi bi-slash-circle"></i>
                    <span>Block</span>
                </button>`
			: `<button class="btn-action unblock-btn" data-bs-toggle="modal" data-bs-target="#actionModal" onclick="setSubId('${data._id}')">
                    <i class="bi bi-check-circle"></i>
                    <span>Unblock</span>
                </button>`;

		return `
            <div class="subscription-card">
                <div class="subscription-content justify-content-between d-flex flex-column p-3 align-items-start gap-2 flex-sm-row">
                    <!-- Subscriber Info -->
                    <div class="d-flex flex-column gap-2 flex-lg-row my-lg-auto gap-lg-3 w-100 justify-content-lg-between">
                        <div class="subscriber-info">
                            <div class="subscriber-avatar ${user ? '' : 'guest'}">
                                ${avatar}
                            </div>
                            <div class="subscriber-details">
                                <h6 class="subscriber-name">${name}</h6>
                                <p class="subscriber-email">${data.email}</p>
                            </div>
                        </div>

                        <!-- Subscription Details -->
                        <div class="subscription-details d-flex gap-2 flex-lg-column align-items-lg-center">
                            <div class="detail-item">
                                <span class="detail-value">
                                    <span class="badge type-badge monthly">${type}</span>
                                </span>
                            </div>
                            <div class="detail-item">
                                <span class="detail-value text-center">${formatMessageTime(data.createdAt)}</span>
                            </div>
                        </div>
                    </div>

                   <div class="d-flex gap-3 justify-content-between my-sm-auto w-100">
                        <div class="subscription-status my-auto mx-md-auto ">
                            <span class="status-badge ${data.isActive ? 'active' : 'blocked'}">${data.isActive ? 'Active' : 'Blocked'}</span>
                        </div>

                        <!-- Actions -->
                        <div class="subscription-actions d-flex gap-2">
                            <button class="btn-action view-btn" data-bs-toggle="modal" data-bs-target="#subscriptionDetails" onclick="showDetails('${data._id}', '${user ? user._id : ''}')">
                                <i class="bi bi-eye"></i>
                                <span>View</span>
                            </button>

                            ${btn}                        
                        </div>
                    </div>
                </div>
            </div>`;
	};

	emptySubs = () => {
		return ` <div class="card text-center shadow-sm border-0">
                    <div class="card-body py-5">
                        <i class="bi bi-envelope display-4 text-muted mb-3"></i>
                        <h5 class="text-muted">No subscriptions found</h5>
                        <p class="text-muted mb-0">You don’t have any newsletter subscriptions yet.</p>
                    </div>
                </div>
                `;
	};
}
