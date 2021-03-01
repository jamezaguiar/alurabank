import { NegociacaoParcial, Negociacao } from '../models/index';

export class NegociacaoService {
  obterNegociacoes(handler: IHandlerFunction): Promise<Negociacao[]> {
    return fetch('http://localhost:8080/dados')
      .then((res) => handler(res))
      .then((res) => res.json())
      .then((dados: NegociacaoParcial[]) =>
        dados.map(
          (dado) => new Negociacao(new Date(), dado.vezes, dado.montante)
        )
      )
      .catch((err) => console.error(err.message));
  }
}

export interface IHandlerFunction {
  (res: Response): Response;
}
