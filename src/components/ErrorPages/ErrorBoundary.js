import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    <div className='content max-width mx-auto pt-5'>
      {this.state.error ? (
        <section className='container text-center'>
          <h1>Oops, something went wrong.</h1>
          <h2 className='my-4'>
            status błędu: {status} {statusText}
          </h2>
          <Link to='/' className='btn btn-primary' role='button'>
            Powrót
          </Link>
        </section>
      ) : (
        this.props.children
      )}
    </div>;
  }
}
export default ErrorBoundary;
