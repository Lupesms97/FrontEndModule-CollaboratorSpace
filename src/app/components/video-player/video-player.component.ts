import { Component, ElementRef, Input, OnInit,Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit {

  private apiLoaded = false;
  finish = false;
  routerParam = ''
  @ViewChild('videoContainer') videoContainer!: ElementRef;
  sizeWidth = window.innerWidth-20;
  sizeHeight = window.innerHeight-20;

  @Input() videoId: string = '';

  playerVars = {
    autoplay: 1,
    rel: 0,
    modestbranding: 1,
    controls: 1,
    showinfo: 0,
    fs:1
  }

  constructor(private router:Router, private routerParamService: ActivatedRoute,private renderer: Renderer2 ) { }

  ngOnInit(): void {
    this.routerParamService.params.subscribe(params => {
      this.routerParam = params['nomeDaTrilha'];
    });
  }


  onPlayerReady(event: any) {
    // Aqui você pode adicionar lógica personalizada quando o player estiver pronto
    console.log('Player ready');

  }

  onPlayerStateChange(event: any) {
    if (event.data === 0) {
      this.showConclusion();
    }
  }

  showConclusion(){
    this.finish = true;
    setTimeout(() => {
      this.router.navigate([`trilhas-disponiveis/${this.routerParam}/trilha`]);
    }, 2000);
  }

 
}
