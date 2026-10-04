import React from "react"
import HQSuitePng from "../../assets/rtm_logos_products/HQSuite.png"
import HQSuiteWPng from "../../assets/rtm_logos_products/HQSuite_W.png"
import HQAuthPng from "../../assets/rtm_logos_products/HQAuth.png"
import HQAuthWPng from "../../assets/rtm_logos_products/HQAuth_W.png"
import HQEnergyPng from "../../assets/rtm_logos_products/HQEnergy.png"
import HQEnergyWPng from "../../assets/rtm_logos_products/HQEnergy_W.png"
import HQEventsPng from "../../assets/rtm_logos_products/HQEvents.png"
import HQEventsWPng from "../../assets/rtm_logos_products/HQEvents_W.png"
import HQFirePng from "../../assets/rtm_logos_products/HQFire.png"
import HQFireWPng from "../../assets/rtm_logos_products/HQFire_W.png"
import RomerTMPng from "../../assets/rtm_logos/Logo_RomerTM.png"

export const logos = {
  HQSuite: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img src={HQSuitePng} alt="HQSuite" {...props} />,
  HQSuiteWhite: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img src={HQSuiteWPng} alt="HQSuite White" {...props} />,
  HQAuth: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img src={HQAuthPng} alt="HQAuth" {...props} />,
  HQAuthWhite: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img src={HQAuthWPng} alt="HQAuth White" {...props} />,
  HQEnergy: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img src={HQEnergyPng} alt="HQEnergy" {...props} />,
  HQEnergyWhite: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img src={HQEnergyWPng} alt="HQEnergy White" {...props} />,
  HQEvents: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img src={HQEventsPng} alt="HQEvents" {...props} />,
  HQEventsWhite: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img src={HQEventsWPng} alt="HQEvents White" {...props} />,
  HQFire: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img src={HQFirePng} alt="HQFire" {...props} />,
  HQFireWhite: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img src={HQFireWPng} alt="HQFire White" {...props} />,
  RomerTM: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img src={RomerTMPng} alt="RomerTM" {...props} />,
}

export type LogoName = keyof typeof logos
