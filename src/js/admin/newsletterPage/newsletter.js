import * as bootstrap from 'bootstrap';
import '../../../scss/admin/newsletter.scss';

import '../../common/sidebarToggle.js';
import '../../utils/userLogout.js';
import './modifyNewsletter.js';
import './displayNewsModal.js';
import newsElements from './newsletterSelector';
import displayNewsletters from './fetchNewsletterDetails.js';
import changeStatus from './modifyNewsletter.js';

document.addEventListener('DOMContentLoaded', displayNewsletters);
newsElements.confirmActionBtn.addEventListener('click', changeStatus);