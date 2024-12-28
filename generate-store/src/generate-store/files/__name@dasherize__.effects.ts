import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { load<%= classify(name) %>, load<%= classify(name) %>Success, load<%= classify(name) %>Failure } from './<%= dasherize(name) %>.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { <%= classify(name) %>Service } from './<%= dasherize(name) %>.service';

@Injectable()
export class <%= classify(name) %>Effects {
  private actions$ = inject(Actions);
  private <%= camelize(name) %>Service = inject(<%= classify(name) %>Service);

  load<%= classify(name) %>$ = createEffect(() =>
    this.actions$.pipe(
      ofType(load<%= classify(name) %>),
      mergeMap(() =>
        this.<%= camelize(name) %>Service.getAll().pipe(
          map((data) => load<%= classify(name) %>Success({ data })),
          catchError((error) => of(load<%= classify(name) %>Failure({ error })))
        )
      )
    )
  );
}
