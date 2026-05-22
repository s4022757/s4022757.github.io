// ==============================================================================
//  1. PLAYLIST & ASSET DEFINITIONS
// ==============================================================================
// A structured JSON collection of tracks representing DJ Mix tracks.
// Fully populated with Public Domain or Creative Commons Universal licensed audio sourced from Internet Archive.
// MP3 and OGG files hosted inside the repo in assets folder. This guarantees cross origin blocks and stable playback.
const tracks = [
  {
    id: 1,
    title: "Bathed in Rays of Light",
    artist: "Adhesion & Scrap Heap",
    album: "The Life You Left Behind",
    cover:
      "assets/MusicByAlbum/Adhesion&ScrapHead-TheLifeYouLeftBehind/cover.jpg",
    src: "assets/MusicByAlbum/Adhesion&ScrapHead-TheLifeYouLeftBehind/07.BathedinRaysofLight.ogg",
    duration: "02:24",
  },
  {
    id: 2,
    title: "Piece of Mind",
    artist: "Adhesion & Scrap Heap",
    album: "The Life You Left Behind",
    cover:
      "assets/MusicByAlbum/Adhesion&ScrapHead-TheLifeYouLeftBehind/cover.jpg",
    src: "assets/MusicByAlbum/Adhesion&ScrapHead-TheLifeYouLeftBehind/11.PieceofMind.ogg",
    duration: "01:27",
  },
  {
    id: 3,
    title: "Palpit Ferecence",
    artist: "Druhb",
    album: "Doctor Mabuse",
    cover: "assets/MusicByAlbum/Druhb-DoctorMabuse/cover.jpg",
    src: "assets/MusicByAlbum/Druhb-DoctorMabuse/06_palpitferecence_64kb.mp3",
    duration: "03:50",
  },
  {
    id: 4,
    title: "Kilidid",
    artist: "Druhb",
    album: "Doctor Mabuse",
    cover: "assets/MusicByAlbum/Druhb-DoctorMabuse/cover.jpg",
    src: "assets/MusicByAlbum/Druhb-DoctorMabuse/09_kilidid_64kb.mp3",
    duration: "06:12",
  },
  {
    id: 5,
    title: "Tension",
    artist: "Druhb",
    album: "Doctor Mabuse",
    cover: "assets/MusicByAlbum/Druhb-DoctorMabuse/cover.jpg",
    src: "assets/MusicByAlbum/Druhb-DoctorMabuse/10_tension_64kb.mp3",
    duration: "04:15",
  },
  {
    id: 6,
    title: "Abracadabra (Minst Remix)",
    artist: "Genetic Trance",
    album: "Remixes",
    cover: "assets/MusicByAlbum/GeneticTrance-Remixes/cover.jpg",
    src: "assets/MusicByAlbum/GeneticTrance-Remixes/02.AbracadabrainstRemix.ogg",
    duration: "04:41",
  },
  {
    id: 7,
    title: "Akasha (mwc Mix)",
    artist: "Genetic Trance",
    album: "Remixes",
    cover: "assets/MusicByAlbum/GeneticTrance-Remixes/cover.jpg",
    src: "assets/MusicByAlbum/GeneticTrance-Remixes/07.AkashamwcMix.ogg",
    duration: "04:34",
  },
  {
    id: 8,
    title: "Aeroport (Etude) [Flash Royal Mix]",
    artist: "Genetic Trance",
    album: "Remixes",
    cover: "assets/MusicByAlbum/GeneticTrance-Remixes/cover.jpg",
    src: "assets/MusicByAlbum/GeneticTrance-Remixes/16.AeroportetudeflashroyalMix.ogg",
    duration: "02:32",
  },
  {
    id: 9,
    title: "Delphis (mhz_ Downtempo Noob Mix)",
    artist: "Genetic Trance",
    album: "Remixes",
    cover: "assets/MusicByAlbum/GeneticTrance-Remixes/cover.jpg",
    src: "assets/MusicByAlbum/GeneticTrance-Remixes/21.Delphismhz_DowntempoNoobMix.ogg",
    duration: "01:19",
  },
  {
    id: 10,
    title: "Indigo Kluge (In Di.stant Go.re Edition)",
    artist: "Genetic Trance",
    album: "Remixes",
    cover: "assets/MusicByAlbum/GeneticTrance-Remixes/cover.jpg",
    src: "assets/MusicByAlbum/GeneticTrance-Remixes/24.IndigoklugeInDi.stantGo.reEdition.ogg",
    duration: "04:02",
  },
  {
    id: 11,
    title: "Rainteardrops (Part 2)",
    artist: "Noisesurfer",
    album: "Rain Tear Drops",
    cover: "assets/MusicByAlbum/Noisesurfer-RainTearDrops/cover.jpg",
    src: "assets/MusicByAlbum/Noisesurfer-RainTearDrops/03-Noisesurfer-RainteardropsPart2.ogg",
    duration: "06:00",
  },
  {
    id: 12,
    title: "Chemical Planet",
    artist: "Noisesurfer",
    album: "Rain Tear Drops",
    cover: "assets/MusicByAlbum/Noisesurfer-RainTearDrops/cover.jpg",
    src: "assets/MusicByAlbum/Noisesurfer-RainTearDrops/08-Noisesurfer-ChemicalPlanet.ogg",
    duration: "06:43",
  },
  {
    id: 13,
    title: "train wreck",
    artist: "null set",
    album: "millipede",
    cover: "assets/MusicByAlbum/NullSet-Millipede/cover.png",
    src: "assets/MusicByAlbum/NullSet-Millipede/01-train_wreck.ogg",
    duration: "02:48",
  },
  {
    id: 14,
    title: "sprawling metropolis",
    artist: "null set",
    album: "millipede",
    cover: "assets/MusicByAlbum/NullSet-Millipede/cover.png",
    src: "assets/MusicByAlbum/NullSet-Millipede/04-sprawling_metropolis.ogg",
    duration: "03:06",
  },
  {
    id: 15,
    title: "wire commander",
    artist: "null set",
    album: "millipede",
    cover: "assets/MusicByAlbum/NullSet-Millipede/cover.png",
    src: "assets/MusicByAlbum/NullSet-Millipede/05-wire_commander.ogg",
    duration: "02:32",
  },
  {
    id: 16,
    title: "vector algebra",
    artist: "null set",
    album: "millipede",
    cover: "assets/MusicByAlbum/NullSet-Millipede/cover.png",
    src: "assets/MusicByAlbum/NullSet-Millipede/08-vector_algebra.ogg",
    duration: "02:09",
  },
  {
    id: 17,
    title: "jaw rectify",
    artist: "null set",
    album: "millipede",
    cover: "assets/MusicByAlbum/NullSet-Millipede/cover.png",
    src: "assets/MusicByAlbum/NullSet-Millipede/11-jaw_rectify.ogg",
    duration: "03:35",
  },
  {
    id: 18,
    title: "The Chill of Transparency",
    artist: "OneMan's Hat",
    album: "Praise",
    cover: "assets/MusicByAlbum/OneMan'sHat-Praise/cover.jpg",
    src: "assets/MusicByAlbum/OneMan'sHat-Praise/02-the_chill_of_transparency_vbr.ogg",
    duration: "04:42",
  },
  {
    id: 19,
    title: "Praise",
    artist: "OneMan's Hat",
    album: "Praise",
    cover: "assets/MusicByAlbum/OneMan'sHat-Praise/cover.jpg",
    src: "assets/MusicByAlbum/OneMan'sHat-Praise/05-praise_vbr.ogg",
    duration: "05:01",
  },
  {
    id: 20,
    title: "Rapid Fire",
    artist: "ScrapHeap",
    album: "Fixture",
    cover: "assets/MusicByAlbum/ScrapHeap-Fixture/cover.jpg",
    src: "assets/MusicByAlbum/ScrapHeap-Fixture/03-rapid_fire.ogg",
    duration: "01:26",
  },
  {
    id: 21,
    title: "Antithesis",
    artist: "ScrapHeap",
    album: "Fixture",
    cover: "assets/MusicByAlbum/ScrapHeap-Fixture/cover.jpg",
    src: "assets/MusicByAlbum/ScrapHeap-Fixture/09-antithesis.ogg",
    duration: "01:17",
  },
  {
    id: 22,
    title: "Tilde",
    artist: "ScrapHeap",
    album: "Fixture",
    cover: "assets/MusicByAlbum/ScrapHeap-Fixture/cover.jpg",
    src: "assets/MusicByAlbum/ScrapHeap-Fixture/11-tilde.ogg",
    duration: "01:22",
  },
  {
    id: 23,
    title: "Face the Crunch",
    artist: "ScrapHeap",
    album: "Fixture",
    cover: "assets/MusicByAlbum/ScrapHeap-Fixture/cover.jpg",
    src: "assets/MusicByAlbum/ScrapHeap-Fixture/15-face_the_crunch.ogg",
    duration: "01:25",
  },
  {
    id: 24,
    title: "Time to Split",
    artist: "ScrapHeap",
    album: "Fixture",
    cover: "assets/MusicByAlbum/ScrapHeap-Fixture/cover.jpg",
    src: "assets/MusicByAlbum/ScrapHeap-Fixture/20-time_to_split.ogg",
    duration: "02:08",
  },
];

