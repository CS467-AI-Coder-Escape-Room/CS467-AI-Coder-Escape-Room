import { Perf } from 'r3f-perf'
import { Suspense } from 'react'
import Room from './Room.jsx'

export default function EscapeRoom()
{
    return <>
        <Perf position="bottom-left" />

        <directionalLight castShadow position={ [ 1, 2, 3 ] } intensity={ 1.5 } shadow-normalBias={ 0.04 } />
        <ambientLight intensity={ 0.5 } />

        {/* <Suspense fallback={ <Placeholder position-y={ 0.5 } scale={ [ 2, 3, 2 ] } /> }>
            <Hamburger scale={ 0.35 } />
        </Suspense> */}
        <Room />
    </>
}