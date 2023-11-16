import { PropsWithChildren } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainCountainer } from './containers/main/MainContainer';

interface OwnProps {}

type Props = PropsWithChildren<OwnProps>;

export function AppRouter(props: Props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<MainCountainer />} />
      </Routes>
    </BrowserRouter>
  );
}
