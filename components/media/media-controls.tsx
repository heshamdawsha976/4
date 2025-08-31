"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Phone, 
  PhoneOff, 
  Volume2, 
  VolumeX,
  Settings,
  Monitor,
  MonitorOff
} from "lucide-react"

interface MediaControlsProps {
  isInCall?: boolean
  isVoiceEnabled?: boolean
  isVideoEnabled?: boolean
  isAudioEnabled?: boolean
  isScreenSharing?: boolean
  onCallToggle?: () => void
  onVoiceToggle?: () => void
  onVideoToggle?: () => void
  onAudioToggle?: () => void
  onScreenShareToggle?: () => void
  onSettings?: () => void
  size?: "sm" | "md" | "lg"
  layout?: "horizontal" | "vertical" | "compact"
  showLabels?: boolean
  showStatus?: boolean
}

export function MediaControls({
  isInCall = false,
  isVoiceEnabled = false,
  isVideoEnabled = false,
  isAudioEnabled = true,
  isScreenSharing = false,
  onCallToggle,
  onVoiceToggle,
  onVideoToggle,
  onAudioToggle,
  onScreenShareToggle,
  onSettings,
  size = "md",
  layout = "horizontal",
  showLabels = true,
  showStatus = true
}: MediaControlsProps) {
  const [isHovering, setIsHovering] = useState(false)

  const sizes = {
    sm: { button: "h-8 w-8", icon: "h-3 w-3", text: "text-xs" },
    md: { button: "h-10 w-10", icon: "h-4 w-4", text: "text-sm" },
    lg: { button: "h-12 w-12", icon: "h-5 w-5", text: "text-base" }
  }

  const currentSize = sizes[size]

  const ControlButton = ({ 
    isActive, 
    onClick, 
    icon: Icon, 
    inactiveIcon: InactiveIcon, 
    label, 
    variant = "default",
    className = ""
  }: {
    isActive: boolean
    onClick?: () => void
    icon: any
    inactiveIcon?: any
    label: string
    variant?: "default" | "call" | "destructive"
    className?: string
  }) => {
    const ActiveIcon = Icon
    const DisplayIcon = isActive ? ActiveIcon : (InactiveIcon || ActiveIcon)
    
    let buttonStyles = ""
    if (variant === "call") {
      buttonStyles = isActive 
        ? "bg-red-500 hover:bg-red-600 text-white shadow-lg animate-pulse" 
        : "border-green-200 text-green-700 hover:bg-green-50 bg-white"
    } else if (variant === "destructive") {
      buttonStyles = "bg-red-500 hover:bg-red-600 text-white"
    } else {
      buttonStyles = isActive 
        ? "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-lg" 
        : "border-gray-200 text-gray-700 hover:bg-gray-50 bg-white"
    }

    return (
      <div className="flex flex-col items-center gap-1">
        <Button
          variant="outline"
          size="icon"
          onClick={onClick}
          className={`${currentSize.button} transition-all duration-200 hover:scale-105 ${buttonStyles} ${className}`}
        >
          <DisplayIcon className={currentSize.icon} />
        </Button>
        {showLabels && (
          <span className={`${currentSize.text} font-arabic text-gray-600 text-center`}>
            {label}
          </span>
        )}
      </div>
    )
  }

  const StatusIndicators = () => {
    if (!showStatus) return null

    return (
      <div className="flex flex-wrap gap-1">
        {isInCall && (
          <Badge className="bg-red-100 text-red-700 text-xs font-arabic">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse ml-1"></div>
            في مكالمة
          </Badge>
        )}
        {isVoiceEnabled && (
          <Badge className="bg-green-100 text-green-700 text-xs font-arabic">
            <Mic className="w-3 h-3 ml-1" />
            ميكروفون
          </Badge>
        )}
        {isVideoEnabled && (
          <Badge className="bg-blue-100 text-blue-700 text-xs font-arabic">
            <Video className="w-3 h-3 ml-1" />
            كاميرا
          </Badge>
        )}
        {isScreenSharing && (
          <Badge className="bg-purple-100 text-purple-700 text-xs font-arabic">
            <Monitor className="w-3 h-3 ml-1" />
            مشاركة الشاشة
          </Badge>
        )}
      </div>
    )
  }

  const containerClass = layout === "vertical" 
    ? "flex flex-col gap-3" 
    : layout === "compact"
    ? "flex gap-2"
    : "flex gap-4"

  return (
    <div 
      className={`${containerClass} items-center`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* أزرار التحكم الرئيسية */}
      <div className={layout === "vertical" ? "flex flex-col gap-2" : "flex gap-2"}>
        {/* زر المكالمة */}
        <ControlButton
          isActive={isInCall}
          onClick={onCallToggle}
          icon={isInCall ? PhoneOff : Phone}
          label={isInCall ? "إنهاء المكالمة" : "بدء مكالمة"}
          variant="call"
        />

        {/* زر الميكروفون */}
        <ControlButton
          isActive={isVoiceEnabled}
          onClick={onVoiceToggle}
          icon={Mic}
          inactiveIcon={MicOff}
          label="الميكروفون"
        />

        {/* زر الكاميرا */}
        <ControlButton
          isActive={isVideoEnabled}
          onClick={onVideoToggle}
          icon={Video}
          inactiveIcon={VideoOff}
          label="الكاميرا"
        />
      </div>

      {/* أزرار إضافية تظهر عند hover */}
      {(isHovering || layout === "horizontal") && (
        <div className={layout === "vertical" ? "flex flex-col gap-2" : "flex gap-2"}>
          {/* زر الصوت */}
          <ControlButton
            isActive={isAudioEnabled}
            onClick={onAudioToggle}
            icon={Volume2}
            inactiveIcon={VolumeX}
            label="السماعة"
          />

          {/* زر مشاركة الشاشة */}
          <ControlButton
            isActive={isScreenSharing}
            onClick={onScreenShareToggle}
            icon={Monitor}
            inactiveIcon={MonitorOff}
            label="مشاركة الشاشة"
          />

          {/* زر الإعدادات */}
          <ControlButton
            isActive={false}
            onClick={onSettings}
            icon={Settings}
            label="الإعدادات"
          />
        </div>
      )}

      {/* مؤشرات الحالة */}
      <StatusIndicators />
    </div>
  )
}

export default MediaControls
