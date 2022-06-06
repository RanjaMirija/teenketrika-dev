import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Job } from './job';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private angularFirestore : AngularFirestore) { }

  getJobDoc(id : string){
    return this.angularFirestore
      .collection('jobs-list')
      .doc(id)
      .valueChanges();
  }

  getJobList() {
    return this.angularFirestore
      .collection('jobs-list')
      .snapshotChanges();
  }

  createJob(job: Job) {
    return new Promise<any>((resolve, reject) => {
      this.angularFirestore
        .collection('jobs-list')
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
      .collection('jobs-list')
      .doc(job._id)
      .delete();
  }

  updateJob(job: Job, id: string) {
    return this.angularFirestore.collection('jobs-list').doc(id).update({
      entreprise: job.entreprise,
      titre: job.titre,
      typeContrat: job.typeContrat,
      tags: job.tags,
      emailCandidature: job.emailCandidature,
      emailObjet: job.emailObjet,
      region: job.region,
      district: job.district,
      commune: job.commune,
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

}