// Active index pointing to the playing track
let currentTrackIndex = 0;

// ==============================================================================
//  2. STATE VARIABLES & DOM ELEMENTS SELECTORS
// ==============================================================================
// Web Audio API Global States
let audioCtx = null;
let analyser = null;
let audioSourceNode = null;
let audioInitialized = false;

// UI State flags
let isScrubDragging = false;
let isShuffleMode = false;

// HTML Elements
const audio = document.getElementById("my-audio");
const canvas = document.getElementById("visualizer-canvas");
const ctx = canvas.getContext("2d");
const viewport = document.getElementById("visualizer-viewport");

// Overlays & Cards
const trackCard = document.getElementById("track-card");
const trackCover = document.getElementById("track-cover");
const trackTitle = document.getElementById("track-title");
const trackArtist = document.getElementById("track-artist");
const liveEq = document.getElementById("live-eq");

// Playback Control Buttons
const playPauseBtn = document.getElementById("play-pause-button");
const playImg = document.getElementById("play-img");
const pauseImg = document.getElementById("pause-img");
const prevBtn = document.getElementById("prev-button");
const nextBtn = document.getElementById("next-button");
const skipBackBtn = document.getElementById("skip-back-button");
const skipForwardBtn = document.getElementById("skip-forward-button");

// Secondary Control Panel Elements
const muteBtn = document.getElementById("mute-unmute-button");
const volumeHighImg = document.getElementById("volume-high-img");
const volumeMutedImg = document.getElementById("volume-muted-img");
const volumeSlider = document.getElementById("volume-slider");
const shuffleBtn = document.getElementById("shuffle-button");
const fullscreenBtn = document.getElementById("fullscreen-button");

