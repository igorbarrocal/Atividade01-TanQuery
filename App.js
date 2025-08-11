import App from "./src/App";
import QueryClientProvider  from "./src/QueryClientProvider";

export default function Main(){
  return(
    <QueryClientProvider>
      <App/>
    </QueryClientProvider>
  );
}
