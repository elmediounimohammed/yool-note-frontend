export interface CoursDTO {
  idCours: number;
  intitule: string;
  nbreHeure: number;
  classeIds: number[];  // IDs of classes
  classeNames: string[];  // Names of the classes (for display)
  partenaireId: number;  // ID of the partner
  partenaireName: string;  // Name of the partner (for display)
}
