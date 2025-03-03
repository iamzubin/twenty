"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { ChannelIcon, SendIcon, PaperclipIcon, SparklesIcon } from "./icons"
// import { toast } from "sonner"
import {
  FlexColumn,
  Header,
  FlexBetween,
  FlexRow,
  Avatar,
  FlexColumn as UserMeta,
  Title as UserName,
  SmallText as UserStatus,
  FlexGap,
  IconButton,
  Text,
  FlexCenter,
  colors,
  ScrollableArea
} from "../styles"
import styled from "styled-components"

interface Message {
  id: string
  sender: string
  content: string
  time: string
  isUser: boolean
}

interface Channel {
  id: string
  name: string
  icon: string
  messages: Message[]
}

interface Conversation {
  id: string
  name: string
  avatar: string
  channels: Channel[]
}

interface ConversationViewProps {
  conversation: Conversation
  activeChannel: string | null
  setActiveChannel: (id: string) => void
}

// Component-specific styled components
const Container = styled(FlexColumn)`
  height: 100%;
  overflow: hidden; /* Prevent container expansion */
`;

const HeaderContent = styled(FlexBetween)`
  margin-bottom: 0.75rem;
`;

const UserInfo = styled(FlexRow)`
  align-items: center;
  gap: 0.75rem;
`;

const ChannelList = styled(FlexRow)`
  align-items: center;
  gap: 0.5rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
`;

interface ChannelButtonProps {
  active: boolean;
}

const ChannelButton = styled.button<ChannelButtonProps>`
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background-color: ${props => props.active ? colors.primary : colors.gray200};
  color: ${props => props.active ? colors.white : colors.gray700};
  &:hover {
    background-color: ${props => props.active ? colors.primary : colors.gray300};
  }
`;

const MessagesContainer = styled(ScrollableArea)`
  padding: 1rem;
  background-color: ${colors.gray50};
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
  height: 0; /* Force scrolling */
`;

const EmptyChannelMessage = styled(FlexCenter)`
  height: 100%;
  color: ${colors.gray500};
`;

interface MessageWrapperProps {
  isUser: boolean;
}

const MessageWrapper = styled.div<MessageWrapperProps>`
  display: flex;
  justify-content: ${props => props.isUser ? 'flex-end' : 'flex-start'};
`;

interface MessageBubbleProps {
  isUser: boolean;
}

const MessageBubble = styled.div<MessageBubbleProps>`
  max-width: 70%;
  padding: 0.75rem;
  border-radius: 0.5rem;
  background-color: ${props => props.isUser ? colors.primary : colors.white};
  color: ${props => props.isUser ? colors.white : colors.gray800};
`;

const MessageSender = styled.p`
  font-size: 0.75rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
`;

const MessageContent = styled.p`
  font-size: 0.875rem;
`;

const MessageTime = styled.p`
  font-size: 0.75rem;
  text-align: right;
  margin-top: 0.25rem;
  opacity: 0.7;
`;

const AiSuggestionContainer = styled.div`
  padding: 0.5rem 1rem;
  background-color: ${colors.yellow50};
  border-top: 1px solid ${colors.yellow100};
`;

const AiSuggestionContent = styled(FlexRow)`
  align-items: flex-start;
  gap: 0.5rem;
`;

const AiBadge = styled(FlexRow)`
  align-items: center;
  background-color: ${colors.yellow200};
  color: ${colors.yellow800};
  border-radius: 9999px;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
`;

const AiText = styled(Text)`
  flex: 1;
`;

const LoadingContainer = styled(FlexRow)`
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: ${colors.gray500};
`;

const Spinner = styled.div`
  animation: spin 1s linear infinite;
  height: 1rem;
  width: 1rem;
  border-radius: 50%;
  border: 2px solid ${colors.gray300};
  border-bottom-color: ${colors.gray500};

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const AiButtonsContainer = styled(FlexRow)`
  align-items: center;
  gap: 0.25rem;
`;

const InputContainer = styled.div`
  padding: 1rem;
  border-top: 1px solid ${colors.gray200};
  background-color: ${colors.white};
`;

const MessageForm = styled(FlexRow)`
  align-items: center;
  gap: 0.5rem;
`;

const AttachmentButton = styled(IconButton)`
  color: ${colors.gray400};
  &:hover {
    color: ${colors.gray600};
  }
`;

const MessageInput = styled.input`
  flex: 1;
  border: 1px solid ${colors.gray200};
  border-radius: 9999px;
  padding: 0.5rem 1rem;
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
    border-color: ${colors.primary};
  }
`;

const AiAssistButton = styled(IconButton)``;

const SendButton = styled.button`
  background-color: ${colors.primary};
  color: ${colors.white};
  border-radius: 9999px;
  padding: 0.5rem;
  
  &:hover {
    background-color: ${colors.primaryDark};
  }
