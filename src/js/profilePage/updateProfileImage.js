import * as bootstrap from 'bootstrap';

import profileElements from './profileSelector.js';
import Templates from '../common/Templates.js';
import apiInterceptor from '../api/interceptor.js';
import displayProfileData from './fetchUserData.js';

const displayToast = new Templates();
const updateModal = new bootstrap.Modal(profileElements.changeImageModal);

export default async function changeProfileImage(e) {
	try {
		e.preventDefault();
		const file = profileElements.imageInput.files[0];

		profileElements.updateImageBtn.classList.add('disabled');
		profileElements.spinnerContainer.innerHTML =
			'<div class="spinner-border spinner-border-sm text-white" role="status"></div>';

		if (!file) {
			profileElements.toastSection.innerHTML =
				displayToast.errorToast('No image selected');
			return;
		}

		const sigRes = await apiInterceptor(`GET`, `/user/account/cloudinary`);
		const sigData = await sigRes.json();
		const formData = new FormData();

		formData.append('file', file);
		formData.append('api_key', sigData.data.apiKey);
		formData.append('timestamp', sigData.data.timestamp);
		formData.append('signature', sigData.data.signature);
		formData.append('folder', sigData.data.folder);

		const response = await fetch(
			`https://api.cloudinary.com/v1_1/${sigData.data.cloudName}/image/upload`,
			{
				method: 'POST',
				body: formData,
			},
		);
		const result = await response.json();

		if (!result.secure_url) {
			profileElements.toastSection.innerHTML = displayToast.errorToast(
				result.error.message || 'Upload failed',
			);
		}

		const updateRes = await apiInterceptor(
			'POST',
			'/user/account/updateAvatar',
			{
				imagePath: result.secure_url,
				publicId: result.public_id,
			},
		);
		const updateData = await updateRes.json();

		if (updateData.success) {
			displayProfileData();
			updateModal.hide();
			profileElements.changeImageForm.reset();

			profileElements.toastSection.innerHTML = displayToast.successToast(
				updateData.message,
			);
		} else {
			profileElements.toastSection.innerHTML = displayToast.errorToast(
				updateData.message,
			);
		}
	} catch (err) {
		profileElements.toastSection.innerHTML = displayToast.errorToast(
			err.message,
		);
	} finally {
		profileElements.updateImageBtn.classList.remove('disabled');
		profileElements.spinnerContainer.innerHTML = '';

		setTimeout(() => {
			profileElements.toastSection.innerHTML = '';
		}, 3000);
	}
}
