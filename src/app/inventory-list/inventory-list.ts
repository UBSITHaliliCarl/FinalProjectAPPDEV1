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
export class InventoryList implements OnInit {
  items: InventoryItem[] = [];
  newItem: InventoryItem = { name: '', sku: '', quantity: 0, price: 0, category: '' };

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.loadInventory();
  }

  loadInventory(): void {
    this.inventoryService.getItems().subscribe({
      next: (data) => this.items = data,
      error: (err) => console.error('Error fetching dashboard records:', err)
    });
  }

  submitItem(): void {
    if (!this.newItem.name || !this.newItem.sku) return;
    
    this.inventoryService.addItem(this.newItem).subscribe(() => {
      this.loadInventory();
      this.newItem = { name: '', sku: '', quantity: 0, price: 0, category: '' };
    });
  }

  deleteItem(id: string | undefined): void {
    if (!id) return;
    this.inventoryService.deleteItem(id).subscribe(() => this.loadInventory());
  }
}