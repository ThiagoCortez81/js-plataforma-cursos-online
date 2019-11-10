import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  constructor(private _http: HttpClient) { }

  recuperarDadosVideo(videoUrl: string) {
    const video = videoUrl.split('v=');
    const idVideo = video[1];

    const youtubeAPIEndpoint = `https://www.googleapis.com/youtube/v3/videos?part=id%2C+snippet&id=${idVideo}&key=AIzaSyAKdyqEQLddVI3Byq8FCLhbbwBbrnUA3Uw`;
    return this.doGet(youtubeAPIEndpoint);
  }

  private doGet(url) {
    return this._http.get(url);
  }

}
