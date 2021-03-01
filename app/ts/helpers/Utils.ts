import { IImprimivel } from '../models/index';

export function imprime(...objetos: IImprimivel[]) {
  objetos.forEach((objeto) => objeto.paraTexto());
}
