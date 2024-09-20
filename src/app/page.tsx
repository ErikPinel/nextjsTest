'use client'
import { useEffect, useState } from 'react'
import Script from 'next/script'


export default function Home (){
  const [sdkReady, setSdkReady] = useState(false) // Track when SDK is ready

  // Keep cityRef in sync with city state
  // Check for SDK readiness every 100ms
  useEffect(() => {
    const checkSdkLoaded = setInterval(() => {
      if (typeof window !== 'undefined' && window.PickupsSDK) {
        setSdkReady(true) // SDK is ready
        clearInterval(checkSdkLoaded)
        console.log('Pickup SDK is ready')
      }
    }, 100)

    return () => clearInterval(checkSdkLoaded)
  }, [])

  // Add event listeners when SDK is ready
  useEffect(() => {
    if (sdkReady) {
      document.body.addEventListener('pickups-after-choosen', handlePickupsAfterChosen, {
        passive: true,
      })
      console.log('Event listeners added for SDK interactions')
    }

    return () => {
      document.body.addEventListener('pickups-after-choosen', handlePickupsAfterChosen, {
        passive: true,
      })


      console.log('Event listeners removed')
    }
  }, [sdkReady])

  // Handle the event when a pickup point is chosen
  const handlePickupsAfterChosen = (e: any) => {
    const pointDetails = e.detail
    console.log('Selected Pickup Point Details:', pointDetails)
  }

  // Set default location before opening the pickup point interface
  return (
    <div>
      <div
        style={{
          color: sdkReady ? 'blue' : 'gray',
          textDecoration: 'underline',
          cursor: sdkReady ? 'pointer' : 'not-allowed',
        }}
        onClick={() => {
          if (sdkReady && window.PickupsSDK) {
            console.log('Opening Pickup Point SDK interface')
            window.PickupsSDK.onClick()
          } else {
            console.error('SDK not ready or city not set')
          }
        }}
      >
        opennn
      </div>
      <div className="ups-pickups-info"></div>

      {/* Load SDK Script */}
      <Script
        src="https://pickuppoint.co.il/api/ups-pickups.sdk.all.js"
        strategy="afterInteractive" // Load after the page becomes interactive
        onLoad={() => console.log('Pickup SDK loaded')}
        onError={e => console.error('Failed to load Pickup SDK:', e)}
      />
    </div>
  )
}

