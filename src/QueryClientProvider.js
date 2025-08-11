//Importa os componentes do Tanstack Query
import {QueryClient,QueryClientProvider as TanstackProvider}  from '@tanstack/react-query';

//Ciando uma instância do QueryClient
const queryClient = new QueryClient();

//Desenvolvendo o componente que vai envolver a aplicação,
//  e permitndo que os filhos acessem o QueryClient

export default function QueryClientProvider({children}) {
  return (
    <TanstackProvider client={queryClient}>
      {children}
    </TanstackProvider>
  );
}