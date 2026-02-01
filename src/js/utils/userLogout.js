export default function logout() {
	localStorage.clear();
	window.location.href = '/'
}

window.logout = logout;