import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
    return this.state.error ? (
      <section className='container text-center'>
        <h1>Oops, something went wrong.</h1>
        <Link to='/' className='btn btn-primary' role='button'>
          Powrót
        </Link>
      </section>
    ) : (
      this.props.children
    );
  }
}
export default ErrorBoundary;
