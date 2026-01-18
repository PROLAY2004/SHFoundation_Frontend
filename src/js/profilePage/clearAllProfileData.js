import profileElements from './profileSelector';

export default function clearData() {
	profileElements.profileImage.src = '';
	profileElements.userName.innerHTML = '';
	profileElements.userEmail.innerHTML = '';
	profileElements.editName.value = '';
	profileElements.editEmail.value = '';
}
