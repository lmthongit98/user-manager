import { UserService } from './services/user.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit, OnDestroy{

  login = false;
  subscription: Subscription;

  constructor(private userService : UserService){
    this.subscription = this.userService.getLoginStatus()
    .subscribe(isLogin => this.login = isLogin);
  }

  ngOnInit(): void {

  }

  title = 'user-manager';



  onLogout(){
    this.userService.sendLoginStatus(false);
    localStorage.clear();
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
}

}
