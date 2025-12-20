'use client'

import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { ArrowLeft, Eye, Calendar, TrendingUp, Tag, Trash2, Lightbulb } from 'lucide-react'

export default function ArticlePreviewPage() {
  const theme = useSelector(state => state.theme)
  const router = useRouter()

  const stats = [
    {
      label: 'Total Views',
      value: '3,245'
    },
    {
      label: 'Engagement Rate',
      value: '68%'
    },
    {
      label: 'Avg Read Time',
      value: '4:32'
    },
    {
      label: 'Shares',
      value: '124'
    }
  ]

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
            Article Preview
          </h1>
        </div>
        <button 
          onClick={() => router.push('/admin/news/1/edit')}
          className="w-full sm:w-auto px-6 py-3 rounded-lg font-semibold text-white transition-all hover:scale-105"
          style={{
            backgroundColor: '#04B5A3',
            backgroundImage: 'none'
          }}
        >
          Edit Article
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div 
            key={index}
            className="rounded-lg border p-6"
            style={{
              backgroundColor: theme.colors.backgroundCard,
              borderColor: `${theme.colors.primaryCyan}33`
            }}
          >
            <div className="text-sm text-gray-400 mb-2">{stat.label}</div>
            <div className="text-3xl font-bold text-white">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Article Content - Full Width */}
      <div 
        className="rounded-lg border p-4 sm:p-6 lg:p-8"
        style={{
          backgroundColor: theme.colors.backgroundCard,
          borderColor: `${theme.colors.primaryCyan}33`
        }}
      >
        {/* Badges and Metadata */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span
            className="px-3 py-1 rounded-full text-xs font-semibold"
            style={{
              backgroundColor: `${theme.colors.primaryCyan}33`,
              color: theme.colors.primaryCyan
            }}
          >
            Training
          </span>
          <span
            className="px-3 py-1 rounded-full text-xs font-semibold"
            style={{
              backgroundColor: 'rgba(5, 223, 114, 0.2)',
              color: '#05DF72'
            }}
          >
            Published
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-white mb-6">
          Top 10 Training Drills for Young Strikers
        </h1>

        {/* Author and Date */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src="/author.jpg"
                alt="Admin"
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
            <div>
              <div className="text-white text-sm font-medium">Admin</div>
              <div className="text-gray-400 text-xs">Author</div>
            </div>
          </div>
          <div className="hidden sm:block h-8 w-px bg-gray-700"></div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4" style={{ color: theme.colors.primaryCyan }} />
              <span className="text-gray-400">Published on 2025-01-10</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4" style={{ color: theme.colors.primaryCyan }} />
              <span className="text-gray-400">Trending in Training</span>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div 
          className="rounded-lg mb-8 flex items-center justify-center"
          style={{
            background: 'linear-gradient(180deg, rgba(0, 229, 255, 0.15) 0%, rgba(156, 39, 176, 0.15) 100%)',
            height: '400px',
            border: `1px solid ${theme.colors.primaryCyan}33`
          }}
        >
          <div className="text-center">
            <div 
              className="w-20 h-20 rounded-xl flex items-center justify-center mx-auto mb-4"
              style={{
                background: 'linear-gradient(180deg, rgba(0, 229, 255, 0.3) 0%, rgba(156, 39, 176, 0.3) 100%)'
              }}
            >
              <Eye className="w-10 h-10" style={{ color: theme.colors.primaryCyan }} />
            </div>
            <p className="text-white font-medium text-lg mb-1">Featured Image Preview</p>
            <p className="text-gray-400 text-sm">1920 x 800 pixels</p>
          </div>
        </div>

        {/* Article Excerpt */}
        <div className="mb-8">
          <p className="text-gray-300 text-lg leading-relaxed">
            This is a comprehensive guide for young strikers looking to improve their game. In this article, we cover the top 10 training drills used by youth football professionals and academies worldwide. Each drill focuses on improving speed, accuracy, positioning and finishing techniques that are essential for becoming an elite striker.
          </p>
        </div>

        {/* Article Content */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Understanding the Fundamentals</h2>
            <p className="text-gray-300 leading-relaxed">
              Before diving into specific drills, it's crucial to understand what makes a great striker. The best forwards in the world combine technical ability with tactical awareness, physical prowess, and mental strength. These training drills are designed to develop all these aspects simultaneously.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">The Top 10 Training Drills</h2>
            
            <div className="space-y-4">
              <div 
                className="rounded-lg p-4"
                style={{
                  backgroundColor: theme.colors.backgroundDark
                }}
              >
                <h3 
                  className="text-xl font-semibold mb-2"
                  style={{ color: theme.colors.primaryCyan }}
                >
                  1. One-on-One Finishing
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  This drill simulates game situations where you're through on goal with just the goalkeeper to beat. Practice different finishing techniques including chip shots, power shots, and placement shots. Aim for at least 20 repetitions per session, alternating between your strong and weak foot.
                </p>
              </div>

              <div 
                className="rounded-lg p-4"
                style={{
                  backgroundColor: theme.colors.backgroundDark
                }}
              >
                <h3 
                  className="text-xl font-semibold mb-2"
                  style={{ color: theme.colors.primaryCyan }}
                >
                  2. Quick Turn and Shoot
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Receive the ball with your back to goal, turn quickly, and shoot within two touches. This drill improves your ability to create shooting opportunities in tight spaces. Focus on body positioning and using defenders' momentum against them.
                </p>
              </div>

              <div 
                className="rounded-lg p-4"
                style={{
                  backgroundColor: theme.colors.backgroundDark
                }}
              >
                <h3 
                  className="text-xl font-semibold mb-2"
                  style={{ color: theme.colors.primaryCyan }}
                >
                  3. Header Practice
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Heading is a critical skill for any striker. Practice headers from crosses, both near and far post. Work on timing your jump, directing the ball with accuracy, and generating power. Include both standing and running approaches to headers.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Training Schedule and Progression</h2>
            <p className="text-gray-300 leading-relaxed">
              Coaches recommend practicing these drills 3-4 times per week for optimal results. Start with the basics and gradually increase the intensity and complexity. Remember to maintain proper form throughout each drill and always warm up properly before intensive training sessions.
            </p>
          </div>

          {/* Pro Tip Box */}
          <div 
            className="rounded-lg p-6"
            style={{
              background: 'linear-gradient(180deg, rgba(0, 229, 255, 0.1) 0%, rgba(156, 39, 176, 0.1) 100%)',
              border: `1px solid ${theme.colors.primaryCyan}33`
            }}
          >
            <div className="flex items-start gap-3">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{
                  backgroundColor: `${theme.colors.primaryCyan}33`
                }}
              >
                <Lightbulb className="w-5 h-5" style={{ color: theme.colors.primaryCyan }} />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Pro Tip</h3>
                <p className="text-gray-300 text-sm">
                  Record your training sessions and review them to identify areas for improvement. Many professional strikers use video analysis to perfect their technique and decision-making.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Conclusion</h2>
            <p className="text-gray-300 leading-relaxed">
              Becoming a top striker requires dedication, consistent practice, and the right training approach. These 10 drills, when practiced regularly, will significantly improve your finishing ability, positioning, and overall effectiveness in front of goal. Remember, the best strikers are those who continue to learn and adapt their game throughout their careers.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-8 pt-6 border-t" style={{ borderColor: `${theme.colors.primaryCyan}1A` }}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
            <button 
              className="w-full sm:w-auto px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105 flex items-center justify-center gap-2"
              style={{
                backgroundColor: `${theme.colors.primaryCyan}20`,
                color: theme.colors.primaryCyan
              }}
            >
              <Tag className="w-5 h-5" />
              Add Tags
            </button>
            <button 
              className="w-full sm:w-auto px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105 flex items-center justify-center gap-2"
              style={{
                backgroundColor: 'rgba(239, 68, 68, 0.2)',
                color: '#EF4444'
              }}
            >
              <Trash2 className="w-5 h-5" />
              Delete Article
            </button>
          </div>
          <div className="text-gray-500 text-sm w-full sm:w-auto text-left sm:text-right">
            Last updated: 2025-01-10
          </div>
        </div>
      </div>
    </div>
  )
}