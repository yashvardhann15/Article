import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    Pencil,
    Loader2,
    RefreshCcw,
    ChevronRight,
    Calendar,
} from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";
import { Button } from "./ui/button";

export default function ArticleSection() {
    const [articles, setArticles] = useState([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [pageNo, setPageNo] = useState(() => {
        const params = new URLSearchParams(location.search);
        return parseInt(params.get("pageNo"), 10) || 1;
    });
    const [pageSize, setPageSize] = useState(8);
    const [isLastPage, setIsLastPage] = useState(false);
    let totalPages = 0;

    const fetchArticles = async () => {
        setRefreshing(true);
        try {
            const response = await fetch(`http://localhost:8080/articles/page?pageNo=${pageNo - 1}&pageSize=${pageSize}`);
            if (!response.ok) throw new Error("Failed to fetch");
            const data = await response.json();
            setArticles(data.a);
            setIsLastPage(data.b.a === false);
            totalPages = data.b.b;
            setError("");
        } catch (err) {
            setError("Failed to load articles");
        } finally {
            setIsLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchArticles();
    }, [pageNo, pageSize]);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const currentPage = parseInt(params.get("pageNo"), 10) || 1;
        if (currentPage !== pageNo) {
            setPageNo(currentPage);
        }
    }, [location.search]);

    useEffect(() => {
        navigate(`?pageNo=${pageNo}`, { replace: true });
    }, [pageNo, navigate]);

    useEffect(() => {
        if (!isLoading && articles.length === 0 && (pageNo > totalPages || pageNo < 1)) {
            setPageNo(1);
        }
    }, [isLoading, articles, pageNo, totalPages, setPageNo]);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const item = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 },
    };

    const handleNextPage = () => {
        if (!isLastPage) {
            setPageNo((prevPageNo) => prevPageNo + 1);
        }
    };

    const handlePreviousPage = () => {
        setPageNo((prevPageNo) => Math.max(prevPageNo - 1, 0));
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="container mx-auto px-6 py-8"
        >
            <div className="flex justify-between items-center mb-8">
                <motion.h1
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="text-6xl font-work-sans font-bold text-slate-950 tracking-tight"
                >
                    Article Section
                </motion.h1>

                <div className="flex gap-4">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={fetchArticles}
                        disabled={refreshing}
                        className="bg-white/10 p-4 rounded-full transition-all duration-300 hover:bg-white/20"
                    >
                        <RefreshCcw
                            className={`text-stone-800 h-6 w-6 ${
                                refreshing ? "animate-spin" : ""
                            }`}
                        />
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate("/create")}
                        className="bg-[#B23737] hover:bg-[#7F1F22] p-4 rounded-full transition-all duration-300 shadow-lg"
                    >
                        <Pencil className="text-black h-6 w-6" />
                    </motion.button>
                </div>
            </div>

            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="mb-6"
                    >
                        <Alert variant="destructive">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    </motion.div>
                )}
            </AnimatePresence>

            {isLoading ? (
                <div className="flex items-center justify-center h-64">
                    <Loader2 className="w-8 h-8 text-black animate-spin" />
                </div>
            ) : (
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-4 gap-6"
                >
                    {articles.map((article) => (
                        <motion.div
                            key={article.id}
                            variants={item}
                            layoutId={`article-${article.id}`}
                            onClick={() => navigate(`/article/${article.id}`)}
                            className="group bg-orange-200 rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
                        >
                            <div className="bg-[#B23737] p-6 transition-colors duration-300 group-hover:bg-[#7F1F22]">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="font-work-sans text-2xl font-bold text-white">
                                            {article.authorName}
                                        </div>
                                        <div className="flex items-center gap-2 font-work-sans text-sm text-white/75">
                                            <Calendar className="w-4 h-4" />
                                            {new Date(
                                                article.createdAt,
                                            ).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })}
                                        </div>
                                    </div>
                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="text-white/0 group-hover:text-white/100 transition-all duration-300"
                                    >
                                        <ChevronRight className="w-6 h-6" />
                                    </motion.div>
                                </div>
                            </div>

                            <div className="p-6">
                                <h2 className="font-work-sans text-4xl font-bold text-gray-900 tracking-tight mb-4 line-clamp-2">
                                    {article.title}
                                </h2>
                                <p className="font-work-sans text-lg text-gray-600 leading-relaxed line-clamp-3">
                                    {article.content}
                                </p>
                                <motion.div
                                    className="mt-4 text-[#B23737] font-medium"
                                >
                                    Read more →
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            )}

            {!isLoading && articles.length === 0 && pageNo === 1 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-16"
                >
                    <h3 className="text-2xl text-slate-950/80 mb-4">
                        No articles yet
                    </h3>
                    <Button
                        onClick={() => navigate("/create")}
                        className="bg-[#B23737] hover:bg-[#7F1F22]"
                    >
                        Create Your First Article
                    </Button>
                </motion.div>
            )}


            <div className="flex justify-self-center mt-8 items-center">
                <Button
                    onClick={handlePreviousPage}
                    disabled={pageNo === 1}
                    className="bg-[#B23737] hover:bg-[#7F1F22]"
                >
                    Previous
                </Button>
                <input
                    type="number"
                    value={pageNo}
                    readOnly
                    className="mx-4 w-12 border rounded-md p-2 text-center"
                    min="0"
                />
                <Button
                    onClick={handleNextPage}
                    disabled={isLastPage}
                    className="bg-[#B23737] hover:bg-[#7F1F22]"
                >
                    Next
                </Button>
            </div>
        </motion.div>
    );
}