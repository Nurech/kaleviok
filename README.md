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

Provide a way to generate feature modules with ngrx store, actions, effects, reducers, selectors and service. This helps to keep the codebase consistent and reduces the time to create new feature modules and keeps the codebase consistent.

### To install

From project root navigate to `<root>/generate-store` install and link the schematics package.

```bash
cd generate-store
npm install
npm run build
npm link
```

Go to project `<root>` and install the schematics package.

```bash
cd..
npm install --save-dev ./generate-store
```

Use the following command to generate a new feature module.

```bash
ng g generate-store:generate-store foo
```

### Add upgrades to

Edit source files in `<root>/generate-store`
