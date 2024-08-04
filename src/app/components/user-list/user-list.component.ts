import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  standalone: true,
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  imports: [CommonModule, FormsModule, MatPaginatorModule],
})
export class UserListComponent implements OnInit {
  users: User[] = []; // Array of User
  totalUsers = 0;
  pageSize = 6;
  currentPage = 1;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.userService.getUsers(this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        this.users = response.data;
        this.totalUsers = response.total;
      },
      error: () => {
        alert('Error fetching users');
      },
    });
  }

  navigateToUser(id: number) {
    this.router.navigate(['/user', id]);
  }

  handlePageEvent(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.fetchUsers(); // Refetch users for the current page
  }
}
