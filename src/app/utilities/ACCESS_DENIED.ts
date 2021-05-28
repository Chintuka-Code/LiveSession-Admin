import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

export class Notification {
  static router: any;

  constructor(private router: Router) {}

  static ACCESS_DENIED() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: `Access Denied. You don't have Enough Permission To access this route`,
    });
  }
}
