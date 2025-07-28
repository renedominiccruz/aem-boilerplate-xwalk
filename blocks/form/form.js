import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Prevent duplicate initialization
  if (block.dataset.initialized) return;
  block.dataset.initialized = 'true';

  // Create a form wrapper
  const form = document.createElement('form');
  form.classList.add('generated-form');

  // Get rows (each field)
  const rows = block.querySelectorAll(':scope > div > div');

  rows.forEach((row) => {
    const paragraphs = row.querySelectorAll('p');

    if (paragraphs.length >= 2) {
      const fieldType = paragraphs[0].textContent.trim().toLowerCase(); // "text", "email"
      const fieldName = paragraphs[1].textContent.trim().toLowerCase().replace(/\s+/g, '-'); // "firstname"

      // Create wrapper
      const fieldWrapper = document.createElement('div');
      fieldWrapper.classList.add('form-field');

      // Create label
      const label = document.createElement('label');
      label.setAttribute('for', fieldName);
      label.textContent = fieldName.charAt(0).toUpperCase() + fieldName.slice(1);

      // Preserve editor tracking on label
      moveInstrumentation(paragraphs[1], label);

      // Create input
      const input = document.createElement('input');
      input.type = fieldType;
      input.name = fieldName;
      input.id = fieldName;

      // Preserve editor tracking on input (optional if editor maps only labels)
      moveInstrumentation(paragraphs[0], input);

      // Append to wrapper
      fieldWrapper.appendChild(label);
      fieldWrapper.appendChild(input);
      form.appendChild(fieldWrapper);
    }
  });

  // Submit button
  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Submit';
  submitButton.classList.add('form-submit-btn');
  form.appendChild(submitButton);

  // Replace block content
  block.textContent = '';
  block.appendChild(form);
}
