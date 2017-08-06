import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import 'rxjs/add/operator/toPromise';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  
  email: string;
  password: string;
  currentUserId: any;
  msg: any;

  constructor(private logServ: LoginService, private router: Router) { }

  ngOnInit() {
    this.logServ.getCurrentLoggedIn().subscribe( ({data}) => this.currentUserId = data.id);
  }

  signin(){
    this.logServ.signIn({email: this.email, password: this.password})
    .toPromise().then(
      (response:any) => localStorage.setItem('token',response.data.signinUser.token)
    ).then(
      () => this.logServ.getCurrentLoggedIn().subscribe( ({data}) => { 
        this.currentUserId = data.user.id
      }
      )
    )
    .then( () => this.router.navigate(['dashboard']) )
    .catch(
      (error) => console.log(error.toString())
    );
  }

}
