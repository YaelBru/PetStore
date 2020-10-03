import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'changeFormat'
})
export class ChangeFormatPipe implements PipeTransform {

  transform(value: any): any {

    const transformed = value.toUpperCase().split('-').join(' ');

    return transformed;
  }

}
