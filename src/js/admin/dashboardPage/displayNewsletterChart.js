import Chart from 'chart.js/auto';
import dashboardElements from './dashboardSelector.js';

export default function newsChart(active = 0, inactive = 0, blocked = 0) {
	const ctx = dashboardElements.newsletterChart.getContext('2d');

	const total = active + inactive + blocked;

	// ---------- RADIAL GRADIENTS ----------
	const activeGradient = ctx.createRadialGradient(100, 100, 40, 100, 100, 160);
	activeGradient.addColorStop(0, '#34D399'); // emerald-400
	activeGradient.addColorStop(1, '#059669'); // emerald-600

	const inactiveGradient = ctx.createRadialGradient(
		100,
		100,
		40,
		100,
		100,
		160,
	);
	inactiveGradient.addColorStop(0, '#FCD34D'); // amber-300
	inactiveGradient.addColorStop(1, '#F59E0B'); // amber-500

	const blockedGradient = ctx.createRadialGradient(100, 100, 40, 100, 100, 160);
	blockedGradient.addColorStop(0, '#F87171'); // red-400
	blockedGradient.addColorStop(1, '#DC2626'); // red-600

	// ---------- CENTER TEXT ----------
	const centerTextPlugin = {
		id: 'centerText',
		beforeDraw(chart) {
			const { ctx, width, height } = chart;

			ctx.save();

			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';

			// Label
			ctx.font = '500 12px Inter, sans-serif';
			ctx.fillStyle = '#6B7280';
			ctx.fillText('Total Subscribers', width / 2, height / 2 - 14);

			// Value
			ctx.font = '700 22px Inter, sans-serif';
			ctx.fillStyle = '#111827';
			ctx.fillText(total.toLocaleString(), width / 2, height / 2 + 10);

			ctx.restore();
		},
	};

	new Chart(ctx, {
		type: 'doughnut',
		data: {
			labels: ['Active', 'Inactive', 'Blocked'],
			datasets: [
				{
					data: [active, inactive, blocked],
					backgroundColor: [activeGradient, inactiveGradient, blockedGradient],
					borderWidth: 0,
					hoverOffset: 18,
					spacing: 4, // 👈 modern separation
					cutout: '74%', // 👈 premium donut
				},
			],
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			animation: {
				duration: 900,
				easing: 'easeOutCubic',
			},
			plugins: {
				legend: {
					position: 'bottom',
					labels: {
						usePointStyle: true,
						pointStyle: 'rect', // 🔲 square legend
						boxWidth: 14,
						boxHeight: 14,
						padding: 14,
						color: '#374151',
						font: {
							size: 12,
							weight: '600',
						},
					},
				},
				tooltip: {
					backgroundColor: '#111827',
					titleColor: '#F9FAFB',
					bodyColor: '#E5E7EB',
					padding: 10,
					cornerRadius: 8,
					callbacks: {
						label(ctx) {
							return `${ctx.label}: ${ctx.raw.toLocaleString()}`;
						},
					},
				},
			},
		},
		plugins: [centerTextPlugin],
	});
}
