import * as bootstrap from 'bootstrap';
import '../../../scss/admin/newsletter.scss';
import '../../common/sidebarToggle.js';
import '../../utils/userLogout.js';
import './modifyNewsletter.js';
import './displayNewsModal.js';
import newsElements from './newsletterSelector';
import displayNewsletters from './fetchNewsletterDetails.js';
import changeStatus from './modifyNewsletter.js';

let debounceTimer = null;

document.addEventListener('DOMContentLoaded', () => {
	newsElements.newsletterBody.style.display = 'block';
	displayNewsletters(true);
});

// Action Button
newsElements.confirmActionBtn.addEventListener('click', changeStatus);

// Filter Change
newsElements.newsletterFilter.addEventListener('change', () =>
	displayNewsletters(true),
);

// Search Input (Debounced)
newsElements.newsletterSearch.addEventListener('input', () => {
	clearTimeout(debounceTimer);
	debounceTimer = setTimeout(() => {
		displayNewsletters(true);
	}, 800);
});

// Pagination Click
newsElements.paginationList.addEventListener('click', (e) => {
	e.preventDefault();
	const page = e.target.closest('.page-link')?.dataset.page;
	if (page && window.currentNewsState) {
		window.currentNewsState.page = parseInt(page);
		displayNewsletters();
	}
});
