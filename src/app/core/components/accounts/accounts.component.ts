import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Account } from '../../../store/accounts/account.model';
import { selectAllAccounts } from '../../../store/accounts/accounts.selectors';
import { AvatarComponent } from '../../../shared/components/avatar/avatar.component';

@Component({
    selector: 'app-accounts',
    templateUrl: './accounts.component.html',
    styleUrls: ['./accounts.component.scss'],
    imports: [
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatIcon,
        AvatarComponent,
        MatIconButton,
        RouterLink
    ],
    standalone: true
})
export class AccountsComponent implements OnInit {
    displayedColumns: string[] = ['photoUrl', 'firstName', 'lastName', 'edit'];
    dataSource: MatTableDataSource<Account> = new MatTableDataSource<Account>([]);

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(private store: Store) {}

    ngOnInit() {
        this.store.select(selectAllAccounts).subscribe((accounts) => {
            this.dataSource.data = accounts;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
}
