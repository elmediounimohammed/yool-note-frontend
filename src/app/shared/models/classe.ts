import {EvaluationDTO} from "./EvaluationDTO";

export interface ClasseDTO {

  id: number;
  matiere: string;
  niveau: string;
  titre: string;
  prof: string;
  coursNames: string[];
  evaluationNames: EvaluationDTO[];   // Array of EvaluationDTO.ts instead of just string[]
}
