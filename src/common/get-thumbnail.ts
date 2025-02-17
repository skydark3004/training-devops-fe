export function extractThumbnail(videoUrl) {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    video.src = videoUrl;
    video.crossOrigin = 'anonymous';

    video.addEventListener('loadeddata', () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      video.currentTime = 1; // Seek to 1 second
    });

    video.addEventListener('seeked', () => {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageUrl = canvas.toDataURL('image/png');
      resolve(imageUrl);
    });

    video.addEventListener('error', (e) => {
      reject(`Error loading video: ${e}`);
    });
  });
}
