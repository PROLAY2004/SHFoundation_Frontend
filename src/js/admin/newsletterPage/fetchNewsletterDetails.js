import newsElements from './newsletterSelector';
import Templates from '../../common/Templates.js';
import displaySidebar from '../../templates/admin/sidebarTemplate.js';
import apiInterceptor from '../../api/interceptor.js';
import setData from './setNewsletterData.js';

const displayToast = new Templates();
let currentState = {
	page: 1,
	limit: 5,
	filter: 'all',
	query: '',
};

export default async function displayNewsletters(resetPage = false) {
	if (resetPage) currentState.page = 1;

	try {
		newsElements.newsletterBody.classList.add('loading');
		newsElements.newsletterSidebar.innerHTML = displaySidebar('newsletter');

		currentState.query = newsElements.newsletterSearch.value.trim();
		currentState.filter = newsElements.newsletterFilter.value;

		const res = await apiInterceptor(
			'POST',
			'/user/admin/newsletter',
			currentState,
		);
		const result = await res.json();

		if (result.success) {
			await setData(result.data);
			updatePaginationUI(
				result.data.currentPage,
				result.data.totalPages,
				result.data.filteredCount,
			);
		}

		newsElements.newsletterBody.classList.remove('loading');
	} catch (err) {
		newsElements.toastSection.innerHTML = displayToast.errorToast(err.message);
	}
}

function updatePaginationUI(current, total, filteredCount) {
	let html = '';

	// Info text
	newsElements.totalCount.innerHTML = filteredCount;
	newsElements.showingCount.innerHTML = Math.min(
		currentState.limit * current,
		filteredCount,
	);

	// Prev Button
	html += `<li class="page-item ${current === 1 ? 'disabled' : ''}">
                <a class="page-link" href="#" data-page="${current - 1}"><i class="bi bi-chevron-left"></i></a>
             </li>`;

	// Ellipsis Pagination Logic
	const delta = 2;
	const range = [];
	const rangeWithDots = [];
	let l;

	for (let i = 1; i <= total; i++) {
		if (
			i === 1 ||
			i === total ||
			(i >= current - delta && i <= current + delta)
		) {
			range.push(i);
		}
	}

	for (let i of range) {
		if (l) {
			if (i - l === 2) rangeWithDots.push(l + 1);
			else if (i - l !== 1) rangeWithDots.push('...');
		}
		rangeWithDots.push(i);
		l = i;
	}

	rangeWithDots.forEach((i) => {
		if (i === '...') {
			html += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
		} else {
			html += `<li class="page-item ${i === current ? 'active' : ''}">
                        <a class="page-link" href="#" data-page="${i}">${i}</a>
                     </li>`;
		}
	});

	// Next Button
	html += `<li class="page-item ${current === total || total === 0 ? 'disabled' : ''}">
                <a class="page-link" href="#" data-page="${current + 1}"><i class="bi bi-chevron-right"></i></a>
             </li>`;

	newsElements.paginationList.innerHTML = html;
}

// Attach currentState to window so other files can modify it if needed
window.currentNewsState = currentState;
