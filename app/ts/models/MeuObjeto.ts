import { IImprimivel } from './IImprimivel';
import { IIgualavel } from './IIgualavel';

export interface MeuObjeto<T> extends IImprimivel, IIgualavel<T> {}
