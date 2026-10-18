const tracks = [
  { title: "Eine kleine Nachtmusik: I. Allegro", artist: "Mozart", src: "https://commons.wikimedia.org/wiki/Special:FilePath/Mozart_-_Eine_kleine_Nachtmusik_-_1._Allegro.ogg" },
  { title: "Symphony No. 40: II. Andante", artist: "Mozart", src: "https://commons.wikimedia.org/wiki/Special:FilePath/Wolfgang_Amadeus_Mozart_-_Symphony_40_g-moll_-_2._Andante.ogg" },
  { title: "Clarinet Concerto: II. Adagio", artist: "Mozart", src: "https://commons.wikimedia.org/wiki/Special:FilePath/Wolfgang_Amadeus_Mozart_-_Clarinet_Concerto_-_2._Adagio.ogg" },
  { title: "Arrival of the Queen of Sheba", artist: "Handel", src: "https://commons.wikimedia.org/wiki/Special:FilePath/Handel_-_Arrival_of_the_Queen_of_Sheba.ogg" },
  { title: "Violin Concerto in E major: II. Adagio", artist: "Bach", src: "https://commons.wikimedia.org/wiki/Special:FilePath/Bach_Emaj_Violin_Concerto_-_2._Adagio_sempre_Piano.ogg" }
];

const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const seek = document.getElementById("seek");
const volume = document.getElementById("volume");
const playlist = document.getElementById("playlist");
const currentTimeEl = document.getElementById("currentTime");
const totalTimeEl = document.getElementById("totalTime");

let trackIndex = 0;

function formatTime(seconds) {
  if (isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${String(secs).padStart(2, "0")}`;
}

function loadTrack(index) {
  const track = tracks[index];
  trackIndex = index;
  audio.src = track.src;
  document.getElementById("trackTitle").textContent = track.title;
  document.getElementById("trackArtist").textContent = track.artist;
  document.getElementById("coverLetter").textContent = track.artist.charAt(0);
  seek.value = 0;
  currentTimeEl.textContent = "0:00";
  [...playlist.children].forEach((item, i) => item.classList.toggle("active", i === index));
}

function play() {
  // browsers can reject play() (e.g. autoplay policy), so catch it
  audio.play().catch(err => console.warn("Playback blocked:", err.message));
}

function togglePlay() {
  if (audio.paused) play();
  else audio.pause();
}

function changeTrack(direction) {
  loadTrack((trackIndex + direction + tracks.length) % tracks.length);
  play();
}

function buildPlaylist() {
  tracks.forEach((track, i) => {
    const item = document.createElement("li");
    item.textContent = `${track.artist}: ${track.title}`;
    item.addEventListener("click", () => {
      loadTrack(i);
      play();
    });
    playlist.appendChild(item);
  });
}

playBtn.addEventListener("click", togglePlay);
document.getElementById("nextBtn").addEventListener("click", () => changeTrack(1));
document.getElementById("prevBtn").addEventListener("click", () => changeTrack(-1));

audio.addEventListener("play", () => { playBtn.innerHTML = "&#10074;&#10074;"; playBtn.setAttribute("aria-label", "Pause"); });
audio.addEventListener("pause", () => { playBtn.innerHTML = "&#9654;"; playBtn.setAttribute("aria-label", "Play"); });
audio.addEventListener("ended", () => changeTrack(1));

audio.addEventListener("loadedmetadata", () => {
  totalTimeEl.textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", () => {
  if (audio.duration) seek.value = (audio.currentTime / audio.duration) * 100;
  currentTimeEl.textContent = formatTime(audio.currentTime);
});

seek.addEventListener("input", () => {
  if (audio.duration) audio.currentTime = (seek.value / 100) * audio.duration;
});

volume.addEventListener("input", () => { audio.volume = volume.value; });

audio.volume = volume.value;
buildPlaylist();
loadTrack(0);
