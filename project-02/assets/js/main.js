const nowPlaying = document.querySelector(".now-playing");
const trackArt = document.querySelector(".track-art");
const trackName = document.querySelector(".track-name");
const trackArtist = document.querySelector(".track-artist");
const playpauseBtn = document.querySelector(".playpause-track");
const prevBtn = document.querySelector(".prev-track");
const nextBtn = document.querySelector(".next-track");
const currentTimer = document.querySelector(".current-time");
const durationTime = document.querySelector(".total-duration");
const sliderSeek = document.querySelector(".player-seek");
const sliderVolume = document.querySelector(".player-volume");
const currentTrack = document.createElement("audio");
let trackIndex = 0;
let isPlaying = true;
let updateTimer;

let trackList = [
  {
    name: "Night Owl",
    artist: "Broke For Free",
    image:
      "https://images.pexels.com/photos/2264753/pexels-photo-2264753.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "applause.mp3",
  },
  {
    name: "Enthusiast",
    artist: "Tours",
    image:
      "https://images.pexels.com/photos/3100835/pexels-photo-3100835.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "dangerously.mp3",
  },
  {
    name: "Shipping Lanes",
    artist: "Chad Crouch",
    image:
      "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "holo.mp3",
  },
  {
    name: "Home",
    artist: "baoDeV",
    image:
      "https://images.unsplash.com/photo-1682685794761-c8e7b2347702?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    path: "home.mp3",
  },
  {
    name: "Shape of you",
    artist: "Thai Bao",
    image:
      "https://images.unsplash.com/photo-1686968719840-684f6414aecf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60",
    path: "shapeofyou.mp3",
  },
  {
    name: "Spark",
    artist: "Thai Bao",
    image:
      "https://images.unsplash.com/photo-1686968719840-684f6414aecf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60",
    path: "spark.mp3",
  },
  {
    name: "Summer",
    artist: "Thai Bao",
    image:
      "https://images.unsplash.com/photo-1686968719840-684f6414aecf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60",
    path: "summer.mp3",
  },
];

// Functionality
function showTrack(trackIndex) {
  clearInterval(updateTimer);
  resetValues();
  currentTrack.src = `./assets/audio/${trackList[trackIndex].path}`;
  currentTrack.load();
  console.log(currentTrack);
  trackArt.style.backgroundImage = `url("${trackList[trackIndex].image}")`;
  trackName.textContent = trackList[trackIndex].name;
  trackArtist.textContent = trackList[trackIndex].artist;
  nowPlaying.textContent = `PLAYING ${trackIndex + 1} OF ${trackList.length}`;
  updateTimer = setInterval(seekUpdate, 1000);
  currentTrack.addEventListener("ended", function () {
    handleChangeTrack(1);
  });
  randomBgColor();
}
function resetValues() {
  currentTimer.textContent = "00:00";
  durationTime.textContent = "00:00";
  sliderSeek.value = 0;
}
function randomBgColor() {
  let red = Math.floor(Math.random() * 256) + 64;
  let green = Math.floor(Math.random() * 256) + 64;
  let blue = Math.floor(Math.random() * 256) + 64;
  let bgColor = `rgb(${red}, ${green}, ${blue})`;
  document.body.style.background = bgColor;
}
playpauseBtn.addEventListener("click", function () {
  playPauseTrack();
});
function playPauseTrack() {
  if (isPlaying) playTrack();
  else pauseTrack();
}
function playTrack() {
  currentTrack.play();
  isPlaying = false;
  playpauseBtn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack() {
  currentTrack.pause();
  isPlaying = true;
  playpauseBtn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
nextBtn.addEventListener("click", function () {
  handleChangeTrack(1);
});
prevBtn.addEventListener("click", function () {
  handleChangeTrack(-1);
});
function handleChangeTrack(dir = 1) {
  if (dir === 1) {
    ++trackIndex;
    if (trackIndex > trackList.length - 1) {
      trackIndex = 0;
    }
    showTrack(trackIndex);
    playTrack();
  } else if (dir === -1) {
    --trackIndex;
    if (trackIndex < 0) {
      trackIndex = trackList.length - 1;
    }
    showTrack(trackIndex);
    playTrack();
  }
}
sliderVolume.addEventListener("change", function () {
  changeVolume();
});
function changeVolume() {
  currentTrack.volume = sliderVolume.value / 100;
}
sliderSeek.addEventListener("change", function () {
  seekTo();
});
function seekUpdate() {
  const { currentTime, duration } = currentTrack;
  sliderSeek.max = duration;
  sliderSeek.value = currentTime;
  if (!isNaN(duration)) {
    durationTime.textContent = formatTimer(duration);
    currentTimer.textContent = formatTimer(currentTime);
  }
}
function formatTimer(number) {
  const minutes = Math.floor(number / 60);
  const seconds = Math.floor(number - minutes * 60);
  return `${minutes}:${seconds < 10 ? seconds + "0" : seconds}`;
}
function seekTo() {
  currentTrack.currentTime = sliderSeek.value;
}
showTrack(trackIndex);
