import { Routes } from '@angular/router';
import { List } from './features/list/list';
import { getProductsResolver } from './shared/resolvers/get-products.resolver';
import { getProductResolver } from './shared/resolvers/get-product.resolver';

export const routes: Routes = [
    {
        path: '',
        component: List,
        resolve: {
            products: getProductsResolver
        },
    },
    {
        path: 'novo-produto',
        loadComponent: () => import('./features/create/create').then(m => m.Create)
    },
    {
        path: 'editar-produto/:id',
        resolve: {
            product: getProductResolver
        },
        loadComponent: () => import('./features/edit/edit').then(m => m.Edit)
    }
];
