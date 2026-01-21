import * as bootstrap from 'bootstrap';

import '../../scss/profilePage/profile.scss';
import logout from '../utils/userLogout.js';
import displayProfileData from './fetchUserData.js';
import profileElements from './profileSelector.js';
import updateProfileData from './updateData.js';
import changeProfileImage from './updateProfileImage.js';
import updatePreference from './updateNewsletterPreference.js';
import {
	acceptTermsAndConditions,
	submitVolunteerForm,
} from './submitVoluenteerForm.js';

document.addEventListener('DOMContentLoaded', displayProfileData);
profileElements.logoutBtn.addEventListener('click', logout);
profileElements.editProfileForm.addEventListener('submit', updateProfileData);
profileElements.editCancelBtn.addEventListener('click', displayProfileData);
profileElements.changeImageForm.addEventListener('submit', changeProfileImage);
profileElements.newsletterForm.addEventListener('submit', updatePreference);
profileElements.termAcceptBtn.addEventListener(
	'click',
	acceptTermsAndConditions,
);
profileElements.volunteerForm.addEventListener('submit', submitVolunteerForm);
profileElements.editName.addEventListener('input', () => {
	profileElements.editBtn.classList.remove('disabled');
});
