import * as bootstrap from 'bootstrap';

import '../../scss/profilePage/profile.scss';
import logout from '../utils/userLogout.js';
import displayProfileData from './fetchUserData.js';

const logoutBtn = document.getElementById('logoutBtn');

document.addEventListener('DOMContentLoaded', displayProfileData);
logoutBtn.addEventListener('click', logout);
