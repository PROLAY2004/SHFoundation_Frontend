import dashboardElements from '../admin/dashboardPage/dashboardSelector.js';

dashboardElements.sidebarToggle.addEventListener('click', toggleSidebar);
dashboardElements.sidebarOverlay.addEventListener('click', closeSidebar);

function toggleSidebar() {
	dashboardElements.sidebar.classList.toggle('active');
	dashboardElements.sidebarOverlay.classList.toggle('active');
}

function closeSidebar() {
	dashboardElements.sidebar.classList.remove('active');
	dashboardElements.sidebarOverlay.classList.remove('active');
}
