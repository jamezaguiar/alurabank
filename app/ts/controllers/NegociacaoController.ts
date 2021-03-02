import { domInject, throttle } from '../helpers/decorators/index';
import { Negociacao, Negociacoes } from '../models/index';
import { NegociacaoService } from '../services/NegociacaoService';

import { NegociacoesView, MensagemView } from '../views/index';

import { imprime } from '../helpers/index';
import { data } from 'jquery';

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
  private _negociacaoService = new NegociacaoService();

  private _negociacoesView = new NegociacoesView('#negociacoesView', true);
  private _mensagemView = new MensagemView('#mensagemView');

  constructor() {
    this._negociacoesView.update(this._negociacoes);
  }

  @throttle(500)
  adiciona() {
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

    imprime(negociacao, this._negociacoes);

    this._negociacoesView.update(this._negociacoes);
    this._mensagemView.update('Negociação adicionada com sucesso!');
  }

  @throttle(500)
  importaDados() {
    this._negociacaoService
      .obterNegociacoes((res: Response) => {
        if (res.ok) {
          return res;
        } else {
          throw new Error(res.statusText);
        }
      })
      .then((negociacoesParaImportar) => {
        const negociacoesJaImportadas = this._negociacoes.paraArray();

        negociacoesParaImportar
          .filter(
            (negociacao) =>
              !negociacoesJaImportadas.some((jaImportada) =>
                negociacao.eIgual(jaImportada)
              )
          )
          .forEach((negociacao) => this._negociacoes.adiciona(negociacao));

        this._negociacoesView.update(this._negociacoes);
      })
      .catch((err) => {
        this._mensagemView.update(err.message);
      });
  }

  private _eDiaUtil(data: Date) {
    return (
      data.getDay() != DiaDaSemana.Sabado &&
      data.getDay() != DiaDaSemana.Domingo
    );
  }
}
