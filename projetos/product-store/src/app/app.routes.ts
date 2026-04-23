import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot, Routes } from '@angular/router';
import { List } from './features/list/list';
import { inject } from '@angular/core';
import { ProductsService } from './shared/services/products.service';

export const routes: Routes = [
    {
        path: '',
        component: List
    },
    {
        path: 'novo-produto',
        loadComponent: () => import('./features/create/create').then(m => m.Create)
    },
    {
        path: 'editar-produto/:id',
        resolve: {
            product: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
                const productService = inject(ProductsService);

                return productService.getById(route.params['id']);
            }
        },
        loadComponent: () => import('./features/edit/edit').then(m => m.Edit)
    }
];
