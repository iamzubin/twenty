import styled from "styled-components";

// Color definitions
export const colors = {
  primary: "#3b82f6",
  primaryDark: "#2563eb",
  gray50: "#f9fafb",
  gray100: "#f3f4f6",
  gray200: "#e5e7eb",
  gray300: "#d1d5db",
  gray400: "#9ca3af",
  gray500: "#6b7280",
  gray600: "#4b5563",
  gray700: "#374151",
  gray800: "#1f2937",
  gray900: "#111827",
  white: "#ffffff",
  blue500: "#3b82f6",
  red500: "#ef4444",
  yellow50: "#fffbeb",
  yellow100: "#fef3c7",
  yellow200: "#fde68a",
  yellow800: "#92400e",
};

// Shared Layouts
export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
`;

export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FlexCenter = styled(FlexRow)`
  align-items: center;
  justify-content: center;
`;

export const FlexBetween = styled(FlexRow)`
  align-items: center;
  justify-content: space-between;
`;

export const FlexStart = styled(FlexRow)`
  align-items: center;
  justify-content: flex-start;
`;

export const FlexGap = styled(FlexRow)<{ gap?: string }>`
  gap: ${props => props.gap || "0.5rem"};
`;

// Container Components
export const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  background-color: ${colors.gray100};
  overflow: hidden; /* Prevent container from growing */
`;

export const SidebarContainer = styled.div`
  width: 33.333%;
  min-width: 300px;
  max-width: 450px;
  border-right: 1px solid ${colors.gray200};
  background-color: ${colors.white};
  display: flex;
  flex-direction: column;
  overflow: hidden; /* Prevent sidebar from growing */
`;

export const MainContent = styled.div`
  flex: 1;
  overflow: hidden; /* Ensure content doesn't cause resize */
  display: flex;
  flex-direction: column;
`;

// Header Components
export const Header = styled.div`
  padding: 1rem;
  border-bottom: 1px solid ${colors.gray200};
  background-color: ${colors.white};
  flex-shrink: 0; /* Prevent header from shrinking */
`;

export const SidebarHeader = styled(Header)``;

export const HeaderTop = styled(FlexBetween)`
  margin-bottom: 1rem;
`;

export const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 600;
`;

// Button Components
export const IconButton = styled.button`
  color: ${colors.primary};
  &:hover {
    color: ${colors.primaryDark};
  }
`;

// Form Components
export const SearchContainer = styled.div`
  position: relative;
`;

export const SearchInput = styled.input`
  width: 90%;
  padding-left: 2.5rem;
  
  padding-bottom: 0.5rem;
  border: 1px solid ${colors.gray200};
  border-radius: 0.5rem;
  
  &:focus {
    outline: none;
    border-color: ${colors.primary};
  }
`;

export const SearchIconWrapper = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${colors.gray400};
  width: 1rem;
  height: 1rem;
`;

// Avatar Component
export const Avatar = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;
  flex-shrink: 0; /* Prevent avatar from shrinking */
`;

export const SmallAvatar = styled(Avatar)`
  width: 2rem;
  height: 2rem;
`;

// Text Components
export const Text = styled.p`
  font-size: 0.875rem;
`;

export const SmallText = styled.p`
  font-size: 0.75rem;
  color: ${colors.gray500};
`;

export const TruncatedText = styled.p`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

// Status Indicators
export const StatusIndicator = styled.div`
  height: 0.5rem;
  width: 0.5rem;
  border-radius: 9999px;
  flex-shrink: 0;
`;

export const BlueIndicator = styled(StatusIndicator)`
  background-color: ${colors.blue500};
`;

export const RedIndicator = styled(StatusIndicator)`
  background-color: ${colors.red500};
`;

// Content Areas
export const ScrollableArea = styled.div`
  overflow-y: auto;
  flex: 1;
  height: 0; /* Force scrolling instead of expansion */
`;

export const EmptyState = styled(FlexCenter)`
  height: 100%;
  color: ${colors.gray500};
`; 