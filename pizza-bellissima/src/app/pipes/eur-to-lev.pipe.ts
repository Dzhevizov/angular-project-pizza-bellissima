import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'eurToLev', standalone: true })
export class EurToLevPipe implements PipeTransform {
  private readonly RATE = 1.95583;

  transform(eur: number): string {
    return (eur * this.RATE).toFixed(2);
  }
}
