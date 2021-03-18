import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username = '';
  public password = '';
  public errorLogin = false;

  constructor(private router: Router, public userService: UserService) { }

  ngOnInit(): void {
  }

  onLogin(){
    if(this.username == 'admin' && this.password =='admin'){
      this.errorLogin = false;
      this.userService.sendLoginStatus(true);
      localStorage.setItem('username', 'admin');
      this.router.navigate(['/users']);


    }else{
      this.errorLogin = true;
      console.log("dasda");
    }
  }

}
