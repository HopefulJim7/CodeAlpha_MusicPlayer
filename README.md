# Pulse: Music Player

A browser-based classical music player with a playlist, progress bar and volume control. Built for the **CodeAlpha Frontend Development Internship (Task 4)**.

## Features
- Play, pause, next and previous controls
- Song title, artist and duration display
- Progress bar that updates during playback and can be dragged to seek
- Volume slider
- Clickable playlist with the current track highlighted
- Autoplay: the next track starts when one finishes
- Responsive layout that works on phones

## Built with
HTML5, CSS3, vanilla JavaScript (ES6) and the HTML5 `<audio>` element

## Project structure
```
CodeAlpha_MusicPlayer/
├── index.html
├── css/style.css
├── js/player.js
├── songs/
└── README.md
```

## Getting started
1. Clone the repository.
2. Open `index.html` in a browser. No build step or dependencies.

The playlist streams public recordings from Wikimedia Commons (Ogg Vorbis files). These play in Chrome, Edge and Firefox; Safari may not support Ogg, so for full compatibility convert tracks to MP3, put them in `songs/` and update the `tracks` array in `js/player.js`, for example `src: "songs/my-song.mp3"`.

## What I learned
- Controlling media with the `HTMLAudioElement` API and its events (`timeupdate`, `loadedmetadata`, `ended`)
- Keeping the interface in sync with the audio element instead of tracking play state separately
- Two-way binding between a range input and `currentTime`
- Handling the promise returned by `play()` when browsers block autoplay

## Possible improvements
- Shuffle and repeat modes
- Keyboard shortcuts (space to play or pause)
- Saving the last played track and volume in `localStorage`

## Audio credits
Recordings are hosted on Wikimedia Commons. Check each file page for its exact licence and attribution before reusing.

| Piece | Performers |
|---|---|
| Mozart, Eine kleine Nachtmusik: I. Allegro | Advent Chamber Orchestra |
| Mozart, Symphony No. 40: II. Andante | Fulda Symphonic Orchestra |
| Mozart, Clarinet Concerto: II. Adagio | William McColl, University of Washington Symphony Orchestra |
| Handel, Arrival of the Queen of Sheba | Advent Chamber Orchestra |
| Bach, Violin Concerto in E major: II. Adagio | Advent Chamber Orchestra, Jacques Israelievitch (violin) |

## Author
**Jim Hope** · [GitHub](https://github.com/HopefulJim7) · [LinkedIn](https://linkedin.com/in/jim-hope-474430303)
