export interface Campanha {
  id?: number;
  titulo: string;
  urlFoto?: string;
  dtLancamento: Date; 
  areaCurso: string;  
  descricao?: string;
  nota: number;
  valorMensal: number;
  urlIMDb?: string;
}
