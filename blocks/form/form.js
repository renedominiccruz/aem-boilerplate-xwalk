export default function decorate(block) {
  // Prevent duplicate initialization
  if (block.dataset.initialized) return;
  block.dataset.initialized = 'true';

  // Detect editor mode
  const isEditor = document.body.classList.contains('hlx-ue-edit')
    || window.location.search.includes('edit')
    || document.querySelector('#editor-app');

  // Create a single form wrapper
  const form = document.createElement('form');
  form.classList.add('generated-form');

  // Find ALL formfields rows (nested div > div)
  const rows = block.querySelectorAll(':scope > div > div');

  rows.forEach((row) => {
    const paragraphs = row.querySelectorAll('p');

    if (paragraphs.length >= 2) {
      const fieldType = paragraphs[0].textContent.trim().toLowerCase();
      const fieldName = paragraphs[1].textContent.trim().toLowerCase().replace(/\s+/g, '-');

      // Create wrapper for each input field
      const fieldWrapper = document.createElement('div');
      fieldWrapper.classList.add('form-field');

      // Label
      const label = document.createElement('label');
      label.setAttribute('for', fieldName);
      label.textContent = fieldName.charAt(0).toUpperCase() + fieldName.slice(1);

      // Input
      const input = document.createElement('input');
      input.type = fieldType;
      input.name = fieldName;
      input.id = fieldName;

      // Append label and input to wrapper
      fieldWrapper.appendChild(label);
      fieldWrapper.appendChild(input);

      // Add field to form
      form.appendChild(fieldWrapper);
    }
  });

  // Add single submit button (published mode only)
  if (!isEditor) {
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Submit';
    submitButton.classList.add('form-submit-btn');
    form.appendChild(submitButton);

    submitButton.addEventListener('click', (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });
      console.log('Form submitted:', data);
    });
  }

  // Append final form at end of block
  block.appendChild(form);
}
