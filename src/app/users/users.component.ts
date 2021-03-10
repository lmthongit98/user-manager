import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public users : User[] = [];

  constructor( private userService : UserService ) {  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers():void{
    this.userService.getUsers().subscribe(users => this.users = users);
  }

  deleteUser(user:User){
    confirm('Are you sure you want to delete ' + user.name + ' ?') ? this.userService.deleteUser(user.id).subscribe(() => {
      this.users = this.users.filter(u => u != user);
    }) : -1;
  }

}
