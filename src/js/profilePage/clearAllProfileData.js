import profileElements from './profileSelector';

export default function clearData() {
	profileElements.profileImage.src = '';
	profileElements.userName.innerHTML = '';
	profileElements.userEmail.innerHTML = '';
	profileElements.editName.value = '';
	profileElements.editBtn.classList.add('disabled');
	profileElements.newsLetterSaveBtn.classList.add('disabled');
}
