export default function decorate(block) {
  const [image, headline, subhead, link] = block.children;
  if (image) image.classList.add('teaser-image');
  if (headline) headline.classList.add('teaser-headline');
  if (subhead) subhead.classList.add('teaser-subhead');
  if (link) link.classList.add('teaser-link');
}
