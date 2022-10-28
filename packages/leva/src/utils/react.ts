import React from 'react'
import ReactDOM from 'react-dom'

/**
 * With React 18, renderers will warn when not using the new createRoot signature to opt-in to concurrent mode.
 * We're okay with creating a (blocking) legacy root to support older versions, so we disable the warning.
 * @see https://github.com/facebook/react/pull/21652
 */
export function render<P>(element: React.ReactElement<P>, container: HTMLElement): void {
  // eslint-disable-next-line no-console
  const error = console.error
  // eslint-disable-next-line no-console
  console.error = () => {}
  ReactDOM.render(element, container)
  // eslint-disable-next-line no-console
  console.error = error
}

/*
 * https://github.com/gregberge/react-merge-refs
 * MIT License
 * Copyright (c) 2020 Greg Bergé
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

export function mergeRefs<T>(
  refs: Array<React.RefCallback<T> | React.RefObject<T> | null | undefined>
): React.RefCallback<T> {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') ref(value)
      else if (ref != null) {
        ;(ref as React.MutableRefObject<T | null>).current = value
      }
    })
  }
}
