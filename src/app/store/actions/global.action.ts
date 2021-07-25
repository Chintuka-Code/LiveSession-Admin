export class GlobalSpinnerShow {
  static readonly type = '[Spinner] Show';

  constructor() {}
}

export class GlobalSpinner {
  static readonly type = '[Spinner] Hide';
}

export class updateAside {
  static readonly type = '[Aside] Update';
}

export class HideAside {
  static readonly type = '[Aside] Hide';
}
