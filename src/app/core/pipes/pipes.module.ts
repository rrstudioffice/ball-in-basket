import { NgModule } from '@angular/core';
import { SumpricePipe } from './sumprice/sumprice.pipe';
import { MomentPipe } from './moment/moment.pipe';
import { FormatPipe } from './format/format.pipe';

@NgModule({
  declarations: [MomentPipe, FormatPipe, SumpricePipe],
  imports: [],
  exports: [MomentPipe, FormatPipe, SumpricePipe]
})
export class PipesModule {}
