const links = [
  {
    label: 'Visit Google',
    url: 'https://www.google.com',
    category: 'Search Engine',
    desc: 'Navigate to Google homepage.',
  },
  {
    label: 'Visit GitHub',
    url: 'https://www.github.com',
    category: 'Developer',
    desc: 'Open GitHub in a new tab.',
  },
  {
    label: 'Visit MDN Web Docs',
    url: 'https://developer.mozilla.org',
    category: 'Documentation',
    desc: 'Go to Mozilla Developer Network.',
  },
  {
    label: 'Visit Vite Docs',
    url: 'https://vitejs.dev',
    category: 'Documentation',
    desc: 'Official Vite documentation.',
  },
  {
    label: 'Visit Tailwind CSS',
    url: 'https://tailwindcss.com',
    category: 'Styling',
    desc: 'Tailwind CSS official site.',
  },
  {
    label: 'Visit React Docs',
    url: 'https://react.dev',
    category: 'Framework',
    desc: 'Official React documentation.',
  },
];

export default function Outbound() {
  const handleClick = (url, label) => {
    // GA4 hook point: gtag('event', 'outbound_click', { link_url: url, link_text: label })
    console.log(`[Analytics] outbound_click — ${label} → ${url}`);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <p className="section-label mb-4">Page 01</p>
      <h1 className="page-title mb-3">Outbound Links</h1>
      <p className="text-stone-500 mb-12 max-w-xl">
        Each button opens an external URL. The handler logs to the console — 
        swap the <code className="font-mono text-xs bg-stone-100 px-1 py-0.5">console.log</code> for 
        a <code className="font-mono text-xs bg-stone-100 px-1 py-0.5">gtag</code> call when ready.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {links.map(({ label, url, category, desc }) => (
          <div
            key={url}
            className="border border-stone-200 p-6 bg-white hover:border-stone-400 transition-colors duration-150 group"
          >
            <p className="section-label mb-3">{category}</p>
            <p className="text-sm text-stone-600 mb-5 leading-relaxed">{desc}</p>
            <button
              onClick={() => handleClick(url, label)}
              className="btn-primary text-xs px-4 py-2 w-full justify-center"
            >
              {label}
              <span className="text-stone-400">↗</span>
            </button>
          </div>
        ))}
      </div>

      {/* Console hint */}
      <div className="mt-12 p-5 bg-stone-900 text-stone-300 font-mono text-xs leading-relaxed">
        <p className="text-stone-500 mb-2">// Open DevTools Console to see click events</p>
        <p><span className="text-blue-400">gtag</span>(<span className="text-green-400">'event'</span>, <span className="text-green-400">'outbound_click'</span>, {'{'}</p>
        <p className="pl-4"><span className="text-yellow-400">link_url</span>: <span className="text-green-400">'https://...'</span>,</p>
        <p className="pl-4"><span className="text-yellow-400">link_text</span>: <span className="text-green-400">'Visit Google'</span></p>
        <p>{'}'});</p>
      </div>
    </main>
  );
}
