import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EtudiantDTO } from "../../shared/models/etudiant";  // Use EtudiantDTO from shared models
import { AdministrateurService } from '../../core/services/administrateur.service';  // Use lowercase 'services'
import { AuthGuard } from '../../core/services/auth.guard';

import { NgForOf, NgIf } from '@angular/common';
import {ClasseResponseDTO} from "../../shared/models/classe-response";
import {ParcoursScolaireResponseDTO} from "../../shared/models/parcours-scolaire-response";  // Import NgForOf and NgIf

@Component({
  selector: 'app-manage-etudiants',
  templateUrl: './manage-etudiant.component.html',
  standalone: true,
  imports: [FormsModule, NgForOf, NgIf]  // Add NgIf for conditional rendering
})
export class ManageEtudiantComponent {
  etudiants: EtudiantDTO[] = [];
  classes: any[] = [];  // To hold all classes
  newEtudiant: EtudiantDTO = this.initializeNewEtudiant();
  isEditing = false;
  selectedEtudiant: EtudiantDTO | null = null;
  selectedImage: File | null = null;

  constructor(
    private administrateurService: AdministrateurService  // Using AdministrateurService now
  ) {}

  ngOnInit() {
    this.loadEtudiants();  // Load students when component initializes
    this.loadClasses();    // Load available classes
  }

  // Initialize new Etudiant with default values
  initializeNewEtudiant(): EtudiantDTO {
    return {
      id: 0,
      nom: '',
      prenom: '',
      dateNaissance: '',
      adresse: '',
      image: '',
      parcoursScolaire: this.initializeParcoursScolaire(),
      classe: this.initializeClasse()
    };
  }

// Helper method to initialize ParcoursScolaireResponseDTO
  initializeParcoursScolaire(): ParcoursScolaireResponseDTO {
    return {
      id: 0,
      resultat: '',
      niveau: '',
      nomEcole: ''
    };
  }

// Helper method to initialize ClasseResponseDTO
  initializeClasse(): ClasseResponseDTO {
    return {
      id: 0,
      titre: '',
      niveau: ''
    };
  }
  // Load Etudiants
  loadEtudiants() {
    this.administrateurService.getAllEtudiants().subscribe(
      (etudiants: EtudiantDTO[]) => {
        this.etudiants = etudiants;
      },
      (error) => {
        console.error('Error fetching students:', error);
      }
    );
  }

  // Load Classes (for now, just a placeholder, this can be expanded)
  loadClasses() {
    // Fetch classes from API or define locally
    this.classes = [
      { id: 1, titre: 'Class 1', niveau: 'Level 1' },
      { id: 2, titre: 'Class 2', niveau: 'Level 2' }
    ];
  }

  // Handle file selection
  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }

  // Add a new student
  addEtudiant() {
    const formData = new FormData();
    formData.append('nom', this.newEtudiant.nom);
    formData.append('prenom', this.newEtudiant.prenom);
    formData.append('dateNaissance', this.newEtudiant.dateNaissance);
    formData.append('adresse', this.newEtudiant.adresse);
    formData.append('parcoursScolaireId', this.newEtudiant.parcoursScolaire.id.toString());
    formData.append('classeId', this.newEtudiant.classe.id.toString());

    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }

    this.administrateurService.createEtudiant(formData).subscribe(
      () => {
        this.loadEtudiants();  // Refresh the student list after adding
        this.resetForm();
      },
      (error) => {
        console.error('Error adding student:', error);
      }
    );
  }

  // Edit student logic
  editEtudiant(etudiant: EtudiantDTO) {
    this.isEditing = true;
    this.selectedEtudiant = etudiant;
    this.newEtudiant = { ...etudiant };
  }

  // Save the edited student details
  saveEditedEtudiant() {
    const formData = new FormData();
    formData.append('nom', this.newEtudiant.nom);
    formData.append('prenom', this.newEtudiant.prenom);
    formData.append('dateNaissance', this.newEtudiant.dateNaissance);
    formData.append('adresse', this.newEtudiant.adresse);
    formData.append('parcoursScolaireId', this.newEtudiant.parcoursScolaire.id.toString());
    formData.append('classeId', this.newEtudiant.classe.id.toString());

    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }

    this.administrateurService.updateEtudiant(this.selectedEtudiant!.id, formData).subscribe(
      () => {
        this.loadEtudiants();  // Refresh the student list
        this.resetForm();
      },
      (error) => {
        console.error('Error saving edited student:', error);
      }
    );
  }

  // Delete student
  deleteEtudiant(etudiantId: number) {
    this.administrateurService.deleteEtudiant(etudiantId).subscribe(
      () => {
        this.etudiants = this.etudiants.filter((etudiant) => etudiant.id !== etudiantId);
      },
      (error) => {
        console.error('Error deleting student:', error);
      }
    );
  }

  // Reset the form after add or edit
  resetForm() {
    this.newEtudiant = this.initializeNewEtudiant();
    this.selectedEtudiant = null;
    this.isEditing = false;
    this.selectedImage = null;
  }
}
