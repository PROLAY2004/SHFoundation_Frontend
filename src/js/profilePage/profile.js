import * as bootstrap from 'bootstrap';

import '../../scss/profilePage/profile.scss';
import logout from '../utils/userLogout.js';

const profilePageBody = document.getElementById('profilePageBody');
const logoutBtn = document.getElementById('logoutBtn');

document.addEventListener('DOMContentLoaded', () => {
	profilePageBody.style.display = 'block';
});
logoutBtn.addEventListener('click', logout);
