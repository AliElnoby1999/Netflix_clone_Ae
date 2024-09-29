import { Component } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Component({
  selector: 'app-authgurd',
  templateUrl: './authgurd.component.html',
  styleUrls: ['./authgurd.component.scss']
})
export class AuthgurdComponent  implements CanActivate  {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = !!sessionStorage.getItem('LoggedInUser');
    if (isLoggedIn) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
