# KaleviOK project

## Environments

### dev

```bash
npm run start:dev
```

### prod

```bash
npm run start:prod
```

### Run locally

Ensure .env (not in git - secret!) file is present in the root of the project. At build time we replace values from `.env` file to `environmentDev.ts` file (dev or prod) based on the environmentDev.

Run the following command to start the project locally.

```bash
npm install
npm start
```

Open browser at http://localhost:4200

### Project structure

# Schematics

Provide a way to generate feature modules with ngrx store, actions, effects, reducers, selectors and service. This helps to keep the codebase consistent and reduces the time to create new feature modules and keeps the codebase consistent.

Located in `<root>/generate-store` they need to be installed first. If not already installed run `npm install` at project root, it should install and link the schematics package.
Manually it would look like this:

```bash
cd generate-store
npm install
npm run build
npm link
cd..
npm install --save-dev ./generate-store
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

## Helpful commands

```bash
ng generate component foo --standalone --skip-tests
ng generate service bar --skip-tests
npm start
npm start:prod
ng serve
$ openssl req -x509 -newkey rsa:2048 -nodes -keyout localhost.key -out localhost.crt -days 9999 -subj "//CN=localhost"
ng serve --configuration=production --host 0.0.0.0 --ssl --ssl-cert localhost.crt --ssl-key localhost.key
```
