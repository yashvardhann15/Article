import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ArticleSection from "./components/ArticleSection";
import CreateArticle from "./components/CreateArticle";
import ViewArticle from "./components/ViewArticle";

export default function App() {
    return (
        <Router>
            <div className="min-h-screen bg-[#f8f6f4]">
                <Routes>
                    <Route path="/" element={<ArticleSection />} />
                    <Route path="/create" element={<CreateArticle />} />
                    <Route path="/article/:id" element={<ViewArticle />} />

                </Routes>
            </div>
        </Router>
    );
}
