// RideMe Icons — line style, 24x24 viewBox, currentColor
// Single-stroke style consistent with the brand reference.

const Icon = ({ children, size = 22, stroke = 1.8, color = 'currentColor', style = {}, fill = 'none' }) => (
  <svg
    width={size} height={size} viewBox="0 0 24 24"
    fill={fill} stroke={color} strokeWidth={stroke}
    strokeLinecap="round" strokeLinejoin="round"
    style={{ display: 'block', flexShrink: 0, ...style }}
  >{children}</svg>
);

// Tabs / nav
const IconHome   = (p) => <Icon {...p}><path d="M3 11.5 12 4l9 7.5"/><path d="M5 10.5V20h14v-9.5"/><path d="M10 20v-5h4v5"/></Icon>;
const IconCar    = (p) => <Icon {...p}><path d="M5 16h14M5 16l1.6-5.2A2 2 0 0 1 8.5 9.4h7a2 2 0 0 1 1.9 1.4L19 16"/><rect x="3" y="16" width="18" height="3.5" rx="1"/><circle cx="7.5" cy="18" r="1.2" fill="currentColor"/><circle cx="16.5" cy="18" r="1.2" fill="currentColor"/></Icon>;
const IconCalendar = (p) => <Icon {...p}><rect x="3.5" y="5" width="17" height="15.5" rx="3"/><path d="M3.5 10h17M8 3v4M16 3v4"/></Icon>;
const IconChat   = (p) => <Icon {...p}><path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v8A2.5 2.5 0 0 1 17.5 17H10l-4 3.5V17H6.5A2.5 2.5 0 0 1 4 14.5z"/></Icon>;
const IconHeart  = (p) => <Icon {...p}><path d="M12 20s-7.2-4-9.4-9.2C1 6.4 4.5 3 8.2 4.5 10 5.2 11.4 6.5 12 8c.6-1.5 2-2.8 3.8-3.5C19.5 3 23 6.4 21.4 10.8 19.2 16 12 20 12 20z"/></Icon>;
const IconUser   = (p) => <Icon {...p}><circle cx="12" cy="8" r="4"/><path d="M4 20c1.6-3.6 5-5.5 8-5.5s6.4 1.9 8 5.5"/></Icon>;
const IconSend   = (p) => <Icon {...p}><path d="M21 3 3 11l7 2.5L13 21l8-18z"/><path d="m10 13.5 5-5"/></Icon>;

// Actions
const IconMenu   = (p) => <Icon {...p}><path d="M4 7h16M4 12h16M4 17h12"/></Icon>;
const IconBell   = (p) => <Icon {...p}><path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2H4.5L6 16z"/><path d="M10 20a2 2 0 0 0 4 0"/></Icon>;
const IconSearch = (p) => <Icon {...p}><circle cx="11" cy="11" r="6.5"/><path d="m20 20-4-4"/></Icon>;
const IconClose  = (p) => <Icon {...p}><path d="M6 6l12 12M18 6 6 18"/></Icon>;
const IconCheck  = (p) => <Icon {...p}><path d="m4.5 12.5 4.5 4.5L20 6.5"/></Icon>;
const IconArrowL = (p) => <Icon {...p}><path d="M15 5l-7 7 7 7"/></Icon>;
const IconArrowR = (p) => <Icon {...p}><path d="m9 5 7 7-7 7"/></Icon>;
const IconArrowUp= (p) => <Icon {...p}><path d="M5 12l7-7 7 7M12 19V6"/></Icon>;
const IconChevR  = (p) => <Icon {...p}><path d="m9 6 6 6-6 6"/></Icon>;
const IconPlus   = (p) => <Icon {...p}><path d="M12 5v14M5 12h14"/></Icon>;
const IconDots   = (p) => <Icon {...p} fill="currentColor" stroke="none"><circle cx="5" cy="12" r="1.7"/><circle cx="12" cy="12" r="1.7"/><circle cx="19" cy="12" r="1.7"/></Icon>;
const IconRefresh= (p) => <Icon {...p}><path d="M3 12a9 9 0 0 1 15.5-6.3L21 8"/><path d="M21 4v4h-4"/><path d="M21 12a9 9 0 0 1-15.5 6.3L3 16"/><path d="M3 20v-4h4"/></Icon>;
const IconFilter = (p) => <Icon {...p}><path d="M4 5h16l-6 8v6l-4-2v-4z"/></Icon>;

// Map / trip
const IconPin    = (p) => <Icon {...p}><path d="M12 21s7-6.4 7-12a7 7 0 1 0-14 0c0 5.6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/></Icon>;
const IconNav    = (p) => <Icon {...p}><path d="M21 3 3 10l8 2 2 8 8-17z"/></Icon>;
const IconTarget = (p) => <Icon {...p}><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/></Icon>;
const IconRoute  = (p) => <Icon {...p}><circle cx="6" cy="5" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="M6 7.5v3a3.5 3.5 0 0 0 3.5 3.5h5a3.5 3.5 0 0 1 3.5 3.5"/></Icon>;
const IconClock  = (p) => <Icon {...p}><circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3 2"/></Icon>;

