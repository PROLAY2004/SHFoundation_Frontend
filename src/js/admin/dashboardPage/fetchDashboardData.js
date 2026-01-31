import dashboardElements from './dashboardSelector.js';
import displaySidebar from '../../templates/admin/sidebarTemplate.js';
import apiInterceptor from '../../api/interceptor.js';
import setDashboardData from './displayDashboard.js';

export default async function adminDashboardVisualization() {
	try {
		dashboardElements.dashboardSidebar.innerHTML = displaySidebar();

		const response = await apiInterceptor(`GET`, `/user/admin/dashboard`);
		const result = await response.json();     

		setDashboardData(result.data);
	} catch (error) {
		console.error('Error displaying dashboard:', error);
	}
}
