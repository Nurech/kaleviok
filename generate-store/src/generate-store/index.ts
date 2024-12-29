import { apply, chain, mergeWith, move, Rule, SchematicContext, template, Tree, url } from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';
import schemaJson from './schema.json';

type GenerateStoreSchema = typeof schemaJson;

function singular(name: string): string {
  if (name.endsWith('s')) {
    return name.slice(0, -1);
  }
  return name;
}

export function generateStore(options: GenerateStoreSchema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const folderName = strings.dasherize(options.name); // Generate folder name relative to the current path

    const templateSource = apply(url('./files'), [
      template({ ...strings, ...options, singular }),
      move(`./src/app/store/${folderName}`), // Ensure the folder is created in the current working directory
    ]);

    return chain([mergeWith(templateSource)])(tree, _context);
  };
}
