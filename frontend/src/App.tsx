import { BrowserRouter, Routes, Route } from "react-router-dom";
import ItemListPage from "./pages/ItemListPage";
import ItemFormPage from "./pages/ItemFormPage";

function App() {
  return (
    <BrowserRouter>
      <div className='p-6 max-w-2xl mx-auto'>
        <Routes>
          <Route path='/' element={<ItemListPage />} />
          <Route path='/create' element={<ItemFormPage />} />
          <Route path='/edit/:id' element={<ItemFormPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
