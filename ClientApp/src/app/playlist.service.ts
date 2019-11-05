import { Video } from './playlist.service';
import { Injectable, Inject, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';

export interface Video {
  name: string;
  url: string;
  youTubeId: string;
  id: string;
  duration: number;
}

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  @Output() clickedVideo: Subject<Video> = new Subject();
  @Output() removedVideo: Subject<Video> = new Subject();

  apiurl = '';
  httpOptions;
  currentVideo: Video;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.apiurl = baseUrl + 'playlist';
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  }

  getYouTubeIdFromUrl(url: string): string {
    if (url === 'undefined' || url == null || url === '') {
      return null;
    }
    return url.split('v=')[1].split('&')[0];
  }

  setCurrentVideo(video: Video) {
    this.currentVideo = video;
    this.clickedVideo.next(video);
  }

  getCurrentVideo(): Video {
    return this.currentVideo;
  }

  removeVideo(video = null) {
    this.removedVideo.next(video ? video : this.currentVideo);
  }

  addVideo(video: Video): Observable<Video> {
    return this.http.post<Video>(this.apiurl, video, {
      headers: this.httpOptions
    });
  }

  getPlaylist(): Observable<Video[]> {
    return this.http.get<Video[]>(this.apiurl);
  }

  deleteVideo(video: Video) {
    const httpOptions = this.httpOptions;
    httpOptions['body'] = video;
    return this.http.delete<Video>(this.apiurl, httpOptions);
  }

  getMoreInfo(id: string) {
    const videoInfo = {
      title: '',
      duration: ''
    };
    // Assuming the API key is not hard coded.
    const api = `https://www.googleapis.com/youtube/v3/videos?id=${id}key=AIzaSyAqOSbAJVk7UynMkBJJwQ1Cem8xhUvg6Kc&part=snippet,contentDetails`;
    this.http.get<any>(api).subscribe(res => {
      videoInfo.title = res.items[0].snippet.title;
      videoInfo.duration = res.items[0].contentDetails.duration;
      // after response -> moment.duration(duration, moment.ISO_8601);
    });
  }
}
