import { Routes } from '@angular/router';
import { inventoryList } from './inventory-list/inventory-list';

export const routes: Routes = [
    { 
        path: '', 
        component: inventoryList 
        title: "Dashboard | Carl² Enterprises Inventory"
    },
    { 
        path: '**', 
        redirectTo: '' 
    }
];
