import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ThumbsUp, MessageCircle, Share2, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Alert, AlertDescription } from "./ui/alert";

export default function ViewArticle() {
    const [article, setArticle] = useState(null);
    const [error, setError] = useState("");
    const [isLiked, setIsLiked] = useState(false);
    const [showShareTooltip, setShowShareTooltip] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8080/articles/${id}`)
            .then((res) => res.json())
            .then((data) => setArticle(data))
            .catch((err) => setError("Failed to load article"));
    }, [id]);

    const handleDelete = async () => {
        try {
            const res = await fetch(`http://localhost:8080/articles/${id}`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error("Failed to delete article");
            navigate("/");
        } catch (err) {
            setError(err.message);
        }
    };

    if (error) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto p-6"
            >
                <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            </motion.div>
        );
    }

    if (!article) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="w-8 h-8 text-white animate-spin" />
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto p-6"
        >
            <motion.div
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                className="bg-white rounded-lg shadow-xl overflow-hidden"
            >
                <motion.div
                    initial={{ backgroundColor: "#B23737" }}
                    whileHover={{ backgroundColor: "#cc3d3d" }}
                    transition={{ duration: 0.3 }}
                    className="p-6 rounded-t-lg"
                >
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl font-bold text-white tracking-tight"
                    >
                        {article.title}
                    </motion.h1>
                </motion.div>

                <div className="bg-[#7F1F22] p-4 text-white">
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <p className="text-sm font-medium">
                            {article.authorName}
                        </p>
                        <p className="text-xs opacity-80">
                            Created:{" "}
                            {new Date(article.createdAt).toLocaleDateString()}
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="p-8"
                >
                    <p className="text-lg leading-relaxed mb-8 text-gray-800">
                        {article.content}
                    </p>

                    <div className="flex gap-6 text-gray-600">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsLiked(!isLiked)}
                            className="flex items-center gap-2 transition-colors"
                        >
                            <ThumbsUp
                                className={`${isLiked ? "fill-current text-[#B23737]" : ""}`}
                            />
                            <span className="text-sm">Like</span>
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2"
                        >
                            <MessageCircle />
                            <span className="text-sm">Comment</span>
                        </motion.button>

                        <motion.div className="relative">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onMouseEnter={() => setShowShareTooltip(true)}
                                onMouseLeave={() => setShowShareTooltip(false)}
                                className="flex items-center gap-2"
                            >
                                <Share2 />
                                <span className="text-sm">Share</span>
                            </motion.button>

                            <AnimatePresence>
                                {showShareTooltip && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-2 px-3 rounded whitespace-nowrap"
                                    >
                                        Share this article
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="p-6 border-t border-gray-100"
                >
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleDelete}
                        className="bg-red-500 text-white px-6 py-2 rounded-md font-medium shadow-lg hover:bg-red-600 transition-colors"
                    >
                        Delete Article
                    </motion.button>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
