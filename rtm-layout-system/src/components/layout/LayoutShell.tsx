import type { ReactNode } from "react"
import { useState } from "react"
import Brightness4Icon from "@mui/icons-material/Brightness4"
import Brightness7Icon from "@mui/icons-material/Brightness7"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import MenuIcon from "@mui/icons-material/Menu"
import LanguageIcon from "@mui/icons-material/Language"
import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import Drawer from "@mui/material/Drawer"
import IconButton from "@mui/material/IconButton"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import Switch from "@mui/material/Switch"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import AppBar from "@mui/material/AppBar"
import Avatar from "@mui/material/Avatar"
import SidebarMenu, { type LayoutMenuItem } from "./SidebarMenu"
import HoverMenu from "./HoverMenu"
import { useHoverMenu } from "./useHoverMenu"
import FooterBar, { type FooterBarProps } from "./FooterBar"
import {
  defaultHeaderBackgroundDark,
  defaultHeaderBackgroundLight,
  defaultIconBackgroundDark,
  defaultIconBackgroundLight,
  defaultSidebarBackgroundDark,
  defaultSidebarBackgroundLight,
} from "../../theme/rtmTheme"

export type { LayoutMenuItem }

export interface LayoutLanguageOption {
  code: string
  label: string
}

export interface LayoutShellProps {
  variant: "sidebar" | "plain"
  showHeader?: boolean
  showFooter?: boolean
  productLogo?: ReactNode
  productIcon?: ReactNode
  productTitle?: string
  pages?: LayoutMenuItem[]
  selectedPage?: string
  onSelectPage?: (pageId: string) => void
  /** Shows the page navigation as hover dropdown on the header logo (default: true when pages exist). */
  headerMenu?: boolean
  user?: { name: string } | null
  mode: "light" | "dark"
  onToggleTheme: () => void
  headerTitle?: string
  footerProps?: FooterBarProps
  onNavigateAccount?: () => void
  onNavigateSettings?: () => void
  onLogout?: () => void
  /** Whether the "edit page layout" mode is currently active (drives the switch in the user menu). */
  layoutEditMode?: boolean
  /** Adds an "edit page layout" switch to the user menu; the item is hidden when no handler is given. */
  onToggleLayoutEditMode?: () => void
  /** Label of the "edit page layout" menu item (default: "Seitenlayout bearbeiten"). */
  layoutEditLabel?: string
  headerBackgroundColor?: string
  sidebarBackgroundColor?: string
  iconBackgroundColor?: string
  languages?: LayoutLanguageOption[]
  selectedLanguage?: string
  onSelectLanguage?: (code: string) => void
  children: ReactNode
}

const drawerWidthExpanded = 280
const drawerWidthCollapsed = 76
const headerHeight = 64
const STORAGE_KEY_COLLAPSED = "rtm-layout-sidebar-collapsed"

