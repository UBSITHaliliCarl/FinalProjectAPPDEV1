import { Routes } from '@angular/router';
import { Login } from './login/login';
import { inventoryList } from './inventory-list/inventory-list';
import { PartsPreview } from './parts-preview/parts-preview';

export const routes: Routes = [
  {
    path: 'login',
    component: Login,
    title: "Login | Carl² Enterprises Inventory"
  },
  {
    path: 'dashboard',
    component: inventoryList,
    title: "Dashboard | Carl² Enterprises Inventory"
  },
  { 
    path: 'preview-catalog', 
    component: PartsPreview,
    title: "Parts | Carl² Enterprises Inventory"
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];