export interface EvaluationDTO {
  id: number;
  contenu: string;
  date: string;  // Assuming date is handled as a string
  typeEvaluation: string;  // Assuming this is a string enum in your backend
}

export interface EvaluationRequestDTO {
  classeId: number;
  contenu: string;
  date: string;
  typeEvaluation: string;
}
