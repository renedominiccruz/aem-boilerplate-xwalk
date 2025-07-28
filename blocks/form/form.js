export default function decorate(block) {
  // Prevent duplicate initialization
  if (block.dataset.initialized) return;
  block.dataset.initialized = 'true';

  // Create a <form> wrapper
  const form = document.createElement('form');
  form.classList.add('generated-form');

  // Get rows (each field)
  const rows = block.querySelectorAll(':scope div > div');

  rows.forEach((row) => {
    const paragraphs = row.querySelectorAll('p');
    if (paragraphs.length >= 2) {
      const fieldType = paragraphs[0].textContent.trim().toLowerCase(); // e.g., 'text', 'email'
      const fieldName = paragraphs[1].textContent.trim().toLowerCase().replace(/\s+/g, '-'); // e.g., 'firstname'

      // Field wrapper
      const fieldWrapper = document.createElement('div');
      fieldWrapper.classList.add('form-field');

      // Label
      const label = document.createElement('label');
      label.setAttribute('for', fieldName);
      label.textContent = fieldName.charAt(0).toUpperCase() + fieldName.slice(1);

      // Input
      const input = document.createElement('input');
      input.type = fieldType; // "text" or "email"
      input.name = fieldName;
      input.id = fieldName;

      // Append
      fieldWrapper.appendChild(label);
      fieldWrapper.appendChild(input);
      form.appendChild(fieldWrapper);
    }
  });

  // Replace block content with the form
  block.innerHTML = '';
  block.appendChild(form);
}
