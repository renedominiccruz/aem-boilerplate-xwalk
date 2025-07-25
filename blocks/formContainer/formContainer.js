export default function decorate(block) {
    console.log('RAW Block HTML:', block.innerHTML);
  console.log('Children nodes:', block.children);
  const paragraphs = block.querySelectorAll('p');

  if (paragraphs.length > 0) {
    // Remove the first <p> (the one with 'text')
    paragraphs[0].remove();
  }

  if (paragraphs.length > 1) {
    // Convert the second <p> into input
    const addressP = paragraphs[1] || block.querySelector('p');

    const input = document.createElement('input');
    input.type = 'text';
    input.name = 'address';
    input.placeholder = 'Enter address';

    // Add Universal Editor binding (if needed)
    input.setAttribute('data-aue-prop', 'address');
    input.setAttribute('data-aue-type', 'text');

    addressP.replaceWith(input);
  }
}
