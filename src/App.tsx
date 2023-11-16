import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import theme from './theme';
import { AppRouter } from './AppRouter';
import { ClientContextProvider, client } from './client';

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <ClientContextProvider value={client}>
          <AppRouter />
        </ClientContextProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
