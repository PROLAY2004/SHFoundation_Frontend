export default function displaySidebar(pageName){
    return `
        <div class="sidebar-brand">
                <div class="user-avatar">A</div>
                <h3>AdminPanel</h3>
            </div>

            <nav class="sidebar-nav">
                <ul class="nav flex-column">
                    <li class="nav-item">
                        <a class="nav-link ${pageName === 'dashboard' ? 'active' : ''}" href="/src/pages/admin/dashboard.html">
                            <i class="bi bi-speedometer2"></i>
                            <span>Dashboard</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link ${pageName === 'pageManagement' ? 'active' : ''}" href="#">
                            <i class="bi bi-files"></i>
                            <span>Page Management</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link ${pageName === 'project' ? 'active' : ''}" href="#">
                            <i class="bi bi-folder"></i>
                            <span>Project Management</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link ${pageName === 'event' ? 'active' : ''}" href="#">
                            <i class="bi bi-calendar-event"></i>
                            <span>Event Management</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link ${pageName === 'newsletter' ? 'active' : ''}" href="#">
                            <i class="bi bi-envelope"></i>
                            <span>Newsletter</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link ${pageName === 'voluenteer' ? 'active' : ''}" href="#">
                            <i class="bi bi-people"></i>
                            <span>Volunteer</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link ${pageName === 'contact' ? 'active' : ''}" href="/src/pages/admin/contact.html">
                            <i class="bi bi-chat-left-text"></i>
                            <span>Contact Responses</span>
                        </a>
                    </li>
                </ul>
            </nav>

            <!-- Fixed Logout Button at Bottom -->
            <div class="sidebar-footer">
                <button class="nav-link w-100 logout" onclick="logout()">
                    <i class="bi bi-box-arrow-right"></i>
                    <span>Logout</span>
                </button>
            </div>
    `;
}