import profileElements from './profileSelector.js';
import displayTerm from '../templates/Profile/termTemplate.js';
import displayHeader from '../templates/Profile/headerTemplate.js';

export default function render(){
    profileElements.termModalBody.innerHTML = displayTerm();
    profileElements.profileHeader.innerHTML = displayHeader();
}