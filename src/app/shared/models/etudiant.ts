export interface EtudiantDTO {
  id: number;
  nom: string;
  prenom: string;
  dateNaissance: string;
  adresse: string;
  image: string;
  parcoursScolaire: { id: number, resultat: string, niveau: string, nomEcole: string };
  classe: { id: number, titre: string };
}

