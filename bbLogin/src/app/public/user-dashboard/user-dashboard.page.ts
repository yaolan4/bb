import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { AuthResponse } from 'src/app/auth/auth-response';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.page.html',
  styleUrls: ['./user-dashboard.page.scss'],
})
export class UserDashboardPage implements OnInit {
  @Input() userEmail = 'decalred ';
  private TOKEN_KEY = 'auth-token';
  userResponse: AuthResponse;
  constructor(private authService: AuthService) {

  }

  ngOnInit() {
    this.userResponse = this.authService.getUserLocalStorage(this.TOKEN_KEY);
    console.log(this.userResponse);
    // console.log(this.navParams.data);
    if (this.userResponse) {
      this.userEmail = this.userResponse.email;
      console.log('user dashboard ', this.userEmail);
    }
  }

  ionViewDidLoad() {
    this.userResponse = this.authService.getUserLocalStorage(this.TOKEN_KEY);
    console.log('user dashboard ', this.userResponse);
    if (this.userResponse) {
      this.userEmail = this.userResponse.getEmail();
    }
  }

  OnChanges(changes: any) {
    console.log(changes);
  }

  logout() {
    this.authService.logout();
  }

}
