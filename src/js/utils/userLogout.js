export default function logout() {
	localStorage.clear();
	window.location.reload();
}

window.logout = logout;