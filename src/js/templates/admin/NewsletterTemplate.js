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
                <div class="subscription-content">
                    <!-- Subscriber Info -->
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
                    <div class="subscription-details">
                        <div class="detail-item">
                            <span class="detail-value">
                                <span class="badge type-badge monthly">${type}</span>
                            </span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-value">${formatMessageTime(data.createdAt)}</span>
                        </div>
                    </div>

                    <!-- Status -->
                    <div class="subscription-status">
                        <span class="status-badge ${data.isActive ? 'active' : 'blocked'}">${data.isActive ? 'Active' : 'Blocked'}</span>
                    </div>

                    <!-- Actions -->
                    <div class="subscription-actions">
                        <button class="btn-action view-btn" data-bs-toggle="modal" data-bs-target="#subscriptionDetails" onclick="showDetails('${data._id}', '${user ? user._id : ''}')">
                            <i class="bi bi-eye"></i>
                            <span>View</span>
                        </button>

                        ${btn}                        
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
