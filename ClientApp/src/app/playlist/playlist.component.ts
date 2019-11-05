import { Video, PlaylistService } from './../playlist.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import uuidv1 from 'uuid';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit, OnDestroy {
  playlist: Video[] = [];
  constructor(
    private playlistSerivce: PlaylistService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // getting the playlist from the service
    // and setting the current video to play
    this.playlistSerivce.getPlaylist().subscribe(res => {
      this.playlist = res;
      if (this.playlist) {
        this.playlistSerivce.setCurrentVideo(this.playlist[0]);
      }
    });

    // Listing to removed video -> then calling the service to remove that video
    // if Ok, then delete from playlist
    this.playlistSerivce.removedVideo.subscribe(video => {
      this.playlistSerivce
        .deleteVideo(video)
        .pipe(catchError(e => of(console.log(e))))
        .subscribe(() => this.handleSuccess(video));
    });
  }

  handleSuccess(video: Video) {
    this.playlist = this.playlist.filter(v => v.id !== video.id);
    if (this.playlist.length !== 0) {
      this.playlistSerivce.setCurrentVideo(this.playlist[0]);
    }
    this.cd.detectChanges();
  }

  /**
   *  On add button handler
   * @param url
   */
  onAddVideo(url: string) {
    if (url === 'undefined') {
      return;
    }
    const newVideo = this.createNewVideo(url);
    if (this.playlist.length === 0) {
      this.playlistSerivce.setCurrentVideo(newVideo);
    }
    this.playlistSerivce.addVideo(newVideo).subscribe(
      res => {
        this.playlist.push(newVideo);
        this.playlist = [...this.playlist];
      },
      e => console.log(e)
    );
  }

  /**
   * Creating new video object from url
   * @param url ;
   */

  createNewVideo(url: string): Video {
    const youtubeId = this.playlistSerivce.getYouTubeIdFromUrl(url);
    if (youtubeId) {
      //  this.playlistSerivce.getTitle(youtubeId); // As explained in the README.txt
      const newVideo: Video = {
        duration: 0,
        name: '',
        youTubeId: this.playlistSerivce.getYouTubeIdFromUrl(url),
        id: uuidv1(),
        url: url
      };
      return newVideo;
    }
  }

  ngOnDestroy(): void {
    this.playlistSerivce.removedVideo.unsubscribe();
  }
}
