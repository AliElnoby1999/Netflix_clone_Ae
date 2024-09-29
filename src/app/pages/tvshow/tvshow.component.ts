import { Component , ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MovieService } from 'src/app/shared/services/movie.service';
import { IVideoContent } from 'src/app/video-content';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tvshow',
  templateUrl: './tvshow.component.html',
  styleUrls: ['./tvshow.component.scss']
})
export class TvshowComponent implements OnInit{
  @Input() videoContents: IVideoContent[] = [];
  @Input() title!: string;
  @ViewChild('swiperContainer') swiperContainer!: ElementRef;
  selectedContent: string | null = null;
  constructor(private _Router:Router,private _MoviesService:MovieService,private _snackBar: MatSnackBar) { }
  upcomingMovies:IVideoContent[]=[];
  FavData: number[] = [];
  UserProfImg=JSON.parse(sessionStorage.getItem("LoggedInUser")!).picture;

  ngOnInit(): void {
    this._MoviesService.getTvShows().subscribe({
      next: (res:any) => {
        
        this.upcomingMovies=res.results
      },
      error: (error) => {
        console.error('Error fetching movies:', error);
      }
    });
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
  addToFavorites(movie: IVideoContent) {
 
    console.log('Added to Favorites:', movie);
    if (!this.FavData.includes(movie.id)) {
      this.FavData.push(movie.id);
     // this.updateFavoritesInLocalStorage();
     // this._Router.navigate(['mylist'], { queryParams: { movieId: movie.id } });
    }
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    // Check if poster_path exists
    if (movie.poster_path && !favorites.find((fav: IVideoContent) => fav.id === movie.id)) {
      favorites.push(movie);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      this._snackBar.open('Movie added to favorites!', 'Close', {
        duration: 3000,  // Duration in milliseconds
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-success']
      });
    }
    else {
      // Display already exists toaster
      this._snackBar.open('Movie already in favorites!', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-info']
      });
    }
    
  }


  removeFromFavorites(movieId: number) {
    this.FavData = this.FavData.filter((id) => id !== movieId);
   // this.updateFavoritesInLocalStorage();
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    // Remove the movie from local favorites
    favorites = favorites.filter((fav: IVideoContent) => fav.id !== movieId);
    localStorage.setItem('favorites', JSON.stringify(favorites));

    this._snackBar.open('Movie removed from favorites!', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-error']
    });
}
}
