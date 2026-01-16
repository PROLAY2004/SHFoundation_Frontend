export default class Templates {
	successToast = (msg) => {
		return `  <div class="toast text-white fw-3 bg-success d-flex justify-content-center align-items-center p-2 gap-2" >
    <i class="fa fa-check-circle"></i>
    <p class="m-0 text-white">${msg}</p>
  </div>`;
	};

	errorToast = (msg) => {
		return `  <div class="toast text-white fw-1 bg-danger d-flex justify-content-center align-items-center p-2 gap-2">
    <i class="fa fa-times-circle"></i>
    <p class="m-0 text-white">${msg}</p>
  </div>`;
	};
}
