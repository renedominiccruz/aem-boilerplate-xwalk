export default async function decorate(block) {
  // Get parent path from UE field
  const parentEl = block.querySelector('[data-name="parentPage"]');
  const parentPath = parentEl?.dataset?.value || parentEl?.textContent?.trim();
  if (!parentPath) {
    block.textContent = 'No parent page selected.';
    return;
  }

  try {
    // Fetch index JSON (replace with your index name if not 'pages')
    const res = await fetch('/pages.json', { cache: 'force-cache' });
    if (!res.ok) throw new Error('Index fetch failed');
    const { data = [] } = await res.json();

    const parentDepth = parentPath.split('/').filter(Boolean).length;

    const children = data.filter((row) => {
      const p = row.path;
      if (!p || !p.startsWith(`${parentPath}/`)) return false; // template literal instead of concatenation
      const depth = p.split('/').filter(Boolean).length;
      return depth === parentDepth + 1;
    });

    // Render
    const ul = document.createElement('ul');
    children.forEach((row) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = row.path;
      a.textContent = row.title || row.path.split('/').pop();
      li.appendChild(a);
      ul.appendChild(li);
    });

    block.innerHTML = '';
    block.appendChild(ul);
  } catch (e) {
    block.textContent = 'Error loading child pages.';
  }
}
