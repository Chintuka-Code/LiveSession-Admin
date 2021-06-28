import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CustomFieldsService } from 'src/app/service/custom-fields.service';
import { TicketService } from 'src/app/service/ticket.service';
import { ACTIVE_USER } from 'src/app/utilities/Decode_jwt';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-view-ticket',
  templateUrl: './view-ticket.component.html',
  styleUrls: ['./view-ticket.component.scss'],
})
export class ViewTicketComponent implements OnInit {
  user: any;
  spinner: boolean = false;
  ticket_list: any[] = [];
  feilds: any[] = [];
  type: string;
  items: any = [{ label: 'Actions', items: [] }];
  menu_type: string;
  constructor(
    private ticket_service: TicketService,
    private router: Router,
    private custom_fields_service: CustomFieldsService,
    private activated_route: ActivatedRoute
  ) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.user = ACTIVE_USER();
        this.type = this.activated_route.snapshot.params.type;
        this.select_data_type();
      }
    });
  }

  get_all_active_ticket() {
    this.spinner = true;
    this.ticket_service
      .get_all_active_ticket(this.ticket_list.length)
      .subscribe(
        (res: any) => {
          this.ticket_list = res.data;
          this.custom_feilds();
        },
        (error) => this.error_handler(error)
      );
  }

  get_all_close_ticket() {
    this.spinner = true;
    this.ticket_service.get_all_close_ticket(this.ticket_list.length).subscribe(
      (res: any) => {
        this.ticket_list = res.data;
        this.custom_feilds();
      },
      (error) => this.error_handler(error)
    );
  }

  get_my_category_all_active_ticket() {
    this.spinner = true;
    this.ticket_service
      .get_my_category_all_active_ticket(this.ticket_list.length)
      .subscribe(
        (res: any) => {
          this.ticket_list = res.data;
          this.custom_feilds();
        },
        (error) => this.error_handler(error)
      );
  }

  get_my_category_all_close_ticket() {
    this.spinner = true;
    this.ticket_service
      .get_my_category_all_close_ticket(this.ticket_list.length)
      .subscribe(
        (res: any) => {
          this.ticket_list = res.data;
          this.custom_feilds();
        },
        (error) => this.error_handler(error)
      );
  }

  select_data_type() {
    if (this.user.ticket_permission.includes('CVAAT00')) {
      this.type === 'active'
        ? this.get_all_active_ticket()
        : this.get_all_close_ticket();
    } else if (this.user.ticket_permission.includes('CVMCAAT00')) {
      this.type === 'active'
        ? this.get_my_category_all_active_ticket()
        : this.get_my_category_all_close_ticket();
    } else {
    }
  }

  error_handler(error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error.errorMessage,
    }).then(() => {
      this.spinner = false;
      this.router.navigate(['/main']);
    });
  }

  custom_feilds() {
    this.custom_fields_service
      .get_fields_for_tables(false)
      .subscribe((res: any) => {
        this.feilds = res.data;
        this.spinner = false;
      });
  }

  setMenu() {
    this.items[0].items.push({
      label: 'View',
      icon: 'pi pi-eye',
      command: () => {
        this.menu_type = 'view';
      },
    });
  }

  update_menu(ticket) {
    switch (this.menu_type) {
      case 'view':
        this.router.navigate(['/main/ticket-details', ticket._id]);
        break;

      default:
        console.log('');
    }
  }
  ngOnInit(): void {
    this.setMenu();
  }
}
