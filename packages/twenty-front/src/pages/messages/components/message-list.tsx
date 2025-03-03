import { useState } from "react";
import styled from "styled-components";
import { ChannelIcon } from "./icons";
import { 
  ScrollableArea, 
  FlexRow, 
  FlexColumn, 
  Avatar, 
  Text, 
  SmallText, 
  FlexBetween, 
  TruncatedText, 
  FlexGap, 
  BlueIndicator, 
  RedIndicator,
  colors
} from "../styles";

interface Channel {
  id: string
  name: string
  icon: string
  messages: any[]
}

interface Conversation {
  id: string
  name: string
  avatar: string
  lastMessage: string
  time: string
  unread: boolean
  flagged: boolean
  channels: Channel[]
}

interface MessageListProps {
  conversations: Conversation[]
  activeConversation: string | null
  setActiveConversation: (id: string) => void
}

// Component-specific styled components with fixed dimensions
const ConversationItem = styled.div<{ active: boolean }>`
  padding: 1rem;
  border-bottom: 1px solid ${colors.gray200};
  cursor: pointer;
  background-color: ${props => props.active ? colors.gray100 : colors.white};
  &:hover {
    background-color: ${props => props.active ? colors.gray100 : colors.gray50};
  }
  transition: background-color 0.2s;
  height: 88px; /* Fixed height to prevent resizing */
  overflow: hidden;
`;

const UserInfo = styled(FlexRow)`
  align-items: start;
  gap: 0.75rem;
`;

const ContentArea = styled(FlexColumn)`
  flex: 1;
  min-width: 0;
`;

const UserName = styled.span<{ unread: boolean }>`
  font-weight: ${props => props.unread ? '600' : '500'};
`;

const MessagePreview = styled(TruncatedText)<{ unread: boolean }>`
  margin-top: 0.25rem;
  font-weight: ${props => props.unread ? '500' : '400'};
  color: ${props => props.unread ? colors.gray900 : colors.gray500};
`;

const ChannelInfo = styled(FlexRow)`
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.25rem;
`;

export function MessageList({ conversations, activeConversation, setActiveConversation }: MessageListProps) {
  return (
    <ScrollableArea>
      {conversations.map((conversation) => (
        <ConversationItem
          key={conversation.id}
          active={activeConversation === conversation.id}
          onClick={() => setActiveConversation(conversation.id)}
        >
          <UserInfo>
            <Avatar
              src={conversation.avatar || "/placeholder.svg"}
              alt={conversation.name}
            />

            <ContentArea>
              <FlexBetween>
                <UserName unread={conversation.unread}>{conversation.name}</UserName>
                <SmallText>{conversation.time}</SmallText>
              </FlexBetween>

              <MessagePreview unread={conversation.unread}>
                {conversation.lastMessage}
              </MessagePreview>

              <ChannelInfo>
                {conversation.channels.length > 1 ? (
                  <SmallText>{conversation.channels.length} channels</SmallText>
                ) : (
                  <ChannelIcon name={conversation.channels[0].icon} style={{ width: '1rem', height: '1rem', color: colors.gray400 }} />
                )}
                {conversation.unread && <BlueIndicator />}
                {conversation.flagged && <RedIndicator />}
              </ChannelInfo>
            </ContentArea>
          </UserInfo>
        </ConversationItem>
      ))}
    </ScrollableArea>
  )
}