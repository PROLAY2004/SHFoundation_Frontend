export default function displayCharts() {
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
					borderColor: ['#fff', '#fff', '#fff', '#fff', '#fff'],
					borderWidth: 3,
					hoverOffset: 15,
					spacing: 5,
				},
			],
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			cutout: '70%',
			plugins: {
				legend: {
					display: false,
				},
				tooltip: {
					backgroundColor: 'rgba(0, 0, 0, 0.8)',
					titleFont: {
						size: 14,
						weight: 'bold',
					},
					bodyFont: {
						size: 13,
					},
					padding: 12,
					cornerRadius: 8,
					callbacks: {
						label: function (context) {
							return `${context.label}: ${context.parsed}%`;
						},
					},
				},
			},
			animation: {
				animateScale: true,
				animateRotate: true,
				duration: 2000,
				easing: 'easeOutQuart',
			},
		},
	});

	// Toggle legend functionality
	document
		.querySelector('.toggle-legend')
		.addEventListener('click', function () {
			const legendState = domainChart.options.plugins.legend.display;
			domainChart.options.plugins.legend.display = !legendState;
			domainChart.update();

			// Update button icon
			const icon = this.querySelector('i');
			if (legendState) {
				icon.className = 'bi bi-eye';
				this.classList.remove('btn-primary');
				this.classList.add('btn-outline-primary');
			} else {
				icon.className = 'bi bi-eye-slash';
				this.classList.remove('btn-outline-primary');
				this.classList.add('btn-primary');
			}
		});

	// Add hover effects to impact cards
	const impactCards = document.querySelectorAll('.impact-card');
	impactCards.forEach((card) => {
		card.addEventListener('mouseenter', function () {
			const category = this.dataset.category;
			const colorMap = {
				education: '#2c8c99',
				healthcare: '#ff8c42',
				'women-empowerment': '#28a745',
				'clean-water': '#6f42c1',
			};

			// Highlight corresponding segment in chart
			const index = Object.keys(colorMap).indexOf(category);
			if (index !== -1) {
				domainChart.data.datasets[0].backgroundColor =
					domainChart.data.datasets[0].backgroundColor.map((color, i) =>
						i === index ? color : color + '80'
					);
				domainChart.update();
			}
		});

		card.addEventListener('mouseleave', function () {
			// Reset chart colors
			domainChart.data.datasets[0].backgroundColor = [
				'#2c8c99',
				'#ff8c42',
				'#28a745',
				'#6f42c1',
				'#dc3545',
			];
			domainChart.update();
		});

		// Add click to focus on chart segment
		card.addEventListener('click', function () {
			const category = this.dataset.category;
			const index = [
				'education',
				'healthcare',
				'women-empowerment',
				'clean-water',
			].indexOf(category);

			if (index !== -1) {
				// Add bounce animation to chart segment
				domainChart.toggleDataVisibility(index);
				domainChart.update();

				// Reset after delay
				setTimeout(() => {
					domainChart.toggleDataVisibility(index);
					domainChart.update();
				}, 1000);
			}
		});
	});
}
