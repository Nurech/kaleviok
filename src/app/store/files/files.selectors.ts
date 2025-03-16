import { createSelector } from '@ngrx/store';
import { filesFeature, adapter } from './files.reducer';
import { selectCurrentEventId } from '../router/router.selectors';

export const selectFilesState = filesFeature.selectFilesState;

export const {
    selectIds: selectFileIds,
    selectEntities: selectFileEntities,
    selectAll: selectAll,
    selectTotal: selectTotalFiles
} = adapter.getSelectors(selectFilesState);

export const selectFileById = (id: string) => createSelector(selectFileEntities, (files) => files[id]);
export const selectAllFiles = createSelector(selectAll, (files) => files);
export const selectAllEventFiles = createSelector(selectAllFiles, selectCurrentEventId, (files = [], eventId) =>
    files ? files.filter((file) => file.eventId === eventId) : []
);
