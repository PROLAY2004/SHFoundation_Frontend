import * as bootstrap from 'bootstrap';

import '../../../scss/admin/voluenteer.scss';
import displaySidebar from '../../templates/admin/sidebarTemplate.js';
import volunteerElements from './volunteerSelector.js';

console.log('check');

volunteerElements.volunteerSidebar.innerHTML = displaySidebar('voluenteer');
