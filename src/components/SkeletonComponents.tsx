import styled, { keyframes } from 'styled-components'

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const SkeletonBase = styled.div`
  background: linear-gradient(
    90deg,
    #f0f0f0 0px,
    #f8f8f8 40px,
    #f0f0f0 80px
  );
  background-size: 1000px 100%;
  animation: ${shimmer} 2s infinite linear;
  border-radius: 4px;
`

export const SkeletonSidebar = styled.div`
  background: #fff;
  border-right: 1px solid #e5e7eb;
  border-radius: 11px 0 0 11px;
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.04);
  display: flex;
  flex-direction: column;
  padding: 18px;
  gap: 12px;
`

export const SkeletonHeader = styled(SkeletonBase)`
  height: 20px;
  width: 60px;
  margin-bottom: 12px;
`

export const SkeletonListItem = styled(SkeletonBase)`
  height: 30px;
  width: 100%;
  margin-bottom: 8px;
  border-radius: 6px;
`

export const SkeletonChatList = styled.div`
  background: #fff;
  border-radius: 0 9px 9px 0;
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.04);
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 12px;
`

export const SkeletonChatItem = styled(SkeletonBase)`
  height: 50px;
  width: 100%;
  border-radius: 6px;
  animation: ${fadeIn} 0.3s ease-out;
`

export const SkeletonChatWindow = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 12px 28px #0000001F;
  display: flex;
  flex-direction: column;
  margin: 0 8px;
  height: 100%;
`

export const SkeletonMessageBubble = styled(SkeletonBase)<{ $right?: boolean }>`
  height: 40px;
  width: ${({ $right }) => ($right ? '60%' : '50%')};
  margin-left: ${({ $right }) => ($right ? 'auto' : '0')};
  border-radius: 9px;
  margin-bottom: 12px;
  animation: ${fadeIn} 0.4s ease-out;
`

export const SkeletonDetailsPanel = styled.div`
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.04);
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 12px;
`

export const SkeletonDetailRow = styled(SkeletonBase)`
  height: 20px;
  width: 100%;
  margin-bottom: 8px;
  animation: ${fadeIn} 0.3s ease-out;
`

export const SkeletonText = styled(SkeletonBase)<{ $width?: string }>`
  height: 16px;
  width: ${({ $width }) => $width || '100%'};
  border-radius: 4px;
`

export const AnimatedIcon = styled.img<{ 
  $fromX: number
  $fromY: number
  $toX: number
  $toY: number
}>`
  position: fixed;
  width: 60px;
  height: 60px;
  z-index: 9999;
  pointer-events: none;
  animation: flyToDestination 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  filter: drop-shadow(0 0 20px rgba(0, 158, 255, 0.8));

  @keyframes flyToDestination {
    0% {
      left: ${({ $fromX }) => $fromX}px;
      top: ${({ $fromY }) => $fromY}px;
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }
    50% {
      transform: translate(-50%, -50%) scale(0.8);
      opacity: 0.9;
    }
    100% {
      left: ${({ $toX }) => $toX}px;
      top: ${({ $toY }) => $toY}px;
      transform: translate(-50%, -50%) scale(0.3);
      opacity: 0;
    }
  }
`

