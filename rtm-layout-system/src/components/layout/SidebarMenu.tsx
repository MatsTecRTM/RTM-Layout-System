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

  const handleParentClick = (item: LayoutMenuItem) => {
    if (item.children?.length) {
      updateExpandedId(expandedId === item.id ? null : item.id)
      if (collapsed) onSelect?.(item.id)
      return
    }
    onSelect?.(item.id)
  }

  return (
    <List component="nav" disablePadding sx={{ width: "100%" }}>
      {items.map((item) => {
        const hasChildren = Boolean(item.children?.length)
        const isExpanded = expandedId === item.id
        const isSelected = selectedId === item.id
        const isParentOfSelected = !isSelected && isItemOrChildSelected(item, selectedId)
        const shouldShowAsSelected = collapsed ? isItemOrChildSelected(item, selectedId) : isSelected

        return (
          <Box key={item.id}>
            <Tooltip title={collapsed ? item.label : ""} placement="right" arrow disableHoverListener={!collapsed}>
              <ListItemButton
                selected={shouldShowAsSelected}
                onClick={() => handleParentClick(item)}
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
                        onClick={() => onSelect?.(child.id)}
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
    </List>
  )
}

export default SidebarMenu
