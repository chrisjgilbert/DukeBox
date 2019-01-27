window.onSpotifyWebPlaybackSDKReady = () => {
  const token = [your token]
  const device_id = [your device_id]
  const player = new Spotify.Player({
    name: 'Web Playback SDK Quick Start Player',
    getOAuthToken: cb => { cb(token); }
  });

  player.connect();

  document.getElementById('next-form').addEventListener('submit', (e) => {
    e.preventDefault()
    playNextSong()
  })

  document.getElementById('prev-form').addEventListener('submit', (e) => {
    e.preventDefault()
    playPreviousSong()
  })

  document.getElementById('play-form').addEventListener('submit', (e) => {
    e.preventDefault()
    play()
  })

  updateNowPlaying = (response) => {
    console.log(response)
    document.getElementById('now-playing').innerHTML = response
  }

  playNextSong = () => {
    url = "https://api.spotify.com/v1/me/player/next"
    changeSong(url)
  }

  playPreviousSong = () => {
    url = "https://api.spotify.com/v1/me/player/previous"
    changeSong(url)
  }

  play = () => {
    playChillHop()
  }

  playChillHop = () => {
    return fetch("https://api.spotify.com/v1/me/player/play?device_id=" + device_id, {
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: {
        "context_uri": "spotify:user:chillhopmusic:playlist:3k2cHRrJFgBkesKivMG9sF",
        "offset": {
          "position": 5
        },
        "position_ms": 0
      }
    })
    .then(response => updateNowPlaying(response));
  }

  getNowPlaying = () => {
    return fetch("https://api.spotify.com/v1/me/player/currently-playing", {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    })
    .then(response => updateNowPlaying(response));
  }

  changeSong = (url = ``, data = {}) => {
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    })
    .then(response => updateNowPlaying(response));
  }
};
