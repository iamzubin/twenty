"use client"

import { useState, useEffect } from "react"
import { MessageList } from "./components/message-list"
import { ConversationView } from "./components/conversation-view"
import { SearchIcon, PlusIcon } from "./components/icons"
// import { Toaster, toast } from "sonner"
import {
  Container,
  SidebarContainer,
  SidebarHeader,
  HeaderTop,
  Title,
  IconButton,
  SearchContainer,
  SearchInput,
  SearchIconWrapper,
  MainContent,
  EmptyState
} from "./styles"
import { Button } from 'twenty-ui'

export function Messages() {
  const [activeConversation, setActiveConversation] = useState<string | null>("1")
  const [activeChannel, setActiveChannel] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    if (activeConversation) {
      const conversation = conversations.find((c) => c.id === activeConversation)
      if (conversation && conversation.channels.length > 0) {
        setActiveChannel(conversation.channels[0].id)
      }
    } else {
      setActiveChannel(null)
    }
  }, [activeConversation])

  useEffect(() => {
    // Show welcome notification after a short delay
    const timer = setTimeout(() => {
      // toast("New message from Sarah Johnson", {
      //   description: "I've sent you the report via email as well",
      // })
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const filteredConversations = conversations.filter((conversation) =>
    conversation.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <Container>
      {/* Conversation List */}
      <SidebarContainer>
        <SidebarHeader>
          <HeaderTop>
            <Title>Messages</Title>
              <Button 
                variant="secondary"
                title="New Message"
                aria-label="New Message"
              />
          </HeaderTop>
          <SearchContainer>
            <SearchInput
              type="text"
              placeholder="Search messages"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
          </SearchContainer>
        </SidebarHeader>

        <MessageList
          conversations={filteredConversations}
          activeConversation={activeConversation}
          setActiveConversation={setActiveConversation}
        />
      </SidebarContainer>

      {/* Main Content */}
      <MainContent>
        {activeConversation ? (
          <ConversationView
            conversation={conversations.find((c) => c.id === activeConversation)!}
            activeChannel={activeChannel}
            setActiveChannel={setActiveChannel}
          />
        ) : (
          <EmptyState>
            Select a conversation to start messaging
          </EmptyState>
        )}
      </MainContent>

      {/* Sonner Toaster */}
      {/* <Toaster position="top-right" closeButton /> */}
    </Container>
  )
}

// Sample data
const conversations = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: "https://placekeanu.com/100/100",
    lastMessage: "I've sent you the report via email as well",
    time: "10:42 AM",
    unread: true,
    flagged: false,
    channels: [
      {
        id: "email",
        name: "Email",
        icon: "envelope",
        messages: [
          {
            id: "m1",
            sender: "Sarah Johnson",
            content: "Hi there! Did you get a chance to review the quarterly report?",
            time: "10:30 AM",
            isUser: false,
          },
          { id: "m2", sender: "You", content: "Not yet, could you send it again?", time: "10:35 AM", isUser: true },
          {
            id: "m3",
            sender: "Sarah Johnson",
            content: "Sure thing! I'll send it right away.",
            time: "10:38 AM",
            isUser: false,
          },
          {
            id: "m4",
            sender: "Sarah Johnson",
            content: "I've sent you the report via email as well",
            time: "10:42 AM",
            isUser: false,
          },
        ],
      },
      {
        id: "slack",
        name: "Slack",
        icon: "message-square",
        messages: [
          {
            id: "m1",
            sender: "Sarah Johnson",
            content: "Hey, quick question about the meeting tomorrow",
            time: "Yesterday, 3:30 PM",
            isUser: false,
          },
          { id: "m2", sender: "You", content: "Sure, what's up?", time: "Yesterday, 3:45 PM", isUser: true },
          {
            id: "m3",
            sender: "Sarah Johnson",
            content: "Can we push it back by 30 minutes?",
            time: "Yesterday, 4:00 PM",
            isUser: false,
          },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "Marketing Team",
    avatar: "https://placekeanu.com/105/105/y",
    lastMessage: "We need to finalize the campaign assets by Friday",
    time: "Yesterday",
    unread: true,
    flagged: true,
    channels: [
      {
        id: "slack",
        name: "Slack",
        icon: "message-square",
        messages: [
          {
            id: "m1",
            sender: "Alex",
            content: "Team, we need to discuss the Q4 marketing strategy",
            time: "Yesterday, 2:30 PM",
            isUser: false,
          },
          {
            id: "m2",
            sender: "Maya",
            content: "I've prepared some initial concepts",
            time: "Yesterday, 2:45 PM",
            isUser: false,
          },
          {
            id: "m3",
            sender: "You",
            content: "They look great! Let's review them in our next meeting",
            time: "Yesterday, 3:00 PM",
            isUser: true,
          },
          {
            id: "m4",
            sender: "Alex",
            content: "We need to finalize the campaign assets by Friday",
            time: "Yesterday, 4:15 PM",
            isUser: false,
          },
        ],
      },
    ],
  },
  {
    id: "3",
    name: "David Wilson",
    avatar: "https://placekeanu.com/110/110/g",
    lastMessage: "Looking forward to catching up this weekend!",
    time: "Yesterday",
    unread: false,
    flagged: false,
    channels: [
      {
        id: "messenger",
        name: "Messenger",
        icon: "message-circle",
        messages: [
          {
            id: "m1",
            sender: "David Wilson",
            content: "Hey, how's it going?",
            time: "Yesterday, 5:30 PM",
            isUser: false,
          },
          {
            id: "m2",
            sender: "You",
            content: "Pretty good! Just busy with work. How about you?",
            time: "Yesterday, 5:45 PM",
            isUser: true,
          },
          {
            id: "m3",
            sender: "David Wilson",
            content: "Same here. Want to grab coffee this weekend?",
            time: "Yesterday, 6:00 PM",
            isUser: false,
          },
          {
            id: "m4",
            sender: "You",
            content: "Sounds great! Saturday afternoon?",
            time: "Yesterday, 6:15 PM",
            isUser: true,
          },
          {
            id: "m5",
            sender: "David Wilson",
            content: "Looking forward to catching up this weekend!",
            time: "Yesterday, 6:30 PM",
            isUser: false,
          },
        ],
      },
      {
        id: "instagram",
        name: "Instagram",
        icon: "instagram",
        messages: [
          {
            id: "m1",
            sender: "David Wilson",
            content: "Check out this photo from my trip!",
            time: "Monday, 2:30 PM",
            isUser: false,
          },
          {
            id: "m2",
            sender: "You",
            content: "Wow, that looks amazing! Where was that?",
            time: "Monday, 3:00 PM",
            isUser: true,
          },
          {
            id: "m3",
            sender: "David Wilson",
            content: "Costa Rica! You should definitely visit sometime.",
            time: "Monday, 3:15 PM",
            isUser: false,
          },
        ],
      },
      {
        id: "twitter",
        name: "Twitter",
        icon: "twitter",
        messages: [
          {
            id: "m1",
            sender: "David Wilson",
            content: "Did you see that new tech announcement?",
            time: "Last week",
            isUser: false,
          },
          { id: "m2", sender: "You", content: "Not yet, what happened?", time: "Last week", isUser: true },
          {
            id: "m3",
            sender: "David Wilson",
            content: "They're releasing a new version next month with some cool features",
            time: "Last week",
            isUser: false,
          },
        ],
      },
    ],
  },
  {
    id: "4",
    name: "Tech Support",
    avatar: "https://placekeanu.com/102/102/yg",
    lastMessage: "Your ticket #45678 has been resolved",
    time: "Monday",
    unread: false,
    flagged: false,
    channels: [
      {
        id: "email",
        name: "Email",
        icon: "envelope",
        messages: [
          {
            id: "m1",
            sender: "Tech Support",
            content: "Hello, we received your support request regarding login issues",
            time: "Monday, 9:30 AM",
            isUser: false,
          },
          {
            id: "m2",
            sender: "You",
            content: "Yes, I'm unable to access my account since yesterday",
            time: "Monday, 10:00 AM",
            isUser: true,
          },
          {
            id: "m3",
            sender: "Tech Support",
            content: "We've reset your account. Please try logging in again",
            time: "Monday, 11:15 AM",
            isUser: false,
          },
          { id: "m4", sender: "You", content: "It works now. Thank you!", time: "Monday, 11:30 AM", isUser: true },
          {
            id: "m5",
            sender: "Tech Support",
            content: "Your ticket #45678 has been resolved",
            time: "Monday, 12:00 PM",
            isUser: false,
          },
        ],
      },
    ],
  },
  {
    id: "5",
    name: "Emma Thompson",
    avatar: "https://placekeanu.com/108/108",
    lastMessage: "Check out this article I found",
    time: "Sunday",
    unread: false,
    flagged: true,
    channels: [
      {
        id: "instagram",
        name: "Instagram",
        icon: "instagram",
        messages: [
          {
            id: "m1",
            sender: "Emma Thompson",
            content: "Hey! How was your vacation?",
            time: "Sunday, 3:30 PM",
            isUser: false,
          },
          {
            id: "m2",
            sender: "You",
            content: "It was amazing! I'll share some photos soon",
            time: "Sunday, 4:00 PM",
            isUser: true,
          },
          {
            id: "m3",
            sender: "Emma Thompson",
            content: "Can't wait to see them! By the way, I found this interesting article about the place you visited",
            time: "Sunday, 4:15 PM",
            isUser: false,
          },
          {
            id: "m4",
            sender: "Emma Thompson",
            content: "Check out this article I found",
            time: "Sunday, 4:20 PM",
            isUser: false,
          },
        ],
      },
      {
        id: "email",
        name: "Email",
        icon: "envelope",
        messages: [
          {
            id: "m1",
            sender: "Emma Thompson",
            content: "Hi there, I'm sending over the photos from our trip",
            time: "Last week",
            isUser: false,
          },
          { id: "m2", sender: "You", content: "Thanks! These look great", time: "Last week", isUser: true },
        ],
      },
    ],
  },
]

