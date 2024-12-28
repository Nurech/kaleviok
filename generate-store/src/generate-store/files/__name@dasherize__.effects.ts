// @ts-nocheck
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { <%= classify(name) %>Actions } from './<%= dasherize(name) %>.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { <%= classify(name) %>Service } from './<%= dasherize(name) %>.service';

@Injectable()
export class <%= classify(name) %>Effects {
  constructor(private actions$: Actions, private <%= camelize(name) %>Service: <%= classify(name) %>Service) {}

  load<%= classify(name) %>$ = createEffect(() =>
    this.actions$.pipe(
      ofType(<%= classify(name) %>Actions.load<%= classify(name) %>),
      mergeMap(() =>
        this.<%= camelize(name) %>Service.getAll().pipe(
          map((data) => <%= classify(name) %>Actions.load<%= classify(name) %>Success({ data })),
          catchError((error) => of(<%= classify(name) %>Actions.load<%= classify(name) %>Failure({ error })))
        )
      )
    )
  );
}
