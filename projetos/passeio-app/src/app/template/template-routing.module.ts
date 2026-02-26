import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'categorias',
        loadChildren: () => import('../categorias/categorias.module')
          .then(module => module.CategoriasModule),
        pathMatch: 'full',
        data: { title: "Categorias" }
      },
      {
        path: 'lugares',
        loadChildren: () => import('../lugares/lugares.module')
          .then(module => module.LugaresModule),
        pathMatch: 'full',
        data: { title: "Lugares" }
      },
      {
        path: 'galeria',
        loadChildren: () => import('../galeria/galeria.module')
          .then(module => module.GaleriaModule),
        pathMatch: 'full',
        data: { title: "Galeria" }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplateRoutingModule { }
