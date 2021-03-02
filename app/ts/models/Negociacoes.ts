import { Negociacao } from './Negociacao';
import { IImprimivel } from './IImprimivel';
import { IIgualavel } from './IIgualavel';

export class Negociacoes implements IImprimivel, IIgualavel<Negociacoes> {
  private _negociacoes: Negociacao[] = [];

  adiciona(negociacao: Negociacao): void {
    this._negociacoes.push(negociacao);
  }

  paraArray(): Negociacao[] {
    return ([] as Negociacao[]).concat(this._negociacoes);
  }

  paraTexto(): void {
    console.log(JSON.stringify(this._negociacoes));
  }

  eIgual(negociacoes: Negociacoes): boolean {
    return (
      JSON.stringify(this._negociacoes) ==
      JSON.stringify(negociacoes.paraArray())
    );
  }
}
