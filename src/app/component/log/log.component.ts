import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HTTP_Response } from 'src/app/Interface/http_response';
import { LOG } from 'src/app/Interface/log';
import { LogService } from 'src/app/service/log.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss'],
})
export class LogComponent implements OnInit {
  spinner: boolean = false;
  logs: any[] = [];
  raw_logs: any[] = [];
  constructor(private log_service: LogService, private router: Router) {}

  onScroll() {
    this.get_logs(this.raw_logs.length, false);
  }

  get_logs(length: number, spinner: boolean) {
    this.spinner = spinner;
    this.log_service.get_logs(length).subscribe(
      (res: HTTP_Response<LOG[]>) => {
        const data = this.raw_logs.concat(res.data);
        this.raw_logs = data;
        console.log(this.raw_logs);
        this.logs = this.group_by_date(this.raw_logs);
        this.spinner = false;
      },
      (error) => this.error_handler(error)
    );
  }

  group_by_date(data) {
    const groups = data.reduce((groups, log) => {
      const date = log.createdAt.split('T')[0];
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(log);
      return groups;
    }, {});

    // Edit: to add it in the array format instead
    const groupArrays = Object.keys(groups).map((date) => {
      return {
        date,
        data: groups[date],
      };
    });
    return groupArrays;
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

  ngOnInit(): void {
    this.get_logs(0, true);
  }
}
