export default function decorate(block) {
    // Create the form element
  const form = document.createElement('form');
  form.classList.add('formcontainer-form');

  const rows = block.querySelectorAll('div > div');

  rows.forEach((row) => {
    const paragraphs = row.querySelectorAll('p');

    if (paragraphs.length >= 2) {
      // Create a wrapper for each field (label + input)
      const fieldWrapper = document.createElement('div');
      fieldWrapper.classList.add('form-field');

      // Convert first <p> into a label
      const labelText = paragraphs[0].textContent.trim();
      const label = document.createElement('label');
      label.textContent = labelText;

      // Convert second <p> into an input
      const fieldName = paragraphs[1].textContent.trim().toLowerCase().replace(/\s+/g, '-');
      const input = document.createElement('input');
      input.type = 'text';
      input.name = fieldName;
      input.placeholder = `Enter ${paragraphs[1].textContent.trim()}`;

      // Link label to input for accessibility
      input.id = fieldName;
      label.setAttribute('for', fieldName);

      // Bind to Universal Editor
      input.setAttribute('data-aue-prop', fieldName);
      input.setAttribute('data-aue-type', 'text');

      // Replace old <p> tags and append to field wrapper
      paragraphs[0].remove();
      paragraphs[1].remove();
      fieldWrapper.appendChild(label);
      fieldWrapper.appendChild(input);

      // Add this field wrapper to the form
      form.appendChild(fieldWrapper);
    }
  });

  // Create and append the submit button
  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.textContent = 'Submit';
  submitBtn.classList.add('form-submit');
  form.appendChild(submitBtn);

  // Clear the block and insert the form
  block.innerHTML = '';
  block.appendChild(form);

  // Optional: handle form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    console.log('Form submitted with:', Object.fromEntries(formData.entries()));
    // Here you can send data to your API (e.g., AEM endpoint or external service)
  });
}
