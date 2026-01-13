// Import our custom CSS
import '../scss/index.scss';

// Import all of Bootstrap’s JS
import * as bootstrap from 'bootstrap';

// Navbar scroll effect
window.addEventListener('scroll', function () {
	const navbar = document.querySelector('.navbar');
	if (window.scrollY > 50) {
		navbar.classList.add('scrolled');
	} else {
		navbar.classList.remove('scrolled');
	}
});

// Initialize charts
document.addEventListener('DOMContentLoaded', function () {
	// Domain distribution chart
	const domainCtx = document.getElementById('domainChart').getContext('2d');
	const domainChart = new Chart(domainCtx, {
		type: 'doughnut',
		data: {
			labels: [
				'Education',
				'Healthcare',
				'Women Empowerment',
				'Clean Water',
				'Disaster Relief',
			],
			datasets: [
				{
					data: [35, 25, 20, 15, 5],
					backgroundColor: [
						'#2c8c99',
						'#ff8c42',
						'#28a745',
						'#6f42c1',
						'#dc3545',
					],
					borderWidth: 1,
				},
			],
		},
		options: {
			responsive: true,
			plugins: {
				legend: {
					position: 'right',
				},
			},
		},
	});

	// Impact growth chart
	const impactCtx = document.getElementById('impactChart').getContext('2d');
	const impactChart = new Chart(impactCtx, {
		type: 'line',
		data: {
			labels: ['2018', '2019', '2020', '2021', '2022', '2023'],
			datasets: [
				{
					label: 'Lives Impacted (in thousands)',
					data: [25, 32, 38, 45, 58, 75],
					borderColor: '#2c8c99',
					backgroundColor: 'rgba(44, 140, 153, 0.1)',
					borderWidth: 3,
					fill: true,
					tension: 0.4,
				},
			],
		},
		options: {
			responsive: true,
			scales: {
				y: {
					beginAtZero: true,
					title: {
						display: true,
						text: 'Lives Impacted (in thousands)',
					},
				},
				x: {
					title: {
						display: true,
						text: 'Year',
					},
				},
			},
		},
	});

	// Form submission
	document
		.getElementById('contactForm')
		.addEventListener('submit', function (e) {
			e.preventDefault();
			alert('Thank you for your message! We will get back to you soon.');
			this.reset();
		});

	// Smooth scrolling for anchor links
	document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
		anchor.addEventListener('click', function (e) {
			e.preventDefault();

			const targetId = this.getAttribute('href');
			if (targetId === '#') return;

			const targetElement = document.querySelector(targetId);
			if (targetElement) {
				window.scrollTo({
					top: targetElement.offsetTop - 80,
					behavior: 'smooth',
				});

				// Update active nav link
				document.querySelectorAll('.navbar-nav .nav-link').forEach((link) => {
					link.classList.remove('active');
				});
				this.classList.add('active');
			}
		});
	});
});