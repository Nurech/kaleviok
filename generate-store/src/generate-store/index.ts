import { apply, chain, mergeWith, move, Rule, SchematicContext, template, Tree, url } from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';
import schemaJson from './schema.json';
type GenerateStoreSchema = typeof schemaJson;

export function generateStore(options: GenerateStoreSchema): Rule {
  console.log('Options received:', options); // Debug logging
  return (tree: Tree, _context: SchematicContext) => {
    const templateSource = apply(url('./files'), [
      template({ ...strings, ...options }),
      move(`src/app/${strings.dasherize(options.name)}`),
    ]);

    return chain([mergeWith(templateSource)])(tree, _context);
  };
}
