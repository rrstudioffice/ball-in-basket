import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '../core/pipes/pipes.module';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@NgModule({
  exports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule, PipesModule]
})
export class SharedModule {}
