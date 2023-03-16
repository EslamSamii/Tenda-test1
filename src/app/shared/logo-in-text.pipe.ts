import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'logoInText'
})
export class LogoInTextPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    return value.replace('tenda','<span class="font3">tenda</span>').replace('Egypt','<strong class="font2">Egypt</strong>')

  }

}
