````bash
ng generate @ngrx/schematics:store AppState --root --state-path store/root --minimal --skip-tests --defaults
````

````bash
ng generate @ngrx/schematics:feature store/account --api --entity --flat false --skip-tests --defaults
````

````bash
ng generate component login --standalone
````

````bash
ng generate service snackbar  --skip-tests 
````

````bash
ng generate component google-login --skip-tests --inline-style --standalone
````
