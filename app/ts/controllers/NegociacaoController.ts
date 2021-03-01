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
  private _inputData: JQuery;
  private _inputQuantidade: JQuery;
  private _inputValor: JQuery;

  private _negociacoes = new Negociacoes();

  private _negociacoesView = new NegociacoesView('#negociacoesView', true);
  private _mensagemView = new MensagemView('#mensagemView');

  constructor() {
    this._inputData = $('#data');
    this._inputQuantidade = $('#quantidade');
    this._inputValor = $('#valor');

    this._negociacoesView.update(this._negociacoes);
  }

  adiciona(event: Event) {
    event.preventDefault();

    const dataDaNegociacao = new Date(this._inputData.val());
    if (this._eDiaUtil(dataDaNegociacao)) {
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
      data.getDay() !== DiaDaSemana.Sabado &&
      data.getDay() !== DiaDaSemana.Domingo
    );
  }
}
