import { Injectable } from '@angular/core';

@Injectable()
export class AdminLTE {

    fix() {
        eval('($.AdminLTE.layout ? $.AdminLTE.layout.fix() : "")');
    }
}
