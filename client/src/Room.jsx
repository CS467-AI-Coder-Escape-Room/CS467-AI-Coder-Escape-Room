import { useAnimations, OrbitControls, Text } from '@react-three/drei'
import { useControls } from 'leva'
import { useEffect, useRef, useState } from 'react'
import { useFrame, useLoader, useThree } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Raycaster, Vector2 } from 'three'
import * as THREE from 'three'

export default function Room()
{
    // Mesh objects
    let boxKey
    let lockKey
    let pliers
    let handSaw
    let topboxcover
    let lock
    let deskDoor
    let wrench
    let vent
    let ventBack
    let redWire
    let blueWire
    let purpleWire
    let redWireSocket
    let blueWireSocket
    let purpleWireSocket
    let redWireInstalled
    let blueWireInstalled
    let purpleWireInstalled

    const animations = useAnimations(gltf.animations, gltf.scene)
    const controlsRef = useRef()
    const [textData, setTextData] = useState({ position: [0, 0, 0], rotation: [0, 0, 0], content: '', fontSize: '0.2' });
    const fixedTargetHeight = 0.5;
    const { scene, camera, size } = useThree()

    // Animation state
    const [currentAnimation, setCurrentAnimation] = useState('');

    // Interactions states
    const [lockCameraState, setCameraState] = useState(false)
    const [boxKeyGet, setBoxKeyGet] = useState(false)
    const [lockKeyGet, setLockKeyGet] = useState(false)
    const [pliersGet, setPliersGet] = useState(false)
    const [redWireGet, setRedWireGet] = useState(false)
    const [blueWireGet, setBlueWireGet] = useState(false)
    const [purpleWireGet, setPurpleWireGet] = useState(false)
    const [topboxcoverRemove, setTopboxcoverRemove] = useState(false)
    const [handSawGet, setHandSawGet] = useState(false)
    const [deskDoorRemove, setDeskDoorRemove] = useState(false)
    const [wrenchGet, setWrenchGet] = useState(false) 
    const [ventRemove, setVentRemove] = useState(false)
    const [lockUnlocked, setLockUnlocked] = useState(false)

    // Camera positions and rotations for zooms
    const cameraResetPosition = new THREE.Vector3( -0.06926893566059328, 1.843472046827195, -5.709361840619253 );
    const cameraResetRotation = new THREE.Euler( -2.829274134118383, -0.01154507908011045, -3.1378650112042954 );

    const newTableCameraPosition = new THREE.Vector3( 4.496384912116336, 2.635625315481801, 0.02291382377622216 );
    const newTableCameraRotation = new THREE.Euler( -1.5894736626573862, -1.2378020736780768, -1.5851845136563376 );

    const newDrawerCameraPosition = new THREE.Vector3( -4.679039321772094, 3.9651647259301255, 6.788425620434609 ); 
    const newDrawerCameraRotation = new THREE.Euler( -2.386476455624608, -0.004641904539556792, -3.1372237424982106 );

    const newShelfCameraPosition = new THREE.Vector3( 5.014328628180679, 4.402251395113069, 5.601074182861293 );
    const newShelfCameraRotation = new THREE.Euler( -2.8057966888937824, -0.8977252150823338, -2.8751820107698096);

    const newPlantCameraPosition = new THREE.Vector3( -4.755676605410579, 0.865036453735603, -7.527622694172464 );
    const newPlantCameraRotation = new THREE.Euler( -0.6556217703670302, 0.9260551430403319, 0.5511712168105547 );

    const newSideShelfCameraPosition = new THREE.Vector3( -4.639246245178541, 0.7719513284370226, -3.157401538369389 );
    const newSideShelfCameraRotation = new THREE.Euler( -0.32094348133461087, 1.5141768175720771, 0.3204637032507181 );

    const newChairCameraPosition = new THREE.Vector3( -4.316993714990482, 0.9204541414313722, -0.22765768911738507 );
    const newChairCameraRotation = new THREE.Euler( -1.5223077720819007, 1.4845717918630796, 1.5221272486614614 );

    const newBookShelfCameraPosition = new THREE.Vector3( -4.440021282766038, 3.631297169663439, 3.082209493517963 );
    const newBookShelfCameraRotation = new THREE.Euler( -1.5348675468861763, 1.3213671099535325, 1.533721203640851 );

    const newDeskDoorCameraPosition = new THREE.Vector3( 1.67370327875466, 1.0559968440133867, -6.261741731159207 );
    const newDeskDoorCameraRotation = new THREE.Euler( -0.12484858175236457, 0.14669417639408033, 0.01834229886611553 );

    const newComputerCameraPosition = new THREE.Vector3( -0.09433258455693655, 2.5097418484663296, -8.095565398626269 );
    const newComputerCameraRotation = new THREE.Euler( -0.3179813807862224, -0.013501405671262543, -0.004443831485319126 );

    const newSmallTableCameraPosition = new THREE.Vector3( 6.256499479865508, 2.350458406143151, -8.150087483557986 );
    const newSmallTableCameraRotation = new THREE.Euler( -0.7591234789000862, -0.6469471160292768, -0.5194885702383707 );

    const newVentCameraPosition = new THREE.Vector3( 5.512076571485552, 0.5422294308286899, -4.360901271774213 );
    const newVentCameraRotation = new THREE.Euler( -1.2141057523673702, -1.5450638093971514, -1.2139973980340617 );

    const newTopDownBoxCameraPosition = new THREE.Vector3( 7.034827654881473, 2.7007073874092655, -8.86137344421538 );
    const newTopDownBoxCameraRotation = new THREE.Euler( -1.552946570062933, -0.017249092028839477, -0.7682084630509974 );

    const newControlPanelCameraPosition = new THREE.Vector3( 1.3896542961631408, 3.0458120484571434, -8.908578149082352 );
    const newControlPanelCameraRotation = new THREE.Euler( -0.3677967747132039, 0.0022281911633523313, 0.000858589423393613 );

    const newKeyPadCameraPosition = new THREE.Vector3( 1.6048553172389857, 3.2745764543205977, 10.833313439314118 );
    const newKeyPadCameraRotation = new THREE.Euler( -3.0905092603670345, -0.011627525815059462, -3.140998176381731 );

    const raycaster = new Raycaster();
    const mouse = new Vector2();

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

        // console.log(animations.clips)

        // Current states
        console.log("Camera Lock: ", lockCameraState);
        // console.log("Topboxcover Remove: ", topboxcoverRemove);
        // console.log("boxKeyGet: ", boxKeyGet);
        // console.log("lockKeyGet: ", lockKeyGet);
        // console.log("pliersGet: ", pliersGet);
        // console.log("handSawGet: ", handSawGet);
        // console.log("deskDoorRemove: ", deskDoorRemove);
        // console.log("wrenchGet: ", wrenchGet);
        // console.log("ventRemove: ", ventRemove);
        // console.log("lockUnlocked: ", lockUnlocked);

        // Text position
        // Calculate 3D coordinates in the range of [-1, 1]
        // const x = (event.clientX / size.width) / 2;
        // const y = -(event.clientY / size.height) / 2;

        // Log camera position and intersects
        console.log(intersectsArray)
        console.log(camera.position)
        console.log(camera.rotation)
        console.log(animations);

        // Disable orbit controls
        controlsRef.current.enabled = false

        /**
         * Unlocked actions
         */
        // Unlock lock
        if (intersectsArray.includes('Lock') && lockKeyGet === true) {
            console.log("UNLOCK");
            lock.parent.remove(lock)
            setLockUnlocked(true)
        }
        // Get handsaw
        else if ((intersectsArray.includes('Hand_saw_handle') || intersectsArray.includes('Hand_saw_blade'))) {
            handSaw.parent.remove(handSaw)
            setHandSawGet(true)
            camera.position.copy( newDrawerCameraPosition );
            camera.rotation.copy( newDrawerCameraRotation );
        }
        // Get lock key
        else if (intersectsArray.includes('Key') && ventRemove === true) {
            lockKey.parent.remove(lockKey)
            setLockKeyGet(true)
        }
        // Get wrench
        else if (intersectsArray.includes('body') && deskDoorRemove === true) {
            wrench.parent.remove(wrench)
            setWrenchGet(true)
        }
        // Get red wire
        if (intersectsArray.includes('Loose_red_wire_1'))
        {
            if (!redWireGet) {
                redWire.parent.remove(redWire)
                redWireSocket.parent.remove(redWireSocket)
                setRedWireGet(true)
            }
        }
        // Get blue wire
        if (intersectsArray.includes('Loose_blue_wire_1'))
        {
            if (!blueWireGet) {
                blueWireSocket.parent.remove(blueWireSocket)
                blueWire.parent.remove(blueWire)
                setBlueWireGet(true)
            }
        }
        // Get purple wire
        if (intersectsArray.includes('Loose_purple_wire_1'))
        {
            if (!purpleWireGet) {
                purpleWireSocket.parent.remove(purpleWireSocket)
                purpleWire.parent.remove(purpleWire)
                setPurpleWireGet(true)
            }
        }

        // Open box
        if (intersectsArray.includes('topboxcover') && boxKeyGet) {
            console.log("OPENED BOX");
            topboxcover.parent.remove(topboxcover)
            setTopboxcoverRemove(true)
        }
        // Get pliers
        if (intersectsArray.includes('Cylinder') && intersectsArray.includes('bottom') && topboxcoverRemove)
            {
                if (!pliersGet) {
                    pliers.parent.remove(pliers)
                    setPliersGet(true)
                }
            }
        // Zoom to top of box after cover is removed
        if (intersectsArray.includes('front') && topboxcoverRemove) {
            setCameraState(true)
            camera.position.copy( newTopDownBoxCameraPosition );
            camera.rotation.copy( newTopDownBoxCameraRotation );
        }

        /**
         * Zooms
         */
        // Zoom to table
        if (intersectsArray.includes('Cube002'))
        {
            console.log("Clicked on table");
            setCameraState(true)
            camera.position.copy( newTableCameraPosition )
            camera.rotation.copy( newTableCameraRotation );

            // Get box key
            if (intersectsArray.includes('Circle001'))
            {
                if (!boxKeyGet) {
                    boxKey.parent.remove(boxKey)
                    setBoxKeyGet(true)
                }
            }
        } 
        // Zoom to drawer
        else if (intersectsArray.includes('Cube007'))
        {
            setCameraState(true)
            camera.position.copy( newDrawerCameraPosition );
            camera.rotation.copy( newDrawerCameraRotation );
            if (intersectsArray.includes('Plane005')) {
                // setCurrentAnimation("OpenTopDrawer")
                setCurrentAnimation("Hand SawAction")
            }
        }
        // Zoom to shelf
        else if (intersectsArray.includes('Plane001'))
        {
            setCameraState(true)
            camera.position.copy( newShelfCameraPosition );
            camera.rotation.copy( newShelfCameraRotation );
        }
        // Zoom to plant
        else if (intersectsArray.includes('plant002') || intersectsArray.includes('plant002_2'))
        {
            setCameraState(true)
            camera.position.copy( newPlantCameraPosition );
            camera.rotation.copy( newPlantCameraRotation );
        }
        // Zoom to Sideboard Shelf
        else if (intersectsArray.includes('Sideboard_Shelf1'))
        {
            setCameraState(true)
            camera.position.copy( newSideShelfCameraPosition );
            camera.rotation.copy( newSideShelfCameraRotation );
        }
        // Zoom to chair
        else if (intersectsArray.includes('prop_chair_karlstad'))
        {
            setCameraState(true)
            camera.position.copy( newChairCameraPosition );
            camera.rotation.copy( newChairCameraRotation );
        }
        // Zoom to book shelf
        else if (intersectsArray.includes('Wall_Book_Shelf'))
        {
            setCameraState(true)
            camera.position.copy( newBookShelfCameraPosition );
            camera.rotation.copy( newBookShelfCameraRotation );
        }
        // Zoom to desk door
        else if (intersectsArray.includes('door'))
        {
            setCameraState(true)
            camera.position.copy( newDeskDoorCameraPosition );
            camera.rotation.copy( newDeskDoorCameraRotation );
            if (handSawGet === true) {
                deskDoor.parent.remove(deskDoor)
                setDeskDoorRemove(true)
            } else {
                setTextData({ position: [1, 0.5, -8], rotation: [-0.5, 0, 0], content: "It's locked, \nbut the wood seems weak...", fontSize: 0.05 });
            }
        }
        // Zoom to computer
        else if (intersectsArray.includes('defaultMaterial005'))
        {
            setCameraState(true)
            camera.position.copy( newComputerCameraPosition );
            camera.rotation.copy( newComputerCameraRotation );
        }
        // Zoom to small table
        else if (intersectsArray.includes('Circle008_1') && !topboxcoverRemove)
        {
            setCameraState(true)
            camera.position.copy( newSmallTableCameraPosition );
            camera.rotation.copy( newSmallTableCameraRotation );
        }
        // Zoom to box
        else if (intersectsArray.includes('topboxcover'))
        {
            setCameraState(true)
            camera.position.copy( newTopDownBoxCameraPosition );
            camera.rotation.copy( newTopDownBoxCameraRotation );
            setTextData({ position: [6.56, 1.88, -8.56], 
                rotation: [-0.5*Math.PI, 0, -0.8], 
                content: "It's locked...\nthere's definitely something important in here", 
                fontSize: 0.02 });
        }
        // Zoom to vent
        else if (intersectsArray.includes('Cube016'))
        {
            setCameraState(true)
            camera.position.copy( newVentCameraPosition );
            camera.rotation.copy( newVentCameraRotation );
            if (wrenchGet === true) {
                vent.parent.remove(vent)
                ventBack.parent.remove(ventBack)
                setVentRemove(true)
            }
        }
        // Zoom to control panel
        else if (intersectsArray.includes('Control_Box'))
        {
            setCameraState(true)
            camera.position.copy( newControlPanelCameraPosition );
            camera.rotation.copy( newControlPanelCameraRotation );

            // Place red wire
            if (intersectsArray.includes('Plane010') && redWireGet && pliersGet)
                {   
                    redWireInstalled.visible = true
                }
            // Place blue wire
            if (intersectsArray.includes('Plane012') && blueWireGet && pliersGet)
                {
                    blueWireInstalled.visible = true
                }
            // Place purple wire
            if (intersectsArray.includes('Plane011') && purpleWireGet && pliersGet)
                {
                    purpleWireInstalled.visible = true
                }
        }
        // Zoom to key pad
        else if (intersectsArray.includes('KeyPad'))
        {
            setCameraState(true)
            camera.position.copy( newKeyPadCameraPosition );
            camera.rotation.copy( newKeyPadCameraRotation );

            if (intersectsArray.includes('Num_2'))
            {
                setCurrentAnimation("Press_2")
                setTextData({ position: [0, 4, 11], rotation: [0, Math.PI, 0], content: '2', fontSize: 0.2 });
            }
        }
        // Door Text
        else if (intersectsArray.includes('Cylinder006_5'))
        {
            setTextData({ position: [0, 4, 11], rotation: [0, Math.PI, 0], content: 'The door seems to be locked...', fontSize: 0.2 });
        }
        /**
         * Animations
         */
        // Open pet door
        else if (intersectsArray.includes('Door') && lockUnlocked)
        {
            setCurrentAnimation("DoorAction")
        } else if (intersectsArray.includes('Room') && !lockCameraState) {
            // camera.zoom = 1.2
            controlsRef.current.enabled = true
        }
    }

    // Handle camera state
    const handleKeyDown = (event) => {
        if (event.key === 'Escape') {
            setCameraState(false);
        //   camera.position.copy( cameraResetPosition )
        //   camera.rotation.copy( cameraResetRotation )
          setTextData({ position: [0, 0, 0], rotation: [0, 0, 0], content: '', fontSize: 0.2 });
          console.log("BACK");
        }
      };

    useEffect(() => {
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }, []);

    // Prevent camera from clipping through floor
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

    /**
     * GLTF
     */
    const gltf = useLoader(GLTFLoader, './Room1_version4 (no textures).glb')

    gltf.scene.traverse((object) => {

        // Set loaded mesh objects
        if (object.isMesh) {
            switch (object.name) {
                case 'Circle001':
                  boxKey = object;
                  break;
                case 'Cylinder':
                  pliers = object;
                  break;
                case 'topboxcover':
                  topboxcover = object;
                  break;
                case 'Lock':
                  lock = object;
                  break;
                case 'Hand_saw_handle':
                  handSaw = object;
                  break;
                case 'door':
                  deskDoor = object;
                  break;
                case 'body':
                  wrench = object;
                  break;
                case 'Cube016':
                  vent = object;
                  break;
                case 'Cube016_1':
                  ventBack = object;
                  break;
                case 'Key':
                  lockKey = object;
                  break;
                case 'Loose_red_wire_2':
                  redWire = object;
                  break;
                case 'Loose_red_wire_1':
                  redWireSocket = object;
                  break;
                case 'Loose_blue_wire_2':
                  blueWire = object;
                  break;
                case 'Loose_blue_wire_1':
                  blueWireSocket = object;
                  break;
                case 'Loose_purple_wire_2':
                  purpleWire = object;
                  break;
                case 'Loose_purple_wire_1':
                  purpleWireSocket = object;
                  break;
                case 'Red_Wire_2':
                  redWireInstalled = object;
                  object.visible = false;
                  break;
                case 'Blue_Wire_2':
                  blueWireInstalled = object;
                  object.visible = false;
                  break;
                case 'Purple_Wire_2':
                  purpleWireInstalled = object;
                  object.visible = false;
                  break;
        
            }
        }
    })

    /**
     * Animations
     */

    // Animation controls for Leva
    // const { animationName } = useControls({
    //     animationName: { options: animations.names }
    // })

    useEffect(() =>
    {
        if (currentAnimation !== '') {
            const action = animations.actions[currentAnimation]
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
        }
    }, [currentAnimation])

    return <>
            <primitive
            object={ gltf.scene }
            onClick={ handleClick }
            />
            <OrbitControls ref={controlsRef} enableDamping={true} enableZoom={true} enablePan={true} maxDistance={8} />
            <Text color="white" fontSize={textData.fontSize} position={textData.position} rotation={textData.rotation} text={textData.content}></Text>
            <pointLight color="white" intensity={0.3} position={[0, 0, 0]} />
            <pointLight
                position={[1.65, 5.1, 11]} // Specify the desired position
                color="red" // Set the color to green
                intensity={3} // Adjust the intensity as needed
                distance={5} // Set the distance for falloff
                decay={5} // Set the decay rate
                power={10} // Set the power
            />
        </>
}

