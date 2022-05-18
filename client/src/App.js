import './App.css';
import { Link, Routes, Route, Navigate } from "react-router-dom";
import Main from './components/Main';
import ViewOne from './components/ViewOne';
import Create from './components/Create';
import Update from './components/Update';

function App() {
  return (
    // 👉 BrowserRouter is in index.js
    <div className="App">

      <h1>Notes 📝</h1>
      <Link to="/notes">Home</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Link to="/create">Create</Link>
      <hr />

      <Routes>
        {/* MAIN - ALL NOTES */}
        <Route path='/notes' element={<Main />} />

        {/* SHOW ONE */}
        <Route path='/notes/:id' element={<ViewOne />} />

        {/* CREATE */}
        <Route path='/create' element={<Create/> } />

        {/* UPDATE */}
        <Route path="/update/:id" element={<Update/>} />

        {/* REDIRECT */}
        <Route path='*' element={<Navigate to="/notes/" replace />} />

      </Routes>

    </div>
  );
}

export default App;
