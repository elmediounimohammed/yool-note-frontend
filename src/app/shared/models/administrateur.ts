export interface AdministrateurDTO {
  idAdmin: number;
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  image: string;
  password?: string;
  roleName: string;
}
