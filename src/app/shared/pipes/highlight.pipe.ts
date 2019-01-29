import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight'
})

export class HighlightSearchPipe implements PipeTransform {

  transform(value: any, args: any): any {
    // var regex = /[^a-z^A-z^0-9^ ]/;
    // args.replace(regex, '');

    if (args === '') {
      return value;
    }

    const re = new RegExp(args, 'gi'); // 'gi' for case insensitive and can use 'g' if you want the search to be case sensitive.
    return value.replace(re, '<b>' + args + '</b>');
  }
}
