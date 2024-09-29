import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/shared/services/movie.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent   implements OnInit{
  movieDetail: any;
  videoKey: string | null = null;

  constructor(
    private route: ActivatedRoute, 
    private moviesService: MovieService,
    private sanitizer: DomSanitizer  // Inject DomSanitizer
  ) {}
  UserProfImg=JSON.parse(sessionStorage.getItem("LoggedInUser")!).picture;
  ngOnInit(): void {
    const movieId = Number(this.route.snapshot.paramMap.get('id'));
    if (movieId) {
      this.moviesService.getBannerDetail(movieId).subscribe((detail: any) => {
        this.movieDetail = detail;
        console.log('Movie Detail:', this.movieDetail);

        this.moviesService.getCastName(movieId).subscribe((castDetail: any) => {
          console.log('Cast Detail Response:', castDetail);
          if (castDetail && castDetail.credits && castDetail.credits.cast) {
            this.movieDetail.cast = castDetail.credits.cast.slice(0, 3);// Update the cast property
          } else {
            console.error('Cast details not available or in an unexpected format');
          }
        });
      });
  
      this.moviesService.getBannerVideo(movieId).subscribe((video: any) => {
        const trailer = video.results.find((v: any) => v.type === 'Trailer');
        this.videoKey = trailer ? trailer.key : null;
        console.log('Video Key:', this.videoKey);
      });
    }
  }

  get videoUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.videoKey}?autoplay=1&mute=1&loop=1&controls=0&playlist=${this.videoKey}`);
  }
}
