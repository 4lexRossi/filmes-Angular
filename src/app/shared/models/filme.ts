export interface Filme {
  id?: number;
  nome: string;
  sobrenome?: string;
  dataNascimento: Date;
  sexo?: string;
  email?: string;
  curso?: string;  
  areaCurso: string;
  semestre: number;
  descricao?: string;
  valorMensal: number;
  tipoUsuario?: string;
}
