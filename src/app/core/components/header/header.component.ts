import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
constructor(private _AuthService:AuthService){};
@Input() userImg: string = '';
UserProfImg=JSON.parse(sessionStorage.getItem("LoggedInUser")!).picture;
name=JSON.parse(sessionStorage.getItem("LoggedInUser")!).name;

items = ['Home', 'TV Show', 'News & popular', 'Featured','My List','Browse By Language']; 
SignOut(){
  this._AuthService.SignOut();
  sessionStorage.removeItem("LoggedInUser")
  //this._Router.navigate(['/login']);
}
}
