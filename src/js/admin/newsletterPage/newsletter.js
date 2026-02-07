import * as bootstrap from 'bootstrap';
import '../../../scss/admin/newsletter.scss';

import '../../common/sidebarToggle.js';
import '../../utils/userLogout.js';
import newsElements from './newsletterSelector';
import displayNewsletters from './fetchNewsletterDetails.js';

document.addEventListener('DOMContentLoaded', displayNewsletters);
