import { Perf } from 'r3f-perf'
import { Suspense } from 'react'
import Room from './Room.jsx'

export default function EscapeRoom({ handleEscape, setIsRoomLoaded })
{

    return <>
        {/* <Perf position="bottom-left" /> */}

        <directionalLight castShadow position={ [ 1, 2, 3 ] } intensity={ 1.5 } shadow-normalBias={ 0.04 } />
        <ambientLight intensity={ 0.5 } />

        <Room handleEscape={handleEscape} setIsRoomLoaded={setIsRoomLoaded} />
    </>
}