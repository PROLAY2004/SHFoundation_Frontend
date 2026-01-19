import clearData from './clearAllProfileData.js';
import profileElements from './profileSelector.js';

export default function setData(data) {
	clearData();

	const { imagePath, name, email } = data.user;
	const image = `https://ui-avatars.com/api/?name=${name.split(' ').join('+')}&background=2c8c99&color=fff&size=200`;
	const originalType = data.newsLetterDetails.type;

	profileElements.profileImage.src = imagePath || image;
	profileElements.userName.textContent = name;
	profileElements.userEmail.textContent = email;
	profileElements.editName.value = name;

	profileElements.newsLetter.forEach((radio) => {
		radio.checked = false;
		radio.checked = radio.value === originalType;

		radio.addEventListener('change', () => {
			const selected = document.querySelector(
				'input[name="newsletter"]:checked',
			)?.value;

			// enable button only if changed
			profileElements.newsLetterSaveBtn.classList.toggle(
				'disabled',
				selected === originalType,
			);
		});
	});
}
