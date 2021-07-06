import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CustomFieldsService } from 'src/app/service/custom-fields.service';
import { TicketService } from 'src/app/service/ticket.service';

@Component({
  selector: 'app-my-tickets',
  templateUrl: './my-tickets.component.html',
  styleUrls: ['./my-tickets.component.scss'],
})
export class MyTicketsComponent implements OnInit {
  spinner: boolean = false;
  ticket_list: any[] = [];
  type: string;
  items: any = [{ label: 'Actions', items: [] }];
  feilds: any[] = [];
  menu_type: string;

  constructor(
    private ticket_service: TicketService,
    private activated_route: ActivatedRoute,
    private router: Router,
    private custom_fields_service: CustomFieldsService
  ) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.type = this.activated_route.snapshot.params.type;
        this.type === 'active'
          ? this.get_my_ticket()
          : this.get_my_close_ticket();
      }
    });
  }

  get_my_ticket() {
    this.ticket_service
      .get_my_active_ticket(this.ticket_list.length)
      .subscribe((res: any) => {
        this.ticket_list = res.data;
        // console.log(this.ticket_list);
        this.custom_feilds();
      });
  }

  get_my_close_ticket() {
    this.ticket_service
      .get_my_close_ticket(this.ticket_list.length)
      .subscribe((res: any) => {
        this.ticket_list = res.data;
        this.custom_feilds();
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
      // console.log('');
    }
  }

  ngOnInit(): void {
    this.setMenu();
  }
}
