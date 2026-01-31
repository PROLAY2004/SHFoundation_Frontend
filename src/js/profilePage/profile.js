import * as bootstrap from 'bootstrap';

import '../../scss/profilePage/profile.scss';
import '../utils/userLogout.js';
import displayProfileData from './fetchUserData.js';
import profileElements from './profileSelector.js';
import updateProfileData from './updateData.js';
import changeProfileImage from './updateProfileImage.js';
import updatePreference from './updateNewsletterPreference.js';
import displayPreviewImage from './displayImagePreview.js';
import { acceptTerms, submitVolunteerForm } from './submitVoluenteerForm.js';

document.addEventListener('DOMContentLoaded', displayProfileData);
profileElements.editProfileForm.addEventListener('submit', updateProfileData);
profileElements.editCancelBtn.addEventListener('click', displayProfileData);
profileElements.changeImageForm.addEventListener('submit', changeProfileImage);
profileElements.newsletterForm.addEventListener('submit', updatePreference);
profileElements.termAcceptBtn.addEventListener('click', acceptTerms);
profileElements.volunteerForm.addEventListener('submit', submitVolunteerForm);
profileElements.imageInput.addEventListener('change', displayPreviewImage);

profileElements.volunteerMotivation.addEventListener('input', () => {
	profileElements.textCount.textContent = `${profileElements.volunteerMotivation.value.length}/500`;
});

profileElements.editName.addEventListener('input', () => {
	profileElements.editBtn.classList.remove('disabled');
});
