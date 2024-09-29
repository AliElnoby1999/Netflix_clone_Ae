import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from 'src/app/shared/services/movie.service';
import { IVideoContent } from 'src/app/video-content';
@Component({
  selector: 'app-newspopular',
  templateUrl: './newspopular.component.html',
  styleUrls: ['./newspopular.component.scss']
})
export class NewspopularComponent implements OnInit {
  trendingContent :IVideoContent[]=[];
  popularMovies :IVideoContent[]=[];
  popularTvShows:IVideoContent[]=[];
  @Input() videoContents: IVideoContent[] = [];
  @Input() title!: string;
  constructor(private movieService: MovieService,private _Router:Router) {}
  UserProfImg=JSON.parse(sessionStorage.getItem("LoggedInUser")!).picture;
  selectedContent: string | null = null;
  ngOnInit(): void {
    this.movieService.getTvShows().subscribe((data: any) => this.trendingContent = data.results);
    this.movieService.getPopularMovies().subscribe((data: any) => this.popularMovies = data.results);
    this.movieService.getPopularTvShows().subscribe((data: any) => this.popularTvShows = data.results);
  }

  setHovercontent(movie: IVideoContent) {
    this.selectedContent = movie.title || movie.name || '';
  }

  clearHovercontent() {
    this.selectedContent = '';
  }
  goToDetails(id: number) {
    this._Router.navigate(['/details', id]);
  }
}
