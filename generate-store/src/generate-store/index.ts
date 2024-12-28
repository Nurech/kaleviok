import { apply, chain, mergeWith, move, Rule, SchematicContext, template, Tree, url } from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';
import schemaJson from './schema.json';

type GenerateStoreSchema = typeof schemaJson;

export function generateStore(options: GenerateStoreSchema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const folderName = strings.dasherize(options.name); // Generate folder name relative to the current path

    const templateSource = apply(url('./files'), [
      template({ ...strings, ...options }),
      move(`./src/app/store/${folderName}`), // Ensure the folder is created in the current working directory
    ]);

    return chain([mergeWith(templateSource)])(tree, _context);
  };
}
