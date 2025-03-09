import { createAction, props } from '@ngrx/store';
import { AppFile, FileStatus } from './files.model';

export const uploadFile = createAction('[Files] Upload File', props<{ payload: AppFile }>());
export const uploadFileSuccess = createAction('[Files] Upload File Success', props<{ payload: AppFile }>());
export const uploadFileFailure = createAction('[Files] Upload File Failure', props<{ error: Error }>());

export const addFile = createAction('[Files] Add File', props<{ payload: AppFile }>());
export const updateFileProgress = createAction(
    '[Files] Update File Progress',
    props<{ fileId: string; progress: number }>()
);
export const updateFileStatus = createAction(
    '[Files] Update File Status',
    props<{ fileId: string; status: FileStatus }>()
);

export const deleteFile = createAction('[Files] Delete File', props<{ payload: AppFile }>());
export const deleteFileSuccess = createAction('[Files] Delete File Success', props<{ payload: AppFile }>());
export const deleteFileFailure = createAction('[Files] Delete File Failure', props<{ error: Error }>());

export const downloadFile = createAction('[Files] Download File', props<{ payload: AppFile }>());
export const downloadFileSuccess = createAction('[Files] Download File Success', props<{ payload: AppFile }>());
export const downloadFileFailure = createAction('[Files] Download File Failure', props<{ error: Error }>());
