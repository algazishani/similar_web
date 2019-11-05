import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { PlaylistService } from '../playlist.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit, OnDestroy {
  player;

  constructor(private playlistService: PlaylistService) {}
  ngOnInit() {
    // This code loads the IFrame Player API code asynchronously.
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    (<any>window).onYouTubeIframeAPIReady = () => {
      this.player = new (<any>window).YT.Player('player', {
        events: {
          onReady: this.handleReady.bind(this),
          onStateChange: this.onPlayerStateChange.bind(this)
        },
        playerVars: {
          autoplay: 1,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          showInfo: 0
        }
      });
    };
  }
  handleReady() {
    // Getting the first song on the list if exists
    const currentVideo = this.playlistService.getCurrentVideo();
    if (currentVideo) {
      this.player.loadVideoById(currentVideo.youTubeId);
    }

    // Subscribing to changes on playlist
    this.playlistService.clickedVideo.subscribe(video => {
      if (video) {
        this.player.loadVideoById(video.youTubeId);
      }
    });
  }
  // The API calls this function when the player's state changes.
  // The function indicates that when playing a video (state=1),
  // the player should play for six seconds and then stop.
  onPlayerStateChange(event) {
    if (event.data === 0) {
      this.playlistService.removeVideo();
    }
  }
  stopVideo() {
    this.player.stopVideo();
  }

  ngOnDestroy(): void {
    this.playlistService.clickedVideo.unsubscribe();
  }
}
