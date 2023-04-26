import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFIx'
})
export class DateFIxPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.replace('to','<span class="text-secondary font2">to</span>')

  }

}
