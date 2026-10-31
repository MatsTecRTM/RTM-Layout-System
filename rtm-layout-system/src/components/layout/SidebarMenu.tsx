import { useState } from "react"
import type { ReactNode } from "react"
import Box from "@mui/material/Box"
import Collapse from "@mui/material/Collapse"
import ExpandLessIcon from "@mui/icons-material/ExpandLess"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord"
import List from "@mui/material/List"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import Tooltip from "@mui/material/Tooltip"
import HoverMenu from "./HoverMenu"
import { useHoverMenu } from "./useHoverMenu"

export interface LayoutMenuItem {
  id: string
  label: string
  icon?: ReactNode
  children?: LayoutMenuItem[]
}

export interface SidebarMenuProps {
  items: LayoutMenuItem[]
  collapsed: boolean
  selectedId?: string
  onSelect?: (id: string) => void
}

function findParentId(items: LayoutMenuItem[], targetId?: string): string | null {
  if (!targetId) return null
  const parent = items.find((item) => item.children?.some((child) => child.id === targetId))
  return parent?.id ?? null
}

function isItemOrChildSelected(item: LayoutMenuItem, selectedId?: string): boolean {
  if (!selectedId) return false
  if (item.id === selectedId) return true
  return item.children?.some((child) => child.id === selectedId) ?? false
}

const STORAGE_KEY_EXPANDED = "rtm-layout-sidebar-expanded"

function SidebarMenu({ items, collapsed, selectedId, onSelect }: SidebarMenuProps) {
  const [expandedId, setExpandedId] = useState<string | null>(() => {
    const stored = globalThis.localStorage.getItem(STORAGE_KEY_EXPANDED)
    return stored && stored.length > 0 ? stored : findParentId(items, selectedId)
  })

  const updateExpandedId = (id: string | null) => {
    setExpandedId(id)
    globalThis.localStorage.setItem(STORAGE_KEY_EXPANDED, id ?? "")
  }

  // Flyout with the subcategories of a parent item while the sidebar is collapsed.
  const flyout = useHoverMenu<LayoutMenuItem>()
  const flyoutItem = collapsed && flyout.isOpen ? flyout.payload : undefined

  const handleSelect = (id: string) => {
    flyout.close()
    onSelect?.(id)
  }

  const handleParentClick = (item: LayoutMenuItem, target: HTMLElement) => {
    if (item.children?.length) {
      if (collapsed) {
        // Touch devices have no hover: the first tap opens the flyout, a second tap opens the overview.
        if (flyoutItem?.id === item.id) handleSelect(item.id)
        else flyout.open(target, item)
        return
      }
      updateExpandedId(expandedId === item.id ? null : item.id)
      return
    }
    handleSelect(item.id)
  }

  return (
    <List component="nav" disablePadding sx={{ width: "100%" }}>
      {items.map((item) => {
        const hasChildren = Boolean(item.children?.length)
        const isExpanded = expandedId === item.id
        const isSelected = selectedId === item.id
        const isParentOfSelected = !isSelected && isItemOrChildSelected(item, selectedId)
        const shouldShowAsSelected = collapsed ? isItemOrChildSelected(item, selectedId) : isSelected
        const usesFlyout = collapsed && hasChildren

        return (
          <Box key={item.id}>
            <Tooltip
              title={collapsed && !usesFlyout ? item.label : ""}
              placement="right"
              arrow
              disableHoverListener={!collapsed || usesFlyout}
            >
              <ListItemButton
                selected={shouldShowAsSelected || flyoutItem?.id === item.id}
                aria-haspopup={usesFlyout ? "menu" : undefined}
                aria-expanded={usesFlyout ? flyoutItem?.id === item.id : undefined}
                aria-label={collapsed ? item.label : undefined}
                onMouseEnter={(event) => {
                  if (!collapsed) return
                  if (usesFlyout) flyout.open(event.currentTarget, item)
                  else flyout.close()
                }}
                onMouseLeave={() => {
                  if (usesFlyout) flyout.scheduleClose()
                }}
                onClick={(event) => handleParentClick(item, event.currentTarget)}
                sx={{
                  justifyContent: collapsed ? "center" : "flex-start",
                  px: collapsed ? 1.5 : 2,
                  minHeight: 48,
                }}
              >
                {item.icon && (
                  <ListItemIcon
                    sx={{
                      minWidth: collapsed ? "auto" : 36,
                      justifyContent: "center",
                      color: shouldShowAsSelected ? "primary.main" : "inherit",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                )}
                {!collapsed && (
                  <ListItemText
                    primary={item.label}
                    sx={{ color: isSelected || isParentOfSelected ? "primary.main" : "inherit", whiteSpace: "nowrap" }}
                  />
                )}
                {!collapsed && hasChildren && (isExpanded ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />)}
              </ListItemButton>
            </Tooltip>

            {hasChildren && (
              <Collapse in={!collapsed && isExpanded} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.children!.map((child) => {
                    const isChildSelected = selectedId === child.id
                    return (
                      <ListItemButton
                        key={child.id}
                        selected={isChildSelected}
                        onClick={() => handleSelect(child.id)}
                        sx={{ pl: 5, minHeight: 40 }}
                      >
                        <ListItemIcon sx={{ minWidth: 32, color: isChildSelected ? "primary.main" : "inherit" }}>
                          {child.icon ?? <FiberManualRecordIcon sx={{ fontSize: 8 }} />}
                        </ListItemIcon>
                        <ListItemText
                          primary={child.label}
                          sx={{ color: isChildSelected ? "primary.main" : "inherit" }}
                        />
                      </ListItemButton>
                    )
                  })}
                </List>
              </Collapse>
            )}
          </Box>
        )
      })}
      <HoverMenu
        open={Boolean(flyoutItem)}
        anchorEl={flyout.anchorEl}
        items={flyoutItem?.children ?? []}
        selectedId={selectedId}
        onSelect={handleSelect}
        title={flyoutItem?.label}
        titleSelected={flyoutItem ? selectedId === flyoutItem.id : false}
        onTitleClick={() => flyoutItem && handleSelect(flyoutItem.id)}
        placement="right-start"
        onMouseEnter={flyout.cancelClose}
        onMouseLeave={flyout.scheduleClose}
        onClose={flyout.close}
        onClickAway={(event) => {
          if (flyout.anchorEl?.contains(event.target as Node)) return
          flyout.close()
        }}
      />
    </List>
  )
}

export default SidebarMenu
