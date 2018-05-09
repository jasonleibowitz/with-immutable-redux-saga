import React from 'react';
import { Provider } from 'react-redux';
import App, { Container } from 'next/app';
import withRedux from 'next-redux-wrapper';
import nextReduxSaga from 'next-redux-saga';
import { configureStore } from '../store';
import { deserialize, serialize } from 'json-immutable';
import { fromJS } from 'immutable';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    return { pageProps };
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Container>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    )
  }
}

export default withRedux(configureStore, {
  serializeState: state => {
    // state here is always an immutable Map
    console.log('/// serializeState', state);
    return fromJS(state);
  },
  deserializeState: state => {
    // state here is always undefined. See in the terminal log
    console.log('/// deserializeState', state);
    return state;
  }
})(nextReduxSaga(MyApp));