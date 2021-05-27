import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  ActivatedRoute,
} from '@angular/router';
import { Observable } from 'rxjs';
import { PermissionService } from '../service/permission.service';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root',
})
export class RoleGaurdGuard implements CanActivate {
  constructor(private permission_service: PermissionService) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let roles = route.data;
    const check = await this.permission_service.check_role(roles.role);
    if (!check) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Access Denied',
      });
    }
    return check ? true : false;
  }
}
