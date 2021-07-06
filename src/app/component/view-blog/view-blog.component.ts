import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from 'src/app/service/blog.service';
import { ACTIVE_USER } from 'src/app/utilities/Decode_jwt';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-blog',
  templateUrl: './view-blog.component.html',
  styleUrls: ['./view-blog.component.scss'],
})
export class ViewBlogComponent implements OnInit {
  spinner: boolean = false;
  blog_type_disabled: boolean = true;
  items: any = [{ label: 'Actions', items: [] }];
  items2: any = [{ label: 'Actions', items: [] }];
  menu_type: string;
  user_profile: any;
  blog: any;
  blog_details: any;
  dialog_visible: boolean = false;

  constructor(private router: Router, private blog_service: BlogService) {}

  setMenu() {
    this.spinner = true;
    this.user_profile = ACTIVE_USER();

    if (!this.user_profile.permissions.includes('BLOG00')) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Access Denied',
      });
      this.router.navigate(['/main']);
      return;
    }

    this.get_blog(this.blog_type_disabled);

    this.items[0].items.push({
      label: 'View',
      icon: 'pi pi-eye',
      command: () => {
        this.menu_type = 'view';
      },
    });
    this.items2[0].items.push({
      label: 'View',
      icon: 'pi pi-eye',
      command: () => {
        this.menu_type = 'view';
      },
    });

    if (this.user_profile.permissions.includes('BLOG10')) {
      this.items[0].items.push({
        label: 'Edit',
        icon: 'pi pi-user-edit',
        command: () => {
          this.menu_type = 'edit';
        },
      });
    }

    if (this.user_profile.permissions.includes('BLOG11')) {
      this.items[0].items.push({
        label: 'Unpublished',
        icon: 'pi pi-trash',
        command: () => {
          this.menu_type = 'disabled';
        },
      });
      this.items2[0].items.push({
        label: 'Published',
        icon: 'pi pi-trash',
        command: () => {
          this.menu_type = 'enable';
        },
      });
    }
  }

  get_updated_blog() {
    this.spinner = true;
    this.blog_type_disabled = !this.blog_type_disabled;
    this.get_blog(this.blog_type_disabled);
  }

  get_blog(type) {
    this.blog_service.get_blog(type).subscribe(
      (res: any) => {
        this.blog = res.data;
        this.spinner = false;
        // console.log(this.blog);
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.errorMessage,
        }).then(() => {
          this.spinner = false;
        });
      }
    );
  }

  blog_action(blog) {
    switch (this.menu_type) {
      case 'view':
        this.view_blog_details(blog);
        break;
      case 'edit':
        this.router.navigate(['/main/edit-blog', blog._id]);
        break;
      case 'disabled':
        this.change_blog_status(blog, false);
        break;
      case 'enable':
        this.change_blog_status(blog, true);
        break;

      default:
        console.log('');
    }
  }

  change_blog_status(blog, status) {
    const string = !status ? 'Unpublished' : 'Published';
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to ${string} ${blog.heading}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Yes, ${string} it!`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        blog['published'] = status;

        this.blog_service.published_unpublished_blog(blog).subscribe(
          (res) => {
            Swal.fire(
              `${string}!`,
              `Article has been ${string}`,
              'success'
            ).then(() => {
              this.get_blog(this.blog_type_disabled);
            });
          },
          (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: error.errorMessage,
            }).then(() => {
              this.spinner = false;
            });
          }
        );
      } else {
        this.spinner = false;
      }
    });
  }

  view_blog_details(blog) {
    this.spinner = true;
    this.blog_service.get_blog_details_by_id(blog._id).subscribe(
      (res: any) => {
        this.blog_details = res.data;
        this.spinner = false;
        this.dialog_visible = true;
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.errorMessage,
        }).then(() => {
          this.spinner = false;
        });
      }
    );
  }

  ngOnInit(): void {
    this.setMenu();
  }
}
