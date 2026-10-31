import { useCallback, useEffect, useRef, useState } from "react"
import type { LayoutMenuItem } from "./SidebarMenu"

export function containsSelected(item: LayoutMenuItem, selectedId?: string): boolean {
  if (!selectedId) return false
  if (item.id === selectedId) return true
  return item.children?.some((child) => containsSelected(child, selectedId)) ?? false
}

/** Open/close state for hover menus; closing is delayed so the pointer can travel from anchor to popup. */
export function useHoverMenu<T = undefined>(closeDelay = 200) {
  const [state, setState] = useState<{ anchorEl: HTMLElement; payload: T } | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const cancelClose = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current)
      timer.current = null
    }
  }, [])

  const open = useCallback(
    (anchorEl: HTMLElement, payload: T) => {
      cancelClose()
      setState({ anchorEl, payload })
    },
    [cancelClose],
  )

  const close = useCallback(() => {
    cancelClose()
    setState(null)
  }, [cancelClose])

  const scheduleClose = useCallback(() => {
    cancelClose()
    timer.current = setTimeout(() => {
      timer.current = null
      setState(null)
    }, closeDelay)
  }, [cancelClose, closeDelay])

  useEffect(() => cancelClose, [cancelClose])

  return {
    anchorEl: state?.anchorEl ?? null,
    payload: state?.payload,
    isOpen: state !== null,
    open,
    close,
    scheduleClose,
    cancelClose,
  }
}

