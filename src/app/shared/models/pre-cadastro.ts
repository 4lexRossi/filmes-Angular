export interface PreCadastro {
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
export interface Usuario {
  id: string;
  nome: string;
  sobreNome: string;
  dataNascimento: string;
  email: string;
  senha: string;
  eTipoUsuario: number;

}