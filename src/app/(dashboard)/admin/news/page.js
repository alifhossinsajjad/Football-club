'use client'

import { useState } from 'react'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import { FileText, Eye, Tag, Image, Edit, Trash2 } from 'lucide-react'

export default function NewsManagementPage() {
  const theme = useSelector(state => state.theme)

  const [activeTab, setActiveTab] = useState('all')

  const stats = [
    {
      icon: FileText,
      label: 'Total Articles',
      value: '156',
      subtitle: '23 published this month'
    },
    {
      icon: Eye,
      label: 'Total Views',
      value: '48.2K',
      subtitle: '+18% vs last month'
    },
    {
      icon: Tag,
      label: 'Categories',
      value: '8',
      subtitle: 'Active categories'
    },
    {
      icon: Image,
      label: 'Active Ads',
      value: '12',
      subtitle: 'In news section'
    }
  ]

  const tabs = [
    { id: 'all', label: 'All Articles', count: 156 },
    { id: 'published', label: 'Published', count: 142 },
    { id: 'drafts', label: 'Drafts', count: 14 },
    { id: 'categories', label: 'Categories', count: null }
  ]

  const articles = [
    {
      id: 1,
      title: 'Top 10 Training Drills for Young Strikers',
      category: 'Training',
      categoryColor: '#00E5FF',
      author: 'Admin',
      date: '2025-01-10',
      views: 3245,
      status: 'Published'
    },
    {
      id: 2,
      title: 'Nutrition Guide for Youth Athletes',
      category: 'Nutrition',
      categoryColor: '#4ADE80',
      author: 'Admin',
      date: '2025-01-08',
      views: 2891,
      status: 'Published'
    },
    {
      id: 3,
      title: 'Best Football Academies in Europe 2025',
      category: 'Academies',
      categoryColor: '#9C27B0',
      author: 'Admin',
      date: '2025-01-05',
      views: 5102,
      status: 'Published'
    },
    {
      id: 4,
      title: 'Essential Gear for Youth Players',
      category: 'Gear',
      categoryColor: '#F59E0B',
      author: 'Admin',
      date: '2025-01-15',
      views: 0,
      status: 'Draft'
    }
  ]

  const categories = [
    {
      id: 1,
      name: 'Training',
      icon: Tag,
      color: '#00E5FF',
      articles: 42,
      description: 'Training tips and drills'
    },
    {
      id: 2,
      name: 'Nutrition',
      icon: Tag,
      color: '#4ADE80',
      articles: 28,
      description: 'Nutrition advice for athletes'
    },
    {
      id: 3,
      name: 'Academies',
      icon: Tag,
      color: '#9C27B0',
      articles: 35,
      description: 'Academy reviews and news'
    },
    {
      id: 4,
      name: 'Gear',
      icon: Tag,
      color: '#F59E0B',
      articles: 18,
      description: 'Equipment recommendations'
    },
    {
      id: 5,
      name: 'News',
      icon: Tag,
      color: '#EF4444',
      articles: 25,
      description: 'Latest football news'
    },
    {
      id: 6,
      name: 'Mental Health',
      icon: Tag,
      color: '#06B6D4',
      articles: 8,
      description: 'Mental wellness for athletes'
    }
  ]

  const getStatusStyle = (status) => {
    if (status === 'Published') {
      return {
        backgroundColor: 'rgba(5, 223, 114, 0.2)',
        color: '#05DF72'
      }
    } else if (status === 'Draft') {
      return {
        backgroundColor: 'rgba(251, 191, 36, 0.2)',
        color: '#FBB024'
      }
    }
  }

  return (
    <div className="min-h-screen p-4 lg:p-8">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-4">
        <h1 
          className="text-3xl lg:text-4xl font-bold"
          style={{
            background: `linear-gradient(90deg, ${theme.colors.primaryCyan} 0%, ${theme.colors.primaryMagenta} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            color: 'transparent'
          }}
        >
          News Management
        </h1>
        
        <Link href="/admin/news/create">
          <button 
            className="px-6 py-3 rounded-lg font-semibold text-white transition-all hover:scale-105 flex items-center gap-2"
            style={{
              backgroundColor: '#04B5A3',
              backgroundImage: 'none'
            }}
          >
            + Create New Article
          </button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div 
              key={index}
              className="rounded-lg p-6 border transition-all hover:scale-105"
              style={{
                backgroundColor: theme.colors.backgroundCard,
                borderColor: `${theme.colors.primaryCyan}33`
              }}
            >
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                style={{
                  background: 'linear-gradient(180deg, rgba(0, 229, 255, 0.2) 0%, rgba(156, 39, 176, 0.2) 100%)'
                }}
              >
                <Icon className="w-6 h-6" style={{ color: theme.colors.primaryCyan }} />
              </div>
              <div className="text-sm text-gray-400 mb-2">{stat.label}</div>
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-xs text-gray-500">{stat.subtitle}</div>
            </div>
          )
        })}
      </div>

      {/* Tab Navigation */}
      <div 
        className="border-b mb-6"
        style={{
          borderColor: `${theme.colors.primaryCyan}1A`
        }}
      >
        <div className="flex gap-0 overflow-x-auto">
          {tabs.map(tab => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="relative px-6 py-4 text-sm font-medium whitespace-nowrap transition-all"
                style={{
                  color: isActive ? '#FFFFFF' : '#9CA3AF',
                  borderBottom: isActive ? `2px solid ${theme.colors.primaryCyan}` : '2px solid transparent'
                }}
              >
                {tab.label}
                {tab.count !== null && (
                  <span className="ml-2 text-gray-500">({tab.count})</span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Content Area */}
      {activeTab === 'categories' ? (
        // Categories View
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map(category => {
            const Icon = category.icon
            return (
              <div
                key={category.id}
                className="rounded-lg border p-6 transition-all hover:scale-[1.02]"
                style={{
                  backgroundColor: theme.colors.backgroundCard,
                  borderColor: `${theme.colors.primaryCyan}33`
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{
                        backgroundColor: `${category.color}33`
                      }}
                    >
                      <Icon className="w-6 h-6" style={{ color: category.color }} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{category.name}</h3>
                      <p className="text-sm text-gray-400">{category.articles} articles</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/admin/news/categories/${category.id}`}>
                      <button
                        className="p-2 rounded-lg transition-colors"
                        style={{ color: theme.colors.primaryCyan }}
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    </Link>
                    <button
                      className="p-2 rounded-lg transition-colors hover:bg-red-500 hover:bg-opacity-20"
                      style={{ color: '#EF4444' }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-400">{category.description}</p>
              </div>
            )
          })}
          
          {/* Add New Category Button */}
          <Link href="/admin/news/categories/create">
            <div
              className="rounded-lg border-2 border-dashed p-6 h-full flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-[1.02]"
              style={{
                borderColor: `${theme.colors.primaryCyan}33`
              }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
                style={{
                  backgroundColor: `${theme.colors.primaryCyan}20`
                }}
              >
                <span className="text-2xl" style={{ color: theme.colors.primaryCyan }}>+</span>
              </div>
              <p className="text-white font-medium">Add New Category</p>
            </div>
          </Link>
        </div>
      ) : (
        // Articles Table
        <div 
          className="rounded-lg border overflow-hidden"
          style={{
            backgroundColor: theme.colors.backgroundCard,
            borderColor: `${theme.colors.primaryCyan}33`
          }}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ backgroundColor: theme.colors.backgroundDark }}>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Article Title</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Category</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Author</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Date</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Views</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Status</th>
                  <th className="text-center px-6 py-4 text-sm font-semibold text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((article) => (
                  <tr 
                    key={article.id}
                    className="border-t transition-colors hover:bg-opacity-50"
                    style={{ borderColor: `${theme.colors.primaryCyan}1A` }}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{
                            background: 'linear-gradient(180deg, rgba(0, 229, 255, 0.2) 0%, rgba(156, 39, 176, 0.2) 100%)'
                          }}
                        >
                          <FileText className="w-5 h-5" style={{ color: theme.colors.primaryCyan }} />
                        </div>
                        <div className="text-white font-medium text-sm">{article.title}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
                        style={{
                          backgroundColor: `${article.categoryColor}33`,
                          color: article.categoryColor
                        }}
                      >
                        {article.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">{article.author}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{article.date}</td>
                    <td className="px-6 py-4">
                      <span
                        className="text-sm font-semibold"
                        style={{ color: theme.colors.primaryCyan }}
                      >
                        {article.views.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
                        style={getStatusStyle(article.status)}
                      >
                        {article.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <Link href={`/admin/news/${article.id}`}>
                          <button
                            className="p-2 rounded-lg transition-colors"
                            style={{ color: theme.colors.primaryCyan }}
                            title="View"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </Link>
                        <Link href={`/admin/news/${article.id}/edit`}>
                          <button
                            className="p-2 rounded-lg transition-colors"
                            style={{ color: theme.colors.primaryCyan }}
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                        </Link>
                        <button
                          className="p-2 rounded-lg transition-colors hover:bg-red-500 hover:bg-opacity-20"
                          style={{ color: '#EF4444' }}
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}