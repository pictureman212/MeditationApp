const app = () => {
  const song = document.querySelector(".song");
  const play = document.querySelector(".play");
  const outline = document.querySelector(".moving-outline circle");
  const video = document.querySelector(".vid-container video");

  //sounds
  const sounds = document.querySelectorAll(".sound-picker button");

  //time display
  const timeDisplay = document.querySelector(".time-display");
  const timeSelect = document.querySelectorAll(".time-select button");

  // length of svg outline or stroke

  const outlineLength = outline.getTotalLength();
  // console.log(outlineLength);
  let dur = 600;
  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

  //pick dif sound
  sounds.forEach((sound) => {
    sound.addEventListener("click", function () {
      song.src = this.getAttribute("data-sound");
      video.src = this.getAttribute("data-video");
      // checkPlaying(song);
    });
  });

  //play sound
  play.addEventListener("click", () => {
    checkPlaying(song);
  });

  //select sound
  timeSelect.forEach((option) => {
    option.addEventListener("click", function () {
      dur = this.getAttribute("data-time");
      timeDisplay.textContent = `${Math.floor(dur / 60)}:${Math.floor(
        dur % 60
      )}`;
    });
  });

  //pause or play button

  const checkPlaying = (song) => {
    if (song.paused) {
      song.play();
      video.play();
      play.src = "./images/pause.svg";
    } else {
      song.pause();
      video.pause();
      play.src = "./images/play.svg";
    }
  };

  //animate timer
  song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let elapsed = dur - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);

    let progress = outlineLength - (currentTime / dur) * outlineLength;
    outline.style.strokeDashoffset = progress;

    //animate text
    timeDisplay.textContent = `${minutes}:${seconds}`;

    //stop

    if (currentTime >= dur) {
      song.pause();
      song.currentTime = 0;
      play.src = "./images/play.svg";
      video.pause();
    }
  };
};

app();
