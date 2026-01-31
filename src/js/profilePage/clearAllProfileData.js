import profileElements from './profileSelector';

export default function clearData() {
	profileElements.profileImage.src = '';
	profileElements.userName.innerHTML = '';
	profileElements.userEmail.innerHTML = '';
	profileElements.editName.value = '';
	profileElements.editBtn.classList.add('disabled');
	profileElements.newsLetterSaveBtn.classList.add('disabled');
	profileElements.imagePreview.src = '';
	profileElements.previewContainer.classList.add('d-none');
}
