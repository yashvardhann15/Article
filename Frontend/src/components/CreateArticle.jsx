import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function CreateArticle() {
  const [formData, setFormData] = useState({
    authorName: '',
    title: '',
    content: ''
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:8080/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      
      if (!response.ok) throw new Error('Failed to create article')
      navigate('/')
    } catch (err) {
      setError('Failed to fetch')
    }
  }

  return (
    <div className="container mx-auto px-6 py-8 max-w-3xl">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-[#B23737] p-6">
          <h1 className="font-work-sans text-[64px] font-bold text-white tracking-[-2%]">
            Create Article
          </h1>
        </div>

        {error && (
          <div className="bg-red-50 text-[#B23737] p-4 font-work-sans text-[16px]">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <label className="block font-work-sans text-[24px] font-medium text-[#181818] mb-2">
              Author Name:
            </label>
            <input
              type="text"
              className="w-full p-3 border border-[#616161] rounded-md font-work-sans text-[16px]"
              value={formData.authorName}
              onChange={(e) => setFormData({...formData, authorName: e.target.value})}
              required
            />
          </div>

          <div>
            <label className="block font-work-sans text-[24px] font-medium text-[#181818] mb-2">
              Title of Article:
            </label>
            <input
              type="text"
              className="w-full p-3 border border-[#616161] rounded-md font-work-sans text-[16px]"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
            />
          </div>

          <div>
            <label className="block font-work-sans text-[24px] font-medium text-[#181818] mb-2">
              Content of article:
            </label>
            <textarea
              className="w-full p-3 border border-[#616161] rounded-md font-work-sans text-[16px] h-64"
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#B23737] hover:bg-[#7F1F22] text-white font-work-sans text-[16px] font-bold py-4 px-6 rounded-md transition-colors"
          >
            Create Article
          </button>
        </form>
      </div>
    </div>
  )
}