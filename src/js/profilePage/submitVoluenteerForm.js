import * as bootstrap from 'bootstrap';

import profileElements from './profileSelector.js';
import apiInterceptor from '../api/interceptor.js';
import Templates from '../common/Templates.js';

const termsModal = new bootstrap.Modal(profileElements.termsModal);
const displayToast = new Templates();

const acceptTermsAndConditions = () => {
	profileElements.agreeTerms.checked = true;
	termsModal.hide();
};

const submitVolunteerForm = async (e) => {
	try {
		e.preventDefault();
		profileElements.voluenteerBtn.classList.add('disabled');
		profileElements.voluenteerSpinner.innerHTML = `<div class="spinner-border spinner-border-sm text-white" role="status"></div>`;

		const skillSelectors = document.querySelectorAll(
			'input[name="mySkills"]:checked',
		);
		const avalabilitySelect = document.querySelectorAll(
			'input[name="availability"]:checked',
		);
		const response = await apiInterceptor('POST', '/user/account/volunteer', {
			skills: Array.from(skillSelectors).map((cb) => cb.value),
			availability: Array.from(avalabilitySelect).map((cb) => cb.value)[0],
			details: profileElements.volunteerMotivation.value,
			termsAccepted: profileElements.agreeTerms.checked,
		});
		const result = await response.json();

		if (result.success) {
            profileElements.volunteerForm.reset();
			profileElements.toastSection.innerHTML = displayToast.successToast(
				result.message,
			);
		} else {
			profileElements.toastSection.innerHTML = displayToast.errorToast(
				result.message,
			);
		}
	} catch (error) {
		profileElements.toastSection.innerHTML = displayToast.errorToast(
			error.message,
		);
	} finally {
		profileElements.voluenteerBtn.classList.remove('disabled');
		profileElements.voluenteerSpinner.innerHTML = ``;

		setTimeout(() => {
			profileElements.toastSection.innerHTML = '';
		}, 3000);
	}
};

export { acceptTermsAndConditions, submitVolunteerForm };
