import { Component, OnInit } from '@angular/core';
import { JobService } from 'src/app/job.service';
import { Job } from 'src/app/job';


@Component({
  selector: 'app-list-job',
  templateUrl: './list-job.component.html',
  styleUrls: ['./list-job.component.css']
})
export class ListJobComponent implements OnInit {
   Jobs!: Job[];

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
    });
  }

}
