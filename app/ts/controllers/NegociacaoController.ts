class NegociacaoController {
  private _inputData: HTMLInputElement;
  private _inputQuantidade: HTMLInputElement;
  private _inputValor: HTMLInputElement;

  private _negociacoes = new Negociacoes();

  constructor() {
    this._inputData = <HTMLInputElement>document.querySelector('#data');
    this._inputQuantidade = <HTMLInputElement>(
      document.querySelector('#quantidade')
    );
    this._inputValor = <HTMLInputElement>document.querySelector('#valor');
  }

  adiciona(event: Event) {
    event.preventDefault();

    const negociacao = new Negociacao(
      new Date(this._inputData.value),
      Number(this._inputQuantidade.value),
      Number(this._inputValor.value)
    );

    this._negociacoes.adiciona(negociacao);

    this._negociacoes.paraArray().forEach((negociacao) => {
      console.log(negociacao);
    });
  }
}