`;

export function ConversationView({ conversation, activeChannel, setActiveChannel }: ConversationViewProps) {
  const [message, setMessage] = useState("")
  const [isAiAssisting, setIsAiAssisting] = useState(false)
  const [aiSuggestion, setAiSuggestion] = useState("")
  const [isAiGenerating, setIsAiGenerating] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollToBottom()
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() === "") return

    // In a real app, you would send the message to your backend
    // For now, we'll just clear the input and show a toast
    // toast.success("Message sent successfully")
    setMessage("")
    setAiSuggestion("")
    setIsAiAssisting(false)
  }

  const handleAiAssist = () => {
    setIsAiAssisting(true)
    setIsAiGenerating(true)

    // Simulate AI generating a response
    setTimeout(() => {
      setAiSuggestion(
        "I've reviewed the report and it looks great. I especially liked the analysis in section 3. Let's discuss the recommendations during our next meeting.",
      )
      setIsAiGenerating(false)
      // toast.info("AI suggestion is ready")
    }, 1500)
  }

  const acceptAiSuggestion = () => {
    setMessage(aiSuggestion)
    setAiSuggestion("")
    setIsAiAssisting(false)
    // toast.success("AI suggestion accepted")
  }

  const dismissAiSuggestion = () => {
    setAiSuggestion("")
    setIsAiAssisting(false)
    // toast("AI suggestion dismissed")
  }

  return (
    <Container>
      {/* Conversation Header */}
      <Header>
        <HeaderContent>
          <UserInfo>
            <Avatar
              src={conversation.avatar || "/placeholder.svg"}
              alt={conversation.name}
            />
            <UserMeta>
              <UserName>{conversation.name}</UserName>
              <UserStatus>Active now</UserStatus>
            </UserMeta>
          </UserInfo>
        </HeaderContent>

        {/* Channel Selector */}
        <ChannelList>
          {conversation.channels.map((channel) => (
            <ChannelButton
              key={channel.id}
              active={activeChannel === channel.id}
              onClick={() => setActiveChannel(channel.id)}
            >
              <ChannelIcon name={channel.icon} style={{ width: '1rem', height: '1rem' }} />
              <span>{channel.name}</span>
            </ChannelButton>
          ))}
        </ChannelList>
      </Header>

      {/* Messages */}
      <MessagesContainer>
        {activeChannel ? (
          conversation.channels
            .find((channel) => channel.id === activeChannel)
            ?.messages.map((msg) => (
              <MessageWrapper key={msg.id} isUser={msg.isUser}>
                <MessageBubble isUser={msg.isUser}>
                  {!msg.isUser && <MessageSender>{msg.sender}</MessageSender>}
                  <MessageContent>{msg.content}</MessageContent>
                  <MessageTime>{msg.time}</MessageTime>
                </MessageBubble>
              </MessageWrapper>
            ))
        ) : (
          <EmptyChannelMessage>Select a channel to view messages</EmptyChannelMessage>
        )}
        <div ref={messagesEndRef} />
      </MessagesContainer>

      {/* AI Suggestion */}
      {isAiAssisting && (
        <AiSuggestionContainer>
          <AiSuggestionContent>
            <AiBadge>
              <SparklesIcon style={{ width: '0.75rem', height: '0.75rem', marginRight: '0.25rem' }} />
              AI Suggestion
            </AiBadge>

            <AiText>
              {isAiGenerating ? (
                <LoadingContainer>
                  <Spinner />
                  Generating suggestion...
                </LoadingContainer>
              ) : (
                aiSuggestion
              )}
            </AiText>

            <AiButtonsContainer>
              <IconButton
                onClick={dismissAiSuggestion}
                disabled={isAiGenerating}
              >
                ✕
              </IconButton>
              <IconButton
                onClick={acceptAiSuggestion}
                disabled={isAiGenerating}
              >
                ✓
              </IconButton>
            </AiButtonsContainer>
          </AiSuggestionContent>
        </AiSuggestionContainer>
      )}

      {/* Message Input */}
      <InputContainer>
        <MessageForm onSubmit={handleSendMessage}>
          <AttachmentButton type="button">
            <PaperclipIcon style={{ width: '1.25rem', height: '1.25rem' }} />
          </AttachmentButton>

          <MessageInput
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
          />

          <AiAssistButton
            type="button"
            onClick={handleAiAssist}
            disabled={isAiAssisting}
          >
            <SparklesIcon style={{ width: '1.25rem', height: '1.25rem' }} />
          </AiAssistButton>

          <SendButton type="submit">
            <SendIcon style={{ width: '1.25rem', height: '1.25rem' }} />
          </SendButton>
        </MessageForm>
      </InputContainer>
    </Container>
  )
}

