export default function decorate(block) {
  // Prevent duplicate initialization
  if (block.dataset.initialized) return;
  block.dataset.initialized = 'true';

  // Detect editor mode
  const isEditor = Boolean(document.documentElement.classList.contains('adobe-ue-edit'));

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
  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Submit';
  submitButton.classList.add('form-submit-btn');
  form.appendChild(submitButton);
  const statusMessage = document.createElement('div');
  statusMessage.classList.add('form-status');
  form.appendChild(statusMessage);
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (isEditor) {
      return;
    }
   
    const actionUrl = ' https://publish-p28003-e1277044.adobeaemcloud.com/bin/edgeMailchimp';
    try {
      
      const response = await fetch(actionUrl, {
        method: 'GET',
      });

      if (response.ok) {
        statusMessage.textContent = 'Thank you! You are subscribed.';
        statusMessage.classList.add('success');
        form.reset();
      } else {
        const error = await response.json();
        statusMessage.textContent = `Error: ${error.detail}`;
        statusMessage.classList.add('error');
      }
    } catch (err) {
      statusMessage.textContent = 'Network error. Please try again later.';
      statusMessage.classList.add('error');
    }
  });

  // Append final form at end of block
  block.appendChild(form);
}
