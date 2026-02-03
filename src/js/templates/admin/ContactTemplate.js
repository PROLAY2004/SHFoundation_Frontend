import formatMessageTime from '../../utils/dateFormater.js';

export default class ContactTemplate {
	newMessages = ({ message, imagePath = '', userId }) => {
		const avatar = imagePath
			? `<img id="userImage" class="w-100 h-100 rounded-circle object-fit-cover"
                            src="${imagePath}"
                            alt="Avatar">`
			: `<i class="bi bi-person-circle"></i>`;

		return `
            <div class="message-card new-message mb-3">
                <div class="message-content">
                    <div class="sender-info">
                        <div class="sender-avatar">
                            ${avatar}                            
                        </div>
                        <div class="sender-details">
                            <h6 class="sender-name">${message.name}</h6>
                            <p class="sender-email">${message.email}</p>
                        </div>
                    </div>
                    <div class="message-subject">
                        <span>${message.subject}</span>
                        <p class="message-time">${formatMessageTime(message.createdAt)}</p>
                    </div>
                    <div class="message-status">
                        <span class="status-badge new">New</span>
                    </div>
                    <div class="message-actions">
                        <button class="btn-action view-btn" onclick="showMessage('${message._id}', '${userId}')">
                            <i class="bi bi-eye"></i>
                            <span>View</span>
                        </button>
                        <button class="btn-action delete-btn" data-bs-toggle="modal" onclick="setMsgId('${message._id}')"
                            data-bs-target="#deleteModal">
                            <i class="bi bi-trash"></i>
                            <span>Delete</span>
                        </button>
                    </div>
                </div>
            </div>`;
	};

	oldMessages = ({ message, imagePath = '', userId }) => {
		const avatar = imagePath
			? `<img id="userImage" class="w-100 h-100 rounded-circle object-fit-cover"
                            src="${imagePath}"
                            alt="Avatar">`
			: ` <i class="bi bi-person"></i>`;

		return `
            <div class="message-card mb-3">
                <div class="message-content">
                    <div class="sender-info">
                        <div class="sender-avatar">
                           ${avatar}
                        </div>
                        <div class="sender-details">
                            <h6 class="sender-name">${message.name}</h6>
                            <p class="sender-email">${message.email}</p>
                        </div>
                    </div>
                    <div class="message-subject">
                        <span>${message.subject}</span>
                        <p class="message-time">${formatMessageTime(message.createdAt)}</p>
                    </div>
                    <div class="message-status">
                        <span class="status-badge viewed">Viewed</span>
                    </div>
                    <div class="message-actions">
                        <button class="btn-action view-btn" onclick="showMessage('${message._id}', '${userId}')">
                            <i class="bi bi-eye"></i>
                            <span>View</span>
                        </button>
                        <button class="btn-action delete-btn" data-bs-toggle="modal" onclick="setMsgId('${message._id}')"
                            data-bs-target="#deleteModal">
                            <i class="bi bi-trash"></i>
                            <span>Delete</span>
                        </button>
                    </div>
                </div>
            </div>`;
	};

	emptyMessages = () => {
		return ` <div class="card text-center shadow-sm border-0">
                    <div class="card-body py-5">
                        <i class="bi bi-chat-dots display-4 text-muted mb-3"></i>
                        <h5 class="text-muted">No messages found</h5>
                        <p class="text-muted mb-0">You don’t have any messages yet.</p>
                    </div>
                </div>`;
	};
}
