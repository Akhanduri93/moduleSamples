import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
    name: 'iban'
})
export class IbanPipe implements PipeTransform {
    transform(value: any): string {
        value = value.toString().trim().replace(/^\+/, '');
        return value.slice(0, 3) + ' ' + value.slice(3, 6) + ' ' + value.slice(6, 9);
    }
}
