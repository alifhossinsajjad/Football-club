'use client'

import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Upload, Bold, Italic, Underline, Heading1, Heading2, Heading3, Link as LinkIcon, Image as ImageIcon, List } from 'lucide-react'
import { Input } from '@/components/ui/input'

export default function CreateArticlePage() {
  const theme = useSelector(state => state.theme)
  const router = useRouter()

  const [formData, setFormData] = useState({
    title: '',
    category: 'Training',
    author: 'Admin',
    publishDate: '10/01/2025',
    excerpt: '',
    content: '',
    metaDescription: '',
    tags: '',
    publishStatus: 'draft'
  })

  return (
    <div className="min-h-screen p-4 lg:p-8">
      {/* Header */}
      <div className="mb-8 flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="flex items-center justify-center w-10 h-10 rounded-lg transition-all hover:scale-110"
          style={{
            backgroundColor: `${theme.colors.primaryCyan}20`,
            color: theme.colors.primaryCyan
          }}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h1 
            className="text-3xl lg:text-4xl font-bold"
            style={{
              background: `linear-gradient(90deg, ${theme.colors.primaryCyan} 0%, ${theme.colors.primaryMagenta} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent',
              display: 'inline-block'
            }}
          >
            Create Article
          </h1>
        </div>
        <div className="flex gap-3">
          <button 
            className="px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105"
            style={{
              backgroundColor: 'transparent',
              border: `1px solid ${theme.colors.primaryCyan}33`,
              color: '#9CA3AF'
            }}
          >
            Cancel
          </button>
          <button 
            className="px-6 py-3 rounded-lg font-semibold text-white transition-all hover:scale-105"
            style={{
              backgroundColor: '#04B5A3',
              backgroundImage: 'none'
            }}
          >
            Create
          </button>
        </div>
      </div>

      {/* Form Container - Full Width */}
      <div 
        className="rounded-lg border p-8"
        style={{
          backgroundColor: theme.colors.backgroundCard,
          borderColor: `${theme.colors.primaryCyan}33`
        }}
      >
        {/* Article Title */}
        <div className="mb-6">
          <label className="block text-white font-semibold mb-2">
            Article Title <span style={{ color: '#EF4444' }}>*</span>
          </label>
          <Input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            placeholder="Enter article title..."
            className="w-full text-lg"
            style={{
              backgroundColor: theme.colors.backgroundDark,
              borderColor: `${theme.colors.primaryCyan}33`,
              color: '#FFFFFF'
            }}
          />
          <p className="text-xs text-gray-500 mt-1">Keep it under 60 characters for best SEO performance</p>
        </div>

        {/* Category, Author, Publish Date */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-white font-semibold mb-2">
              Category <span style={{ color: '#EF4444' }}>*</span>
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="w-full px-4 py-3 rounded-lg"
              style={{
                backgroundColor: theme.colors.backgroundDark,
                borderColor: `${theme.colors.primaryCyan}33`,
                border: `1px solid ${theme.colors.primaryCyan}33`,
                color: '#FFFFFF'
              }}
            >
              <option value="Training">Training</option>
              <option value="Nutrition">Nutrition</option>
              <option value="Academies">Academies</option>
              <option value="Gear">Gear</option>
            </select>
          </div>
          <div>
            <label className="block text-white font-semibold mb-2">
              Author <span style={{ color: '#EF4444' }}>*</span>
            </label>
            <Input
              type="text"
              value={formData.author}
              onChange={(e) => setFormData({...formData, author: e.target.value})}
              className="w-full"
              style={{
                backgroundColor: theme.colors.backgroundDark,
                borderColor: `${theme.colors.primaryCyan}33`,
                color: '#FFFFFF'
              }}
            />
          </div>
          <div>
            <label className="block text-white font-semibold mb-2">Publish Date</label>
            <Input
              type="text"
              value={formData.publishDate}
              onChange={(e) => setFormData({...formData, publishDate: e.target.value})}
              placeholder="10/01/2025"
              className="w-full"
              style={{
                backgroundColor: theme.colors.backgroundDark,
                borderColor: `${theme.colors.primaryCyan}33`,
                color: '#FFFFFF'
              }}
            />
          </div>
        </div>

        {/* Featured Image */}
        <div className="mb-6">
          <label className="block text-white font-semibold mb-2">Featured Image</label>
          <div 
            className="rounded-lg p-12 border-2 border-dashed cursor-pointer transition-all hover:scale-[1.01]"
            style={{
              backgroundColor: theme.colors.backgroundDark,
              borderColor: `${theme.colors.primaryCyan}33`
            }}
          >
            <div className="text-center">
              <Upload className="w-12 h-12 mx-auto mb-4" style={{ color: theme.colors.primaryCyan }} />
              <p className="text-white font-medium mb-1">Click to upload or drag and drop</p>
              <p className="text-gray-400 text-sm">PNG, JPG, GIF up to 10MB</p>
              <p className="text-gray-500 text-xs mt-2">Recommended size: 1920 x 800 pixels</p>
            </div>
          </div>
        </div>

        {/* Article Excerpt */}
        <div className="mb-6">
          <label className="block text-white font-semibold mb-2">Article Excerpt</label>
          <textarea
            value={formData.excerpt}
            onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
            placeholder="Write a brief summary (150-160 characters recommended for SEO)..."
            rows={3}
            className="w-full px-4 py-3 rounded-lg resize-none"
            style={{
              backgroundColor: theme.colors.backgroundDark,
              borderColor: `${theme.colors.primaryCyan}33`,
              border: `1px solid ${theme.colors.primaryCyan}33`,
              color: '#FFFFFF'
            }}
          />
        </div>

        {/* Article Content */}
        <div className="mb-6">
          <label className="block text-white font-semibold mb-2">
            Article Content <span style={{ color: '#EF4444' }}>*</span>
          </label>
          
          {/* Text Editor Toolbar */}
          <div 
            className="flex items-center gap-1 p-2 rounded-t-lg border-b"
            style={{
              backgroundColor: theme.colors.backgroundDark,
              borderColor: `${theme.colors.primaryCyan}33`
            }}
          >
            <button className="p-2 rounded hover:bg-gray-700 transition-colors">
              <Bold className="w-4 h-4 text-gray-400" />
            </button>
            <button className="p-2 rounded hover:bg-gray-700 transition-colors">
              <Italic className="w-4 h-4 text-gray-400" />
            </button>
            <button className="p-2 rounded hover:bg-gray-700 transition-colors">
              <Underline className="w-4 h-4 text-gray-400" />
            </button>
            <div className="w-px h-6 bg-gray-700 mx-1"></div>
            <button className="p-2 rounded hover:bg-gray-700 transition-colors">
              <Heading1 className="w-4 h-4 text-gray-400" />
            </button>
            <button className="p-2 rounded hover:bg-gray-700 transition-colors">
              <Heading2 className="w-4 h-4 text-gray-400" />
            </button>
            <button className="p-2 rounded hover:bg-gray-700 transition-colors">
              <Heading3 className="w-4 h-4 text-gray-400" />
            </button>
            <div className="w-px h-6 bg-gray-700 mx-1"></div>
            <button className="p-2 rounded hover:bg-gray-700 transition-colors">
              <LinkIcon className="w-4 h-4 text-gray-400" />
            </button>
            <button className="p-2 rounded hover:bg-gray-700 transition-colors">
              <ImageIcon className="w-4 h-4 text-gray-400" />
            </button>
            <button className="p-2 rounded hover:bg-gray-700 transition-colors">
              <List className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          <textarea
            value={formData.content}
            onChange={(e) => setFormData({...formData, content: e.target.value})}
            placeholder="Start writing your article..."
            rows={15}
            className="w-full px-4 py-3 rounded-b-lg resize-none font-mono text-sm"
            style={{
              backgroundColor: theme.colors.backgroundDark,
              borderColor: `${theme.colors.primaryCyan}33`,
              border: `1px solid ${theme.colors.primaryCyan}33`,
              borderTop: 'none',
              color: '#FFFFFF'
            }}
          />
          <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
            💡 tip: Use Markdown formatting for better structure (### for h3, ** for bold)
          </p>
        </div>

        {/* SEO & Metadata */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">SEO & Metadata</h3>
          
          <div className="mb-4">
            <label className="block text-white font-semibold mb-2">Meta Description</label>
            <textarea
              value={formData.metaDescription}
              onChange={(e) => setFormData({...formData, metaDescription: e.target.value})}
              placeholder="SEO meta description (150-160 characters)..."
              rows={2}
              className="w-full px-4 py-3 rounded-lg resize-none"
              style={{
                backgroundColor: theme.colors.backgroundDark,
                borderColor: `${theme.colors.primaryCyan}33`,
                border: `1px solid ${theme.colors.primaryCyan}33`,
                color: '#FFFFFF'
              }}
            />
          </div>

          <div>
            <label className="block text-white font-semibold mb-2">Tags (comma separated)</label>
            <Input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({...formData, tags: e.target.value})}
              placeholder="training, drills, striker, youth, football, techniques"
              className="w-full"
              style={{
                backgroundColor: theme.colors.backgroundDark,
                borderColor: `${theme.colors.primaryCyan}33`,
                color: '#FFFFFF'
              }}
            />
          </div>
        </div>

        {/* Publishing Status */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Publishing Status</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div 
              className="rounded-lg border p-4 cursor-pointer transition-all hover:scale-[1.02]"
              style={{
                backgroundColor: theme.colors.backgroundDark,
                borderColor: formData.publishStatus === 'draft' ? theme.colors.primaryCyan : `${theme.colors.primaryCyan}33`
              }}
              onClick={() => setFormData({...formData, publishStatus: 'draft'})}
            >
              <div className="flex items-start gap-3">
                <div 
                  className="w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{
                    borderColor: formData.publishStatus === 'draft' ? theme.colors.primaryCyan : '#4B5563',
                    backgroundColor: theme.colors.backgroundDark
                  }}
                >
                  {formData.publishStatus === 'draft' && (
                    <div 
                      className="w-3 h-3 rounded-sm"
                      style={{ backgroundColor: theme.colors.primaryCyan }}
                    />
                  )}
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Save as Draft</h4>
                  <p className="text-gray-400 text-sm">Keep working on it before publishing</p>
                </div>
              </div>
            </div>

            <div 
              className="rounded-lg border p-4 cursor-pointer transition-all hover:scale-[1.02]"
              style={{
                backgroundColor: theme.colors.backgroundDark,
                borderColor: formData.publishStatus === 'publish' ? theme.colors.primaryCyan : `${theme.colors.primaryCyan}33`
              }}
              onClick={() => setFormData({...formData, publishStatus: 'publish'})}
            >
              <div className="flex items-start gap-3">
                <div 
                  className="w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{
                    borderColor: formData.publishStatus === 'publish' ? theme.colors.primaryCyan : '#4B5563',
                    backgroundColor: theme.colors.backgroundDark
                  }}
                >
                  {formData.publishStatus === 'publish' && (
                    <div 
                      className="w-3 h-3 rounded-sm"
                      style={{ backgroundColor: theme.colors.primaryCyan }}
                    />
                  )}
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Publish Now</h4>
                  <p className="text-gray-400 text-sm">Make it live on the platform</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}