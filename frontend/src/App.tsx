// import { Suspense } from 'react';
// import { DataLoader } from './components/dataLoaders/DataLoader';
import './App.css'
import { BookList } from './components/books/BooksList';

function App() {
  console.log(`render App`);

  return (
    <>
      <BookList/>
      {/* <Suspense fallback={<p>Loading...</p>}>
        <DataLoader />
      </Suspense> */}
    </>
  )
}

export default App
