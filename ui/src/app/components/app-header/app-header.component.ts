import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {
  isLoggedIn = false;

  constructor(
    private readonly userService: UserService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.userService.checkUserAccess();

    /**
     * Events
     */
    this.userService.onUserLoggedIn.subscribe(
      this.handleOnUserLoggedIn.bind(this)
    );

    this.userService.onUserLoggedOut.subscribe(
      this.handleOnUserLoggedOut.bind(this)
    );
  }

  private handleOnUserLoggedIn(accessToken: string) {
    console.log('User logged in', accessToken);
    this.isLoggedIn = true;
  }

  private handleOnUserLoggedOut() {
    this.isLoggedIn = false;
  }

  public async onLogoutPress() {
    await this.userService.signOut();
    this.router.navigateByUrl('/auth');
  }
}