// Scrub Elements
const progressBarContainer = document.getElementById("progress-bar-container");
const progressBar = document.getElementById("progress-bar");
const currentTimeLabel = document.getElementById("current-time");
const durationTimeLabel = document.getElementById("duration-time");

// Playlist Elements
const playlistTracksContainer = document.getElementById("playlist-tracks");

// ==============================================================================
//  3. PLAYLIST INITIALIZATION & RENDERING
// ==============================================================================
// Renders the track list dynamically in HTML beneath the player deck.
function renderPlaylist() {
  playlistTracksContainer.innerHTML = "";

  tracks.forEach((track, index) => {
    // Check if this item is currently playing/loaded to apply active styles
    const isActive = index === currentTrackIndex;

    // Create the wrapper grid container
    const item = document.createElement("div");
    item.className = `track-item ${isActive ? "active" : ""} ${isActive && !audio.paused ? "playing" : ""}`;
    item.setAttribute("data-index", index);

    // Format track index string (e.g. 1 -> "01")
    const formattedIndex = String(index + 1).padStart(2, "0");

    // Construct rich item body
    item.innerHTML = `
      <span class="track-idx">${formattedIndex}</span>
      <img src="${track.cover}" class="track-thumb" alt="${track.title} cover" />
      <div class="track-info">
        <div class="track-name-row">
          <span class="track-info-title">${track.title}</span>
          <div class="mini-playing-eq">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <span class="track-info-artist">${track.artist}</span>
      </div>
      <span class="track-duration">${track.duration}</span>
    `;

    // When clicking a track item, trigger immediate load and playback
    item.addEventListener("click", () => {
      selectTrack(index);
    });

    playlistTracksContainer.appendChild(item);
  });

  // Update playlist count badge
  document.getElementById("playlist-count").textContent =
    `${tracks.length} Tracks`;
}

