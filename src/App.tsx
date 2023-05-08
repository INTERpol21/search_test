import { Route, Routes } from "react-router-dom";
// import NotFoundPage from "./pages/NotFoundPage";
import SearchPage from "./component/SearchPage";

function App() {
    return (
        <div className="container-fluid">
            <Routes>
                <Route path="/" element={<SearchPage />} />
                {/*<Route path="*" element={<NotFoundPage />} />*/}
            </Routes>
        </div>
    );
}

export default App;
