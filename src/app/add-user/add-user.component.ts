import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(private userService: UserService){}

  user = {
    name: '',
    phone: '',
    email: '',
    title: ''
  }


  userForm = new FormGroup({})

  ngOnInit(): void {
    this.userForm = new FormGroup({
      name: new FormControl(this.user.name, [
        Validators.required,
        Validators.minLength(6),
      ]),
      phone: new FormControl(this.user.phone,
        [
          Validators.required,
          Validators.minLength(10),
        ]),
      email: new FormControl(this.user.email, Validators.required),
      title: new FormControl(this.title, Validators.required)
    });

  }

  get name() { return this.userForm.get('name'); }

  get email() { return this.userForm.get('email'); }

  get phone() { return this.userForm.get('phone') }

  get title() { return this.userForm.get('title') }

  onSubmit() {
    this.userService.addUser(this.userForm.value as User)
    .subscribe(user => alert('Added user ' + user.name + 'successfuly !'));
  }
}
