import {Injectable, PipeTransform} from '@angular/core';

import {BehaviorSubject, Observable, of, Subject} from 'rxjs';

import { Job } from 'src/app/job';
import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';
import {SortColumn, SortDirection} from './sortable.directive';
import {DecimalPipe} from '@angular/common';
import { JobService } from 'src/app/job.service';

interface SearchResult {
  jobs: Job[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(jobs: Job[], column: SortColumn, direction: string): Job[] {
  if (direction === '' || column === '') {
    return jobs;
  } else {
    return [...jobs].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(job: Job, term: string, pipe: PipeTransform) {
  return job.titre.toLowerCase().includes(term.toLowerCase())
    || pipe.transform(job.entreprise).includes(term)
    || pipe.transform(job.dateCreation).includes(term);
}

@Injectable({
  providedIn: 'root'
})
export class ListJobServicesService {

  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _jobs$ = new BehaviorSubject<Job[]>([]);
  private _total$ = new BehaviorSubject<number>(0);
  jobsRef : Job[] = [];

  private _state: State = {
    page: 1,
    pageSize: 4,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor(private pipe: DecimalPipe) {
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._jobs$.next(result.jobs);
      this._total$.next(result.total);
    });

    this._search$.next();
  }


  get jobs$() { return this._jobs$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set sortColumn(sortColumn: SortColumn) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

    // 1. sort
    let jobs = sort(this.jobsRef, sortColumn, sortDirection);

    // 2. filter
    jobs = jobs.filter(jobs => matches(jobs, searchTerm, this.pipe));
    const total = jobs.length;

    // 3. paginate
    jobs = jobs.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({jobs, total});
  }

}

