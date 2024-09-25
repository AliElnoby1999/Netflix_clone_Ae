import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from 'src/app/shared/movies.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit{
  movieDetail: any;
  videoKey: string | null = null;

  constructor(private route: ActivatedRoute, private moviesService: MoviesService,private sanitizer: DomSanitizer) {}
  UserProfImg=JSON.parse(sessionStorage.getItem("LoggedInUser")!).picture;
  limitedCast: any[] = [];
  ngOnInit(): void {
    const movieId = Number(this.route.snapshot.paramMap.get('id'));
    if (movieId) {
      this.moviesService.getBannerDetail(movieId).subscribe((detail: any) => {
        this.movieDetail = detail;
       // console.log('Movie Detail:', this.movieDetail);

        this.moviesService.getCastName(movieId).subscribe((castDetail: any) => {
          this.movieDetail.cast = castDetail.credits.cast.slice(0, 3); 
          //this.limitedCast = this.movieDetail.cast.slice(0, 3);
          
          //console.log('Cast Detail:', this.movieDetail.cast);
        });

      });

      this.moviesService.getBannerVideo(movieId).subscribe((video: any) => {
        const trailer = video.results.find((v: any) => v.type === 'Trailer');
        this.videoKey = trailer ? trailer.key : null;
        //console.log('Video Key:', this.videoKey);
      });
    }
  }
  get videoUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.videoKey}?autoplay=1&mute=1&loop=1&controls=0`);
  }
}
