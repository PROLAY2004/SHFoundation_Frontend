import * as bootstrap from 'bootstrap';
import '../../../scss/admin/contact.scss';

import '../../common/sidebarToggle.js';
import './deleteContact.js';
import './displayMessageDetails.js';
import displayContact from './fetchContactData.js';
import contactElements from './contactSelector.js';
import deleteMsg from './deleteContact.js';

let debounceTimer = null;

document.addEventListener('DOMContentLoaded', () => displayContact(true));
contactElements.confirmDeleteBtn.addEventListener('click', deleteMsg);

contactElements.contactSearch.addEventListener('input', () => {
	clearTimeout(debounceTimer);
	debounceTimer = setTimeout(() => {
		displayContact(true); // Reset to page 1 on new search
	}, 800);
});