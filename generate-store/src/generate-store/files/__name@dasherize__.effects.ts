import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import * as <%= classify(name) %>Actions from './<%= dasherize(name) %>.actions';
import { <%= classify(name) %>Service } from './<%= dasherize(name) %>.service';

@Injectable()
export class <%= classify(name) %>Effects {
    constructor(private actions$: Actions, private service: <%= classify(name) %>Service) {}

    loadAll$ = createEffect(() =>
        this.actions$.pipe(
            ofType(<%= classify(name) %>Actions.load),
            mergeMap(() =>
                this.service.getAll().pipe(
                    map((data) => <%= classify(name) %>Actions.loadSuccess({ payload: data })),
                    catchError((error) => of(<%= classify(name) %>Actions.loadFailure({ error })))
                )
            )
        )
    );
}
