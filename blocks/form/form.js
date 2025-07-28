export default function decorate(block) {
  // Prevent rendering on Universal Editor edit mode
  if (document.body.classList.contains('editor-app')) return;
  // Prevent duplicate initialization
  if (block.dataset.initialized) return;
  block.dataset.initialized = 'true';

  const form = document.createElement('form');
  form.classList.add('generated-form');

  const rows = block.querySelectorAll(':scope > div > div');

  rows.forEach((row) => {
    const paragraphs = row.querySelectorAll('p');
    if (paragraphs.length >= 2) {
      const fieldType = paragraphs[0].textContent.trim().toLowerCase();
      const fieldName = paragraphs[1].textContent.trim().toLowerCase().replace(/\s+/g, '-');

      const fieldWrapper = document.createElement('div');
      fieldWrapper.classList.add('form-field');

      const label = document.createElement('label');
      label.setAttribute('for', fieldName);
      label.textContent = fieldName.charAt(0).toUpperCase() + fieldName.slice(1);

      const input = document.createElement('input');
      input.type = fieldType;
      input.name = fieldName;
      input.id = fieldName;
      input.placeholder = `Enter ${fieldName}`;

      input.setAttribute('data-aue-prop', fieldName);
      input.setAttribute('data-aue-type', fieldType);

      fieldWrapper.appendChild(label);
      fieldWrapper.appendChild(input);
      form.appendChild(fieldWrapper);
    }
  });

  const submitWrapper = document.createElement('div');
  submitWrapper.classList.add('form-actions');

  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Submit';

  submitWrapper.appendChild(submitButton);
  form.appendChild(submitWrapper);

  block.innerHTML = '';
  block.appendChild(form);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
  });
}
