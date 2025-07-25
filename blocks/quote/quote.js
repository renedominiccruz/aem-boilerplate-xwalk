export default function decorate(block) {
    console.log('RAW Block HTML:', block.innerHTML);
  console.log('Children nodes:', block.children);
  const [quoteWrapper] = block.children;

  const blockquote = document.createElement('blockquote');
  blockquote.textContent = quoteWrapper.textContent.trim();
  quoteWrapper.replaceChildren(blockquote);
}