// Highlights and manages play/pause class states inside the dynamic playlist view
function updatePlaylistUIStates() {
  const items = playlistTracksContainer.querySelectorAll(".track-item");
  items.forEach((item, idx) => {
    const isActive = idx === currentTrackIndex;

    // Clear and toggle appropriate active states
    item.classList.remove("active", "playing");
    if (isActive) {
      item.classList.add("active");
      if (!audio.paused) {
        item.classList.add("playing");
      }
    }
  });
}
// Heavily inspired by tutorial by Franks Laboratory
// found here: https://www.youtube.com/watch?v=VXWvfrmpapI & here: https://www.youtube.com/watch?v=f0dwg99EVfo

// ==============================================================================
//  4. WEB AUDIO API INITIALIZATION & CANVASES PIPELINES
// ==============================================================================
// Lazily boots the Web Audio API on the first interaction to meet browser security rules.
function initAudioEngine() {
  if (audioInitialized) return; // Prevent double execution

  try {
    // 1. Create native audio context supporting all modern browsers
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    // 2. Instantiate high-quality frequency analyser
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 512; // Controls frequency bin counts (256 bars), identical to VISsetup

    // 3. Connect HTML5 Audio node into the Web Audio API stream
    audioSourceNode = audioCtx.createMediaElementSource(audio);
    audioSourceNode.connect(analyser);

    // 4. Close loop back to speakers so user can hear the audio
    analyser.connect(audioCtx.destination);

    audioInitialized = true;

    // 5. Begin the frame drawing cycles
    startVisualizerLoop();
  } catch (error) {
    console.error("Critical: Failed to initialize Web Audio Analyser.", error);
  }
}

// Keeps canvas drawing boundaries perfectly in sync with its client space
function resizeCanvas() {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
}

// Listen to page resize cycles to prevent visual stretching
window.addEventListener("resize", resizeCanvas);
// Call immediately to establish correct startup dimensions
resizeCanvas();

// Heavily inspired by tutorial by Franks Laboratory
// found here: https://www.youtube.com/watch?v=VXWvfrmpapI & here: https://www.youtube.com/watch?v=f0dwg99EVfo
// ==============================================================================
//  5. VISUALIZATION DRAWING ALGORITHMS
// ==============================================================================
// Starts the animation drawing frame pipeline
function startVisualizerLoop() {
  const bufferLength = analyser.frequencyBinCount; // 256 bins
  const dataArray = new Uint8Array(bufferLength);

  function drawFrame() {
    // Queue next frame cycle immediately
    requestAnimationFrame(drawFrame);

    // Extract current byte frequency amplitudes (0 to 255)
    analyser.getByteFrequencyData(dataArray);

    // Always render your original Liquid Blob visualizer style
    canvas.className = "liquid-style";
    drawLiquidBlob(bufferLength, dataArray);
  }

  drawFrame();
}

