export default function landingPageScroll() {
	const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
	const sections = document.querySelectorAll('section[id]');
	const navbarOffset = 80;
	const HOME_ID = '#home';

	let isClickScrolling = false;

	/* Smooth scroll on nav click*/
	navLinks.forEach((link) => {
		link.addEventListener('click', function (e) {
			const targetId = this.getAttribute('href');
			if (!targetId.startsWith('#')) return;

			e.preventDefault();
			const targetSection = document.querySelector(targetId);
			if (!targetSection) return;

			isClickScrolling = true;
			setActiveLink(targetId);

			window.scrollTo({
				top: targetSection.offsetTop - navbarOffset,
				behavior: 'smooth',
			});

			setTimeout(() => {
				isClickScrolling = false;
			}, 700);
		});
	});

	/* Active link on scroll*/
	window.addEventListener('scroll', () => {
		if (isClickScrolling) return;

		const scrollPos = window.scrollY + navbarOffset + 10;
		let matched = false;

		sections.forEach((section) => {
			const top = section.offsetTop;
			const height = section.offsetHeight;
			const id = section.getAttribute('id');
			const targetId = `#${id}`;

			if (scrollPos >= top && scrollPos < top + height) {
				// If section exists in navbar → activate it
				if (document.querySelector(`.nav-link[href="${targetId}"]`)) {
					setActiveLink(targetId);
					matched = true;
				}
			}
		});

		//Fallback: no section matched navbar → activate Home
		if (!matched) {
			setActiveLink(HOME_ID);
		}
	});

	/* Helper function*/
	function setActiveLink(targetId) {
		navLinks.forEach((link) => link.classList.remove('active'));

		const activeLink = document.querySelector(
			`.navbar-nav .nav-link[href="${targetId}"]`
		);

		if (activeLink) {
			activeLink.classList.add('active');
		}
	}
}
