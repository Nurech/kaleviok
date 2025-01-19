import * as path from 'path';
import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';

const collectionPath = path.join(__dirname, '../collection.json');

describe('generate-store', () => {
    it('works', async () => {
        const runner = new SchematicTestRunner('schematics', collectionPath);
        const tree = await runner.runSchematic('generate-store', { name: 'test-store' }, Tree.empty());

        expect(tree.files).toContain('/src/app/test-store/test-store.actions.ts');
    });
});
