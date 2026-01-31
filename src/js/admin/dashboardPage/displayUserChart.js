import Chart from 'chart.js/auto';
import dashboardElements from './dashboardSelector.js';

export default function userChart(total = 0, verified = 0, unverified = 0) {
	const ctx = dashboardElements.userVerificationChart.getContext('2d');

	const others = Math.max(total - (verified + unverified), 0);

	// ---------- RADIAL GRADIENTS (KEY UPGRADE) ----------
	const verifiedGradient = ctx.createRadialGradient(
		100,
		100,
		40,
		100,
		100,
		160,
	);
	verifiedGradient.addColorStop(0, '#34D399'); // emerald-400
	verifiedGradient.addColorStop(1, '#059669'); // emerald-600

	const unverifiedGradient = ctx.createRadialGradient(
		100,
		100,
		40,
		100,
		100,
		160,
	);
	unverifiedGradient.addColorStop(0, '#FB7185'); // rose-400
	unverifiedGradient.addColorStop(1, '#BE123C'); // rose-700

	const othersGradient = ctx.createRadialGradient(100, 100, 40, 100, 100, 160);
	othersGradient.addColorStop(0, '#CBD5E1'); // slate-300
	othersGradient.addColorStop(1, '#64748B'); // slate-500

	const labels = ['Verified', 'Unverified'];
	const data = [verified, unverified];
	const colors = [verifiedGradient, unverifiedGradient];

	if (others > 0) {
		labels.push('Others');
		data.push(others);
		colors.push(othersGradient);
	}

	// ---------- CENTER TEXT (POLISHED) ----------
	const centerTextPlugin = {
		id: 'centerText',
		beforeDraw(chart) {
			const { ctx, width, height } = chart;

			ctx.save();

			// Total label
			ctx.font = '500 12px Inter, sans-serif';
			ctx.fillStyle = '#6B7280';
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			ctx.fillText('Total Users', width / 2, height / 2 - 14);

			// Total number
			ctx.font = '700 22px Inter, sans-serif';
			ctx.fillStyle = '#111827';
			ctx.fillText(total.toLocaleString(), width / 2, height / 2 + 10);

			ctx.restore();
		},
	};

	new Chart(ctx, {
		type: 'doughnut',
		data: {
			labels,
			datasets: [
				{
					data,
					backgroundColor: colors,
					borderWidth: 0,
					hoverOffset: 18,
					spacing: 4, // 👈 adds separation (huge visual win)
					cutout: '74%',
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
						pointStyle: 'rect',
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
