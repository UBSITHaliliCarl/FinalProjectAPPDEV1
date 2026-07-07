import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // 1. Added ChangeDetectorRef import
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { InventoryService, InventoryItem } from '../inventory-service';

@Component({
  selector: 'app-inventory-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './inventory-list.html',
  styleUrls: ['./inventory-list.css']
})
export class inventoryList implements OnInit {
  items: InventoryItem[] = [];
  currentItem: InventoryItem = this.clearForm();

  constructor(
    private inventoryService: InventoryService,
    private router: Router,
    private cdr: ChangeDetectorRef // 2. Injected the Change Detector here
  ) {}

  ngOnInit(): void {
    this.fetchInventory();
  }

  fetchInventory(): void {
    this.inventoryService.getItems().subscribe(data => {
      this.items = data;
      this.cdr.detectChanges(); // 3. Forces Angular to draw the items to your screen immediately!
    });
  }

  onSubmit(): void {
    if (this.currentItem._id) {
      this.inventoryService.updateItem(this.currentItem._id, this.currentItem).subscribe(() => {
        this.fetchInventory();
        this.currentItem = this.clearForm();
      });
    } else {
      this.inventoryService.addItem(this.currentItem).subscribe(() => {
        this.fetchInventory();
        this.currentItem = this.clearForm();
      });
    }
  }

  onEdit(item: InventoryItem): void {
    this.currentItem = { ...item };
  }

  onDelete(id: string | undefined): void {
    if (id && confirm('⚠️ Are you sure you want to remove this item?')) {
      this.inventoryService.deleteItem(id).subscribe(() => this.fetchInventory());
    }
  }

  onLogout(): void {
    if (confirm('⚠️ Are you sure you want to logout?')) {
      this.router.navigate(['/login']);
    }
  }

  clearForm(): InventoryItem {
    return { sku: '', name: '', category: '', quantity: 0, price: 0 };
  }
}