// Comms
const IconPhone  = (p) => <Icon {...p}><path d="M5.5 4h3l1.5 4-2 1.2a12 12 0 0 0 6.8 6.8l1.2-2 4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 3.5 6.2 2 2 0 0 1 5.5 4z"/></Icon>;
const IconShield = (p) => <Icon {...p}><path d="M12 3 4 6v6c0 4.5 3.4 8.4 8 9 4.6-.6 8-4.5 8-9V6l-8-3z"/><path d="m9 12 2 2 4-4"/></Icon>;
const IconStar   = (p) => <Icon {...p} fill="currentColor" stroke="none"><path d="M12 3.5l2.7 5.5 6 .9-4.4 4.2 1 6L12 17.3 6.7 20.1l1-6L3.3 9.9l6-.9z"/></Icon>;
const IconStarOutline = (p) => <Icon {...p}><path d="M12 3.5l2.7 5.5 6 .9-4.4 4.2 1 6L12 17.3 6.7 20.1l1-6L3.3 9.9l6-.9z"/></Icon>;

// Money
const IconCash   = (p) => <Icon {...p}><rect x="3" y="6.5" width="18" height="11" rx="2"/><circle cx="12" cy="12" r="2.4"/><path d="M6 9.5h.01M18 14.5h.01"/></Icon>;
const IconCard   = (p) => <Icon {...p}><rect x="3" y="5.5" width="18" height="13" rx="2.5"/><path d="M3 10h18M7 15h3"/></Icon>;
const IconWallet = (p) => <Icon {...p}><rect x="3" y="6" width="18" height="13" rx="2.5"/><path d="M3 10h15a3 3 0 0 1 3 3v0a3 3 0 0 1-3 3h-2a2 2 0 0 1 0-4h5"/></Icon>;
const IconChart  = (p) => <Icon {...p}><path d="M4 20V4M4 20h16"/><path d="M8 16v-4M12 16V8M16 16v-6"/></Icon>;
const IconTrend  = (p) => <Icon {...p}><path d="M3 17l6-6 4 4 8-9"/><path d="M14 6h7v7"/></Icon>;

// Admin
const IconUsers  = (p) => <Icon {...p}><circle cx="9" cy="8" r="3.5"/><path d="M3 19c.8-3 3.4-5 6-5s5.2 2 6 5"/><circle cx="17" cy="9" r="2.8"/><path d="M15 14c2 0 4 1 5 3.5"/></Icon>;
const IconShieldUser = (p) => <Icon {...p}><path d="M12 3 4 6v6c0 4.5 3.4 8.4 8 9 4.6-.6 8-4.5 8-9V6l-8-3z"/><circle cx="12" cy="11" r="2"/><path d="M9 17c.5-1.5 1.6-2.5 3-2.5s2.5 1 3 2.5"/></Icon>;
const IconDoc    = (p) => <Icon {...p}><path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4M9 12h7M9 16h5"/></Icon>;
const IconUpload = (p) => <Icon {...p}><path d="M12 16V4M7 9l5-5 5 5"/><path d="M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3"/></Icon>;
const IconSettings=(p) => <Icon {...p}><circle cx="12" cy="12" r="2.8"/><path d="M19.4 14a1.5 1.5 0 0 0 .3 1.6l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.5 1.5 0 0 0-1.6-.3 1.5 1.5 0 0 0-.9 1.4V20a2 2 0 1 1-4 0v-.1a1.5 1.5 0 0 0-1-1.4 1.5 1.5 0 0 0-1.6.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.5 1.5 0 0 0 .3-1.6 1.5 1.5 0 0 0-1.4-.9H4a2 2 0 1 1 0-4h.1a1.5 1.5 0 0 0 1.4-1 1.5 1.5 0 0 0-.3-1.6l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.5 1.5 0 0 0 1.6.3H10a1.5 1.5 0 0 0 .9-1.4V4a2 2 0 1 1 4 0v.1a1.5 1.5 0 0 0 .9 1.4 1.5 1.5 0 0 0 1.6-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.5 1.5 0 0 0-.3 1.6V10a1.5 1.5 0 0 0 1.4.9H20a2 2 0 1 1 0 4h-.1a1.5 1.5 0 0 0-1.4.9z"/></Icon>;
const IconReport = (p) => <Icon {...p}><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h4"/></Icon>;
const IconLogout = (p) => <Icon {...p}><path d="M14 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4"/><path d="M10 8l-4 4 4 4"/><path d="M6 12h11"/></Icon>;
const IconAlert  = (p) => <Icon {...p}><path d="M12 4 2.5 20h19L12 4z"/><path d="M12 10v4M12 17.5h.01"/></Icon>;
const IconWarn   = (p) => <Icon {...p}><circle cx="12" cy="12" r="9"/><path d="M12 8v4M12 15.5h.01"/></Icon>;
const IconInfo   = (p) => <Icon {...p}><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></Icon>;
const IconBolt   = (p) => <Icon {...p}><path d="M13 3 4 14h7l-1 7 9-11h-7l1-7z"/></Icon>;
const IconGlobe  = (p) => <Icon {...p}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z"/></Icon>;
const IconEye    = (p) => <Icon {...p}><path d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7S2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/></Icon>;

Object.assign(window, {
  IconHome, IconCar, IconCalendar, IconChat, IconHeart, IconUser, IconSend,
  IconMenu, IconBell, IconSearch, IconClose, IconCheck, IconArrowL, IconArrowR, IconArrowUp,
  IconChevR, IconPlus, IconDots, IconRefresh, IconFilter,
  IconPin, IconNav, IconTarget, IconRoute, IconClock,
  IconPhone, IconShield, IconStar, IconStarOutline,
  IconCash, IconCard, IconWallet, IconChart, IconTrend,
  IconUsers, IconShieldUser, IconDoc, IconUpload, IconSettings, IconReport, IconLogout,
  IconAlert, IconWarn, IconInfo, IconBolt, IconGlobe, IconEye,
});
