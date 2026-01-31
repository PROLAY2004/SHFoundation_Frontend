import * as bootstrap from 'bootstrap';

import '../../../scss/admin/dashboard.scss';

import dashboardElements from './dashboardSelector.js';

document.addEventListener('DOMContentLoaded', () => {
    dashboardElements.dashboardBody.style.display = 'block';
});
