export default function isAuthenticated() {
	if (
		localStorage.getItem('SHF_access_token') &&
		localStorage.getItem('SHF_refresh_token')
	) {
		return true;
	} else {
		return false;
	}
}
