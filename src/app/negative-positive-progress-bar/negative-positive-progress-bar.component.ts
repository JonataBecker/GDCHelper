import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-negative-positive-progress-bar',
  templateUrl: './negative-positive-progress-bar.component.html',
  styleUrls: ['./negative-positive-progress-bar.component.css']
})
export class NegativePositiveProgressBarComponent {

  @Input()
  public title:string = "";
  @Input()
  public value:number = 0;
  private positiveValue: number;
  private negativeValue: number;

  constructor() {

  }

  ngDoCheck() {
    this.positiveValue = Math.max(this.value, 0);
    this.negativeValue = Math.min(this.value, 0);
  }

}
