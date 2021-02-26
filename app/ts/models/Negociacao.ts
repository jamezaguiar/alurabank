class Negociacao {
  private _data: Date;
  private _quantidade: number;
  private _valor: number;

  constructor(data: Date, quantidade: number, valor: number) {
    // Por convenção, usar o _ antes da variável significa que ela não pode ser modificada.
    this._data = data;
    this._quantidade = quantidade;
    this._valor = valor;
  }

  // Getters

  get data() {
    return this._data;
  }

  get quantidade() {
    return this._quantidade;
  }

  get valor() {
    return this._valor;
  }

  get volume() {
    return this._quantidade * this._valor;
  }
}
