import profileElements from './profileSelector.js';

export default function displayPreviewImage() {
	const file = profileElements.imageInput.files[0];

	if (file) {
		profileElements.imagePreview.src = URL.createObjectURL(file);
		profileElements.previewContainer.classList.remove('d-none');
	}
}
