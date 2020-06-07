import { NgModule } from '@angular/core';
import { PipesModule } from 'src/app/core/pipes/pipes.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { ViewPage } from './view.page';

const routes: Routes = [
  {
    path: '',
    component: ViewPage
  }
];

@NgModule({
  imports: [SharedModule, PipesModule, RouterModule.forChild(routes)],
  declarations: [ViewPage]
})
export class ViewPageModule {}
