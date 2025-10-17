'use client'
import { FaAndroid, FaApple, FaWindows } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import { VersionsCard } from './versionsCard'

const SelectOS = () => {
  const [selectedOS, setSelectedOS] = useState('')
  useEffect(() => {
    if (!selectedOS) return

    if (typeof window !== 'undefined') {
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })
    }
  }, [selectedOS])
  return (
    <div className="flex-center flex-col gap-5 ">
      <div className="flex-center flex-col gap-2">
        <p className="h3-bold">Manueller Download:</p>
        <p className="text-base sm:text-lg md:text-xl">Wählen Sie Ihr Betriebssystem:</p>
      </div>
      <form className="flex-center gap-4 flex-col md:flex-row">
        <label
          htmlFor="ios"
          className={`cursor-pointer text-black p-10 border-2 rounded-lg hover:border-blue-300 hover:bg-blue-50 ${selectedOS === 'ios' ? 'border-blue-400 bg-blue-50' : ''}`}
        >
          <input
            type="radio"
            id="ios"
            name="os"
            value="ios"
            className="hidden"
            onChange={() => setSelectedOS('ios')}
          />
          <FaApple className="size-15" />
        </label>
        <label
          htmlFor="android"
          className={`cursor-pointer text-green-600 p-10 border-2 rounded-lg hover:border-blue-300 hover:bg-blue-50 ${selectedOS === 'android' ? 'border-blue-400 bg-blue-50' : ''}`}
        >
          <input
            type="radio"
            id="android"
            name="os"
            value="android"
            className="hidden"
            onChange={() => setSelectedOS('android')}
          />
          <FaAndroid className="size-15" />
        </label>
        <label
          htmlFor="windows"
          className={`cursor-pointer text-blue-400 p-10 border-2 rounded-lg hover:border-blue-300 hover:bg-blue-50 ${selectedOS === 'windows' ? 'border-blue-400 bg-blue-50' : ''}`}
        >
          <input
            type="radio"
            id="windows"
            name="os"
            value="windows"
            className="hidden"
            onChange={() => setSelectedOS('windows')}
          />
          <FaWindows className="size-15" />
        </label>
      </form>
      {selectedOS && VersionsCard(selectedOS)}
    </div>
  )
}

export default SelectOS
