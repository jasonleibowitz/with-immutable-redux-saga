import React from 'react';
import { Provider } from 'react-redux';
import App, { Container } from 'next/app';
import withRedux from 'next-redux-wrapper';
import nextReduxSaga from 'next-redux-saga';
import { makeStore } from '../store';
// import { deserialize, serialize } from 'json-immutable';
import { fromJS, isImmutable } from 'immutable';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    return { pageProps };
  }

  render() {
    const { Component, pageProps, store } = this.props;
    console.log('/// in _app render', store.getState());
    console.log('/// in _app render. is state immutable', isImmutable(store.getState()));
    return (
      <Container>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    )
  }
}

export default withRedux(makeStore, {
  serializeState: state => {
    // state here is always an immutable Map
    console.log('/// serializeState', state);
    return state.toJS();
  },
  deserializeState: state => {
    // state here is always undefined. See in the terminal log
    console.log('/// deserializeState', state);
    return state ? fromJS(state) : state;
  }
})(nextReduxSaga(MyApp));