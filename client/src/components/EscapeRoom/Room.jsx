import { useAnimations, useGLTF, OrbitControls } from '@react-three/drei'
import { useControls } from 'leva'
import { useEffect, useRef, useState } from 'react'
import { useFrame, useLoader, useThree } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Raycaster, Vector2 } from 'three'
import * as THREE from 'three'

export default function Room()
{
    // const room = useGLTF('./RoomTest (drawer + no textures).glb')
    const gltf = useLoader(GLTFLoader, './RoomTest (drawer + no textures).glb')
    const animations = useAnimations(gltf.animations, gltf.scene)
    const controlsRef = useRef()
    const fixedTargetHeight = 0.5;
    const { scene, camera } = useThree()

    let key
    let pliers

    // Camera shots for click events
    const newTableCameraPosition = new THREE.Vector3( 4.496384912116336, 2.635625315481801, 0.02291382377622216 );
    const newTableCameraRotation = new THREE.Euler( -1.5894736626573862, -1.2378020736780768, -1.5851845136563376);

    const newDrawerCameraPosition = new THREE.Vector3( -4.679039321772094, 3.9651647259301255, 6.788425620434609 ); 
    const newDrawerCameraRotation = new THREE.Euler( -2.386476455624608, -0.004641904539556792, -3.1372237424982106);

    const newShelfCameraPosition = new THREE.Vector3( 5.014328628180679, 4.402251395113069, 5.601074182861293 );
    const newShelfCameraRotation = new THREE.Euler( -2.8057966888937824, -0.8977252150823338, -2.8751820107698096);

    const raycaster = new Raycaster();
    const mouse = new Vector2();

    let keyGet = false
    let pliersGet = false

    // Raycasting click event handler
    const handleClick = (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);

        const intersects = raycaster.intersectObjects(scene.children, true);
        let intersectsArray = []
        for ( let i = 0; i < intersects.length; i++ ) {
            const intersectedObject = intersects[i].object.name
            intersectsArray.push(intersectedObject)
        }

        controlsRef.current.enabled = false

        // Zoom to table
        if (intersectsArray.includes('Cube002'))
        {
            console.log("Clicked on table");
            camera.position.copy( newTableCameraPosition )
            camera.rotation.copy( newTableCameraRotation );
            // Get key
            if (intersectsArray.includes('Circle001'))
            {
                console.log("Clicked on key");
                if (!keyGet) {
                    key.parent.remove(key)
                    keyGet = true
                }
            }
        } 
        // Zoom to drawer
        else if (intersectsArray.includes('Cube007'))
        {
            console.log("Clicked on drawer");
            camera.position.copy( newDrawerCameraPosition );
            camera.rotation.copy( newDrawerCameraRotation );
        }
        // Zoom to shelf
        else if (intersectsArray.includes('Plane001'))
        {
            console.log("Clicked on shelf");
            camera.position.copy( newShelfCameraPosition );
            camera.rotation.copy( newShelfCameraRotation );
            // Get pliers
            if (intersectsArray.includes('Cylinder'))
            {
                console.log("Clicked on pliers");
                if (!pliersGet) {
                    pliers.parent.remove(pliers)
                    pliersGet = true
                }
            }
        }
        // Open pet door
        else if (intersectsArray.includes('Door'))
        {
            console.log("Clicked on door");
            // animationActions[0].play()
        }
        else {
            controlsRef.current.enabled = true
        }
    }

    useEffect(() => {
        const controls = controlsRef.current;
    
        const updateCameraPosition = () => {
          if (camera.position.y < fixedTargetHeight) {
            camera.position.y = fixedTargetHeight + 0.01;
            controls.update();
          }
        };
    
        controls.addEventListener('change', updateCameraPosition);
    
        return () => {
          controls.removeEventListener('change', updateCameraPosition);
        };
    }, [controlsRef, fixedTargetHeight]);

    gltf.scene.traverse((object) => {
        if (object.isMesh && object.name == 'Circle001') {
            // console.log(object);
            key = object
        }
        if (object.isMesh && object.name == 'Cylinder') {
            pliers = object
        }
    })

    const { animationName } = useControls({
        animationName: { options: animations.names }
    })

    useEffect(() =>
    {
        const action = animations.actions[animationName]
        action
            .reset()
            .fadeIn(0.5)
            .play()
            .setLoop(THREE.LoopOnce, 1)
            .clampWhenFinished = true
        return () =>
        {
            action.fadeOut(0.5)
        }
    }, [animationName])

    return <>
            <primitive
            object={ gltf.scene }
            onClick={ handleClick }
            />
            <OrbitControls ref={controlsRef} enableDamping={true} enableZoom={false} enablePan={false} />
        </>
}

