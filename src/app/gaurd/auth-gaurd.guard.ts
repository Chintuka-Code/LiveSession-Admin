import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthGaurdGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const uid = localStorage.getItem('uid');
    if (uid) {
      return true;
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please Login',
      }).then(() => this.router.navigate(['']));
      return false;
    }
  }
}
