import { Routes } from '@angular/router';
import { List } from './features/list/list';

export const routes: Routes = [
    {
        path: '',
        component: List
    },
    {
        path: 'novo-produto',
        loadComponent: () => import('./features/create/create').then(m => m.Create)
    }
];
