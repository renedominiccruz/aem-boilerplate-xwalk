// blocks/children-list/children-list.js
export default async function decorate(block) {
  // --- helpers ---
  const getRow = () => (
    block.children.length === 1 && block.firstElementChild?.children?.length
      ? block.firstElementChild
      : block
  );

  const resolveParentPath = () => {
    // 1) Prefer a data attribute on the block (UE can set this via template mapping)
    if (block.dataset.parentPage) return block.dataset.parentPage;

    // 2) If your model uses `aem-content`, UE often renders it as an <a href="/path">
    const row = getRow();
    const link = row.querySelector('a[href^="/"]');
    if (link) {
      try {
        return new URL(link.getAttribute('href'), window.location.origin).pathname;
      } catch (_e) {
        /* swallow */
      }
    }

    // 3) Fallback: take text from first cell if it looks like a path
    const firstCell = getRow().children[0];
    const txt = firstCell?.textContent?.trim();
    if (txt && txt.startsWith('/')) return txt;

    return null;
  };

  const parentRaw = resolveParentPath();
  if (!parentRaw) {
    block.textContent = 'No parent page selected.';
    return;
  }

  // Normalize: remove trailing slash except for root
  const parentPath = parentRaw === '/' ? '/' : parentRaw.replace(/\/+$/, '');

  try {
    // Update this to '/pages.json' if you rename your index
    const res = await fetch('/query-index.json', { cache: 'force-cache' });
    if (!res.ok) throw new Error('Index fetch failed');

    const payload = await res.json();
    const data = Array.isArray(payload?.data) ? payload.data : [];

    // Immediate children filter by path depth
    const parentDepth = parentPath.split('/').filter(Boolean).length;
    const children = data.filter((row) => {
      const p = row.path;
      if (!p) return false;

      // must be under parent
      const underParent = parentPath === '/'
        ? p.startsWith('/') && p !== '/'
        : p.startsWith(`${parentPath}/`);

      if (!underParent) return false;

      // depth must be exactly one deeper
      const depth = p.split('/').filter(Boolean).length;
      return depth === parentDepth + 1;
    });

    // Render simple list
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
  } catch (_e) {
    block.textContent = 'Error loading child pages.';
  }
}
