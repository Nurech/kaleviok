import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as FileActions from './files.actions';
import { FilesService } from './files.service';
import { deleteFile, downloadFilesByEventId } from './files.actions';

@Injectable()
export class FilesEffects {
    private actions$ = inject(Actions);
    private filesService = inject(FilesService);

    uploadFile$ = createEffect(() =>
        this.actions$.pipe(
            ofType(FileActions.uploadFile),
            switchMap(({ payload }) =>
                this.filesService.uploadFile(payload).pipe(
                    map((uploadedFile) => FileActions.uploadFileSuccess({ payload: uploadedFile })),
                    catchError((error) => of(FileActions.uploadFileFailure({ error })))
                )
            )
        )
    );

    downloadFilesByEventId$ = createEffect(() =>
        this.actions$.pipe(
            ofType(downloadFilesByEventId),
            switchMap(({ eventId }) =>
                this.filesService.downloadFilesByEventId(eventId).pipe(
                    map((files) => FileActions.downloadFilesByEventIdSuccess({ payload: files })),
                    catchError((error) => of(FileActions.downloadFilesByEventIdFailure({ error })))
                )
            )
        )
    );

    deleteFile$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteFile),
            switchMap(({ payload }) =>
                this.filesService.deleteFile(payload.id).pipe(
                    map(() => FileActions.deleteFileSuccess({ payload })),
                    catchError((error) => of(FileActions.deleteFileFailure({ error })))
                )
            )
        )
    );
}
