import ReactPlayer from 'react-player';
import { useState } from 'react';

const videos = [
  {
    title: 'Big Buck Bunny',
    url: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ',
    desc: 'A classic open-source short film by Blender Foundation.',
  },
  {
    title: 'React in 100 Seconds',
    url: 'https://www.youtube.com/watch?v=Tn6-PIqc4UM',
    desc: 'Fireship quick intro to React.',
  },
  {
    title: 'Vite in 100 Seconds',
    url: 'https://www.youtube.com/watch?v=KCrXgy8qtjM',
    desc: 'Fireship quick intro to Vite.',
  },
];

export default function VideoPage() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    // GA4 hook point: gtag('event', 'video_play', { video_title: videos[active].title })
    console.log(`[Analytics] video_play — ${videos[active].title}`);
  };

  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <p className="section-label mb-4">Page 03</p>
      <h1 className="page-title mb-3">Embedded Video</h1>
      <p className="text-stone-500 mb-12 max-w-xl">
        YouTube videos via <code className="font-mono text-xs bg-stone-100 px-1 py-0.5">react-player</code>.
        A <code className="font-mono text-xs bg-stone-100 px-1 py-0.5">video_play</code> event fires on 
        each play — ready for GA4.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Player */}
        <div className="lg:col-span-2">
          <div className="bg-stone-900 aspect-video w-full overflow-hidden">
            <ReactPlayer
              url={videos[active].url}
              width="100%"
              height="100%"
              controls
              playing={playing}
              onPlay={handlePlay}
              onPause={() => setPlaying(false)}
            />
          </div>
          <div className="mt-4">
            <h2 className="font-display text-xl font-semibold text-stone-900">
              {videos[active].title}
            </h2>
            <p className="text-sm text-stone-500 mt-1">{videos[active].desc}</p>
          </div>
        </div>

        {/* Playlist */}
        <div className="space-y-2">
          <p className="section-label mb-4">Playlist</p>
          {videos.map((v, i) => (
            <button
              key={v.url}
              onClick={() => { setActive(i); setPlaying(true); }}
              className={`w-full text-left p-4 border transition-colors duration-150 ${
                active === i
                  ? 'border-stone-900 bg-stone-900 text-white'
                  : 'border-stone-200 bg-white hover:border-stone-400'
              }`}
            >
              <p className={`text-xs font-mono mb-1 ${active === i ? 'text-stone-400' : 'text-stone-400'}`}>
                {String(i + 1).padStart(2, '0')}
              </p>
              <p className={`text-sm font-medium ${active === i ? 'text-white' : 'text-stone-800'}`}>
                {v.title}
              </p>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
