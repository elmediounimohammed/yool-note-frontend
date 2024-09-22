import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdministrateurService } from '../../core/services/administrateur.service';
import { AdministrateurDTO } from '../../shared/models/administrateur';

@Component({
  selector: 'app-manage-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],  // Add required modules
  templateUrl: './manage-admin.component.html',
  styleUrls: ['./manage-admin.component.css']
})
export class ManageAdminComponent implements OnInit {
  adminForm!: FormGroup;
  isEditing: boolean = false;  // Ensure it’s initialized properly as boolean
  adminProfile!: AdministrateurDTO;
  selectedImage: File | null = null;

  constructor(private fb: FormBuilder, private administrateurService: AdministrateurService) {}

  ngOnInit(): void {
    this.initializeForm();  // Initialize the form
    this.loadAdminProfile();  // Load admin profile
  }

  // Initialize the form for editing the profile
  initializeForm(): void {
    this.adminForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      telephone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [''],  // Optional, for changing password
      image: [null]  // For profile image
    });
  }

  // Load admin profile from the server
  loadAdminProfile(): void {
    const adminId = 3; // Replace this with actual admin ID logic
    this.administrateurService.getAdminById(adminId).subscribe(
      (admin: AdministrateurDTO) => {
        if (admin) {
          this.adminProfile = admin;
          console.log('Admin Profile Loaded:', admin);  // Debugging line
          this.patchForm(admin);
        } else {
          console.error('Admin profile not found');
        }
      },
      (error) => {
        console.error('Error fetching admin profile:', error);
      }
    );
  }

  // Patch the form with the admin profile data
  patchForm(admin: AdministrateurDTO): void {
    this.adminForm.patchValue({
      nom: admin.nom,
      prenom: admin.prenom,
      telephone: admin.telephone,
      email: admin.email,
      image: admin.image
    });
  }

  // Enable editing mode
  enableEdit(): void {
    this.isEditing = true;  // Set boolean to true for editing mode
  }

  // Cancel editing and revert to view mode
  cancelEdit(): void {
    this.isEditing = false;  // Set boolean to false for view mode
    this.adminForm.patchValue(this.adminProfile);  // Reset form to original values
  }

  // Handle file selection for profile image
  onFileSelected(event: any): void {
    this.selectedImage = event.target.files[0];
  }

  // Update the admin profile
  updateAdminProfile(): void {
    if (this.adminForm.valid) {
      const updatedAdmin = this.adminForm.value;

      // Handle image upload
      const formData = new FormData();
      formData.append('nom', updatedAdmin.nom);
      formData.append('prenom', updatedAdmin.prenom);
      formData.append('telephone', updatedAdmin.telephone);
      formData.append('email', updatedAdmin.email);

      if (this.selectedImage) {
        formData.append('image', this.selectedImage);
      }

      if (updatedAdmin.password) {
        formData.append('password', updatedAdmin.password);
      }

      this.administrateurService.updateAdmin(this.adminProfile.idAdmin, formData).subscribe(
        response => {
          console.log('Profile updated successfully');
          this.isEditing = false;  // Exit edit mode
          this.loadAdminProfile();  // Reload profile after update
        },
        error => {
          console.error('Error updating profile', error);
        }
      );
    }
  }
}
