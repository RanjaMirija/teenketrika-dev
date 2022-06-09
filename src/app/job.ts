export interface Job {
  entreprise?: string;
  titre?: string;
  typeContrat?: 'CDI' | 'CDD' | 'Alternance' | 'Stage';
  tags?: string;
  emailCandidature?: string;
  emailObjet?: string;
  categorie?: string;
  sousCategorie?: string;
  description?: string;
  mission?:string;
  profile?: string;
  dossierRequis?: string;
  details?: string;
  dateCreation?: string;
  _id?: string;
}
