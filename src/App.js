import React from 'react';
import Todo from './components/todo/Todo';
const App = () => {
  console.log('Current Environment:', process.env.NODE_ENV);

  return (
    <>
      <Todo/>
    </>
  )
}

export default App
