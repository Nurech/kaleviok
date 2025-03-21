import { createReducer, on, createFeature } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as FileActions from './files.actions';
import { AppFile } from './files.model';

export const featureKey = 'files';

export const adapter: EntityAdapter<AppFile> = createEntityAdapter<AppFile>({
    selectId: (file) => file.id
});

export interface State extends EntityState<AppFile> {
    loading: boolean;
    error: any;
}

export const initialState: State = adapter.getInitialState({
    loading: false,
    error: null
});

const filesReducer = createReducer(
    initialState,
    on(FileActions.uploadFile, (state) => ({ ...state, loading: true, error: null })),
    on(FileActions.uploadFileSuccess, (state, { payload }) => adapter.upsertOne(payload, { ...state, loading: false })),
    on(FileActions.uploadFileFailure, (state, { error }) => ({ ...state, loading: false, error })),
    on(FileActions.deleteFile, (state) => ({ ...state, loading: true })),
    on(FileActions.deleteFileSuccess, (state, { payload }) => adapter.removeOne(payload.id, { ...state, loading: false })),
    on(FileActions.deleteFileFailure, (state, { error }) => ({ ...state, loading: false, error })),
    on(FileActions.downloadFile, (state) => ({ ...state, loading: true })),
    on(FileActions.downloadFileSuccess, (state) => ({ ...state, loading: false })),
    on(FileActions.downloadFileFailure, (state, { error }) => ({ ...state, loading: false, error })),
    on(FileActions.addFile, (state, { payload }) => adapter.upsertOne(payload, state)),
    on(FileActions.updateFile, (state, { fileId, changes }) => adapter.updateOne({ id: fileId, changes }, state)),
    on(FileActions.downloadFilesByEventIdSuccess, (state, { payload }) => adapter.addMany(payload, state)),
    on(FileActions.fileRefAdded, (state, { payload }) => adapter.addOne(payload, state)),
    on(FileActions.fileRefModified, (state, { payload }) => adapter.updateOne({ id: payload.id, changes: payload }, state)),
    on(FileActions.fileRefDeleted, (state, { fileId }) => adapter.removeOne(fileId, state))
);

export const filesFeature = createFeature({
    name: featureKey,
    reducer: filesReducer
});
