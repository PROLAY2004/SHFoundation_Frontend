export default function displayHeader(){
    return `<div class="container-xxl">
            <div class="d-flex align-items-center justify-content-between py-3">
                <div class="d-flex align-items-center gap-3">
                    <div
                        class="logo-icon text-white rounded-4 shadow-sm d-flex align-items-center justify-content-center">
                        <i class="fas fa-user-circle fs-4"></i>
                    </div>
                    <div class="d-none d-sm-block">
                        <h1 class="h5 fw-bold text-dark m-0">My Profile</h1>
                        <p class="small text-secondary m-0 fw-medium">Manage your account</p>
                    </div>
                </div>

                <div class="d-flex align-items-center gap-2">
                    <a href="/"
                        class="header-btn back-btn d-flex justify-content-center align-items-center btn btn-white rounded-pill shadow-sm fw-semibold px-4">
                        <i class="fas fa-arrow-left me-2 text-primary"></i>
                        <span>Back</span>
                    </a>

                    <a href="#" class="header-btn btn btn-primary d-none" id="adminBtn">Admin</a>

                    <button
                        class="header-btn d-flex justify-content-center align-items-center logout-btn btn btn-danger-soft rounded-pill px-4 fw-bold"
                        id="logoutBtn">
                        <i class="fas fa-sign-out-alt me-2"></i>
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </div>`;
}