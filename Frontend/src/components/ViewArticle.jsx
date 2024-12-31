import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ThumbsUp, MessageCircle, Share2 } from 'lucide-react'

export default function ViewArticle() {
  const [article, setArticle] = useState(null)
  const [error, setError] = useState('')
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    fetch(`http://localhost:8080/articles/${id}`)
      .then(res => res.json())
      .then(data => setArticle(data))
      .catch(err => setError('Failed to load article'))
  }, [id])

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:8080/articles/${id}`, {
        method: 'DELETE'
      })
      if (!res.ok) throw new Error('Failed to delete article')
      navigate('/')
    } catch (err) {
      setError(err.message)
    }
  }

  if (error) return <div className="text-red-500 p-6">{error}</div>
  if (!article) return <div className="text-white p-6">Loading...</div>

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg">
        <div className="bg-[#B23737] p-4 rounded-t-lg">
          <h1 className="text-[40px] font-bold text-white tracking-[-2%]">{article.title}</h1>
        </div>

        <div className="bg-[#7F1F22] p-2 text-white">
          <p className="text-sm">{article.authorName}</p>
          <p className="text-xs">Created: {new Date(article.createdAt).toLocaleDateString()}</p>
        </div>

        <div className="p-6">
          <p className="text-[16px] leading-relaxed mb-6">{article.content}</p>

          <div className="flex gap-4 text-gray-600">
            <ThumbsUp className="cursor-pointer" />
            <MessageCircle className="cursor-pointer" />
            <Share2 className="cursor-pointer" />
          </div>
        </div>

        <div className="p-6 border-t">
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-6 py-2 rounded font-bold"
          >
            Delete Article
          </button>
        </div>
      </div>
    </div>
  )
}