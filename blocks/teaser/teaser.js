export default function decorate(block) {
  const [headline, subhead, image, link] = block.children;

  if (headline) headline.classList.add('teaser-headline');
  if (subhead) subhead.classList.add('teaser-subhead');
  if (image) image.classList.add('teaser-image');
  if (link) link.classList.add('teaser-link');
}
