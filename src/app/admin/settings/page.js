'use client'

import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updatePlatformName, updateTagline, updateColor } from '@/store/slices/themeSlice'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Upload, Settings as SettingsIcon, Users, CreditCard, Bell } from 'lucide-react'

export default function SettingsGeneral() {
  const theme = useSelector(state => state.theme)
  const dispatch = useDispatch()
  
  const [localPlatformName, setLocalPlatformName] = useState(theme.platformName)
  const [localTagline, setLocalTagline] = useState(theme.tagline)
  const [localColors, setLocalColors] = useState(theme.colors)

  const handleSave = () => {
    dispatch(updatePlatformName(localPlatformName))
    dispatch(updateTagline(localTagline))
    Object.entries(localColors).forEach(([key, value]) => {
      dispatch(updateColor({ colorKey: key, value }))
    })
    alert('Changes saved successfully!')
  }

  const handleCancel = () => {
    setLocalPlatformName(theme.platformName)
    setLocalTagline(theme.tagline)
    setLocalColors(theme.colors)
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-400">Manage your platform</p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="border-b border-[#00E5FF]/20 w-full justify-start">
          <TabsTrigger value="general" className="gap-2">
            <SettingsIcon className="w-4 h-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="users" className="gap-2">
            <Users className="w-4 h-4" />
            User Management
          </TabsTrigger>
          <TabsTrigger value="monetization" className="gap-2">
            <CreditCard className="w-4 h-4" />
            Monetization
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="w-4 h-4" />
            Notifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <div className="bg-[#12143A] border border-[#00E5FF]/20 rounded-lg p-8">
            <div className="space-y-8">
              {/* Platform Information */}
              <div>
                <h2 className="text-xl font-bold text-white mb-6">Platform Information</h2>
                
                <div className="space-y-6">
                  {/* Platform Name */}
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Platform Name
                    </label>
                    <Input
                      value={localPlatformName}
                      onChange={(e) => setLocalPlatformName(e.target.value)}
                      placeholder="Enter platform name"
                    />
                  </div>

                  {/* Tagline */}
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Tagline
                    </label>
                    <Input
                      value={localTagline}
                      onChange={(e) => setLocalTagline(e.target.value)}
                      placeholder="Enter platform tagline"
                    />
                  </div>

                  {/* Platform Logo */}
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Platform Logo
                    </label>
                    <p className="text-xs text-gray-400 mb-3">Recommended size: 200x60px (PNG/SVG)</p>
                    <div className="border-2 border-dashed border-[#00E5FF]/30 rounded-lg p-8 hover:border-[#00E5FF]/50 transition-all cursor-pointer bg-[#0B0D2C]/50">
                      <div className="flex flex-col items-center justify-center">
                        <Upload className="w-12 h-12 text-[#00E5FF] mb-3" />
                        <p className="text-sm text-white mb-1">Click to upload or drag and drop</p>
                        <p className="text-xs text-gray-400">PNG, SVG up to 2MB</p>
                      </div>
                    </div>
                  </div>

                  {/* Favicon */}
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Favicon
                    </label>
                    <p className="text-xs text-gray-400 mb-3">32x32px (ICO/PNG)</p>
                    <div className="border-2 border-dashed border-[#00E5FF]/30 rounded-lg p-8 hover:border-[#00E5FF]/50 transition-all cursor-pointer bg-[#0B0D2C]/50">
                      <div className="flex flex-col items-center justify-center">
                        <Upload className="w-12 h-12 text-[#00E5FF] mb-3" />
                        <p className="text-sm text-white mb-1">Click to upload or drag and drop</p>
                        <p className="text-xs text-gray-400">ICO, PNG up to 1MB</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Brand Colors */}
              <div className="pt-8 border-t border-[#00E5FF]/20">
                <h2 className="text-xl font-bold text-white mb-6">Brand Colors</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Primary Cyan */}
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Primary Cyan
                    </label>
                    <div className="flex gap-3">
                      <div 
                        className="w-12 h-12 rounded-lg border-2 border-[#00E5FF]/30 cursor-pointer hover:border-[#00E5FF] transition-all"
                        style={{ backgroundColor: localColors.primaryCyan }}
                      />
                      <Input
                        value={localColors.primaryCyan}
                        onChange={(e) => setLocalColors({...localColors, primaryCyan: e.target.value})}
                        placeholder="#00E5FF"
                        className="flex-1"
                      />
                    </div>
                  </div>

                  {/* Primary Magenta */}
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Primary Magenta
                    </label>
                    <div className="flex gap-3">
                      <div 
                        className="w-12 h-12 rounded-lg border-2 border-[#00E5FF]/30 cursor-pointer hover:border-[#00E5FF] transition-all"
                        style={{ backgroundColor: localColors.primaryMagenta }}
                      />
                      <Input
                        value={localColors.primaryMagenta}
                        onChange={(e) => setLocalColors({...localColors, primaryMagenta: e.target.value})}
                        placeholder="#9C27B0"
                        className="flex-1"
                      />
                    </div>
                  </div>

                  {/* Background Dark */}
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Background Dark
                    </label>
                    <div className="flex gap-3">
                      <div 
                        className="w-12 h-12 rounded-lg border-2 border-[#00E5FF]/30 cursor-pointer hover:border-[#00E5FF] transition-all"
                        style={{ backgroundColor: localColors.backgroundDark }}
                      />
                      <Input
                        value={localColors.backgroundDark}
                        onChange={(e) => setLocalColors({...localColors, backgroundDark: e.target.value})}
                        placeholder="#0B0D2C"
                        className="flex-1"
                      />
                    </div>
                  </div>

                  {/* Background Card */}
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Background Card
                    </label>
                    <div className="flex gap-3">
                      <div 
                        className="w-12 h-12 rounded-lg border-2 border-[#00E5FF]/30 cursor-pointer hover:border-[#00E5FF] transition-all"
                        style={{ backgroundColor: localColors.backgroundCard }}
                      />
                      <Input
                        value={localColors.backgroundCard}
                        onChange={(e) => setLocalColors({...localColors, backgroundCard: e.target.value})}
                        placeholder="#12143A"
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 pt-6 border-t border-[#00E5FF]/20">
                <Button 
                  variant="outline" 
                  onClick={handleCancel}
                  className="px-6"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleSave}
                  className="px-6"
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="users">
          <div className="bg-[#12143A] border border-[#00E5FF]/20 rounded-lg p-8">
            <p className="text-gray-400">User Management settings coming soon...</p>
          </div>
        </TabsContent>

        <TabsContent value="monetization">
          <div className="bg-[#12143A] border border-[#00E5FF]/20 rounded-lg p-8">
            <p className="text-gray-400">Monetization settings coming soon...</p>
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <div className="bg-[#12143A] border border-[#00E5FF]/20 rounded-lg p-8">
            <p className="text-gray-400">Notification settings coming soon...</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}