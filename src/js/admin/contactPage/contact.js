import * as bootstrap from 'bootstrap';

import '../../../scss/admin/contact.scss';

import contactElements from './contactSelector.js';
import displaySidebar from '../../templates/admin/sidebarTemplate.js'

contactElements.contactSidebar.innerHTML = displaySidebar('contact');