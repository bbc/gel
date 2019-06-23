/**
 * Video
 * @namespace gel
 * @method gel.Video.init
 */

(function () {
  if (!window.gel) { window.gel = {}; }
  var self = gel.Video = {};

  self.init = function () { }

  self.videoInit = function (video, captions) {
    // Listen for when the video is ready
    video.addEventListener('loadedmetadata', function () {
      // Remove the native controls
      video.controls = false;
      if (captions) {
        // Show captions track
        // (This method only supports one track)
        video.textTracks[0].mode = 'showing';
      }
    });
  }

  self.playButton = function (button, video) {
    button.addEventListener('click', function () {
      // Pause or play the video based on its current state
      video.paused || video.ended ? video.play() : video.pause();
      // Add the active class for affecting the button's labeling
      button.classList.toggle('active');
    });

    // Revert the play button when the video ends
    video.addEventListener('ended', function () {
      button.classList.remove('active');
    });
  }

  self.muteButton = function (button, video) {
    var toggleMute = function () {
      // Toggle the muted property
      video.muted = !video.muted;
      button.classList.toggle('active');
    }
    button.addEventListener('click', toggleMute);
    video.addEventListener('loadedmetadata', function () {
      // If the video is set to autoplay, mute by default
      if (video.autoplay) {
        toggleMute();
      }
    });
  }

  self.scrub = function (range, video) {
    var getMins = function (secs) {
      let mins = Math.floor(secs / 60);
      let remainder = secs - mins * 60;
      return mins + ' minutes and ' + Math.round(remainder) + ' seconds';
    }

    video.addEventListener('loadedmetadata', function () {
      // Map range input's props to the video's
      range.min = 0;
      range.max = video.duration;
      range.value = 0;
      // Translate the values for assistive technologies
      range.setAttribute('aria-valuemin', '0 seconds');
      range.setAttribute('aria-valuemax', getMins(video.duration));
      range.setAttribute('aria-valuenow', '0 seconds');
    });

    video.addEventListener('timeupdate', function () {
      // map the value to the currentTime of the video
      range.value = video.currentTime;
      // Translate this for assistive technologies
      range.setAttribute('aria-valuenow', getMins(video.currentTime));
    });

    // 
    range.addEventListener('input', function () {
      // map the currentTime of the video to the value
      video.currentTime = range.value;
    });
  }
})();