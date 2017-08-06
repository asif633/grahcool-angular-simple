import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  currentUserId: any;

  constructor(private logServ: LoginService, private router: Router) { }

  ngOnInit() {
    this.logServ.getCurrentLoggedIn().subscribe(({ data }) => {
      if(data.user)
      this.currentUserId = data.user.id
    });
  }

  logout() {
    window.localStorage.removeItem('token');
    window.location.reload()
    this.router.navigate(['']);
  }

}
