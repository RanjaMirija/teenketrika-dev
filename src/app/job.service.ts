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

  createJob(job: Job) {
    this.jobsRef = this.db.list('jobs');
    this.jobsRef.push({
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
      dateCreation: job.dateCreation
    });
  }

/*
  getJobDoc(id : string){
    return this.angularFirestore
      .collection('jobs')
      .doc(id)
      .valueChanges();
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
