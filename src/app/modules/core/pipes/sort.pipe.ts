// Modules
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(values: any[], key: string): any[] {
    if (!Array.isArray(values) || values.length <= 0) {
      return [];
    }

    return values.sort((a: any, b: any) => {
      return b[key] - a[key];
    });
  }

}
