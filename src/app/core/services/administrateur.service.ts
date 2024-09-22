import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EtudiantDTO } from '../../shared/models/etudiant';
import { ClasseDTO } from '../../shared/models/classe';
import {PartenaireDTO} from "../../shared/models/partenaire";
import {CoursDTO} from "../../shared/models/cours";
import {EvaluationDTO, EvaluationRequestDTO} from "../../shared/models/evaluation";
import {AdministrateurDTO} from "../../shared/models/administrateur";  // Assuming ClasseDTO is defined in the shared models folder

@Injectable({
  providedIn: 'root'
})
export class AdministrateurService {
  // Base URLs for different endpoints
  private etudiantBaseUrl = 'http://localhost:8070/api/administrateurs/etudiants';
  private classeBaseUrl = 'http://localhost:8070/api/administrateurs/classes';
  private PartenaireBaseUrl = 'http://localhost:8070/api/administrateurs/partenaires';
  private CoursBaseUrl = 'http://localhost:8070/api/administrateurs/cours';
  private EvaluationBaseUrl = 'http://localhost:8070/api/administrateurs/evaluations';
  private EtudiantBaseUrl = 'http://localhost:8070/api/administrateurs/etudiants';
  private baseUrl = 'http://localhost:8070/api/auth/';


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


  // Create a new partner
  createPartenaire(partenaire: FormData): Observable<PartenaireDTO> {
    return this.http.post<PartenaireDTO>(`${this.PartenaireBaseUrl}`, partenaire);
  }

  // Update an existing partner
  updatePartenaire(id: number, partenaire: FormData): Observable<PartenaireDTO> {
    return this.http.put<PartenaireDTO>(`${this.PartenaireBaseUrl}/${id}`, partenaire);
  }

  // Get all partners
  getAllPartenaires(): Observable<PartenaireDTO[]> {
    return this.http.get<PartenaireDTO[]>(`${this.PartenaireBaseUrl}`);
  }

  // Get a single partner by ID
  getPartenaireById(id: number): Observable<PartenaireDTO> {
    return this.http.get<PartenaireDTO>(`${this.PartenaireBaseUrl}/${id}`);
  }

  // Delete a partner by ID
  deletePartenaire(id: number): Observable<void> {
    return this.http.delete<void>(`${this.PartenaireBaseUrl}/${id}`);
  }


  getAllCours(): Observable<CoursDTO[]> {
    return this.http.get<CoursDTO[]>(`${this.CoursBaseUrl}/cours`);
  }

  // Get a single course by ID
  getCoursById(id: number): Observable<CoursDTO> {
    return this.http.get<CoursDTO>(`${this.CoursBaseUrl}/cours/${id}`);
  }

  // Create a new course
  createCours(cours: CoursDTO): Observable<CoursDTO> {
    return this.http.post<CoursDTO>(`${this.CoursBaseUrl}/cours`, cours);
  }

  // Update an existing course
  updateCours(id: number, cours: CoursDTO): Observable<CoursDTO> {
    return this.http.put<CoursDTO>(`${this.CoursBaseUrl}/cours/${id}`, cours);
  }

  // Delete a course by ID
  deleteCours(id: number): Observable<void> {
    return this.http.delete<void>(`${this.CoursBaseUrl}/cours/${id}`);
  }

  // Get all classes
  // getAllClasses(): Observable<ClasseDTO[]> {
  //   return this.http.get<ClasseDTO[]>(`${this.classeBaseUrl}/classes`);
  // }

  // Get all partners
  // getAllPartenaires(): Observable<PartenaireDTO[]> {
  //   return this.http.get<PartenaireDTO[]>(`${this.PartenaireBaseUrl}/partenaires`);
  // }

  // Create a new evaluation
  createEvaluation(evaluation: EvaluationRequestDTO): Observable<EvaluationDTO> {
    return this.http.post<EvaluationDTO>(`${this.EvaluationBaseUrl}/evaluations`, evaluation);
  }

  // Update an evaluation
  updateEvaluation(id: number, evaluation: EvaluationRequestDTO): Observable<EvaluationDTO> {
    return this.http.put<EvaluationDTO>(`${this.EvaluationBaseUrl}/evaluations/${id}`, evaluation);
  }

  // Delete an evaluation
  deleteEvaluation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.EvaluationBaseUrl}/evaluations/${id}`);
  }

  // Get a single evaluation by ID
  getEvaluationById(id: number): Observable<EvaluationDTO> {
    return this.http.get<EvaluationDTO>(`${this.EvaluationBaseUrl}/evaluations/${id}`);
  }

  // Get all evaluations by class ID
  getAllEvaluationsByClasseId(classeId: number): Observable<EvaluationDTO[]> {
    return this.http.get<EvaluationDTO[]>(`${this.EvaluationBaseUrl}/classe/${classeId}/evaluations`);
  }

  getAdminById(id: number): Observable<AdministrateurDTO> {
    return this.http.get<AdministrateurDTO>(`${this.baseUrl}/${id}`);
  }

  updateAdmin(id: number, admin: FormData): Observable<AdministrateurDTO> {
    return this.http.put<AdministrateurDTO>(`${this.baseUrl}/${id}`, admin);
  }

  // Add method for creating admins if necessary
  createAdmin(admin: AdministrateurDTO): Observable<AdministrateurDTO> {
    return this.http.post<AdministrateurDTO>(this.baseUrl, admin);
  }

  deleteAdmin(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }




}
