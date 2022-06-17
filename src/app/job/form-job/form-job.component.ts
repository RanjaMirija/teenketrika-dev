import { Component, OnInit,EventEmitter, Input, Output  } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Job } from 'src/app/job';

@Component({
  selector: 'app-form-job',
  templateUrl: './form-job.component.html',
  styleUrls: ['./form-job.component.css']
})
export class FormJobComponent implements OnInit {

  @Input()
  initialState: BehaviorSubject<Job> = new BehaviorSubject({});

  @Output()
  formValueChanged = new EventEmitter<Job>();

  @Output()
  formSubmitted = new EventEmitter<Job>();

  JobForm: FormGroup = new FormGroup({});

  get entreprise() {return this.JobForm.get('entreprise')!;}
  get titre() {return this.JobForm.get('titre')!;}
  get typeContrat() {return this.JobForm.get('typeContrat')!;}
  get tags() {return this.JobForm.get('tags')!;}
  get emailCandidature() {return this.JobForm.get('emailCandidature')!;}
  get emailObjet() {return this.JobForm.get('emailObjet')!;}
  get categorie() {return this.JobForm.get('categorie')!;}
  get sousCategorie() {return this.JobForm.get('sousCategorie')!;}
  get description() {return this.JobForm.get('description')!;}
  get mission() {return this.JobForm.get('mission')!;}
  get profile() {return this.JobForm.get('profile')!;}
  get dossierRequis() {return this.JobForm.get('dossierRequis')!;}
  get details() {return this.JobForm.get('details')!;}
  get dateCreation() {return this.JobForm.get('dateCreation')!;}

  constructor(private fb: FormBuilder) { }


  ngOnInit(): void {
    this.initialState.subscribe(job => {
      this.JobForm = this.fb.group({
        entreprise: [job.entreprise, [Validators.required]],
        titre: [job.titre, [Validators.required, Validators.minLength(15)]],
        tags: [job.tags, [Validators.required]],
        emailCandidature: [job.emailCandidature, [Validators.required, Validators.email]],
        emailObjet: [job.emailObjet, [Validators.required, Validators.minLength(5)]],
        categorie: [job.categorie, [Validators.required]],
        sousCategorie: [job.sousCategorie, [Validators.required]],
        description: [job.description, [Validators.required, Validators.minLength(20)]],
        dateCreation: [job.dateCreation, [Validators.required]],
      });
    });

    this.JobForm.valueChanges.subscribe((val) => { this.formValueChanged.emit(val); });
  }

  submitForm(){
    this.formSubmitted.emit(this.JobForm.value);
  }

}
