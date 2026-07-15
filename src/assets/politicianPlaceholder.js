// Fallback portrait for people with no photo_url.
//
// Replaces src/politician001.png, which was deleted in a1991a6 ("filtered out
// unwanted files and datas") while components still imported it -- that broke
// `npm run build`. A data URI keeps the build self-contained with no binary.
//
// Neutral silhouette on a transparent background, so the alliance-coloured ring
// behind it shows through the way a real cut-out portrait does.
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" width="96" height="96">
  <g fill="#FFFFFF" fill-opacity="0.82">
    <circle cx="48" cy="34" r="17"/>
    <path d="M48 57c-16.6 0-30 10.7-30 24v15h60V81c0-13.3-13.4-24-30-24z"/>
  </g>
</svg>`;

const politicianPlaceholder = `data:image/svg+xml,${encodeURIComponent(svg)}`;

export default politicianPlaceholder;
