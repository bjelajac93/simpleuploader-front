// Modules
import { Pipe, PipeTransform } from '@angular/core';
// Help Functions
import { formatBytes } from 'src/assets/utils/help-functions';

@Pipe({
  name: 'formatBytes'
})
export class FormatBytesPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    return formatBytes(value);
  }

}
