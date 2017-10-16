import { Directive, ElementRef, HostListener, Input, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appSort]'
})
export class SortDirective {

  @Input() sortColumn: any;
  @Input() appSort: any;
  @Output() onSort: EventEmitter<number> = new EventEmitter<number>();

  constructor(private el: ElementRef) { }

  @HostListener('click', ['$event']) onClick(event) {
    let indexAsc = this.appSort.indexOf(this.sortColumn + '+');
    let indexDesc = this.appSort.indexOf(this.sortColumn + '-');
    if (!event.shiftKey) {
      this.appSort.splice(0, this.appSort.length);
    }
    if (indexAsc < 0 && indexDesc < 0) {
      this.appSort.push(this.sortColumn + '+');
    } else {
      if (indexAsc >= 0) {
        this.appSort[indexAsc] = this.sortColumn + '-';
      } else {
        this.appSort.splice(indexDesc, 1);
      }
    }
    this.onSort.emit();
  }

}
