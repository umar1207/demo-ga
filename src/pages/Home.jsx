import { Link } from 'react-router-dom';

const features = [
  {
    to: '/outbound',
    icon: '↗',
    label: 'Outbound Links',
    desc: 'Buttons that open external URLs — ready for click tracking.',
  },
  {
    to: '/form',
    icon: '✦',
    label: 'Contact Form',
    desc: 'A validated form built with React Hook Form.',
  },
  {
    to: '/video',
    icon: '▶',
    label: 'Embedded Video',
    desc: 'YouTube video via react-player with full controls.',
  },
  {
    to: '/download',
    icon: '↓',
    label: 'File Download',
    desc: 'A sample PDF ready for download tracking.',
  },
];

export default function Home() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-20">
      {/* Hero */}
      <div className="mb-20 max-w-2xl">
        <p className="section-label mb-4">Analytics Demo</p>
        <h1 className="page-title mb-6">
          A clean site to test<br />your tracking setup.
        </h1>
        <p className="text-stone-500 text-lg leading-relaxed mb-8">
          Each page demonstrates a common interaction — outbound clicks, form submissions, 
          video plays, and file downloads. Instrument them however you like.
        </p>
        <Link to="/outbound" className="btn-primary">
          Explore pages
          <span className="text-stone-400">→</span>
        </Link>
      </div>

      {/* Feature grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-stone-200 border border-stone-200">
        {features.map(({ to, icon, label, desc }) => (
          <Link
            key={to}
            to={to}
            className="bg-stone-50 p-8 group hover:bg-white transition-colors duration-150"
          >
            <span className="font-mono text-2xl text-stone-300 group-hover:text-stone-900 transition-colors duration-200 block mb-4">
              {icon}
            </span>
            <h2 className="font-display text-xl font-semibold text-stone-900 mb-2">{label}</h2>
            <p className="text-sm text-stone-500 leading-relaxed">{desc}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
