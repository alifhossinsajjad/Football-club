'use client'

import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Send } from 'lucide-react'
import { Input } from '@/components/ui/input'

export default function ClubMessagingPage() {
  const theme = useSelector(state => state.theme)
  const [selectedConversation, setSelectedConversation] = useState(0)
  const [messageInput, setMessageInput] = useState('')

  const conversations = [
    {
      id: 0,
      name: 'John Doe',
      avatar: '/john-doe.jpg',
      lastMessage: 'Thank you for the information...',
      time: '2h ago',
      unread: 2,
      status: 'Active now'
    },
    {
      id: 1,
      name: 'Sarah Player',
      avatar: '/EmmaRodriguez-2.jpg',
      lastMessage: 'I am interested in joining...',
      time: '5h ago',
      unread: 1,
      status: 'Active 2h ago'
    },
    {
      id: 2,
      name: 'Mike Scout',
      avatar: '/mike_scout.jpg',
      lastMessage: 'Looking forward to the event...',
      time: '1d ago',
      unread: 0,
      status: 'Active 1d ago'
    }
  ]

  const messages = [
    {
      id: 0,
      messages: [
        { text: 'Hello, I am very interested in your academy trial.', time: '10:30 AM', sender: 'them' },
        { text: 'Hello John! Thank you for your interest. We would love to have you.', time: '10:45 AM', sender: 'me' },
        { text: 'What are the requirements for registration?', time: '11:00 AM', sender: 'them' },
        { text: 'You need to be between 16-18 years old and have at least 2 years of football experience.', time: '11:15 AM', sender: 'me' }
      ]
    },
    {
      id: 1,
      messages: [
        { text: 'Hi, I saw your event posting.', time: '09:15 AM', sender: 'them' },
        { text: 'Hello! Thanks for reaching out.', time: '09:30 AM', sender: 'me' },
        { text: 'Can you tell me more about the training program?', time: '09:45 AM', sender: 'them' }
      ]
    },
    {
      id: 2,
      messages: [
        { text: 'Good morning, I would like to discuss scouting opportunities.', time: '08:00 AM', sender: 'them' },
        { text: 'Good morning! I would be happy to discuss this with you.', time: '08:20 AM', sender: 'me' }
      ]
    }
  ]

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      console.log('Sending message:', messageInput)
      setMessageInput('')
    }
  }

  return (
    <div className="h-[calc(100vh-120px)] flex gap-6">
      {/* Conversations List */}
      <div 
        className="w-full lg:w-96 border rounded-lg flex flex-col"
        style={{
          backgroundColor: theme.colors.backgroundCard,
          borderColor: `${theme.colors.primaryCyan}33`,
        }}
      >
        <div className="p-6 border-b" style={{ borderColor: `${theme.colors.primaryCyan}33` }}>
          <h2 className="text-xl font-bold text-white">Conversations</h2>
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversations.map((conversation) => (
            <button
              key={conversation.id}
              onClick={() => setSelectedConversation(conversation.id)}
              className="w-full p-4 flex items-center gap-3 border-b transition-colors"
              style={{
                backgroundColor: selectedConversation === conversation.id 
                  ? `${theme.colors.backgroundDark}80` 
                  : 'transparent',
                borderColor: `${theme.colors.primaryCyan}1A`,
              }}
            >
              <div className="relative flex-shrink-0">
                <img 
                  src={conversation.avatar} 
                  alt={conversation.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                {conversation.unread > 0 && (
                  <span 
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white"
                    style={{ backgroundColor: theme.colors.primaryMagenta }}
                  >
                    {conversation.unread}
                  </span>
                )}
              </div>

              <div className="flex-1 text-left">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-white font-semibold text-sm">{conversation.name}</p>
                  <span className="text-xs text-gray-400">{conversation.time}</span>
                </div>
                <p className="text-sm text-gray-400 truncate">{conversation.lastMessage}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div 
        className="hidden lg:flex flex-1 border rounded-lg flex-col"
        style={{
          backgroundColor: theme.colors.backgroundCard,
          borderColor: `${theme.colors.primaryCyan}33`,
        }}
      >
        {/* Chat Header */}
        <div 
          className="p-4 border-b flex items-center gap-3"
          style={{ borderColor: `${theme.colors.primaryCyan}33` }}
        >
          <img 
            src={conversations[selectedConversation].avatar}
            alt={conversations[selectedConversation].name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="text-white font-semibold">{conversations[selectedConversation].name}</p>
            <p className="text-xs text-gray-400">{conversations[selectedConversation].status}</p>
          </div>
        </div>

        {/* Messages */}
        <div 
          className="flex-1 p-6 overflow-y-auto space-y-4"
          style={{ backgroundColor: theme.colors.backgroundDark }}
        >
          {messages[selectedConversation].messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className="max-w-md px-4 py-3 rounded-lg"
                style={{
                  backgroundColor: message.sender === 'me' 
                    ? theme.colors.primaryMagenta 
                    : theme.colors.backgroundCard,
                }}
              >
                <p className="text-white text-sm mb-1">{message.text}</p>
                <p className="text-xs opacity-70 text-white">{message.time}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div 
          className="p-4 border-t"
          style={{ borderColor: `${theme.colors.primaryCyan}33` }}
        >
          <div className="flex gap-3">
            <Input
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type a message..."
              className="flex-1"
              style={{
                backgroundColor: theme.colors.backgroundDark,
                borderColor: `${theme.colors.primaryCyan}33`,
              }}
            />
            <button
              onClick={handleSendMessage}
              className="p-3 rounded-lg transition-all"
              style={{ backgroundColor: theme.colors.neonAccent }}
            >
              <Send className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}