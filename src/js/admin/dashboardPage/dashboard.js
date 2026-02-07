import * as bootstrap from 'bootstrap';
import '../../../scss/admin/dashboard.scss';

import adminDashboardVisualization from './fetchDashboardData.js';
import dashboardElements from './dashboardSelector.js';
import '../../utils/userLogout.js';
import '../../common/sidebarToggle.js';

document.addEventListener('DOMContentLoaded', adminDashboardVisualization);
dashboardElements.newsShowMore.addEventListener('click', () => {
	window.location.href = '/src/pages/admin/newsletter.html';
});
