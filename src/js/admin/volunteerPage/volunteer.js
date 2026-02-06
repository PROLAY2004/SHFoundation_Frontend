import * as bootstrap from 'bootstrap';
import '../../../scss/admin/voluenteer.scss';

import '../../common/sidebarToggle.js';
import '../../utils/userLogout.js';
import './displayModal.js';
import './updateApplication.js';
import displayVoluenteerDetails from './fetchVoluenteerData.js';

document.addEventListener('DOMContentLoaded', displayVoluenteerDetails);
