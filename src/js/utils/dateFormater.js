export default function formatMessageTime(dateString) {
	const date = new Date(dateString);
	const now = new Date();

	const isToday =
		date.getDate() === now.getDate() &&
		date.getMonth() === now.getMonth() &&
		date.getFullYear() === now.getFullYear();

	const isYesterday =
		new Date(now.setDate(now.getDate() - 1)).toDateString() ===
		date.toDateString();

	const time = date.toLocaleTimeString('en-US', {
		hour: 'numeric',
		minute: '2-digit',
		hour12: true,
	});

	if (isToday) {
		return `Today, ${time}`;
	}

	if (isYesterday) {
		return `Yesterday, ${time}`;
	}

	return (
		date.toLocaleDateString('en-US', {
			day: 'numeric',
			month: 'short',
			year: 'numeric',
		}) + `, ${time}`
	);
}
