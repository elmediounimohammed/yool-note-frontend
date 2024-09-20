import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EtudiantDTO } from '../../shared/models/etudiant';
import { ClasseDTO } from '../../shared/models/classe';  // Assuming ClasseDTO is defined in the shared models folder

@Injectable({
  providedIn: 'root'
})
export class AdministrateurService {
  // Base URLs for different endpoints
  private etudiantBaseUrl = 'http://localhost:8070/api/administrateurs/etudiants';
  private classeBaseUrl = 'http://localhost:8070/api/administrateurs/classes';  // Base URL for classes

  constructor(private http: HttpClient) {}
  private isAuthenticated = false;  // This should be managed based on your authentication logic

  // ------------------- Authentication Methods -------------------
  // Method to simulate login
  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'admin') {
      this.isAuthenticated = true;
      return true;
    }
    return false;
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  // Log out the user
  logout(): void {
    this.isAuthenticated = false;
  }

  // ------------------- Student Management Methods -------------------
  // Get all students
  getAllEtudiants(): Observable<EtudiantDTO[]> {
    return this.http.get<EtudiantDTO[]>(`${this.etudiantBaseUrl}`);
  }

  // Get a single student by ID
  getEtudiantById(id: number): Observable<EtudiantDTO> {
    return this.http.get<EtudiantDTO>(`${this.etudiantBaseUrl}/${id}`);
  }

  // Create a new student
  createEtudiant(etudiant: FormData): Observable<EtudiantDTO> {
    return this.http.post<EtudiantDTO>(`${this.etudiantBaseUrl}`, etudiant);
  }

  // Update an existing student
  updateEtudiant(id: number, etudiant: FormData): Observable<EtudiantDTO> {
    return this.http.put<EtudiantDTO>(`${this.etudiantBaseUrl}/${id}`, etudiant);
  }

  // Delete a student by ID
  deleteEtudiant(id: number): Observable<void> {
    return this.http.delete<void>(`${this.etudiantBaseUrl}/${id}`);
  }

  // ------------------- Class Management Methods -------------------
  // Get all classes
  getAllClasses(): Observable<ClasseDTO[]> {
    return this.http.get<ClasseDTO[]>(`${this.classeBaseUrl}`);
  }

  // Get a single class by ID
  getClasseById(id: number): Observable<ClasseDTO> {
    return this.http.get<ClasseDTO>(`${this.classeBaseUrl}/${id}`);
  }

  // Create a new class
  createClasse(classe: ClasseDTO): Observable<ClasseDTO> {
    return this.http.post<ClasseDTO>(`${this.classeBaseUrl}`, classe);
  }

  // Update an existing class
  updateClasse(id: number, classe: ClasseDTO): Observable<ClasseDTO> {
    return this.http.put<ClasseDTO>(`${this.classeBaseUrl}/${id}`, classe);
  }

  // Delete a class by ID
  deleteClasse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.classeBaseUrl}/${id}`);
  }
}
