export function extractEmbedUrl(youtubeUrl: string) {
  // Regular expression to match YouTube video URLs (including live, watch, and shortened formats)
  const youtubeRegex =
    /(?:https?:\/\/(?:www\.)?youtube\.com\/(?:v\/|e(?:mbed)?\/|(?:live|watch)\?v=|[^/]+\/\S+\/?)([a-zA-Z0-9_-]{11}))|(?:https?:\/\/(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]{11}))/;

  const match = youtubeUrl?.match(youtubeRegex);

  if (match) {
    // Extract video ID from the matched groups (match[1] for the standard/live URLs, match[2] for shortened URLs)
    const videoId = match[1] || match[2];
    // Return the embed URL using the video ID
    return `https://www.youtube.com/embed/${videoId}`;
  }

  // If the URL doesn't match YouTube format, return null
  return null;
}
