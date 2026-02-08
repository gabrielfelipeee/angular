export const APP_ROUTES = {
  CLIENTES: {
    ROOT: 'clientes',
    CADASTRO: 'cadastro',
    EDITAR: ':clienteId/editar',
  }
} as const;

// HELPERS 
export const APP_ROUTES_PATHS = {
  CLIENTES: {
    root: () => [APP_ROUTES.CLIENTES.ROOT],
    cadastro: () => [APP_ROUTES.CLIENTES.ROOT, APP_ROUTES.CLIENTES.CADASTRO],
    editar: (clienteId: string) => [APP_ROUTES.CLIENTES.ROOT, clienteId, 'editar'],
  }
} as const;
