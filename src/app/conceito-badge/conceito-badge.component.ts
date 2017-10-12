import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-conceito-badge',
  templateUrl: './conceito-badge.component.html',
  styleUrls: ['./conceito-badge.component.css']
})
export class ConceitoBadgeComponent implements OnInit {

  @Input()
  public conceito: string;

  constructor() { }

  ngOnInit() {
  }

}
