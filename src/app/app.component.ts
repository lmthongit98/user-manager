import { UserService } from './services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit{

  isLogin = {
    isLogin: false
  }




  constructor(private userService : UserService){
    this.isLogin = this.userService.login_status;
  }

  ngOnInit(): void {

  }

  title = 'user-manager';



  onLogout(){
    this.isLogin.isLogin = false;
    localStorage.clear();
  }

}
