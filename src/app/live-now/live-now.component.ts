import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { ApiService } from '../config/api.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-live-now',
  templateUrl: './live-now.component.html',
  styleUrls: ['./live-now.component.scss']
})
export class LiveNowComponent implements OnInit {
  public vimeoUrl: any;
  public vimeoSrc: any;
  public hasVimeoUrl: boolean;
  public event: any;
  public performer: any;

  constructor(
    private domSanitizer: DomSanitizer,
    private api: ApiService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.hasVimeoUrl = true;
    this.route.params.subscribe(data => this.getEvent(data.slug));
  }

  getEvent(slug) {
    this.api.getEvent(slug).subscribe(data => {
      console.log(data)
      this.event = data[0],
        this.performer = this.event.performers,
        this.vimeoUrl = this.event.stream_id ? `https://player.vimeo.com/video/${this.event.stream_id}` : 'https://player.vimeo.com/video/537863643',
        this.vimeoSrc = this.domSanitizer.bypassSecurityTrustResourceUrl(this.vimeoUrl);
    });
  }

}
