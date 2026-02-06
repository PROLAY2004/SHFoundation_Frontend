import * as bootstrap from 'bootstrap';
import '../../../scss/admin/voluenteer.scss';

import '../../common/sidebarToggle.js';
import '../../utils/userLogout.js';
import './displayModal.js';
import './updateApplication.js';
import displayVoluenteerDetails from './fetchVoluenteerData.js';
import volunteerElements from './volunteerSelector.js';

let debounceTimer = null;

// Initial Load
document.addEventListener('DOMContentLoaded', () =>
	displayVoluenteerDetails(true),
);

// Search Listener with Debounce
volunteerElements.volunteerSearch.addEventListener('input', () => {
	clearTimeout(debounceTimer);
	debounceTimer = setTimeout(() => {
		displayVoluenteerDetails(true); // Reset to page 1 on search
	}, 800);
});

// Filter Listeners
volunteerElements.statusFilter.addEventListener('change', () =>
	displayVoluenteerDetails(true),
);
volunteerElements.availabilityFilter.addEventListener('change', () =>
	displayVoluenteerDetails(true),
);

// Pagination Listener
volunteerElements.paginationList.addEventListener('click', (e) => {
	e.preventDefault();
	const pageLink = e.target.closest('.page-link');
	if (!pageLink) return;

	const page = pageLink.dataset.page;
	if (page) {
		// Pass the specific page number to the fetch function
		displayVoluenteerDetails(false, parseInt(page));
	}
});
