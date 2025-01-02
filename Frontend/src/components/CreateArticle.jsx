import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

export default function CreateArticle() {
    const [formData, setFormData] = useState({
        author: "",
        title: "",
        content: "",
    });
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [characterCount, setCharacterCount] = useState(0);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        try {
            const response = await fetch("http://localhost:8080/articles", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error("Failed to create article");

            // Show success animation before navigation
            await new Promise((resolve) => setTimeout(resolve, 1000));
            navigate("/");
        } catch (err) {
            setError("Failed to create article. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleContentChange = (e) => {
        const content = e.target.value;
        setFormData({ ...formData, content: content });
        setCharacterCount(content.length);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="container mx-auto px-6 py-8 max-w-3xl"
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
                    className="p-8 relative overflow-hidden"
                >
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="font-work-sans text-6xl font-bold text-white tracking-tight"
                    >
                        Create Article
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 0.1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="absolute right-0 top-0 w-64 h-64 bg-white rounded-full -mr-32 -mt-32"
                    />
                </motion.div>

                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                        >
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.form
                    onSubmit={handleSubmit}
                    className="p-8 space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <label className="block font-work-sans text-2xl font-medium text-gray-800 mb-2">
                            Author Name
                        </label>
                        <Input
                            type="text"
                            className="w-full p-3 border-2 border-gray-200 rounded-lg font-work-sans text-lg transition-all duration-200 focus:ring-2 focus:ring-[#B23737] focus:border-transparent"
                            value={formData.author}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    author: e.target.value,
                                })
                            }
                            required
                            placeholder="Enter your name"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <label className="block font-work-sans text-2xl font-medium text-gray-800 mb-2">
                            Title of Article
                        </label>
                        <Input
                            type="text"
                            className="w-full p-3 border-2 border-gray-200 rounded-lg font-work-sans text-lg transition-all duration-200 focus:ring-2 focus:ring-[#B23737] focus:border-transparent"
                            value={formData.title}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    title: e.target.value,
                                })
                            }
                            required
                            placeholder="Enter article title"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="relative"
                    >
                        <label className="block font-work-sans text-2xl font-medium text-gray-800 mb-2">
                            Content of Article
                        </label>
                        <Textarea
                            className="w-full p-4 border-2 border-gray-200 rounded-lg font-work-sans text-lg min-h-[16rem] transition-all duration-200 focus:ring-2 focus:ring-[#B23737] focus:border-transparent"
                            value={formData.content}
                            onChange={handleContentChange}
                            required
                            placeholder="Write your article content here..."
                        />
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.6 }}
                            className="absolute bottom-4 right-4 text-sm text-gray-500"
                        >
                            {characterCount} characters
                        </motion.span>
                    </motion.div>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-[#B23737] hover:bg-[#7F1F22] text-white font-work-sans text-lg font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70"
                        >
                            {isSubmitting ? (
                                <motion.div className="flex items-center justify-center gap-2">
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    <span>Creating Article...</span>
                                </motion.div>
                            ) : (
                                <motion.div className="flex items-center justify-center gap-2">
                                    <CheckCircle className="w-5 h-5" />
                                    <span>Create Article</span>
                                </motion.div>
                            )}
                        </Button>
                    </motion.div>
                </motion.form>
            </motion.div>
        </motion.div>
    );
}
