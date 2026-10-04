import React from "react"
import HQSuiteSmallPng from "../../assets/rtm_icons/HQSuite_Small.png"
import HQAuthSmallPng from "../../assets/rtm_icons/HQAuth_Small.png"
import HQEventSmallPng from "../../assets/rtm_icons/HQEvent_Small.png"
import HQFireSmallPng from "../../assets/rtm_icons/HQFire_Small.png"
import HQEnergySmallPng from "../../assets/rtm_icons/HQEnergy_Small.png"

export const rtmIcons = {
  HQSuite: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img src={HQSuiteSmallPng} alt="HQSuite" {...props} />,
  HQAuth: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img src={HQAuthSmallPng} alt="HQAuth" {...props} />,
  HQEvent: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img src={HQEventSmallPng} alt="HQEvent" {...props} />,
  HQFire: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img src={HQFireSmallPng} alt="HQFire" {...props} />,
  HQEnergy: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img src={HQEnergySmallPng} alt="HQEnergy" {...props} />,
}

export type RtmIconName = keyof typeof rtmIcons

export const RtmIcon: React.FC<{ name: RtmIconName; size?: number; className?: string }> = ({ name, size = 28, className }) => {
  const Comp = rtmIcons[name]
  if (!Comp) return null
  return <Comp width={size} height={size} className={className} style={{ display: "block" }} />
}
