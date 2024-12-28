```bash
ng generate @ngrx/schematics:store AppState --root --state-path store/root --minimal --skip-tests --defaults
```

```bash
ng generate @ngrx/schematics:feature store/account --api --entity --flat false --skip-tests --defaults
```

```bash
ng generate component login --standalone
```

```bash
ng generate service snackbar --skip-tests
```

```bash
ng generate component google-login --skip-tests --inline-style --standalone
```

```bash
ng serve --configuration production
```

Https localhost testing if needed

```bash
$ openssl req -x509 -newkey rsa:2048 -nodes -keyout localhost.key -out localhost.crt -days 9999 -subj "//CN=localhost"
ng serve --configuration=production --host 0.0.0.0 --ssl --ssl-cert localhost.crt --ssl-key localhost.key
```

# Schematics
Use the following command to generate a new feature module.

```bash
ng generate ./src/schematics/collection.json:generate-store foo
```

## Add schemactics
Edit source files in ``src/schematics``
