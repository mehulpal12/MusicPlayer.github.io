const songs = [
  { songName: "tere pyaar mai", filePath: "song/1.mp3", coverPath: "covers/1.jpg" },
  { songName: "tu jhutti mai makar", filePath: "song/2.mp3", coverPath: "covers/2.jpg" },
  { songName: "kesariya", filePath: "song/3.mp3", coverPath: "covers/3.jpg" },
  { songName: "meri zindagi se", filePath: "song/4.mp3", coverPath: "covers/4.jpg" },
  { songName: "har har shamboo", filePath: "song/5.mp3", coverPath: "covers/5.jpg" },
  { songName: "kahani suno", filePath: "song/6.mp3", coverPath: "covers/6.jpg" },
  { songName: "moon rise", filePath: "song/7.mp3", coverPath: "covers/7.jpg" },
];
let songItems = Array.from(document.getElementsByClassName("songItems"));
songItems.forEach((element, i) => {
  element.getElementsByClassName("songName")[0].innerHTML = songs[i].songName;
  element.getElementsByClassName("songImage")[0].src = songs[i].coverPath;
});
let songIndex = 0;
let audio = new Audio("song/7.mp3");
let masterPlay = document.getElementById("masterPlay");
let timeLine = document.getElementById("timeLine");
masterPlay.addEventListener("click", () => {
  if (audio.paused || audio.currentTime <= 0) {
    audio.play();
    masterPlay.classList.remove("fa-play");
    masterPlay.classList.add("fa-pause");
  } else {
    audio.pause();
    masterPlay.classList.add("fa-play");
    masterPlay.classList.remove("fa-pause");
  }
});
audio.addEventListener("click", () => {
  progress = parseInt((audio.currentTime / audio.duration) * 100);
  timeLine.value = progress;
});
timeLine.addEventListener("change", () => {
  audio.currentTime = (timeLine.value * audio.duration) / 100;
});
const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("playBtn")).forEach((element) => {
    element.classList.add("fa-play");
    element.classList.remove("fa-pause");
  });
};
let masterSongName = document.getElementById("masterSongName");
Array.from(document.getElementsByClassName("playBtn")).forEach((element) => {
  element.addEventListener("click", (e) => {
    makeAllPlays();
    masterSongName.innerHTML = songs[songIndex].songName;
    songIndex = parseInt(e.target.id);
    e.target.classList.remove("fa-play");
    e.target.classList.add("fa-pause");
    audio.currentTime = 0;
    audio.src = `song/${songIndex}.mp3`;
    audio.play();
    masterPlay.classList.add("fa-pause");
    masterPlay.classList.remove("fa-play");
  });
});
document.getElementById("next").addEventListener("click", () => {
  if (songIndex >= 7) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  masterSongName.innerHTML = songs[songIndex].songName;
  audio.src = `song/${songIndex + 1}.mp3`;
  audio.play();
  masterPlay.classList.add("fa-pause");
  masterPlay.classList.remove("fa-play");
});
document.getElementById("prev").addEventListener("click", () => {
  if (songIndex <= 0) {
    songIndex = 0;
  } else {
    songIndex -= 1;
  }
  masterSongName.innerHTML = songs[songIndex].songName;
  audio.src = `song/${songIndex + 1}.mp3`;
  audio.play();
  masterPlay.classList.add("fa-pause");
  masterPlay.classList.remove("fa-play");
});
