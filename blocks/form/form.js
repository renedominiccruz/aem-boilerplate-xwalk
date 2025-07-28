export default function decorate(block) {
   // Prevent duplicate initialization
 if (block.dataset.initialized) return;
  block.dataset.initialized = 'true';

  // Create a <form> wrapper
  const form = document.createElement('form');
  form.classList.add('generated-form');

  // Get rows (each field) - scoped properly
  const rows = block.querySelectorAll(':scope > div > div');

  rows.forEach((row) => {
    const paragraphs = row.querySelectorAll('p');
    if (paragraphs.length >= 2) {
      const fieldType = paragraphs[0].textContent.trim().toLowerCase(); // "text", "email"
      const fieldName = paragraphs[1].textContent.trim().toLowerCase().replace(/\s+/g, '-'); // e.g., firstname

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

  // Attach event listener
  submitButton.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent page reload

    // Collect form data
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    // TODO: send data to API/servlet if needed
    // fetch('/bin/your-servlet', { method: 'POST', body: JSON.stringify(data) });
  });

  // Replace block content with form
  block.innerHTML = '';
  block.appendChild(form);
}
