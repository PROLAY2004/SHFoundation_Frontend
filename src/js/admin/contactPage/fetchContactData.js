import displaySidebar from '../../templates/admin/sidebarTemplate.js';
import contactElements from './contactSelector.js';
import apiInterceptor from '../../api/interceptor.js';
import setContactData from './displayContact.js';
import Templates from '../../common/Templates.js';

const displayToast = new Templates();
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
		} else {
			if (result.message === 'Not an Admin') {
				window.location.href = '/src/pages/account/profile.html';
			}

			contactElements.toastSection.innerHTML = displayToast.errorToast(
				result.message,
			);
		}
	} catch (err) {
		contactElements.toastSection.innerHTML = displayToast.errorToast(
			err.message,
		);
	} finally {
		contactElements.contactBody.classList.remove('loading');

		setTimeout(() => {
			contactElements.toastSection.innerHTML = '';
		}, 300);
	}
}

function updatePaginationUI(current, total, totalItems) {
	contactElements.totalCount.innerHTML = totalItems;
	contactElements.showingCount.innerHTML = Math.min(
		current * currentState.limit,
		totalItems,
	);

	let html = '';

	// --- 1. PREV BUTTON ---
	html += `<li class="page-item ${current === 1 ? 'disabled' : ''}">
                <a class="page-link" href="#" data-page="${current - 1}">
                    <i class="bi bi-chevron-left"></i>
                </a>
             </li>`;

	// --- 2. ELLIPSIS LOGIC (MODIFIED SECTION) ---
	const delta = 2; // Number of pages to show before and after current page
	const left = current - delta;
	const right = current + delta;
	const range = [];
	const rangeWithDots = [];
	let l;

	// Identify which numbers to show
	for (let i = 1; i <= total; i++) {
		if (i === 1 || i === total || (i >= left && i <= right)) {
			range.push(i);
		}
	}

	// Add dots where gaps exist
	for (let i of range) {
		if (l) {
			if (i - l === 2) {
				rangeWithDots.push(l + 1);
			} else if (i - l !== 1) {
				rangeWithDots.push('...');
			}
		}
		rangeWithDots.push(i);
		l = i;
	}

	// --- 3. RENDER THE NUMBERS ---
	rangeWithDots.forEach((i) => {
		if (i === '...') {
			html += `<li class="page-item disabled"><span class="page-link"><i class="fa fa-ellipsis-h"></i></span></li>`;
		} else {
			html += `<li class="page-item ${i === current ? 'active' : ''}">
                        <a class="page-link" href="#" data-page="${i}">${i}</a>
                     </li>`;
		}
	});

	// --- 4. NEXT BUTTON ---
	html += `<li class="page-item ${current === total || total === 0 ? 'disabled' : ''}">
                <a class="page-link" href="#" data-page="${current + 1}">
                    <i class="bi bi-chevron-right"></i>
                </a>
             </li>`;

	contactElements.paginationList.innerHTML = html;
}



