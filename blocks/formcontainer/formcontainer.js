export default function decorate(block) {
   const rows = block.querySelectorAll('div > div');

  rows.forEach((row) => {
    const paragraphs = row.querySelectorAll('p');

    if (paragraphs.length >= 2) {
      // Convert first <p> into a <label>
      const labelText = paragraphs[0].textContent.trim();
      const label = document.createElement('label');
      label.textContent = labelText;

      // Convert second <p> into an <input>
      const fieldName = paragraphs[1].textContent.trim().toLowerCase().replace(/\s+/g, '-');
      const input = document.createElement('input');
      input.type = 'text';
      input.name = fieldName;
      input.placeholder = `Enter ${paragraphs[1].textContent.trim()}`;

      // Bind to Universal Editor
      input.setAttribute('data-aue-prop', fieldName);
      input.setAttribute('data-aue-type', 'text');

      // Replace the first and second paragraphs
      paragraphs[0].replaceWith(label);
      paragraphs[1].replaceWith(input);
    }
  });
}
