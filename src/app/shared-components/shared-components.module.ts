import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockGraphComponent } from './stock-graph/stock-graph.component';



@NgModule({
  declarations: [
    StockGraphComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    StockGraphComponent
  ]
})
export class SharedComponentsModule { }
