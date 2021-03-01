import { domInject } from '../helpers/decorators/index';
import { Negociacao, Negociacoes } from '../models/index';

import { NegociacoesView, MensagemView } from '../views/index';

enum DiaDaSemana {
  Domingo,
  Segunda,
  Terca,
  Quarta,
  Quinta,
  Sexta,
  Sabado
}

export class NegociacaoController {
  @domInject('#data')
  private _inputData: JQuery;

  @domInject('#quantidade')
  private _inputQuantidade: JQuery;

  @domInject('#valor')
  private _inputValor: JQuery;

  private _negociacoes = new Negociacoes();

  private _negociacoesView = new NegociacoesView('#negociacoesView', true);
  private _mensagemView = new MensagemView('#mensagemView');

  constructor() {
    this._negociacoesView.update(this._negociacoes);
  }

  adiciona(event: Event) {
    event.preventDefault();

    const dataDaNegociacao = new Date(this._inputData.val());
    dataDaNegociacao.setDate(dataDaNegociacao.getDate() + 1);
    if (!this._eDiaUtil(dataDaNegociacao)) {
      this._mensagemView.update('Somente negociações em dias úteis.');
      return;
    }

    const negociacao = new Negociacao(
      dataDaNegociacao,
      Number(this._inputQuantidade.val()),
      Number(this._inputValor.val())
    );

    this._negociacoes.adiciona(negociacao);

    this._negociacoesView.update(this._negociacoes);
    this._mensagemView.update('Negociação adicionada com sucesso!');
  }

  private _eDiaUtil(data: Date) {
    return (
      data.getDay() != DiaDaSemana.Sabado &&
      data.getDay() != DiaDaSemana.Domingo
    );
  }
}
