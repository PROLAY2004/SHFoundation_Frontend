import volunteerElements from './volunteerSelector.js';
import voluenteerTemplate from '../../templates/admin/VoluenteerTemplate.js';
import getInfo from '../../utils/fetchUserDetails.js';
import Templates from '../../common/Templates.js';

const displayToast = new Templates();
const voluenteerList = new voluenteerTemplate();

export default async function setVoluenteerData(data, currentState) {
	try {
		const userDetails = data.currentUser;
		const name = userDetails.name;
		const voluenteers = data.voluenteerDetails;
		const pending = data.pendingCount;
		const ok = data.approvedCount;
		const reject = data.rejectedCount;
		const all = data.requestsCount;
		const image = `https://ui-avatars.com/api/?name=${name.split(' ').join('+')}&background=2c8c99&color=fff&size=200`;

		volunteerElements.userName.innerHTML = name;
		volunteerElements.userImage.src = userDetails.imagePath || image;
		volunteerElements.totalPending.innerHTML = String(pending).padStart(2, '0');
		volunteerElements.totalApproved.innerHTML = String(ok).padStart(2, '0');
		volunteerElements.totalRejected.innerHTML = String(reject).padStart(2, '0');
		volunteerElements.totalVolunteers.innerHTML = String(all).padStart(2, '0');
		volunteerElements.volunteerContainer.innerHTML = '';

		if (voluenteers.length === 0) {
			volunteerElements.volunteerContainer.innerHTML =
				voluenteerList.emptyVolunteersMessage();
		}

		for (let i = 0; i < voluenteers.length; i++) {
			const voluenteer = voluenteers[i];
			let user;

			if (voluenteer.userInfo) {
				user = voluenteer.userInfo;
			} else {
				const specificUserRes = await getInfo(
					voluenteer.email || voluenteer.userId,
					'userId',
				);
				const specificUserData = await specificUserRes.json();

				user = specificUserData.data.userInfo;
			}

			if (voluenteer.status === 'pending') {
				volunteerElements.volunteerContainer.innerHTML +=
					voluenteerList.pendingVoluenteers(voluenteer, user);
			} else if (voluenteer.status === 'rejected') {
				volunteerElements.volunteerContainer.innerHTML +=
					voluenteerList.rejectedVoluenteer(voluenteer, user);
			} else if (voluenteer.status === 'approved') {
				volunteerElements.volunteerContainer.innerHTML +=
					voluenteerList.approvedVoluenteers(voluenteer, user);
			}
		}

		updatePaginationUI(
			data.currentPage,
			data.totalPages,
			data.totalItems,
			currentState.limit,
		);
	} catch (err) {
		console.error(err);
		volunteerElements.toastSection.innerHTML = displayToast.errorToast(
			err.message,
		);
	} finally {
		setTimeout(() => {
			volunteerElements.toastSection.innerHTML = '';
		}, 3000);
	}
}

function updatePaginationUI(current, total, totalItems, limit) {
	volunteerElements.totalCount.innerHTML = totalItems;
	volunteerElements.showingCount.innerHTML = Math.min(
		current * limit,
		totalItems,
	);

	let html = '';

	html += `<li class="page-item ${current === 1 ? 'disabled' : ''}">
                <a class="page-link" href="#" data-page="${current - 1}">
                    <i class="bi bi-chevron-left"></i>
                </a>
             </li>`;

	const delta = 2;
	const left = current - delta;
	const right = current + delta;
	const range = [];
	const rangeWithDots = [];
	let l;

	for (let i = 1; i <= total; i++) {
		if (i === 1 || i === total || (i >= left && i <= right)) {
			range.push(i);
		}
	}

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

	rangeWithDots.forEach((i) => {
		if (i === '...') {
			html += `<li class="page-item disabled"><span class="page-link"><i class="fa fa-ellipsis-h"></i></span></li>`;
		} else {
			html += `<li class="page-item ${i === current ? 'active' : ''}">
                        <a class="page-link" href="#" data-page="${i}">${i}</a>
                     </li>`;
		}
	});

	html += `<li class="page-item ${current === total || total === 0 ? 'disabled' : ''}">
                <a class="page-link" href="#" data-page="${current + 1}">
                    <i class="bi bi-chevron-right"></i>
                </a>
             </li>`;

	volunteerElements.paginationList.innerHTML = html;
}

