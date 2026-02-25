'use client'

import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Upload } from 'lucide-react'
import { Input } from '@/components/ui/input'

export default function CreateAdSlotPage() {
  const theme = useSelector(state => state.theme)
  const router = useRouter()

  const [formData, setFormData] = useState({
    adSlotName: '',
    adSize: '',
    position: '',
    advertiserName: '',
    targetUrl: '',
    startDate: '',
    endDate: '',
    campaignBudget: '500',
    billingType: 'CPM (Cost per 1000 impressions)',
    active: true,
    trackClicks: true
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
            Add New Ad Slot
          </h1>
          <p className="text-gray-400 text-sm mt-1">Create a new advertisement placement</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
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
              backgroundColor: theme.colors.neonAccent
            }}
          >
            Create Ad Slot
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Ad Slot Information */}
          <div 
            className="rounded-lg border p-4 sm:p-6"
            style={{
              backgroundColor: theme.colors.backgroundCard,
              borderColor: `${theme.colors.primaryCyan}33`
            }}
          >
            <h2 className="text-xl font-semibold text-white mb-6">Ad Slot Information</h2>

            {/* Ad Slot Name */}
            <div className="mb-6">
              <label className="block text-white font-semibold mb-2">
                Ad Slot Name <span style={{ color: '#EF4444' }}>*</span>
              </label>
              <Input
                type="text"
                value={formData.adSlotName}
                onChange={(e) => setFormData({...formData, adSlotName: e.target.value})}
                placeholder="e.g., News Section - Top Banner"
                className="w-full"
                style={{
                  backgroundColor: theme.colors.backgroundDark,
                  borderColor: `${theme.colors.primaryCyan}33`,
                  color: '#FFFFFF'
                }}
              />
            </div>

            {/* Ad Size and Position */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-white font-semibold mb-2">
                  Ad Size <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <select
                  value={formData.adSize}
                  onChange={(e) => setFormData({...formData, adSize: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg"
                  style={{
                    backgroundColor: theme.colors.backgroundDark,
                    borderColor: `${theme.colors.primaryCyan}33`,
                    border: `1px solid ${theme.colors.primaryCyan}33`,
                    color: '#FFFFFF'
                  }}
                >
                  <option value="">Select size...</option>
                  <option value="1200x200">1200x200 (Leaderboard)</option>
                  <option value="300x250">300x250 (Medium Rectangle)</option>
                  <option value="728x90">728x90 (Banner)</option>
                  <option value="970x90">970x90 (Large Banner)</option>
                </select>
              </div>
              <div>
                <label className="block text-white font-semibold mb-2">
                  Position <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <select
                  value={formData.position}
                  onChange={(e) => setFormData({...formData, position: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg"
                  style={{
                    backgroundColor: theme.colors.backgroundDark,
                    borderColor: `${theme.colors.primaryCyan}33`,
                    border: `1px solid ${theme.colors.primaryCyan}33`,
                    color: '#FFFFFF'
                  }}
                >
                  <option value="">Select position...</option>
                  <option value="News Header">News Header</option>
                  <option value="News Sidebar">News Sidebar</option>
                  <option value="Between Articles">Between Articles</option>
                  <option value="News Footer">News Footer</option>
                </select>
              </div>
            </div>

            {/* Advertiser Name */}
            <div className="mb-6">
              <label className="block text-white font-semibold mb-2">Advertiser Name</label>
              <Input
                type="text"
                value={formData.advertiserName}
                onChange={(e) => setFormData({...formData, advertiserName: e.target.value})}
                placeholder="e.g., Nike Sports"
                className="w-full"
                style={{
                  backgroundColor: theme.colors.backgroundDark,
                  borderColor: `${theme.colors.primaryCyan}33`,
                  color: '#FFFFFF'
                }}
              />
            </div>

            {/* Target URL */}
            <div className="mb-6">
              <label className="block text-white font-semibold mb-2">
                Target URL <span style={{ color: '#EF4444' }}>*</span>
              </label>
              <Input
                type="text"
                value={formData.targetUrl}
                onChange={(e) => setFormData({...formData, targetUrl: e.target.value})}
                placeholder="https://example.com"
                className="w-full"
                style={{
                  backgroundColor: theme.colors.backgroundDark,
                  borderColor: `${theme.colors.primaryCyan}33`,
                  color: '#FFFFFF'
                }}
              />
            </div>

            {/* Start Date and End Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-semibold mb-2">Start Date</label>
                <select
                  value={formData.startDate}
                  onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg"
                  style={{
                    backgroundColor: theme.colors.backgroundDark,
                    borderColor: `${theme.colors.primaryCyan}33`,
                    border: `1px solid ${theme.colors.primaryCyan}33`,
                    color: '#FFFFFF'
                  }}
                >
                  <option value="">dd/mm/yy</option>
                </select>
              </div>
              <div>
                <label className="block text-white font-semibold mb-2">End Date</label>
                <select
                  value={formData.endDate}
                  onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg"
                  style={{
                    backgroundColor: theme.colors.backgroundDark,
                    borderColor: `${theme.colors.primaryCyan}33`,
                    border: `1px solid ${theme.colors.primaryCyan}33`,
                    color: '#FFFFFF'
                  }}
                >
                  <option value="">dd/mm/yy</option>
                </select>
              </div>
            </div>
          </div>

          {/* Banner Upload */}
          <div 
            className="rounded-lg border p-4 sm:p-6"
            style={{
              backgroundColor: theme.colors.backgroundCard,
              borderColor: `${theme.colors.primaryCyan}33`
            }}
          >
            <h2 className="text-xl font-semibold text-white mb-6">Banner Upload</h2>
            
            <div 
              className="rounded-lg p-12 border-2 border-dashed cursor-pointer transition-all hover:scale-[1.01]"
              style={{
                backgroundColor: theme.colors.backgroundDark,
                borderColor: `${theme.colors.primaryCyan}33`
              }}
            >
              <div className="text-center">
                <Upload className="w-12 h-12 mx-auto mb-4" style={{ color: theme.colors.primaryCyan }} />
                <p className="text-white font-medium mb-1">Click to upload banner or drag and drop</p>
                <p className="text-gray-400 text-sm">PNG, JPG, GIF (max 5MB)</p>
                <p className="text-gray-500 text-xs mt-2">Recommended: 1200x200 pixels</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Status & Preview */}
        <div className="lg:col-span-1 space-y-6">
          {/* Status & Settings */}
          <div 
            className="rounded-lg border p-4 sm:p-6"
            style={{
              backgroundColor: theme.colors.backgroundCard,
              borderColor: `${theme.colors.primaryCyan}33`
            }}
          >
            <h3 className="text-lg font-semibold text-white mb-4">Status & Settings</h3>
            
            <div className="space-y-3">
              <div 
                className="flex items-center justify-between p-3 rounded-lg"
                style={{
                  backgroundColor: theme.colors.backgroundDark
                }}
              >
                <div>
                  <h4 className="text-white font-medium text-sm">Active</h4>
                  <p className="text-xs text-gray-400">Show ad on site</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={formData.active}
                    onChange={(e) => setFormData({...formData, active: e.target.checked})}
                    className="sr-only peer"
                  />
                  <div 
                    className="w-11 h-6 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"
                    style={{
                      backgroundColor: formData.active ? theme.colors.primaryCyan : '#4B5563'
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
                  <h4 className="text-white font-medium text-sm">Track Clicks</h4>
                  <p className="text-xs text-gray-400">Analytics enabled</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={formData.trackClicks}
                    onChange={(e) => setFormData({...formData, trackClicks: e.target.checked})}
                    className="sr-only peer"
                  />
                  <div 
                    className="w-11 h-6 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"
                    style={{
                      backgroundColor: formData.trackClicks ? theme.colors.primaryCyan : '#4B5563'
                    }}
                  ></div>
                </label>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div 
            className="rounded-lg border p-4 sm:p-6"
            style={{
              backgroundColor: theme.colors.backgroundCard,
              borderColor: `${theme.colors.primaryCyan}33`
            }}
          >
            <h3 className="text-lg font-semibold text-white mb-4">Pricing</h3>
            
            <div className="mb-4">
              <label className="block text-white font-semibold mb-2">Campaign Budget</label>
              <div className="flex items-center gap-2">
                <span className="text-gray-400">€</span>
                <Input
                  type="number"
                  value={formData.campaignBudget}
                  onChange={(e) => setFormData({...formData, campaignBudget: e.target.value})}
                  className="w-full"
                  style={{
                    backgroundColor: theme.colors.backgroundDark,
                    borderColor: `${theme.colors.primaryCyan}33`,
                    color: '#FFFFFF'
                  }}
                />
              </div>
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">Billing Type</label>
              <select
                value={formData.billingType}
                onChange={(e) => setFormData({...formData, billingType: e.target.value})}
                className="w-full px-4 py-3 rounded-lg"
                style={{
                  backgroundColor: theme.colors.backgroundDark,
                  borderColor: `${theme.colors.primaryCyan}33`,
                  border: `1px solid ${theme.colors.primaryCyan}33`,
                  color: '#FFFFFF'
                }}
              >
                <option value="CPM (Cost per 1000 impressions)">CPM (Cost per 1000 impressions)</option>
                <option value="CPC (Cost per click)">CPC (Cost per click)</option>
                <option value="Fixed">Fixed</option>
              </select>
            </div>
          </div>

          {/* Position Preview */}
          <div 
            className="rounded-lg border p-4 sm:p-6"
            style={{
              backgroundColor: theme.colors.backgroundCard,
              borderColor: `${theme.colors.primaryCyan}33`
            }}
          >
            <h3 className="text-lg font-semibold text-white mb-4">Position Preview</h3>
            
            <div 
              className="rounded-lg p-4"
              style={{
                backgroundColor: theme.colors.backgroundDark
              }}
            >
              <div className="space-y-2 mb-3">
                <div className="h-2 bg-gray-700 rounded w-3/4"></div>
                <div className="h-2 bg-gray-700 rounded w-1/2"></div>
              </div>
              
              <div 
                className="rounded-lg border-2 p-6 flex items-center justify-center"
                style={{
                  background: 'linear-gradient(180deg, rgba(0, 229, 255, 0.2) 0%, rgba(156, 39, 176, 0.2) 100%)',
                  borderColor: theme.colors.primaryCyan,
                  minHeight: '100px'
                }}
              >
                <span className="text-sm font-semibold" style={{ color: theme.colors.primaryCyan }}>
                  AD PLACEMENT
                </span>
              </div>
              
              <div className="space-y-2 mt-3">
                <div className="h-2 bg-gray-700 rounded w-3/4"></div>
                <div className="h-2 bg-gray-700 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}