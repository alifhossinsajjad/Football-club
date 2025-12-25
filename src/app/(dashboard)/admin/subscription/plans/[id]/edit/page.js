'use client'

import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { ArrowLeft, X, CheckCircle } from 'lucide-react'
import { Input } from '@/components/ui/input'

export default function EditPlanPage() {
  const theme = useSelector(state => state.theme)
  const router = useRouter()

  const [formData, setFormData] = useState({
    planName: 'NextGen Pro',
    price: '9.99',
    billingInterval: 'Yearly',
    features: [
      'Exclusive scout network access',
      'Premium training content',
      'Direct messaging system',
      'Full event access'
    ],
    status: 'active'
  })

  const addFeature = () => {
    setFormData({
      ...formData,
      features: [...formData.features, '']
    })
  }

  const removeFeature = (index) => {
    const newFeatures = formData.features.filter((_, i) => i !== index)
    setFormData({
      ...formData,
      features: newFeatures
    })
  }

  const updateFeature = (index, value) => {
    const newFeatures = [...formData.features]
    newFeatures[index] = value
    setFormData({
      ...formData,
      features: newFeatures
    })
  }

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
            Edit Plan
          </h1>
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
            className="flex-1 sm:flex-none px-6 py-3 rounded-lg font-semibold text-white transition-all hover:scale-105"
            style={{
              backgroundColor: theme.colors.neonAccent
            }}
          >
            Save Plan
          </button>
        </div>
      </div>

      <div className="max-w-3xl space-y-6">
        {/* Plan Details Form */}
        <div 
          className="rounded-lg border p-6"
          style={{
            backgroundColor: theme.colors.backgroundCard,
            borderColor: `${theme.colors.primaryCyan}33`
          }}
        >
          {/* Plan Name */}
          <div className="mb-6">
            <label className="block text-white font-semibold mb-2">Plan Name</label>
            <Input
              type="text"
              value={formData.planName}
              onChange={(e) => setFormData({...formData, planName: e.target.value})}
              className="w-full"
              style={{
                backgroundColor: theme.colors.backgroundDark,
                borderColor: `${theme.colors.primaryCyan}33`,
                color: '#FFFFFF'
              }}
            />
          </div>

          {/* Price and Billing Interval */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-white font-semibold mb-2">Price (€)</label>
              <Input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                className="w-full"
                style={{
                  backgroundColor: theme.colors.backgroundDark,
                  borderColor: `${theme.colors.primaryCyan}33`,
                  color: '#FFFFFF'
                }}
              />
            </div>
            <div>
              <label className="block text-white font-semibold mb-2">Billing Interval</label>
              <select
                value={formData.billingInterval}
                onChange={(e) => setFormData({...formData, billingInterval: e.target.value})}
                className="w-full px-4 py-2 rounded-lg h-10 text-sm"
                style={{
                  backgroundColor: theme.colors.backgroundDark,
                  borderColor: `${theme.colors.primaryCyan}33`,
                  border: `1px solid ${theme.colors.primaryCyan}33`,
                  color: '#FFFFFF'
                }}
              >
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>
          </div>

          {/* Features */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <label className="block text-white font-semibold">Features</label>
              <button
                onClick={addFeature}
                className="px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:scale-105"
                style={{ 
                  backgroundColor: 'rgba(0, 229, 255, 0.2)',
                  color: theme.colors.primaryCyan
                }}
              >
                + Add Feature
              </button>
            </div>
            <div className="space-y-3">
              {formData.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    type="text"
                    value={feature}
                    onChange={(e) => updateFeature(index, e.target.value)}
                    placeholder="Enter feature description"
                    className="w-full"
                    style={{
                      backgroundColor: theme.colors.backgroundDark,
                      borderColor: `${theme.colors.primaryCyan}33`,
                      color: '#FFFFFF'
                    }}
                  />
                  <button
                    onClick={() => removeFeature(index)}
                    className="p-2 rounded-lg transition-colors hover:bg-red-500 hover:bg-opacity-20 flex-shrink-0"
                    style={{ color: '#EF4444' }}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-white font-semibold mb-3">Status</label>
            <div className="flex gap-4">
              <button
                onClick={() => setFormData({...formData, status: 'active'})}
                className="px-6 py-2.5 rounded-lg font-semibold transition-all"
                style={
                  formData.status === 'active'
                    ? {
                        background: 'linear-gradient(180deg, #00E5FF 0%, #9C27B0 100%)',
                        color: '#FFFFFF'
                      }
                    : {
                        backgroundColor: 'transparent',
                        color: '#9CA3AF'
                      }
                }
              >
                Active
              </button>
              <button
                onClick={() => setFormData({...formData, status: 'inactive'})}
                className="px-6 py-2.5 rounded-lg font-semibold transition-all"
                style={
                  formData.status === 'inactive'
                    ? {
                        background: 'linear-gradient(180deg, #00E5FF 0%, #9C27B0 100%)',
                        color: '#FFFFFF'
                      }
                    : {
                        backgroundColor: 'transparent',
                        color: '#9CA3AF'
                      }
                }
              >
                Inactive
              </button>
            </div>
          </div>
        </div>

        {/* Preview Card */}
        <div 
          className="rounded-lg border p-6"
          style={{
            backgroundColor: theme.colors.backgroundCard,
            borderColor: `${theme.colors.primaryCyan}33`
          }}
        >
          <h3 className="text-lg font-semibold text-white mb-6">Preview</h3>
          
          <div 
            className="rounded-lg border p-6"
            style={{
              backgroundColor: theme.colors.backgroundDark,
              borderColor: `${theme.colors.primaryCyan}1A`
            }}
          >
            {/* Header with Name and Price */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <h4 
                  className="text-2xl font-bold mb-1"
                  style={{ color: theme.colors.primaryCyan }}
                >
                  {formData.planName || 'Plan Name'}
                </h4>
                <p className="text-gray-400 text-sm">{formData.billingInterval} Subscription</p>
              </div>
              <div className="text-right">
                <div 
                  className="text-3xl font-bold mb-1"
                  style={{ color: theme.colors.primaryCyan }}
                >
                  €{formData.price || '0.00'}
                </div>
                <div className="text-gray-400 text-sm">
                  /{formData.billingInterval.toLowerCase() === 'yearly' ? 'year' : 'month'}
                </div>
              </div>
            </div>

            {/* Features in 2 columns */}
            {formData.features.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                {formData.features.map((feature, index) => (
                  feature && (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'rgba(5, 223, 114, 1)' }} />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  )
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}