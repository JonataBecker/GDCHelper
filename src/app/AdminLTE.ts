import { Injectable } from '@angular/core';

@Injectable()
export class AdminLTE {

    /**
     * Ajusta o layout
     */
    fix() {
        eval('($.AdminLTE.layout ? $.AdminLTE.layout.fix() : "")');
    }
}
