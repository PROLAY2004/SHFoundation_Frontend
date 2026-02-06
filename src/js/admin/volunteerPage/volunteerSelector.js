const volunteerElements = {
	// Layout
	volunteerBody: document.getElementById('volunteerBody'),
	volunteerSidebar: document.getElementById('volunteerSidebar'),
	toastSection: document.getElementById('toastSection'),

	// Navbar / Header
	userName: document.getElementById('userName'),
	userImage: document.getElementById('userImage'),

	// Stats Cards
	totalPending: document.getElementById('totalPending'),
	totalApproved: document.getElementById('totalApproved'),
	totalRejected: document.getElementById('totalRejected'),
	totalVolunteers: document.getElementById('totalVolunteers'),

	// Main Content / List
	volunteerContainer: document.getElementById('volunteerContainer'),

	// Filters & Search (NEW)
	volunteerSearch: document.getElementById('volunteerSearch'),
	statusFilter: document.getElementById('statusFilter'),
	availabilityFilter: document.getElementById('availabilityFilter'),

	// Pagination (NEW)
	paginationList: document.getElementById('volunteerPagination'), // Ensure <ul> has id="volunteerPagination"
	showingCount: document.getElementById('showingCount'),
	totalCount: document.getElementById('totalCount'),

	// Modal Elements
	volunteerDetails: document.getElementById('volunteerDetails'),
	volunteerName: document.getElementById('volunteerName'),
	modalApplicantName: document.getElementById('modalApplicantName'),
	modalApplicantEmail: document.getElementById('modalApplicantEmail'),
	userAvattar: document.getElementById('userAvattar'),
	modalApplicationStatus: document.getElementById('modalApplicationStatus'),
	modalApplicationTime: document.getElementById('modalApplicationTime'),
	userJoinDate: document.getElementById('userJoinDate'),
	totalApplications: document.getElementById('totalApplications'),
	modalAvailability: document.getElementById('modalAvailability'),
	modalMotivation: document.getElementById('modalMotivation'),
	modalSubmittedDate: document.getElementById('modalSubmittedDate'),
	modalSubmittedTime: document.getElementById('modalSubmittedTime'),
	modalSkills: document.getElementById('modalSkills'),
	modalFooter: document.getElementById('modalFooter'),
	approveBtn: document.getElementById('approveBtn'),
	rejectBtn: document.getElementById('rejectBtn'),
};

export default volunteerElements;
