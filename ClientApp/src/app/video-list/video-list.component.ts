import {  Video, PlaylistService } from './../playlist.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss']
})
export class VideoListComponent implements OnInit {
  @Input() playlist: Video[];

  constructor(private playlistService: PlaylistService) {}

  ngOnInit() {}

  handleClick(video: Video) {
    this.playlistService.setCurrentVideo(video);
  }

  handleDelete(video: Video) {
    this.playlistService.removeVideo(video);
  }
}
