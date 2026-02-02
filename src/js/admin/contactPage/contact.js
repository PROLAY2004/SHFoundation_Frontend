import * as bootstrap from 'bootstrap';
import '../../../scss/admin/contact.scss';

import '../../common/sidebarToggle.js';
import './deleteContact.js';
import './displayMessageDetails.js';
import displayContact from './fetchContactData.js';
import contactElements from './contactSelector.js';
import deleteMsg from './deleteContact.js';

document.addEventListener('DOMContentLoaded', displayContact);
contactElements.confirmDeleteBtn.addEventListener('click', deleteMsg);
