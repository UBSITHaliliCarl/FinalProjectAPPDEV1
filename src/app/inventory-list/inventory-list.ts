import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventoryService, InventoryItem } from '../inventory-service';

@Component({
  selector: 'app-inventory-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inventory-list.html',
  styleUrls: ['./inventory-list.css']
})
export class inventoryList implements OnInit {
  items: InventoryItem[] = [];
  currentItem: InventoryItem = this.clearForm();

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.fetchInventory();
  }

  fetchInventory(): void {
    this.inventoryService.getItems().subscribe(data => this.items = data);
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
    if (id && confirm('Are you sure you want to remove this item?')) {
      this.inventoryService.deleteItem(id).subscribe(() => this.fetchInventory());
    }
  }

  clearForm(): InventoryItem {
    return { sku: '', name: '', category: '', quantity: 0, price: 0 };
  }
}
