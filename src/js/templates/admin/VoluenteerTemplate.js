export default class voluenteerTemplate {
	recentVoluenteer = ({email, skills, status}) => {
        const displayStatus = status.charAt(0).toUpperCase() + status.slice(1);

		return `<div class="request-item">
                    <div class="request-info">
                            <h6>${email}</h6>
                            <p>${skills}</p>
                        </div>
                    <div class="request-status status-${status}">${displayStatus}</div>
                </div>`;
	};
}
