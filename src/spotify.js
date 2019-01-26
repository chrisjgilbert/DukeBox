window.onSpotifyWebPlaybackSDKReady = () => {
  const token = 'BQDeY03AU2kWj5LRVjcTujFQBHfhy1KmM4pbkAGUZsJSyi4ztSwSJJbd0Xl_gIY6r-R3Ws7BvSDn5ZpVZnpAYCxe-w_yfxolIrZGOJ2MTqWjwIB-sJaHaxIC-Ogl32a7qtEaiUtP_lJM2eVOjZI5Bw'
  const device_id = '0d1841b0976bae2a3a310dd74c0f3df354899bc8'
  const player = new Spotify.Player({
    name: 'Web Playback SDK Quick Start Player',
    getOAuthToken: cb => { cb(token); }
  });

  // Not Ready
  player.addListener('not_ready', ({ device_id }) => {
    console.log('Device ID has gone offline', device_id);
  });

  // Connect to the player!
  player.connect();

  document.getElementById('next-form').addEventListener('submit', (e) => {
    e.preventDefault()
    playNextSong()
  })

  document.getElementById('prev-form').addEventListener('submit', (e) => {
    e.preventDefault()
    playPreviousSong()
  })

  playNextSong = () => {
    url = "https://api.spotify.com/v1/me/player/next"
    postData(url)
  }

  playPreviousSong = () => {
    url = "https://api.spotify.com/v1/me/player/previous"
    postData(url)
  }

  updateNowPlaying = (response) => {
    document.getElementById('now-playing').innerHTML = response
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
    .then(response => displayNowPlaying(response));
  }

  postData = (url = ``, data = {}) => {
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
