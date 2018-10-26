AFRAME.registerComponent("playaudio", {
  // Init function
  init: function() {
    /*
        * Variables definition
        */
    // Marker definition
    this.marker = this.el;
    // Path definition
    this.audioPath = "./audio/";
    this.audioType = ".wav";
    /***** Future feature ****/
    // Beat selection
    // this.beatSound = document.querySelector("select");
    // this.beatValue = this.beatSound.value;
    // Audio source and audio creation
    // this.audioSource = this.audioPath + this.beatValue + this.audioType;
    // this.audio = new Audio(this.audioSource);
    // Looper
    this.loop;

    /*
        * Events listening
        */
    // Adding event listener to catch covering hand
    this.marker.addEventListener("markerFound", this.playSound.bind(this));
    this.marker.addEventListener("markerLost", this.stopSound.bind(this));
    /***** Future feature ****/
    // Adding event listener to catch sound change
    // this.beatSound.addEventListener("change", this.updateSound.bind(this));
    //
  },
  // Function to play choosen sound
  playSound: function() {
    switch (this.marker.id) {
      case "hiro":
        this.beatValue = "snare";
        this.audioSource = this.audioPath + this.beatValue + this.audioType;
        this.audio = new Audio(this.audioSource);
        break;
      case "kanji":
        this.beatValue = "kick";
        this.audioSource = this.audioPath + this.beatValue + this.audioType;
        this.audio = new Audio(this.audioSource);
    }
    this.audio.load();
    this.loop = setInterval(
      function() {
        this.audio.play();
      }.bind(this),
      1000
    );
    // Emits event to recording component
    // this.marker.emit("soundPlayed", { currentAudio: this.audio }, true);
  },
  // Function to stop current playing sound
  stopSound: function() {
    clearInterval(this.loop);
    this.audio.pause();
    this.audio.currentTime = 0;

    // delete this.audioList[this.marker.id];
    // console.log(this.audioList);
  },
  // Updating current playing sound
  updateSound: function() {
    clearInterval(this.loop);
    this.beatValue = this.beatSound.value;
    this.audio.src = this.audioPath + this.beatValue + this.audioType;
  }
});

AFRAME.registerComponent("recordingaudio", {
  // Init function
  init: function() {
    /*
        * Variables definition
        */
    // Marker definition
    this.marker = this.el;
    // Boolean to watch recording state
    this.isRecording = false;
    // Array of Audios
    this.audioList = [];
    //

    /*
        * Events listening
        */
    // Adding event listener to catch covering hand
    this.marker.addEventListener("markerLost", this.toggleRecording.bind(this));
    // Catch emitted sound event
    this.marker.addEventListener("soundPlayed", this.saveSound.bind(this));
    //
  },
  toggleRecording: function() {
    this.isRecording = !this.isRecording;
  },
  saveSound: function(event) {
    if (this.isRecording) this.audioList.push(event.detail.currentAudio);
    console.log("here");
  }
});
