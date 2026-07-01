import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['../inventory-list/inventory-list.css']
})
export class Login {
  username = '';
  password = '';

  constructor(private router: Router) {}

  onLogin(): void {
    if (this.username && this.password) {
      this.router.navigate(['/dashboard']);
    }
  }
}
