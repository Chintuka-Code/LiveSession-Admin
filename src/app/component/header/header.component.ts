import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router) {}

  show_aside() {
    const arrow = document.querySelector('.arrow');
    document.querySelector('body').classList.toggle('sidebar-hidden');
    arrow.classList.toggle('arrow-swing');
  }

  logout() {
    localStorage.clear();
    Swal.fire({
      icon: 'success',
      title: 'Logout',
    }).then(() => this.router.navigate(['']));
  }

  ngOnInit(): void {}
}
