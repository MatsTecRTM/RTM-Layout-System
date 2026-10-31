import { useState } from "react"
import type { ReactNode } from "react"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import ClickAwayListener from "@mui/material/ClickAwayListener"
import Divider from "@mui/material/Divider"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import MenuItem from "@mui/material/MenuItem"
import MenuList from "@mui/material/MenuList"
import Paper from "@mui/material/Paper"
import Popper from "@mui/material/Popper"
import type { PopperPlacementType } from "@mui/material/Popper"
import type { LayoutMenuItem } from "./SidebarMenu"
import { containsSelected } from "./useHoverMenu"

export interface HoverMenuProps {
  open: boolean
  anchorEl: HTMLElement | null
  items: LayoutMenuItem[]
  selectedId?: string
  onSelect: (id: string) => void
  /** Optional heading entry (e.g. the parent category), selectable via `onTitleClick`. */
  title?: ReactNode
  titleSelected?: boolean
  onTitleClick?: () => void
  placement?: PopperPlacementType
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  onClickAway?: (event: MouseEvent | TouchEvent) => void
  onClose?: () => void
}

interface HoverMenuPanelProps {
  items: LayoutMenuItem[]
  selectedId?: string
  onSelect: (id: string) => void
  title?: ReactNode
  titleSelected?: boolean
  onTitleClick?: () => void
}

function HoverMenuPanel({ items, selectedId, onSelect, title, titleSelected, onTitleClick }: HoverMenuPanelProps) {
  // Lives inside the Popper, so the open submenu resets automatically whenever the menu closes.
  const [submenu, setSubmenu] = useState<{ item: LayoutMenuItem; anchorEl: HTMLElement } | null>(null)

  return (
    <Paper elevation={8} sx={{ minWidth: 220, maxWidth: 320, maxHeight: "70vh", overflowY: "auto" }}>
      <MenuList dense autoFocusItem={false} sx={{ py: 0.5 }}>
        {title && (
          <MenuItem
            selected={titleSelected}
            onMouseEnter={() => setSubmenu(null)}
            onClick={onTitleClick}
            sx={{ fontWeight: 600, minHeight: 40, color: titleSelected ? "primary.main" : undefined }}
          >
            {title}
          </MenuItem>
        )}
        {title && <Divider sx={{ my: 0.5 }} />}
        {items.map((item) => {
          const hasChildren = Boolean(item.children?.length)
          const isActive = containsSelected(item, selectedId)
          const isSubmenuOpen = submenu?.item.id === item.id
          return (
            <MenuItem
              key={item.id}
              selected={selectedId === item.id || isSubmenuOpen}
              aria-haspopup={hasChildren ? "menu" : undefined}
              aria-expanded={hasChildren ? isSubmenuOpen : undefined}
              onMouseEnter={(event) => setSubmenu(hasChildren ? { item, anchorEl: event.currentTarget } : null)}
              onClick={() => onSelect(item.id)}
              sx={{ minHeight: 40, color: isActive ? "primary.main" : undefined }}
            >
              {item.icon && (
                <ListItemIcon sx={{ minWidth: 36, color: isActive ? "primary.main" : "inherit" }}>{item.icon}</ListItemIcon>
              )}
              <ListItemText primary={item.label} slotProps={{ primary: { noWrap: true } }} />
              {hasChildren && <ChevronRightIcon fontSize="small" sx={{ ml: 1, opacity: 0.7 }} />}
            </MenuItem>
          )
        })}
      </MenuList>
      {submenu && (
        <HoverMenu
          open
          anchorEl={submenu.anchorEl}
          items={submenu.item.children ?? []}
          selectedId={selectedId}
          onSelect={onSelect}
          placement="right-start"
        />
      )}
    </Paper>
  )
}

/**
 * Cascading popup menu: items with children open a submenu on hover.
 * Nested submenus are rendered inside the React tree of their parent, so mouse enter/leave
 * handlers of the root menu also cover all of its submenus.
 */
function HoverMenu({
  open,
  anchorEl,
  items,
  selectedId,
  onSelect,
  title,
  titleSelected,
  onTitleClick,
  placement = "bottom-start",
  onMouseEnter,
  onMouseLeave,
  onClickAway,
  onClose,
}: HoverMenuProps) {
  const panel = (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onKeyDown={(event) => {
        if (event.key === "Escape") onClose?.()
      }}
    >
      <HoverMenuPanel
        items={items}
        selectedId={selectedId}
        onSelect={onSelect}
        title={title}
        titleSelected={titleSelected}
        onTitleClick={onTitleClick}
      />
    </div>
  )

  return (
    <Popper
      open={open && Boolean(anchorEl)}
      anchorEl={anchorEl}
      placement={placement}
      modifiers={[{ name: "offset", options: { offset: placement.startsWith("right") ? [-4, 0] : [0, 2] } }]}
      sx={{ zIndex: (theme) => theme.zIndex.modal }}
    >
      {onClickAway ? <ClickAwayListener onClickAway={onClickAway}>{panel}</ClickAwayListener> : panel}
    </Popper>
  )
}

export default HoverMenu
