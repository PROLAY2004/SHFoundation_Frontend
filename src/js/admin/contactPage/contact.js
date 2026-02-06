import * as bootstrap from 'bootstrap';
import '../../../scss/admin/contact.scss';
import '../../utils/userLogout.js';
import '../../common/sidebarToggle.js';
import './deleteContact.js';
import './displayMessageDetails.js';
import displayContact from './fetchContactData.js';
import contactElements from './contactSelector.js';
import deleteMsg from './deleteContact.js';

let debounceTimer = null;

document.addEventListener('DOMContentLoaded', () => displayContact(true));
contactElements.confirmDeleteBtn.addEventListener('click', deleteMsg);
contactElements.contactFilter.addEventListener('change', () =>
	displayContact(true),
);

contactElements.contactSearch.addEventListener('input', () => {
	clearTimeout(debounceTimer);
	debounceTimer = setTimeout(() => {
		displayContact(true); // Reset to page 1 on new search
	}, 800);
});

// Global listener for pagination clicks
contactElements.paginationList.addEventListener('click', (e) => {
	e.preventDefault();
	const page = e.target.closest('.page-link')?.dataset.page;

	if (page) {
		currentState.page = parseInt(page);
		displayContact();
	}
});
