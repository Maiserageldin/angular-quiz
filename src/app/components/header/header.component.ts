import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [CommonModule, FormsModule],
})
export class HeaderComponent {
  searchTerm: string = '';
  private searchSubject: Subject<string> = new Subject<string>();

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((term) => {
        this.searchUser(term);
      });
  }

  onSearch(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.searchTerm = inputElement.value;
    this.searchSubject.next(this.searchTerm);
  }

  searchUser(term: string) {
    const id = parseInt(term, 10);
    if (!isNaN(id)) {
      this.userService.getUser(id).subscribe({
        next: (response) => {
          if (response.data) {
            this.router.navigate(['/user', id]);
          } else {
            alert('User not found');
          }
        },
        error: () => {
          alert('Error fetching user data');
        },
      });
    }
  }
}
