import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent {

  @Output() videoFinished = new EventEmitter<void>();

  
  videoId = 'k4zh9MP5LhA';

  constructor() { }

  ngOnInit() {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
  }

  onStateChange(event: any) {
    if (event.data === YT.PlayerState.ENDED) {
      this.videoFinished.emit();
    }
  }
}
