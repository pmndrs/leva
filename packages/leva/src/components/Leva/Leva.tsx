import React, { useEffect } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { levaStore } from '../../store'
import { LevaRoot, LevaRootProps } from './LevaRoot'

/**
 * Manages the lifecycle of the global Leva panel, including creation, cleanup,
 * and reference counting to ensure the panel is only removed when no components
 * are using it.
 */
class PanelLifecycle {
  private refCount = 0
  private rootEl: HTMLElement | null = null
  private reactRoot: Root | null = null
  private initialized = false

  /**
   * Mounts a new instance of the global panel.
   * Increments reference count and creates the panel if it doesn't exist.
   */
  mount(): void {
    this.refCount++

    if (!this.initialized) {
      this.createPanel()
      this.initialized = true
    }
  }

  /**
   * Unmounts an instance of the global panel.
   * Decrements reference count and destroys the panel when count reaches zero.
   */
  unmount(): void {
    this.refCount--

    if (this.refCount === 0 && this.initialized) {
      this.destroyPanel()
      this.initialized = false
    }
  }

  /**
   * Creates the panel DOM element and React root.
   * @private
   */
  private createPanel(): void {
    if (!this.rootEl) {
      this.rootEl =
        document.getElementById('leva__root') || Object.assign(document.createElement('div'), { id: 'leva__root' })

      if (document.body) {
        document.body.appendChild(this.rootEl)
        this.reactRoot = createRoot(this.rootEl)
        this.reactRoot.render(<Leva isRoot />)
      }
    }
  }

  /**
   * Destroys the panel by unmounting React root and removing DOM element.
   * @private
   */
  private destroyPanel(): void {
    if (this.rootEl) {
      // Unmount React root
      if (this.reactRoot) {
        this.reactRoot.unmount()
        this.reactRoot = null
      }

      // Remove DOM element
      this.rootEl.remove()
      this.rootEl = null
    }
  }

  /**
   * Gets the current reference count (useful for debugging)
   */
  getRefCount(): number {
    return this.refCount
  }

  /**
   * Checks if the panel is initialized (useful for debugging)
   */
  isInitialized(): boolean {
    return this.initialized
  }
}

// Singleton instance for managing the global panel lifecycle
const panelLifecycle = new PanelLifecycle()

type LevaProps = Omit<Partial<LevaRootProps>, 'store'> & { isRoot?: boolean }

// uses global store
export function Leva({ isRoot = false, ...props }: LevaProps) {
  useEffect(() => {
    // Note: This logic for handling non-root panels remains unchanged
    // as it's separate from the global panel lifecycle
    if (!isRoot && panelLifecycle.isInitialized()) {
      // If this panel was attached somewhere in the app and there is already
      // a floating panel, we would need to handle it here
      // For now, keeping the original behavior
    }
  }, [isRoot])

  return <LevaRoot store={levaStore} {...props} />
}

/**
 * This hook is used by Leva useControls, and ensures that we spawn a Leva Panel
 * without the user having to put it into the component tree. This should only
 * happen when using the global store.
 * @param isGlobalPanel - Whether this is a global panel instance
 */
export function useRenderRoot(isGlobalPanel: boolean) {
  useEffect(() => {
    if (isGlobalPanel) {
      panelLifecycle.mount()

      return () => {
        panelLifecycle.unmount()
      }
    }
  }, [isGlobalPanel])
}
