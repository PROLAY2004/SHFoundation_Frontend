const profileElements = {
	profilePageBody: document.getElementById('profilePageBody'),
	profileImage: document.getElementById('profileImage'),
	userName: document.getElementById('userName'),
	userEmail: document.getElementById('userEmail'),
	editName: document.getElementById('editName'),
	newsLetter: document.querySelectorAll('input[name="newsletter"]'),
	newsLetterSaveBtn: document.getElementById('newsLetterSaveBtn'),
	toastSection: document.getElementById('toastSection'),
	logoutBtn: document.getElementById('logoutBtn'),
	editProfileForm: document.getElementById('editProfileForm'),
	editCancelBtn: document.getElementById('editCancelBtn'),
	editBtn: document.getElementById('editBtn'),
	changeImageForm: document.getElementById('changeImageForm'),
	imageInput: document.getElementById('imageInput'),
	spinnerContainer: document.getElementById('spinnerContainer'),
	updateImageBtn: document.getElementById('updateImageBtn'),
	changeImageModal: document.getElementById('changeImageModal'),
};

export default profileElements;
