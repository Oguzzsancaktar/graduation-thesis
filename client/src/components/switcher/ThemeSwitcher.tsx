import React, { useState } from 'react'
// Libs.
import { MdOutlineDarkMode, MdLightMode } from 'react-icons/md'
// Hooks.
import { useDarkMode } from '@/hooks'

const ThemeSwitcher = () => {
  const [colorTheme, setTheme] = useDarkMode()

  return (
    <div>
      <button
        onClick={() => {
          setTheme(colorTheme)
        }
        }
      >
        {colorTheme === 'light' ? <MdOutlineDarkMode /> : <MdLightMode />}
      </button>

    </div>
  )
}

export default ThemeSwitcher
