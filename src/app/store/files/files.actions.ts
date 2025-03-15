import { createAction, props } from '@ngrx/store';
import { AppFile } from './files.model';

export const uploadFile = createAction('[Files] Upload File', props<{ payload: AppFile }>());
export const uploadFileSuccess = createAction('[Files] Upload File Success', props<{ payload: AppFile }>());
export const uploadFileFailure = createAction('[Files] Upload File Failure', props<{ error: Error }>());

export const addFile = createAction('[Files] Add File', props<{ payload: AppFile }>());
export const updateFile = createAction('[Files] Update File', props<{ fileId: string; changes: Partial<AppFile> }>());

export const deleteFile = createAction('[Files] Delete File', props<{ payload: AppFile }>());
export const deleteFileSuccess = createAction('[Files] Delete File Success', props<{ payload: AppFile }>());
export const deleteFileFailure = createAction('[Files] Delete File Failure', props<{ error: Error }>());

export const downloadFile = createAction('[Files] Download File', props<{ payload: AppFile }>());
export const downloadFileSuccess = createAction('[Files] Download File Success', props<{ payload: AppFile }>());
export const downloadFileFailure = createAction('[Files] Download File Failure', props<{ error: Error }>());

export const downloadFilesByEventId = createAction('[Files] Download Files By Event Id', props<{ eventId: string }>());
export const downloadFilesByEventIdSuccess = createAction('[Files] Download Files By Event Id Success', props<{ payload: AppFile[] }>());
export const downloadFilesByEventIdFailure = createAction('[Files] Download Files By Event Id Failure', props<{ error: Error }>());
