export interface App {
  id: number;
  name: string;
  actions: Action[];
}

export type Action = NonParamAction | ParamAction;

interface NonParamAction {
  id: number;
  urlScheme: string;
  description: string;
}

export interface ParamAction {
  id: number;
  urlSchemeFunc: (param: string) => string;
  placeholder: string;
  description: string;
  descriptionFunc: (param: string) => string;
}

export interface ActionInstance {
  appId: number;
  actionId: number;
  param?: string;
}
