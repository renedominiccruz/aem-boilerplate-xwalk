export default function decorate(block) {
  // Prevent duplicate initialization
  if (block.dataset.initialized) return;
  block.dataset.initialized = 'true';

  // Detect editor mode (skip transformations if active)
  const isEditor = document.body.classList.contains('hlx-ue-edit')
    || window.location.search.includes('edit')
    || document.querySelector('#editor-app');

  // Create form wrapper
  const form = document.createElement('form');
  form.classList.add('generated-form');

  // Build inputs from authored <p>
  const rows = block.querySelectorAll(':scope > div > div');
  rows.forEach((row) => {
    const paragraphs = row.querySelectorAll('p');

    if (paragraphs.length >= 2) {
      const fieldType = paragraphs[0].textContent.trim().toLowerCase(); // text/email
      const fieldName = paragraphs[1].textContent.trim().toLowerCase().replace(/\s+/g, '-');

      // Field wrapper
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

      // Append to wrapper
      fieldWrapper.appendChild(label);
      fieldWrapper.appendChild(input);
      form.appendChild(fieldWrapper);
    }
  });

  // Add submit button (published only)
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
    });
  }

  // Append form after authored content (keep <p> for editor mode)
  block.appendChild(form);
}
