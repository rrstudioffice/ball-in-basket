import { Pipe, PipeTransform } from '@angular/core';
import { sumBy } from 'lodash';

@Pipe({
  name: 'sumprice'
})
export class SumpricePipe implements PipeTransform {
  transform(value: any[]) {
    return sumBy(value, 'price');
  }
}
