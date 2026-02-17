import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateRoutingModule } from './template-routing-module';
import { Layout } from './layout/layout';


@NgModule({
  declarations: [ // São os componentes que fazer parte desse módulo
    Layout
  ],
  imports: [ // Esses imports serve para todos os componentes do módulo 
    CommonModule,
    TemplateRoutingModule
  ]
})
export class TemplateModule { }
