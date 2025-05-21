import { Route, Routes } from "react-router-dom";
import ItemListPage from "./pages/ItemListPage";
import ItemFormPage from "./pages/ItemFormPage";
import ItemCard from "./components/ItemCard";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<ItemListPage />} />
      <Route path='/items/:id' element={<ItemCard />} />
      <Route path='/create' element={<ItemFormPage />} />
      <Route path='/edit/:id' element={<ItemFormPage />} />
    </Routes>
  );
}