function drawLiquidBlob(bufferLength, dataArray) {
  let x = 0;
  const barWidth = 5;

  // Clear canvas for fresh draw
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < bufferLength; i++) {
    // Preserve identical height scaling
    let barHeight = dataArray[i] * 1.5;

    ctx.save();
    // Anchor center pivot point
    ctx.translate(canvas.width / 2, canvas.height / 2);
    // Rotate center coordinates around spiral orbit
    ctx.rotate(i + (Math.PI * 20) / bufferLength);

    // Restrict strictly to deep red (rgb(175, 25, 0)) and bright yellow (rgb(255, 255, 0))
    ctx.fillStyle = i % 2 === 0 ? "rgb(175, 25, 0)" : "rgb(255, 255, 0)";

    // Draw circular spiral bar
    ctx.fillRect(0, 0, barWidth, barHeight);

    x += barWidth;
    ctx.restore();
  }
}

// ==============================================================================
//  6. PLAYBACK CONTROL ENGINE
// ==============================================================================
// Core loader: prepares DOM attributes and audio tags for the chosen track index
function loadTrack(index) {
  currentTrackIndex = index;
  const track = tracks[currentTrackIndex];

  // 1. Manage CORS dynamically depending on external or same-origin local URLs
  // This is to avoid CORS blocks
  if (track.src.startsWith("http://") || track.src.startsWith("https://")) {
    audio.crossOrigin = "anonymous";
  } else {
    audio.removeAttribute("crossorigin");
  }

  // 2. Assign source audio file
  audio.src = track.src;
  audio.load();

  // 3. Populate float metadata panel cards
  trackCover.src = track.cover;
  trackTitle.textContent = track.title;
  trackArtist.textContent = track.artist;

  // 4. Reset progress bar widths and timestamp text fields
  progressBar.style.width = "0%";
  currentTimeLabel.textContent = "00:00";
  durationTimeLabel.textContent = track.duration;

  // 5. Update highlights across active playlist items
  updatePlaylistUIStates();
}

// Activates audio play, resumes contexts, and coordinates spinning album visuals
function playAudio() {
  // Ensure Audio Context is created and resumed (remediates browser security delays)
  if (!audioInitialized) {
    initAudioEngine();
  } else if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }

  // Start track playback
  audio
    .play()
    .then(() => {
      // Toggle play pause icons in control bar
      playImg.classList.add("hidden");
      pauseImg.classList.remove("hidden");

      // Start cover rotation & equalizer jumps
      trackCover.classList.add("spinning");
      liveEq.classList.add("animating");

      // Update playlist active icons
      updatePlaylistUIStates();
    })
    .catch((error) => {
      console.warn(
        "Autoplay block: click play again to initiate stream.",
        error,
      );
    });
}

// Halts audio playback and pauses spinning album visuals
function pauseAudio() {
  audio.pause();

  // Toggle play pause icons in control bar
  playImg.classList.remove("hidden");
  pauseImg.classList.add("hidden");

  // Halt animations
  trackCover.classList.remove("spinning");
  liveEq.classList.remove("animating");

  // Update playlist active icons
  updatePlaylistUIStates();
}

// Universal Play/Pause button trigger
function togglePlayback() {
  if (audio.paused || audio.ended) {
    playAudio();
  } else {
    pauseAudio();
  }
}

// Loads next track in queue with rollover safety at end of playlist
function nextTrack() {
  if (isShuffleMode) {
    playRandomTrack();
    return;
  }
  let nextIdx = currentTrackIndex + 1;
  if (nextIdx >= tracks.length) {
    nextIdx = 0; // Wrap around to first track
  }
  loadTrack(nextIdx);
  playAudio();
}

