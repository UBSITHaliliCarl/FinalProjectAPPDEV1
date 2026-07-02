import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { InventoryService, InventoryItem } from '../inventory-service';

@Component({
  selector: 'app-parts-preview',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './parts-preview.html',
  styleUrls: ['../inventory-list/inventory-list.css']
})
export class PartsPreview implements OnInit {
  previewCatalog: Omit<InventoryItem, '_id'>[] = [
    { sku: 'AMD-5700X3D', name: 'AMD Ryzen 7 5700X3D Processor', category: 'Processors', quantity: 15, price: 14500 },
    { sku: 'NV-RTX4070S', name: 'NVIDIA GeForce RTX 4070 Super 12GB', category: 'Graphics Cards', quantity: 8, price: 42000 },
    { sku: 'MSI-B650M-P', name: 'MSI PRO B650M-P DDR5 Motherboard', category: 'Motherboards', quantity: 12, price: 8250 },
    { sku: 'AMD-7800X3D', name: 'AMD Ryzen 7 7800X3D Processor', category: 'Processors', quantity: 5, price: 26500 },
    { sku: 'NV-RTX4060TI', name: 'NVIDIA GeForce RTX 4060 Ti 8GB', category: 'Graphics Cards', quantity: 10, price: 24900 },
    { sku: 'MSI-MAG-A750', name: 'MSI MAG A750GL 750W 80+ Gold Modular PSU', category: 'Power Supplies', quantity: 20, price: 5450 },
    { sku: 'ASUS-STRIX-B', name: 'ROG Strix B650E-F Gaming WiFi Motherboard', category: 'Motherboards', quantity: 6, price: 17500 },
    { sku: 'INTEL-14700K', name: 'Intel Core i7-14700K Processor', category: 'Processors', quantity: 7, price: 25400 },
    { sku: 'NV-RTX4090-O', name: 'NVIDIA GeForce RTX 4090 OC Edition 24GB', category: 'Graphics Cards', quantity: 2, price: 115000 },
    { sku: 'MSI-MAG-C360', name: 'MSI MAG CoreLiquid C360 AIO Liquid Cooler', category: 'Cooling', quantity: 14, price: 6800 },
    { sku: 'AMD-9950X-R', name: 'AMD Ryzen 9 9950X High-End Processor', category: 'Processors', quantity: 4, price: 41200 },
    { sku: 'GASKILL-D5-32', name: 'G.Skill Trident Z5 RGB 32GB DDR5 6000MHz RAM', category: 'Memory Sticks', quantity: 25, price: 7950 }
  ];

  constructor(
    private inventoryService: InventoryService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  quickAddProduct(product: Omit<InventoryItem, '_id'>): void {
    if (confirm(`Do you want to instantly add "${product.name}" to the database?`)) {
      const newItem: InventoryItem = { ...product };
      this.inventoryService.addItem(newItem).subscribe({
        next: () => {
          alert('🎉 Product successfully introduced to live system records!');
        },
        error: (err) => {
          console.error(err);
          alert('❌ Database synchronization failed.');
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}
