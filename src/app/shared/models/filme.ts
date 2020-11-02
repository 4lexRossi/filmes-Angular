export interface Filme {
  id?: number;
  titulo: string;
  urlFoto?: string;
  dtLancamento: Date; 
  genero: string;  
  descricao?: string;
  nota: number;
  valorMensal: number;
  urlIMDb?: string;
}