// Loads previous track in queue with rollover safety
function prevTrack() {
  if (isShuffleMode) {
    playRandomTrack();
    return;
  }
  let prevIdx = currentTrackIndex - 1;
  if (prevIdx < 0) {
    prevIdx = tracks.length - 1; // Wrap around to final track
  }
  loadTrack(prevIdx);
  playAudio();
}

// Chooses and plays a random track in shuffle mode, avoiding repeats if possible
function playRandomTrack() {
  if (tracks.length <= 1) {
    loadTrack(0);
    playAudio();
    return;
  }
  let nextIdx;
  do {
    nextIdx = Math.floor(Math.random() * tracks.length);
  } while (nextIdx === currentTrackIndex);

  loadTrack(nextIdx);
  playAudio();
}

// Toggles Shuffle Mode on/off
function toggleShuffle() {
  isShuffleMode = !isShuffleMode;
  if (isShuffleMode) {
    shuffleBtn.classList.add("active");
  } else {
    shuffleBtn.classList.remove("active");
  }
}

// Jumps to a specific track index directly from playlist trigger click
function selectTrack(index) {
  if (index === currentTrackIndex && audioInitialized) {
    // If user clicked the already active track, act as a play/pause toggle
    togglePlayback();
  } else {
    // Load and play new track
    loadTrack(index);
    playAudio();
  }
}

// Rewinds playback time backward by exactly 10 seconds
function skipBackward10() {
  audio.currentTime = Math.max(0, audio.currentTime - 10);
}

// Skips playback time forward by exactly 10 seconds
function skipForward10() {
  // Fallback to duration limits to prevent out of bounds
  const limit = audio.duration || 0;
  audio.currentTime = Math.min(limit, audio.currentTime + 10);
}

