import { Routes } from '@angular/router';
import { Consulta } from './consulta/consulta';
import { Cadastro } from './cadastro/cadastro';
import { APP_ROUTES } from './constants/APP_ROUTES';

export const routes: Routes = [
    {
        path: APP_ROUTES.CLIENTES.ROOT,
        children: [
            { path: '', component: Consulta },
            { path: APP_ROUTES.CLIENTES.CADASTRO, component: Cadastro },
            { path: APP_ROUTES.CLIENTES.EDITAR, component: Cadastro }
        ]
    }
];

