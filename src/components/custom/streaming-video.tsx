'use client';

import React, { useEffect, useRef } from 'react';
import 'plyr/dist/plyr.css';

interface IProps {
  src: string;
  className?: string;
  width?: any;
  height?: any;
}

export const StreamingVideo = ({ src, className, width, height }: IProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const isHlsUrl = (url: string): boolean => {
    return url.endsWith('.m3u8');
  };

  useEffect(() => {
    if (typeof window === 'undefined' || !videoRef.current) return;

    const loadPlayer = async () => {
      const PlyrModule = await import('plyr');
      const Plyr = PlyrModule.default;

      if (isHlsUrl(src)) {
        // Xử lý HLS
        const HlsModule = await import('hls.js');
        const Hls = HlsModule.default;

        if (Hls.isSupported()) {
          const hls = new Hls();
          hls.loadSource(src);
          hls.attachMedia(videoRef.current!);

          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            new Plyr(videoRef.current!, {
              controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'settings', 'fullscreen'],
            });
          });
        }
      } else {
        // Xử lý video thông thường với Plyr
        const video = videoRef.current!;
        video.src = src; // Gán trực tiếp URL video vào `src`
        new Plyr(video, {
          controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'settings', 'fullscreen'],
        });
      }
    };

    loadPlayer();

    // Cleanup
    return () => {
      if (videoRef.current) {
        videoRef.current.src = '';
      }
    };
  }, [src]);

  return (
    <div className={className} style={{ width: '100%', height: '100%' }}>
      <video ref={videoRef} className='plyr__video-embed' controls style={{ width: width || '100%', height: height }}></video>
    </div>
  );
};
