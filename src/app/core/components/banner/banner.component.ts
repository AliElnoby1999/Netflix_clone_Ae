import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnChanges {
@Input() bannerTitle='';
@Input() bannerOverview='';
@Input() key = '6kUPkbIshyg';
private sanitizer = inject(DomSanitizer)
videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.key}?autoplay=1&mute=1&loop=1&controls=0`)
ngOnChanges(changes: SimpleChanges): void {
  if(changes['key']){
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.key}?autoplay=1&mute=1&loop=1&controls=0&playlist=${this.key}`);
  }
}
}

