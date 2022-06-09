import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireDatabase, AngularFireList, AngularFireObject,} from '@angular/fire/compat/database';
import { Job } from './job';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  jobsRef! : AngularFireList<any>;

  constructor(private db: AngularFireDatabase) { }

  getJobList() {
    this.jobsRef = this.db.list('jobs');
    return this.jobsRef;
  }

/*
  getJobDoc(id : string){
    return this.angularFirestore
      .collection('jobs')
      .doc(id)
      .valueChanges();
  }

  createJob(job: Job) {
    return new Promise<any>((resolve, reject) => {
      this.angularFirestore
        .collection('jobs')
        .add(job)
        .then(
          (response) => {
            console.log(response);
          },
          (error) => reject(error)
        );
    });
  }

  deleteJob(job: Job) {
    return this.angularFirestore
      .collection('jobs')
      .doc(job._id)
      .delete();
  }

  updateJob(job: Job, id: string) {
    return this.angularFirestore.collection('jobs').doc(id).update({
      entreprise: job.entreprise,
      titre: job.titre,
      typeContrat: job.typeContrat,
      tags: job.tags,
      emailCandidature: job.emailCandidature,
      emailObjet: job.emailObjet,
      categorie: job.categorie,
      sousCategorie: job.sousCategorie,
      description: job.description,
      mission: job.mission,
      profile: job.profile,
      dossierRequis: job.dossierRequis,
      details: job.details,
      dateCreation: job.dateCreation,
      id: job._id
    });
  }
*/
}
