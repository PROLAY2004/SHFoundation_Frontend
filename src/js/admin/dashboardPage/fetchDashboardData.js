import dashboardElements from './dashboardSelector.js';
import displaySidebar from '../../templates/admin/sidebarTemplate.js';
import apiInterceptor from '../../api/interceptor.js';
import setDashboardData from './displayDashboard.js';

export default async function adminDashboardVisualization() {
	try {
		dashboardElements.dashboardSidebar.innerHTML = displaySidebar('dashboard');

		const response = await apiInterceptor(`GET`, `/user/admin/dashboard`);
		const result = await response.json();

		if (result.message === 'Not an Admin') {
			window.location.href = '/src/pages/account/profile.html';
		}
		
		setDashboardData(result.data);
	} catch (error) {
		console.error('Error displaying dashboard:', error);
	}
}
