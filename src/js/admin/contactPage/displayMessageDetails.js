import chnageStatus from './updateStatus.js';

async function showMessage(messageId, userId) {
	try {
		const message = await chnageStatus(messageId);
	} catch (err) {
		console.log(err.message);
	}
}

window.showMessage = showMessage;
