import { apply, chain, MergeStrategy, mergeWith, move, Rule, SchematicContext, template, Tree, url } from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';

interface GenerateStoreSchema {
    name: string;
}

// Singularize function
function singular(name: string): string {
    if (name.endsWith('s')) {
        return name.slice(0, -1);
    }
    return name;
}

// Helper function to insert content into a file
function insertToFile(tree: Tree, filePath: string, searchPattern: RegExp, insertContent: string, marker: string): void {
    const buffer = tree.read(filePath);
    if (!buffer) {
        throw new Error(`File ${filePath} does not exist.`);
    }

    const content = buffer.toString('utf-8');
    if (content.includes(marker)) {
        // Avoid adding duplicates
        return;
    }

    const updatedContent = content.replace(searchPattern, `$&\n${insertContent}`);
    tree.overwrite(filePath, updatedContent);
}

// Add reducer and module
function updateRootModule(tree: Tree, name: string): void {
    const dashedName = strings.dasherize(name);
    const reducerImport = `import { ${strings.camelize(name)}Feature } from './${dashedName}/${dashedName}.reducer';`;
    const moduleImport = `import { ${strings.classify(name)}StoreModule } from './${dashedName}/${dashedName}.module';`;

    const reducerEntry = `  ${strings.camelize(name)}: ${name}Feature.reducer,`;
    const moduleEntry = `  ${strings.classify(name)}StoreModule,`;

    // Add imports
    insertToFile(tree, './src/app/store/root.module.ts', /import.*?;/, reducerImport, `${name}Feature.reducer`);
    insertToFile(tree, './src/app/store/root.module.ts', /import.*?;/, moduleImport, `${name}StoreModule`);

    // Add to rootReducers
    insertToFile(tree, './src/app/store/root.module.ts', /const rootReducers: ActionReducerMap<any> = {/, reducerEntry, reducerEntry.trim());

    // Add to featureModules
    insertToFile(tree, './src/app/store/root.module.ts', /const featureModules = \[/, moduleEntry, moduleEntry.trim());
}

// Generate store function
export function generateStore(options: GenerateStoreSchema): Rule {
    return (tree: Tree, _context: SchematicContext) => {
        const folderName = strings.dasherize(options.name);

        const templateSource = apply(url('./files'), [template({ ...strings, ...options, singular }), move(`./src/app/store/${folderName}`)]);

        // Update the root module
        updateRootModule(tree, options.name);

        return chain([mergeWith(templateSource, MergeStrategy.Overwrite)])(tree, _context);
    };
}
