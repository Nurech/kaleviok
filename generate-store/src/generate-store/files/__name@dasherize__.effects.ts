import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import * as <%= classify(name) %>Actions from './<%= dasherize(name) %>.actions';
import { <%= classify(name) %>Service } from './<%= dasherize(name) %>.service';

@Injectable()
export class <%= classify(name) %>Effects {
    constructor(private actions$: Actions, private service: <%= classify(name) %>Service) {}

}
