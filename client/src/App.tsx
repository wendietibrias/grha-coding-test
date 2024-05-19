import { Route, Routes } from "react-router-dom";
import {
  Login,
  MainAuth,
  MainHome,
  Register,
  Book,
  CreateBook,
  DetailBook,
  UpdateBook,
  Category
} from "./pages";

const App = () => {
  return (
    <main className="main">
      <Routes>
        <Route path="/auth" element={<MainAuth />}>
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="/" element={<MainHome />}>
          <Route index element={<Book />} />
          <Route path="book/create" element={<CreateBook />} />
          <Route path="book/:id" element={<DetailBook />} />
          <Route path="book/update/:id" element={<UpdateBook />} />
          <Route path="category" element={<Category/>}/>
        </Route>
      </Routes>
    </main>
  );
};

export default App;
