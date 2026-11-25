'use client';

import { useState } from 'react';

/** Shows the thumbnail first and only loads the YouTube player after a click. */
export default function YouTubeFacade({ id, title }: { id: string; title: string }) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}?playsinline=1&rel=0&autoplay=1`}
        title={title}
        referrerPolicy="strict-origin-when-cross-origin"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      className="yt-facade"
      style={{ backgroundImage: `url(https://i.ytimg.com/vi/${id}/hqdefault.jpg)` }}
      onClick={() => setPlaying(true)}
      aria-label={`Play video: ${title}`}
    >
      <span className="yt-play" aria-hidden="true" />
    </button>
  );
}
