'use client'

import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Tag, Save } from 'lucide-react'
import { Input } from '@/components/ui/input'

export default function CreateCategoryPage() {
  const theme = useSelector(state => state.theme)
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    slug: '',
    parentCategory: '',
    metaTitle: '',
    metaDescription: '',
    visibleInMenu: true,
    featuredCategory: false
  })

  return (
    <div className="min-h-screen p-4 lg:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
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
            Create Category
          </h1>
          <p className="text-gray-400 text-sm mt-1">Add a new category for articles</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <button 
            onClick={() => router.back()}
            className="flex-1 sm:flex-none px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105"
            style={{
              backgroundColor: 'transparent',
              border: `1px solid ${theme.colors.primaryCyan}33`,
              color: '#9CA3AF'
            }}
          >
            Cancel
          </button>
          <button 
            className="flex-1 sm:flex-none px-6 py-3 rounded-lg font-semibold text-white transition-all hover:scale-105 flex items-center justify-center gap-2"
            style={{
              backgroundColor: '#04B5A3',
              backgroundImage: 'none'
            }}
          >
            <Save className="w-5 h-5" />
            Create
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Category Information Card */}
          <div 
            className="rounded-lg border p-4 sm:p-6"
            style={{
              backgroundColor: theme.colors.backgroundCard,
              borderColor: `${theme.colors.primaryCyan}33`
            }}
          >
            <h2 className="text-xl font-semibold text-white mb-6">Category Information</h2>

            {/* Category Name */}
            <div className="mb-6">
              <label className="block text-white font-semibold mb-2">
                Category Name <span style={{ color: '#EF4444' }}>*</span>
              </label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Enter category name..."
                className="w-full"
                style={{
                  backgroundColor: theme.colors.backgroundDark,
                  borderColor: `${theme.colors.primaryCyan}33`,
                  color: '#FFFFFF'
                }}
              />
            </div>

            {/* Description */}
            <div className="mb-6">
              <label className="block text-white font-semibold mb-2">
                Description <span style={{ color: '#EF4444' }}>*</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Enter category description..."
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

            {/* URL Slug */}
            <div className="mb-6">
              <label className="block text-white font-semibold mb-2">URL Slug</label>
              <Input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({...formData, slug: e.target.value})}
                placeholder="category-url-slug"
                className="w-full"
                style={{
                  backgroundColor: theme.colors.backgroundDark,
                  borderColor: `${theme.colors.primaryCyan}33`,
                  color: '#FFFFFF'
                }}
              />
              <p className="text-xs text-gray-500 mt-1">URL: /news/category-url-slug</p>
            </div>

            {/* Parent Category */}
            <div>
              <label className="block text-white font-semibold mb-2">Parent Category (Optional)</label>
              <select
                value={formData.parentCategory}
                onChange={(e) => setFormData({...formData, parentCategory: e.target.value})}
                className="w-full px-4 py-3 rounded-lg"
                style={{
                  backgroundColor: theme.colors.backgroundDark,
                  borderColor: `${theme.colors.primaryCyan}33`,
                  border: `1px solid ${theme.colors.primaryCyan}33`,
                  color: '#FFFFFF'
                }}
              >
                <option value="">None</option>
                <option value="sports">Sports</option>
                <option value="fitness">Fitness</option>
              </select>
            </div>
          </div>

          {/* SEO Settings - Separate Card */}
          <div 
            className="rounded-lg border p-4 sm:p-6"
            style={{
              backgroundColor: theme.colors.backgroundCard,
              borderColor: `${theme.colors.primaryCyan}33`
            }}
          >
            <h2 className="text-xl font-semibold text-white mb-6">SEO Settings</h2>
            
            <div className="mb-4">
              <label className="block text-white font-semibold mb-2">Meta Title</label>
              <Input
                type="text"
                value={formData.metaTitle}
                onChange={(e) => setFormData({...formData, metaTitle: e.target.value})}
                placeholder="Category Name - Football Pros News"
                className="w-full"
                style={{
                  backgroundColor: theme.colors.backgroundDark,
                  borderColor: `${theme.colors.primaryCyan}33`,
                  color: '#FFFFFF'
                }}
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">Meta Description</label>
              <textarea
                value={formData.metaDescription}
                onChange={(e) => setFormData({...formData, metaDescription: e.target.value})}
                placeholder="SEO meta description..."
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
          </div>
        </div>

        {/* Right Column - Preview & Settings */}
        <div className="lg:col-span-1 space-y-6">
          {/* Preview */}
          <div 
            className="rounded-lg border p-4 sm:p-6"
            style={{
              backgroundColor: theme.colors.backgroundCard,
              borderColor: `${theme.colors.primaryCyan}33`
            }}
          >
            <h3 className="text-lg font-semibold text-white mb-4">Preview</h3>
            
            <div 
              className="rounded-lg border p-6"
              style={{
                backgroundColor: theme.colors.backgroundDark,
                borderColor: `${theme.colors.primaryCyan}1A`
              }}
            >
              <div className="flex flex-col items-center text-center mb-4">
                <div 
                  className="w-16 h-16 rounded-lg flex items-center justify-center mb-3"
                  style={{
                    backgroundColor: `${theme.colors.primaryCyan}33`
                  }}
                >
                  <Tag className="w-8 h-8" style={{ color: theme.colors.primaryCyan }} />
                </div>
                <h4 className="text-white font-semibold text-lg mb-1">
                  {formData.name || 'Category Name'}
                </h4>
                <p className="text-sm text-gray-400 mb-3">
                  {formData.description || 'Category description will appear here'}
                </p>
                <span 
                  className="px-3 py-1 rounded-full text-xs font-semibold"
                  style={{
                    backgroundColor: `${theme.colors.primaryCyan}33`,
                    color: theme.colors.primaryCyan
                  }}
                >
                  0 Articles
                </span>
              </div>
            </div>
          </div>

          {/* Settings */}
          <div 
            className="rounded-lg border p-4 sm:p-6"
            style={{
              backgroundColor: theme.colors.backgroundCard,
              borderColor: `${theme.colors.primaryCyan}33`
            }}
          >
            <h3 className="text-lg font-semibold text-white mb-4">Settings</h3>
            
            <div className="space-y-3">
              <div 
                className="flex items-center justify-between p-3 rounded-lg"
                style={{
                  backgroundColor: theme.colors.backgroundDark
                }}
              >
                <div>
                  <h4 className="text-white font-medium text-sm">Visible in Menu</h4>
                  <p className="text-xs text-gray-400">Show in navigation</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={formData.visibleInMenu}
                    onChange={(e) => setFormData({...formData, visibleInMenu: e.target.checked})}
                    className="sr-only peer"
                  />
                  <div 
                    className="w-11 h-6 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"
                    style={{
                      backgroundColor: formData.visibleInMenu ? theme.colors.primaryCyan : '#4B5563'
                    }}
                  ></div>
                </label>
              </div>

              <div 
                className="flex items-center justify-between p-3 rounded-lg"
                style={{
                  backgroundColor: theme.colors.backgroundDark
                }}
              >
                <div>
                  <h4 className="text-white font-medium text-sm">Featured Category</h4>
                  <p className="text-xs text-gray-400">Highlight on homepage</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={formData.featuredCategory}
                    onChange={(e) => setFormData({...formData, featuredCategory: e.target.checked})}
                    className="sr-only peer"
                  />
                  <div 
                    className="w-11 h-6 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"
                    style={{
                      backgroundColor: formData.featuredCategory ? theme.colors.primaryCyan : '#4B5563'
                    }}
                  ></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}