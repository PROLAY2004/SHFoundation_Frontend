import displaySidebar from '../../templates/admin/sidebarTemplate.js';
import contactElements from './contactSelector.js';
import apiInterceptor from '../../api/interceptor.js';
import setContactData from './displayContact.js';

let currentState = {
	page: 1,
	limit: 5,
	filter: 'all',
	query: '',
};

export default async function displayContact(resetPage = false) {
	if (resetPage) currentState.page = 1;

	try {
		contactElements.contactBody.classList.add('loading');
		contactElements.contactBody.style.display = 'block';
		contactElements.contactSidebar.innerHTML = displaySidebar('contact');

		currentState.query = contactElements.contactSearch.value.trim();
		currentState.filter = contactElements.contactFilter.value;

		const response = await apiInterceptor(
			'POST',
			'/user/admin/contact/loader',
			currentState,
		);
		const result = await response.json();

		if (result.success) {
			await setContactData(result.data);
			updatePaginationUI(
				result.data.currentPage,
				result.data.totalPages,
				result.data.totalContact,
			);
		}
	} catch (err) {
		console.error(err);
	} finally {
		contactElements.contactBody.classList.remove('loading');
	}
}

function updatePaginationUI(current, total, totalItems) {
	contactElements.totalCount.innerHTML = totalItems;
	contactElements.showingCount.innerHTML = Math.min(
		current * currentState.limit,
		totalItems,
	);

	let html = '';
	// Prev Button
	html += `<li class="page-item ${current === 1 ? 'disabled' : ''}">
                <a class="page-link" href="#" data-page="${current - 1}"><i class="bi bi-chevron-left"></i></a>
             </li>`;

	for (let i = 1; i <= total; i++) {
		html += `<li class="page-item ${i === current ? 'active' : ''}">
                    <a class="page-link" href="#" data-page="${i}">${i}</a>
                 </li>`;
	}

	// Next Button
	html += `<li class="page-item ${current === total || total === 0 ? 'disabled' : ''}">
                <a class="page-link" href="#" data-page="${current + 1}"><i class="bi bi-chevron-right"></i></a>
             </li>`;

	contactElements.paginationList.innerHTML = html;
}

// Global listener for pagination clicks
contactElements.paginationList.addEventListener('click', (e) => {
	e.preventDefault();
	const page = e.target.closest('.page-link')?.dataset.page;
	if (page) {
		currentState.page = parseInt(page);
		displayContact();
	}
});

// Listener for Filter
contactElements.contactFilter.addEventListener('change', () =>
	displayContact(true),
);
