import * as bootstrap from 'bootstrap';

import '../../../scss/admin/dashboard.scss';

import adminDashboardVisualization from './fetchDashboardData.js';
import '../../utils/userLogout.js';
import '../../common/sidebarToggle.js';

document.addEventListener('DOMContentLoaded', adminDashboardVisualization);
