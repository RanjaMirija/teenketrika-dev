import { Component, OnInit } from '@angular/core';
import { JobService } from 'src/app/job.service';
import { Job } from 'src/app/job';


@Component({
  selector: 'app-list-job',
  templateUrl: './list-job.component.html',
  styleUrls: ['./list-job.component.css'],
})
export class ListJobComponent implements OnInit {

  Jobs!: Job[];

  dtOptions: DataTables.Settings = {};
  isShow = false; // Check to show datatabe when firebase data comes

  constructor(private jobService: JobService) { }

  ngOnInit(): void {
    let s = this.jobService.getJobList();
    s.snapshotChanges().subscribe(data =>{
      this.Jobs = [];
      data.forEach(item=> {
        let a: any = item.payload.toJSON();
        a['$key'] = item.key;
        this.Jobs.push(a as Job)
      })
      console.log(this.Jobs);
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 5,
        lengthMenu : [5, 10, 25],
        processing: true
      };
      this.isShow = true;

    });
  }

}