// ==============================================================================
//  7. PROGRESS SCRUBBING & TIME UPDATES
// ==============================================================================
// Formats floats seconds to Standard MM:SS layout
function formatTime(seconds) {
  if (isNaN(seconds) || seconds === Infinity) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

// Triggered by audio timeupdates to advance seeker handles
function handleTimeUpdate() {
  // Halt updates if the user is currently dragging scrubber to avoid feedback jitter
  if (isScrubDragging) return;

  if (audio.duration) {
    const percent = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${percent}%`;
    currentTimeLabel.textContent = formatTime(audio.currentTime);
  }
}

// Triggered once audio source finishes downloading metadata properties
function handleMetadataLoaded() {
  durationTimeLabel.textContent = formatTime(audio.duration);
}

// Calculates click scrubbing percentages inside container coordinates
function scrubPlayback(e) {
  if (!audio.duration) return;

  const rect = progressBarContainer.getBoundingClientRect();

  // Support both mouse clicks and drag moves
  const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;

  // Limit boundary percentages between 0 and 100%
  let fraction = (clientX - rect.left) / rect.width;
  fraction = Math.max(0, Math.min(1, fraction));

  // Set time updates and shift graphical progress bars instantly
  audio.currentTime = fraction * audio.duration;
  progressBar.style.width = `${fraction * 100}%`;
  currentTimeLabel.textContent = formatTime(audio.currentTime);
}

// Initiates drag-to-seek handles loops
function setupProgressScrubbing() {
  progressBarContainer.addEventListener("click", (e) => {
    // Lazy initialize audio engine on progress click
    if (!audioInitialized) initAudioEngine();
    scrubPlayback(e);
  });

  progressBarContainer.addEventListener("mousedown", () => {
    isScrubDragging = true;
  });

  window.addEventListener("mousemove", (e) => {
    if (isScrubDragging) {
      scrubPlayback(e);
    }
  });

  window.addEventListener("mouseup", () => {
    if (isScrubDragging) {
      isScrubDragging = false;
    }
  });

  // Touch support for mobile devices
  progressBarContainer.addEventListener("touchstart", () => {
    isScrubDragging = true;
  });

  window.addEventListener("touchmove", (e) => {
    if (isScrubDragging) {
      scrubPlayback(e);
    }
  });

  window.addEventListener("touchend", () => {
    if (isScrubDragging) {
      isScrubDragging = false;
    }
  });
}

// ==============================================================================
//  8. VOLUME CONTROLLERS
// ==============================================================================
// Sets the audio volume and toggles mute elements
function updateVolume() {
  audio.volume = volumeSlider.value;

  // Auto mute/unmute visual states based on volume slider levels
  if (audio.volume === 0) {
    audio.muted = true;
    volumeHighImg.classList.add("hidden");
    volumeMutedImg.classList.remove("hidden");
  } else {
    audio.muted = false;
    volumeHighImg.classList.remove("hidden");
    volumeMutedImg.classList.add("hidden");
  }
}

// Clicking mute button toggles volume between silenced and cached slider limits
function toggleMute() {
  if (audio.muted) {
    audio.muted = false;
    volumeSlider.value = audio.volume || 0.8;
    volumeHighImg.classList.remove("hidden");
    volumeMutedImg.classList.add("hidden");
  } else {
    audio.muted = true;
    volumeSlider.value = 0;
    volumeHighImg.classList.add("hidden");
    volumeMutedImg.classList.remove("hidden");
  }
}

// Toggle fullscreen state on the main visualizer screen viewport
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    viewport
      .requestFullscreen()
      .then(() => {
        setTimeout(resizeCanvas, 150);
      })
      .catch((err) => {
        console.warn("Fullscreen permission blocked.", err);
      });
  } else {
    document.exitFullscreen();
  }
}

// Listen to standard fullscreen escape key updates to resize canvas properly
document.addEventListener("fullscreenchange", () => {
  setTimeout(resizeCanvas, 150);
});

// Auto advance: when active song completes, skip forward immediately to next song
audio.addEventListener("ended", () => {
  nextTrack();
});

// ==============================================================================
//  9. EVENT LISTENERS INITIAL ASSEMBLY
// ==============================================================================
function initEventBindings() {
  // Playback bindings
  playPauseBtn.addEventListener("click", togglePlayback);
  prevBtn.addEventListener("click", prevTrack);
  nextBtn.addEventListener("click", nextTrack);

  // Rewind and Forward skips bindings (updated to 10s to match visual icons)
  skipBackBtn.addEventListener("click", skipBackward10);
  skipForwardBtn.addEventListener("click", skipForward10);

  // Volume event handlers
  volumeSlider.addEventListener("input", updateVolume);
  muteBtn.addEventListener("click", toggleMute);

  // Seeker handles
  audio.addEventListener("timeupdate", handleTimeUpdate);
  audio.addEventListener("loadedmetadata", handleMetadataLoaded);
  setupProgressScrubbing();

  // Premium interactive shortcut: double-click canvas to toggle fullscreen!
  canvas.addEventListener("dblclick", toggleFullscreen);

  // Shuffle and Fullscreen button UI event handlers
  shuffleBtn.addEventListener("click", toggleShuffle);
  fullscreenBtn.addEventListener("click", toggleFullscreen);

  // Handle playback and network load errors gracefully
  audio.addEventListener("error", (e) => {
    console.error("Audio Playback Error:", audio.error);
    if (tracks[currentTrackIndex].src.startsWith("http")) {
      console.warn(
        "CORS or Network Block: The remote audio stream could not be loaded. " +
          "This is common if the hosting server does not allow cross-origin requests from localhost, " +
          "or if there are network issues. You can download these DJ mix files and run them locally!",
      );
    } else {
      console.warn(
        "Local Asset Block: Make sure the file exists at " +
          tracks[currentTrackIndex].src,
      );
    }
  });
}

// ==============================================================================
//  10. BOOT
// ==============================================================================
// Load first track
loadTrack(0);

// Populate playlist
renderPlaylist();

// Bind all interactive event triggers
initEventBindings();
