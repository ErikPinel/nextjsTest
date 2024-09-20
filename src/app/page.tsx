'use client'
import { useEffect } from 'react';

export default  function Home () {
  useEffect(() => {
    const handlePickupChosen = (e: Event) => {
      const customEvent = e as CustomEvent;
      const pointDetails = customEvent.detail;
      console.log('Selected Pickup Point Details:', pointDetails);
    };

    document.body.addEventListener('pickups-after-choosen', handlePickupChosen);

    return () => {
      document.body.removeEventListener('pickups-after-choosen', handlePickupChosen);
    };
  }, []);

  return (
    <div>
      {/* Pickup Point Button */}
      <div onClick={() => window.PickupsSDK && window.PickupsSDK.onClick()} className="ups-pickups ups-pickups-48"></div>
      <div className="ups-pickups-info"></div>
    </div>
  );
}

