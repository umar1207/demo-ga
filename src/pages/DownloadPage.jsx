const files = [
  {
    name: 'sample-report.pdf',
    label: 'Sample Report',
    size: '~45 KB',
    type: 'PDF',
    desc: 'A placeholder PDF document for testing download tracking.',
    href: '/sample-report.pdf',
  },
  {
    name: 'sample-data.csv',
    label: 'Sample Dataset',
    size: '~2 KB',
    type: 'CSV',
    desc: 'A small CSV file with dummy analytics data.',
    href: '/sample-data.csv',
  },
  {
    name: 'readme.txt',
    label: 'Read Me',
    size: '~1 KB',
    type: 'TXT',
    desc: 'A plain text readme file.',
    href: '/readme.txt',
  },
];

const typeColors = {
  PDF: 'bg-red-50 text-red-600 border-red-200',
  CSV: 'bg-green-50 text-green-600 border-green-200',
  TXT: 'bg-blue-50 text-blue-600 border-blue-200',
};

export default function DownloadPage() {
  const handleDownload = (file) => {
    // GA4 hook point: gtag('event', 'file_download', { file_name: file.name, file_type: file.type })
    console.log(`[Analytics] file_download — ${file.name}`);
  };

  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <p className="section-label mb-4">Page 04</p>
      <h1 className="page-title mb-3">File Downloads</h1>
      <p className="text-stone-500 mb-12 max-w-xl">
        Each download fires a{' '}
        <code className="font-mono text-xs bg-stone-100 px-1 py-0.5">file_download</code> event to 
        the console. Swap for a GA4 call to track in your dashboard.
      </p>

      <div className="space-y-4 max-w-2xl">
        {files.map((file) => (
          <div
            key={file.name}
            className="flex items-center justify-between border border-stone-200 p-6 bg-white hover:border-stone-300 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className={`text-xs font-mono font-semibold px-2 py-1 border ${typeColors[file.type]}`}>
                {file.type}
              </div>
              <div>
                <p className="text-sm font-medium text-stone-900">{file.label}</p>
                <p className="text-xs text-stone-400 mt-0.5">{file.name} · {file.size}</p>
              </div>
            </div>
            <a
              href={file.href}
              download={file.name}
              onClick={() => handleDownload(file)}
              className="btn-outline text-xs px-4 py-2 shrink-0 ml-4"
            >
              Download ↓
            </a>
          </div>
        ))}
      </div>

      {/* Note about files */}
      <div className="mt-10 p-5 bg-stone-100 border border-stone-200 max-w-2xl">
        <p className="text-xs text-stone-500 leading-relaxed font-mono">
          <span className="text-stone-700 font-semibold">Note:</span> Sample files are served from 
          the <code>/public</code> folder. Replace them with real assets as needed.
        </p>
      </div>
    </main>
  );
}
