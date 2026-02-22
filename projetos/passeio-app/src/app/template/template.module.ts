import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateRoutingModule } from './template-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { CategoriasModule } from '../categorias/categorias.module';

@NgModule({
  // São os componentes que fazem parte desse módulo
  declarations: [
    LayoutComponent
  ],
  // Esses imports servem para todos os componentes do módulo 
  imports: [
    CommonModule,
    TemplateRoutingModule,
    CategoriasModule
]
})
export class TemplateModule { }
