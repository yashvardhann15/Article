import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Pencil } from 'lucide-react'

export default function ArticleSection() {
  const [articles, setArticles] = useState([])
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('http://localhost:8080/articles')
        if (!response.ok) throw new Error('Failed to fetch')
        const data = await response.json()
        setArticles(data)
      } catch (err) {
        setError('Failed to load articles')
      }
    }
    fetchArticles()
  }, [])

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-[64px] font-work-sans font-bold text-white tracking-[-2%]">
          Article Section
        </h1>
        <button 
          onClick={() => navigate('/create')}
          className="bg-[#B23737] hover:bg-[#7F1F22] p-4 rounded-full transition-colors"
        >
          <Pencil className="text-white h-6 w-6" />
        </button>
      </div>

      {error && (
        <div className="text-[#B23737] text-[16px] font-work-sans">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map(article => (
          <div 
            key={article.id}
            onClick={() => navigate(`/article/${article.id}`)}
            className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
          >
            <div className="bg-[#B23737] p-4">
              <div className="font-work-sans text-[24px] font-bold text-white">
                {article.authorName}
              </div>
              <div className="font-work-sans text-[14px] text-white opacity-75">
                Created: {new Date(article.createdAt).toLocaleDateString()}
              </div>
            </div>
            <div className="p-6">
              <h2 className="font-work-sans text-[40px] font-bold text-[#181818] tracking-[-2%] mb-2">
                {article.title}
              </h2>
              <p className="font-work-sans text-[16px] text-[#616161] leading-[140%]">
                {article.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
