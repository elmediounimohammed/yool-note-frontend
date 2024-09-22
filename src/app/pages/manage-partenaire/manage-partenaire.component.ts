import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdministrateurService } from '../../core/services/administrateur.service';
import { PartenaireDTO } from '../../shared/models/partenaire';

@Component({
  selector: 'app-manage-partenaires',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './manage-partenaire.component.html',
  styleUrls: ['./manage-partenaire.component.css']
})
export class ManagePartenaireComponent implements OnInit {
  partenaireForm!: FormGroup;
  partenaires: PartenaireDTO[] = [];
  isEditing = false;
  selectedPartenaire: PartenaireDTO | null = null;
  selectedLogo: File | null = null;  // To handle the image file

  constructor(private administrateurService: AdministrateurService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadPartenaires();  // Load all partners on component initialization

    // Initialize the form with FormBuilder
    this.partenaireForm = this.fb.group({
      nom: ['', Validators.required],
      Domaine: ['', Validators.required],
      telephone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      logo: [null]
    });
  }

  // Handle file selection
  onFileSelected(event: any): void {
    this.selectedLogo = event.target.files[0];  // Store the selected file
  }

  // Create a new partner
  createPartenaire(): void {
    if (this.partenaireForm.valid) {
      const formData = new FormData();
      const partenaireData = this.partenaireForm.value;

      formData.append('nom', partenaireData.nom);
      formData.append('Domaine', partenaireData.Domaine);
      formData.append('telephone', partenaireData.telephone);
      formData.append('email', partenaireData.email);

      if (this.selectedLogo) {
        formData.append('logo', this.selectedLogo);
      }

      this.administrateurService.createPartenaire(formData).subscribe(
        () => {
          this.loadPartenaires();  // Refresh the list after creation
          this.resetForm();
        },
        (error: any) => {
          console.error('Error adding partner:', error);
        }
      );
    }
  }

  // Update an existing partner
  updatePartenaire(): void {
    if (this.selectedPartenaire && this.partenaireForm.valid) {
      const formData = new FormData();
      const partenaireData = this.partenaireForm.value;

      formData.append('nom', partenaireData.nom);
      formData.append('Domaine', partenaireData.Domaine);
      formData.append('telephone', partenaireData.telephone);
      formData.append('email', partenaireData.email);

      if (this.selectedLogo) {
        formData.append('logo', this.selectedLogo);
      }

      this.administrateurService.updatePartenaire(this.selectedPartenaire.idPartenaire, formData).subscribe(
        () => {
          this.loadPartenaires();  // Refresh the list after update
          this.resetForm();
        },
        (error: any) => {
          console.error('Error updating partner:', error);
        }
      );
    }
  }

  // Load all partners from the service
  loadPartenaires(): void {
    this.administrateurService.getAllPartenaires().subscribe(
      (partenaires: PartenaireDTO[]) => {
        this.partenaires = partenaires;
      },
      (error: any) => {
        console.error('Error fetching partners:', error);
      }
    );
  }

  // Edit an existing partner
  editPartenaire(partenaireId: number): void {
    this.administrateurService.getPartenaireById(partenaireId).subscribe(
      (partenaire: PartenaireDTO) => {
        this.selectedPartenaire = partenaire;
        this.partenaireForm.patchValue(partenaire);  // Pre-fill the form with partner details
        this.isEditing = true;
      },
      (error: any) => {
        console.error('Error fetching partner details:', error);
      }
    );
  }

  // Delete a partner by ID
  deletePartenaire(id: number): void {
    this.administrateurService.deletePartenaire(id).subscribe(
      () => {
        this.partenaires = this.partenaires.filter(partenaire => partenaire.idPartenaire !== id);  // Remove the partner from the list
      },
      (error: any) => {
        console.error('Error deleting partner:', error);
      }
    );
  }

  // Reset the form after add or edit
  resetForm(): void {
    this.partenaireForm.reset();  // Clear the form
    this.isEditing = false;
    this.selectedPartenaire = null;
    this.selectedLogo = null;
  }
}
