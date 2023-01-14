import '../styles/style.scss'
import type { AppProps } from 'next/app'
import React from 'react';
import { store } from '../src/redux/store';
import { Provider } from 'react-redux';

export default function App({ Component, pageProps }: AppProps) {
  return <React.StrictMode>
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  </React.StrictMode>

}
