import React from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './components/Form/Form.js';
import { LoginForm } from './components/Form/LoginForm';


function App() {
  return (
    <div className="App">
      <Form></Form>
      <LoginForm></LoginForm>
    </div>
  );
}

export default App;