function LayoutShell({
  variant,
  showHeader = true,
  showFooter = true,
  productLogo,
  productIcon,
  productTitle,
  pages = [],
  selectedPage,
  onSelectPage,
  headerMenu = true,
  user,
  mode,
  onToggleTheme,
  headerTitle,
  footerProps,
  onNavigateAccount,
  onNavigateSettings,
  onLogout,
  layoutEditMode = false,
  onToggleLayoutEditMode,
  layoutEditLabel = "Seitenlayout bearbeiten",
  headerBackgroundColor,
  sidebarBackgroundColor,
  iconBackgroundColor,
  languages,
  selectedLanguage,
  onSelectLanguage,
  children,
}: LayoutShellProps) {
  const hasSidebar = variant === "sidebar"
  const resolvedHeaderBg = headerBackgroundColor ?? (mode === "dark" ? defaultHeaderBackgroundDark : defaultHeaderBackgroundLight)
  const resolvedSidebarBg = sidebarBackgroundColor ?? (mode === "dark" ? defaultSidebarBackgroundDark : defaultSidebarBackgroundLight)
  const resolvedIconBg = iconBackgroundColor ?? (mode === "dark" ? defaultIconBackgroundDark : defaultIconBackgroundLight)
  const [collapsed, setCollapsed] = useState(() => {
    const stored = globalThis.localStorage.getItem(STORAGE_KEY_COLLAPSED)
    return stored ? (JSON.parse(stored) as boolean) : false
  })
  const drawerWidth = collapsed ? drawerWidthCollapsed : drawerWidthExpanded
  const [userMenuAnchor, setUserMenuAnchor] = useState<HTMLElement | null>(null)
  const userMenuOpen = Boolean(userMenuAnchor)
  const [languageMenuAnchor, setLanguageMenuAnchor] = useState<HTMLElement | null>(null)
  const languageMenuOpen = Boolean(languageMenuAnchor)
  const headerNav = useHoverMenu()
  const hasHeaderMenu = headerMenu && pages.length > 0

  const handleHeaderNavSelect = (pageId: string) => {
    headerNav.close()
    onSelectPage?.(pageId)
  }

  const handleToggleCollapsed = () => {
    setCollapsed((prev) => {
      const next = !prev
      globalThis.localStorage.setItem(STORAGE_KEY_COLLAPSED, JSON.stringify(next))
      return next
    })
  }

  const handleUserMenuClose = () => setUserMenuAnchor(null)
  const handleLanguageMenuClose = () => setLanguageMenuAnchor(null)

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", width: "100%", boxSizing: "border-box", bgcolor: "background.default", color: "text.primary", flexDirection: "column" }}>
      {showHeader && (
        <AppBar
          position="fixed"
          elevation={1}
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backgroundColor: resolvedHeaderBg,
            color: (theme) => theme.palette.getContrastText(resolvedHeaderBg),
            borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          }}
        >
          <Toolbar sx={{ justifyContent: "space-between", minHeight: headerHeight }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, minWidth: 0 }}>
              {productLogo && (
                <Box
                  role={hasHeaderMenu ? "button" : undefined}
                  tabIndex={hasHeaderMenu ? 0 : undefined}
                  aria-label={hasHeaderMenu ? "Navigation öffnen" : undefined}
                  aria-haspopup={hasHeaderMenu ? "menu" : undefined}
                  aria-expanded={hasHeaderMenu ? headerNav.isOpen : undefined}
                  onMouseEnter={hasHeaderMenu ? (event) => headerNav.open(event.currentTarget, undefined) : undefined}
                  onMouseLeave={hasHeaderMenu ? headerNav.scheduleClose : undefined}
                  onClick={hasHeaderMenu ? (event) => headerNav.open(event.currentTarget, undefined) : undefined}
                  onKeyDown={
                    hasHeaderMenu
                      ? (event) => {
                          if (event.key === "Enter" || event.key === " " || event.key === "ArrowDown") {
                            event.preventDefault()
                            headerNav.open(event.currentTarget, undefined)
                          } else if (event.key === "Escape") {
                            headerNav.close()
                          }
                        }
                      : undefined
                  }
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    height: 48,
                    maxWidth: { xs: 170, sm: 240 },
                    overflow: "hidden",
                    cursor: hasHeaderMenu ? "pointer" : undefined,
                    borderRadius: 1,
                    px: hasHeaderMenu ? 0.5 : 0,
                    "&:hover, &:focus-visible": hasHeaderMenu ? { bgcolor: "action.hover", outline: "none" } : undefined,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", height: "100%", minWidth: 0, overflow: "hidden" }}>
                    {productLogo}
                  </Box>
                  {hasHeaderMenu && (
                    <ExpandMoreIcon
                      fontSize="small"
                      sx={{
                        ml: 0.5,
                        flexShrink: 0,
                        transition: (theme) => theme.transitions.create("transform"),
                        transform: headerNav.isOpen ? "rotate(180deg)" : "none",
                      }}
                    />
                  )}
                </Box>
              )}
              {hasHeaderMenu && (
                <HoverMenu
                  open={headerNav.isOpen}
                  anchorEl={headerNav.anchorEl}
                  items={pages}
                  selectedId={selectedPage}
                  onSelect={handleHeaderNavSelect}
                  placement="bottom-start"
                  onMouseEnter={headerNav.cancelClose}
                  onMouseLeave={headerNav.scheduleClose}
                  onClose={headerNav.close}
                  onClickAway={(event) => {
                    if (headerNav.anchorEl?.contains(event.target as Node)) return
                    headerNav.close()
                  }}
                />
              )}
              <Typography variant="h6" component="div" noWrap>
                {headerTitle ?? "RTM Layout System"}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {languages && languages.length > 0 && (
                <>
                  <IconButton
                    color="inherit"
                    onClick={(e) => setLanguageMenuAnchor(e.currentTarget)}
                    aria-label="Change language"
                    size="small"
                  >
                    <LanguageIcon />
                  </IconButton>
                  <Menu
                    anchorEl={languageMenuAnchor}
                    open={languageMenuOpen}
                    onClose={handleLanguageMenuClose}
                  >
                    {languages.map((language) => (
                      <MenuItem
                        key={language.code}
                        selected={selectedLanguage === language.code}
                        onClick={() => {
                          onSelectLanguage?.(language.code)
                          handleLanguageMenuClose()
                        }}
                      >
                        {language.label}
                      </MenuItem>
                    ))}
                  </Menu>
                </>
              )}
              <IconButton color="inherit" onClick={onToggleTheme} aria-label="Toggle light dark">
                {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
              {user ? (
                <>
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: 1, cursor: "pointer" }}
                    onClick={(event) => setUserMenuAnchor(event.currentTarget)}
                  >
                    <Avatar sx={{ width: 32, height: 32 }}>{user.name.charAt(0)}</Avatar>
                    <Typography variant="body2">{user.name}</Typography>
                  </Box>
                  <Menu anchorEl={userMenuAnchor} open={userMenuOpen} onClose={handleUserMenuClose}>
                    <MenuItem
                      onClick={() => {
                        handleUserMenuClose()
                        onNavigateAccount?.()
                      }}
                    >
                      Account
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleUserMenuClose()
                        onNavigateSettings?.()
                      }}
                    >
                      Einstellungen
                    </MenuItem>
                    <MenuItem>
                      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: 200 }}>
                        <span>Dark Mode</span>
                        <Switch checked={mode === "dark"} onChange={onToggleTheme} />
                      </Box>
                    </MenuItem>
                    {onToggleLayoutEditMode && (
                      <MenuItem
                        role="menuitemcheckbox"
                        aria-checked={layoutEditMode}
                        onClick={() => {
                          handleUserMenuClose()
                          onToggleLayoutEditMode()
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: 200 }}>
                          <span>{layoutEditLabel}</span>
                          <Switch checked={layoutEditMode} tabIndex={-1} disableRipple />
                        </Box>
                      </MenuItem>
                    )}
                    <MenuItem
                      onClick={() => {
                        handleUserMenuClose()
                        onLogout?.()
                      }}
                    >
                      Logout
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Typography variant="body2" sx={{ opacity: 0.75 }}>
                  Gast
                </Typography>
              )}
            </Box>
          </Toolbar>
        </AppBar>
      )}

      <Box sx={{ display: "flex", flex: 1, width: "100%", boxSizing: "border-box" }}>
        {hasSidebar && (
          <Drawer
            variant="permanent"
            open
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              transition: (theme) => theme.transitions.create("width"),
              [`& .MuiDrawer-paper`]: {
                width: drawerWidth,
                boxSizing: "border-box",
                borderRight: 0,
                top: showHeader ? `${headerHeight}px` : 0,
                height: showHeader ? `calc(100vh - ${headerHeight}px)` : "100vh",
                backgroundColor: resolvedSidebarBg,
                overflowX: "hidden",
                display: "flex",
                flexDirection: "column",
                transition: (theme) => theme.transitions.create("width"),
              },
            }}
          >
            <Box sx={{ px: collapsed ? 1 : 2, py: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  display: "grid",
                  placeItems: "center",
                  bgcolor: resolvedIconBg,
                  color: (theme) => theme.palette.getContrastText(resolvedIconBg),
                  border: (theme) => `1px solid ${theme.palette.divider}`,
                }}
              >
                {productIcon}
              </Box>
              {!collapsed && (
                <Typography variant="subtitle1" align="center" sx={{ whiteSpace: "nowrap" }}>
                  {productTitle ?? "Produkt"}
                </Typography>
              )}
            </Box>
            <Divider />

            <Box sx={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>
              <SidebarMenu items={pages} collapsed={collapsed} selectedId={selectedPage} onSelect={onSelectPage} />
            </Box>

            <Divider />
            <Box sx={{ display: "flex", justifyContent: "center", py: 1 }}>
              <IconButton
                onClick={handleToggleCollapsed}
                aria-label={collapsed ? "Menü ausklappen" : "Menü einklappen"}
              >
                {collapsed ? <MenuIcon /> : <ChevronLeftIcon />}
              </IconButton>
            </Box>
          </Drawer>
        )}

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: "100%",
            minWidth: 0,
            boxSizing: "border-box",
            p: 2,
            pt: showHeader ? `${headerHeight + 8}px` : 2,
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            transition: (theme) => theme.transitions.create("margin"),
          }}
        >
          <Box sx={{ flex: 1, minWidth: 0 }}>{children}</Box>
          {showFooter && <FooterBar {...footerProps} />}
        </Box>
      </Box>
    </Box>
  )
}

export default LayoutShell
