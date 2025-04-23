const API_KEY = 'AIzaSyBE3JOaMAIWFk82vAQ8F5oz5NKhVcHfd5g'; // Replace with your actual API key
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const results = document.getElementById('results');
const player = document.getElementById('player');
const playerSection = document.getElementById('playerSection');

searchBtn.addEventListener('click', searchYouTube);

async function searchYouTube() {
  const query = searchInput.value.trim();
  if (!query) return;

  results.innerHTML = '<p class="text-gray-400">Searching...</p>';

  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=10&q=${encodeURIComponent(query)}&key=${API_KEY}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!data.items.length) {
      results.innerHTML = '<p class="text-gray-400">No results found.</p>';
      return;
    }

    displayResults(data.items);
  } catch (err) {
    results.innerHTML = '<p class="text-red-400">Failed to fetch results. Check your API key or internet connection.</p>';
  }
}

function displayResults(videos) {
  results.innerHTML = '';
  videos.forEach(video => {
    const vidId = video.id.videoId;
    const title = video.snippet.title;
    const thumb = video.snippet.thumbnails.medium.url;

    const videoCard = document.createElement('div');
    videoCard.className = 'flex items-center space-x-4 bg-gray-800 p-4 rounded-lg hover:bg-gray-700 cursor-pointer';
    videoCard.innerHTML = `
      <img src="${thumb}" alt="${title}" class="w-24 rounded-md">
      <div>
        <h3 class="font-semibold">${title}</h3>
        <button class="mt-1 text-pink-400 underline">Play</button>
      </div>
    `;
    videoCard.querySelector('button').addEventListener('click', () => playVideo(vidId));
    results.appendChild(videoCard);
  });
}

function playVideo(videoId) {
  player.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  playerSection.classList.remove('hidden');
}
