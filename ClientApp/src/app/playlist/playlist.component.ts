import { Video, PlaylistService } from './../playlist.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { catchError, concat, mergeMap } from 'rxjs/operators';
import uuidv1 from 'uuid';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
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

    this.playlistSerivce.removedVideo.subscribe(video =>
      this.playlistSerivce.deleteVideo(video).subscribe(res => {
        this.playlist = this.playlist.filter(v => v.id !== video.id);
        if (this.playlist.length !== 0) {
          this.playlistSerivce.setCurrentVideo(this.playlist[0]);
        }
        this.cd.detectChanges();
      })
    );
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
}
