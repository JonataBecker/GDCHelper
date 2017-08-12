import {DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl} from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  public title;

  constructor(sanitizer: DomSanitizer) {
      this.title = sanitizer.bypassSecurityTrustHtml('<button id="t">sadsad</button>');
    }

    ola() {
      alert("Ola mooormaaa");
    }


    ngOnInit() {
      setTimeout(function() {
        document.getElementById("t").addEventListener("click", function() {
          alert("Ola mooormaaa, pelo event");

        })

    });
    }
}
