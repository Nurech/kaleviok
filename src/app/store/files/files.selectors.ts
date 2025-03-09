import { createSelector } from '@ngrx/store';
import { filesFeature, adapter } from './files.reducer';

export const selectFilesState = filesFeature.selectFilesState;

export const {
    selectIds: selectFileIds,
    selectEntities: selectFileEntities,
    selectAll: selectAll,
    selectTotal: selectTotalFiles
} = adapter.getSelectors(selectFilesState);

export const selectFileById = (id: string) => createSelector(selectFileEntities, (files) => files[id]);
export const selectAllFiles = createSelector(selectAll, (files) => files);
