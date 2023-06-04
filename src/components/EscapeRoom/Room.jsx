import { useAnimations, useTexture, OrbitControls, Text, useVideoTexture, Html } from '@react-three/drei'
import { useControls } from 'leva'
import { Perf } from 'r3f-perf'
import { useEffect, useRef, useState, Suspense } from 'react'
import { useFrame, useLoader, useThree } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Raycaster, Vector2 } from 'three'
import * as THREE from 'three'
import ParticleSystem from './particles';
import BackButton from './BackButton'

export default function Room({ handleEscape, setIsRoomLoaded })
{
    // Mesh objects
    let boxKey
    let lockKey
    let pliers
    let handSaw
    let topboxcover
    let lock
    let looseBoard
    let wrench
    let redWire
    let blueWire
    let purpleWire
    let redWireSocket
    let blueWireSocket
    let purpleWireSocket
    let redWireInstalled
    let blueWireInstalled
    let purpleWireInstalled
    let galagaStartScreen

    /**
     * Textures
     */

    // const videoRef = useRef(); // Create a ref to hold the video element
    const videoTexture = useVideoTexture('galaga_startscreen (with effects).mp4'); // Load the video texture
    videoTexture.repeat.y = -1  // Flip texture vertically
    videoTexture.offset.y = 1  // Correct texture orientation

    const VideoMaterial = new THREE.MeshStandardMaterial({
        map: videoTexture,
        toneMapped: false
    });

    // const DiffuseTexture = useTexture('path/to/diffuse_texture.png');
    // const MetalnessTexture = useTexture('path/to/metalness_texture.png');
    // const NormalTexture = useTexture('path/to/normal_texture.png');
    // const RoughnessTexture = useTexture('path/to/roughness_texture.png');

    // Chair Karlstad
    // const chairDiffuseTexture = useTexture('Bakes/Chair Karlstad_Bake1_PBR_Diffuse.png');

    // const CustomMaterial = useMemo(() => {
    //   return new THREE.MeshStandardMaterial({
    //     map: diffuseTexture,
    //     metalnessMap: metalnessTexture,
    //     normalMap: normalTexture,
    //     roughnessMap: roughnessTexture,
    //   });
    // }, [diffuseTexture, metalnessTexture, normalTexture, roughnessTexture]);

    // const chairCustomMaterial = useMemo(() => {
    //   return new THREE.MeshStandardMaterial({
    //     map: chairDiffuseTexture,
    //   });
    // }, [chairDiffuseTexture]);

    const gltf = useLoader(GLTFLoader, 'RoomFinal_5 (baked textures).glb', loader => {
      loader.ignoreTextureErrors = true
    })
    const animations = useAnimations(gltf.animations, gltf.scene)
    const controlsRef = useRef()
    const backButtonRef = useRef();
    const [textData, setTextData] = useState({ position: [0, 0, 0], rotation: [0, 0, 0], content: '', fontSize: '0.2' });
    const [galagaText, setGalagaTextData] = useState('')
    const fixedTargetHeight = 0.5;
    const { scene, camera, size } = useThree()

    // Animation states
    const [currentAnimation1, setCurrentAnimation1] = useState('');
    const [currentAnimation2, setCurrentAnimation2] = useState('');
    const [keyAnimation, setKeyAnimation] = useState('');

    // Camera states
    const [drawerCameraState, setDrawerCameraState] = useState(false)
    const [lockCameraState, setCameraState] = useState(false)
    const [woodenCrateCameraState, setWoodenCrateCameraState] = useState(false)
    const [ventCameraState, setVentCameraState] = useState(false)
    const [keyPadCameraState, setKeyPadCameraState] = useState(false)
    const [controlPanelCameraState, setControlPanelCameraState] = useState(false)
    const [arcadeCameraState, setArcadeCameraState] = useState(false)
    const [boxCameraState, setBoxCameraState] = useState(false)

    // Interactions states
    const [boxKeyGet, setBoxKeyGet] = useState(false)
    const [lockKeyGet, setLockKeyGet] = useState(false)
    const [pliersGet, setPliersGet] = useState(false)
    const [handSawGet, setHandSawGet] = useState(false)
    const [wrenchGet, setWrenchGet] = useState(false) 

    const [topboxcoverRemove, setTopboxcoverRemove] = useState(false)
    const [looseBoardRemove, setLooseBoardRemove] = useState(false)
    const [ventRemove, setVentRemove] = useState(false)
    const [lockUnlocked, setLockUnlocked] = useState(false)
    const [boxDoorOpen, setBoxDoorOpen] = useState(false)

    const [redWireGet, setRedWireGet] = useState(false)
    const [blueWireGet, setBlueWireGet] = useState(false)
    const [purpleWireGet, setPurpleWireGet] = useState(false)
    const [redWireInstall, setRedWireInstall] = useState(false)
    const [blueWireInstall, setBlueWireInstall] = useState(false)
    const [purpleWireInstall, setPurpleWireInstall] = useState(false)

    const [exitLight, setExitLight] = useState('red')
    const [exitDoor, setExitDoor] = useState(false)
    const [arcadeLight, setArcadeLight] = useState(false)

    const [galagaScreen, setGalagaScreen] = useState(false)

    const [keyPadCode, setKeyPadCode] = useState('9')
    const [textContent, setTextContent] = useState('')
    const [position, setTextPosition] = useState([0, 0, 0]);
    const [rotation, setTextRotation] = useState([0, 0, 0]);
    const [fontSize, setTextFontSize] = useState(0.02);
    const [backButtonVisible, setBackButtonVisible] = useState(false);

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

    const newWoodenCrateCameraPosition = new THREE.Vector3( 1.67370327875466, 1.0559968440133867, -6.261741731159207 );
    const newWoodenCrateCameraRotation = new THREE.Euler( -0.12484858175236457, 0.14669417639408033, 0.01834229886611553 );

    const newArcadeCabinetCameraPosition = new THREE.Vector3( -0.25433258455693655, 2.5097418484663296, -8.095565398626269 );
    const newArcadeCabinetCameraRotation = new THREE.Euler( -0.3179813807862224, -0.013501405671262543, -0.004443831485319126 );

    const newSmallTableCameraPosition = new THREE.Vector3( 6.256499479865508, 2.350458406143151, -8.150087483557986 );
    const newSmallTableCameraRotation = new THREE.Euler( -0.7591234789000862, -0.6469471160292768, -0.5194885702383707 );

    const newVentCameraPosition = new THREE.Vector3( 6.535606617614529, 1.5261178437031602, -4.376887196434631 );
    const newVentCameraRotation = new THREE.Euler( -1.5694297208914907, -1.0070450275110723, -1.5691795329131764 );

    const newTopDownBoxCameraPosition = new THREE.Vector3( 7.034827654881473, 2.7007073874092655, -8.86137344421538 );
    const newTopDownBoxCameraRotation = new THREE.Euler( -1.552946570062933, -0.017249092028839477, -0.7682084630509974 );

    const newControlPanelCameraPosition = new THREE.Vector3( 1.3896542961631408, 3.0458120484571434, -8.908578149082352 );
    const newControlPanelCameraRotation = new THREE.Euler( -0.3677967747132039, 0.0022281911633523313, 0.000858589423393613 );

    const newKeyPadCameraPosition = new THREE.Vector3( 1.6048553172389857, 3.2745764543205977, 10.833313439314118 );
    const newKeyPadCameraRotation = new THREE.Euler( -3.0905092603670345, -0.011627525815059462, -3.140998176381731 );

    const raycaster = new Raycaster();
    const mouse = new Vector2();

    // Update text data whenever the textContent state changes
    useEffect(() => {
      setTextData({
        position: position,
        rotation: rotation,
        content: textContent,
        fontSize: fontSize,
      });
    }, [textContent]);

    // Hover event handler
    // const highlightColor = 'red'; // Highlight color

    // Event listener for mouse hover
    // const onHover = (event) => {
    //     mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    //     mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    //     raycaster.setFromCamera(mouse, camera);

    //     const intersects = raycaster.intersectObjects(scene.children, true);
    //     let intersectsArray = []
    //     for ( let i = 0; i < intersects.length; i++ ) {
    //       const intersectedObject = intersects[i].object.name
    //       intersectsArray.push(intersectedObject)
    //     }
    //     console.log(intersectsArray);
    // };

    // Event listener for mouse leave
    // const onLeave = (e) => {
    //   meshRef.current.material.color.set(0xffffff); // Reset to original color
    // };
    

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

        // Log camera position and intersects
        // console.log(intersectsArray)
        // console.log(camera.position)
        // console.log(camera.rotation)
        // console.log(animations);

        // Disable orbit controls
        controlsRef.current.enabled = false
        setBackButtonVisible(true)

        switch (true) {
            // Get handsaw
            case intersectsArray.includes('Hand_saw_handle') || intersectsArray.includes('Hand_saw_blade'):
                handSaw.parent.remove(handSaw);
                setHandSawGet(true);
                camera.position.copy(newDrawerCameraPosition);
                camera.rotation.copy(newDrawerCameraRotation);
                break;
            // Get lock key
            case intersectsArray.includes('LockKey') && ventRemove:
                lockKey.parent.remove(lockKey);
                setLockKeyGet(true);
                break;
            // Get box key
            case intersectsArray.includes('BoxKey_1') && boxDoorOpen:
                boxKey.parent.remove(boxKey);
                setBoxKeyGet(true);
                break;
            // Get wrench
            case intersectsArray.includes('WrenchBody') && looseBoardRemove:
                wrench.parent.remove(wrench);
                setWrenchGet(true);
                break;
            // Remove Loose board
            case intersectsArray.includes('Loose_Board') && handSawGet:
                console.log("Removed board");
                looseBoard.visible = false
                setLooseBoardRemove(true);
                break;
            // Get red wire
            case intersectsArray.includes('Loose_red_wire_1'):
                if (!redWireGet) {
                  redWire.parent.remove(redWire);
                  redWireSocket.parent.remove(redWireSocket);
                  console.log("RED WIRE REMOVED")
                  setRedWireGet(true);
                }
                break;
            // Get blue wire
            case intersectsArray.includes('Loose_blue_wire_1'):
                if (!blueWireGet) {
                  blueWireSocket.parent.remove(blueWireSocket);
                  blueWire.parent.remove(blueWire);
                  setBlueWireGet(true);
                }
                break;
            // Get purple wire
            case intersectsArray.includes('Loose_purple_wire_1'):
                if (!purpleWireGet) {
                  purpleWireSocket.parent.remove(purpleWireSocket);
                  purpleWire.parent.remove(purpleWire);
                  setPurpleWireGet(true);
                }
                break;
            // Open box
            case intersectsArray.includes('topboxcover_1') && boxKeyGet:
                setCurrentAnimation1('topboxcoverAction');
                setTopboxcoverRemove(true);
                break;
            // Get pliers
            case intersectsArray.includes('Pliers') || intersectsArray.includes('Right_Plier_3') || intersectsArray.includes('Left_Plier_3') && topboxcoverRemove:
                if (!pliersGet) {
                  pliers.parent.remove(pliers);
                  setPliersGet(true);
                }
                break;
            // Unlock lock
            case intersectsArray.includes('Lock') && lockKeyGet:
                lock.parent.remove(lock);
                setLockUnlocked(true);
                break;
            // Open box door
            case intersectsArray.includes('Cube003') && lockUnlocked:
                setCurrentAnimation1('DoorAction')
                setBoxDoorOpen(true)
                break;
            // Zoom to top of box after cover is removed
            case intersectsArray.includes('front') && topboxcoverRemove:
                setCameraState(true);
                camera.position.copy(newTopDownBoxCameraPosition);
                camera.rotation.copy(newTopDownBoxCameraRotation);
                break;
            // Zoom to table
            case intersectsArray.includes('wooden_table'):
                setCameraState(true);
                camera.position.copy(newTableCameraPosition);
                camera.rotation.copy(newTableCameraRotation);
                if (intersectsArray.includes('BoxKey')) {
                  if (!boxKeyGet) {
                    boxKey.parent.remove(boxKey);
                    setBoxKeyGet(true);
                  }
                }
                break;
            // Zoom to drawer
            case intersectsArray.includes('Drawer_1'):
                setCameraState(true)
                camera.position.copy(newDrawerCameraPosition);
                camera.rotation.copy(newDrawerCameraRotation);
                if (intersectsArray.includes('TopDrawer_1') && drawerCameraState) {
                  setCurrentAnimation1('Hand SawAction');
                  setCurrentAnimation2('OpenTopDrawer');
                }
                setDrawerCameraState(true)
                break;
            // Zoom to shelf
            case intersectsArray.includes('Modern_Shelf_1'):
                setCameraState(true);
                camera.position.copy(newShelfCameraPosition);
                camera.rotation.copy(newShelfCameraRotation);
                break;
            // Zoom to plant
            case intersectsArray.includes('plant002'):
                setCameraState(true);
                camera.position.copy(newPlantCameraPosition);
                camera.rotation.copy(newPlantCameraRotation);
                break;
            // Zoom to Sideboard Shelf
            case intersectsArray.includes('Sideboard_Shelf1'):
                setCameraState(true);
                camera.position.copy(newSideShelfCameraPosition);
                camera.rotation.copy(newSideShelfCameraRotation);
                break;
            // Zoom to chair
            case intersectsArray.includes('prop_chair_karlstad'):
                setCameraState(true);
                camera.position.copy(newChairCameraPosition);
                camera.rotation.copy(newChairCameraRotation);
                break;
            // Zoom to book shelf
            case intersectsArray.includes('Wall_Book_Shelf_1'):
                setCameraState(true);
                camera.position.copy(newBookShelfCameraPosition);
                camera.rotation.copy(newBookShelfCameraRotation);
                break;
            // Zoom to wooden crate
            case intersectsArray.includes('Wooden_Crate'):
                setCameraState(true);
                camera.position.copy(newWoodenCrateCameraPosition);
                camera.rotation.copy(newWoodenCrateCameraRotation);
                if (woodenCrateCameraState && !looseBoardRemove) {
                  setTextData({
                    position: [1.35, 0.28, -8],
                    rotation: [-0.5, 0, 0],
                    content: "Looks like I could saw through this...",
                    fontSize: 0.05,
                  });
                }
                setWoodenCrateCameraState(true);
                break;
            // Zoom to Arcade Cabinet
            case intersectsArray.includes('GalagaScreen') || intersectsArray.includes('Coin-op_Arcade_Game_Cabinet_Galaga_5') 
                                                          || intersectsArray.includes('Coin-op_Arcade_Game_Cabinet_Galaga_4')  && !topboxcoverRemove:
                setCameraState(true);
                camera.position.copy(newArcadeCabinetCameraPosition);
                camera.rotation.copy(newArcadeCabinetCameraRotation);
                if (arcadeCameraState && !galagaScreen) {
                  setTextData({
                    position: [-0.2, 2.5, -9],
                    rotation: [0, 0, 0],
                    content: "It won't turn on...\nLooks like it needs some sort of power source",
                    fontSize: 0.02,
                  });
                } else if (galagaScreen) {
                  galagaStartScreen.material = VideoMaterial;
                  setGalagaTextData({ position: [-0.245, 2.32, -8.805], rotation: [-1.2, 0, 0], content: keyPadCode, fontSize: '0.012' });
                }
                setArcadeCameraState(true)
                break;
            // Zoom to small table
            case intersectsArray.includes('Small_Table_Top') || intersectsArray.includes('Small_Table_Top_1') && !topboxcoverRemove:
                setCameraState(true);
                camera.position.copy(newSmallTableCameraPosition);
                camera.rotation.copy(newSmallTableCameraRotation);
                break;
            // Zoom to box
            case intersectsArray.includes('topboxcover'):
                setCameraState(true);
                camera.position.copy(newTopDownBoxCameraPosition);
                camera.rotation.copy(newTopDownBoxCameraRotation);
                if (boxCameraState) {
                  setTextData({
                    position: [7.1, 1.88, -8.9],
                    rotation: [-0.5 * Math.PI, 0, -0.8],
                    content: "It's locked...\nthere's definitely something important in here",
                    fontSize: 0.02,
                  });
                }
                setBoxCameraState(true)
                break;
            // Zoom to vent
            case intersectsArray.includes('small_vent_1'):
                setCameraState(true);
                camera.position.copy(newVentCameraPosition);
                camera.rotation.copy(newVentCameraRotation);
                if (ventCameraState && wrenchGet) {
                  setCurrentAnimation1('small ventAction');
                  setVentRemove(true);
                } else if (ventCameraState) {
                  setTextData({
                    position: [8, 1.25, -4.35],
                    rotation: [0, -0.5*Math.PI, 0],
                    content: "It won't budge\nlooks like I need something to loosen the screws...",
                    fontSize: 0.05,
                  });
                }
                setVentCameraState(true)
                break;
            // Zoom to control panel
            case intersectsArray.includes('Control_Panel'):
                setCameraState(true);
                camera.position.copy(newControlPanelCameraPosition);
                camera.rotation.copy(newControlPanelCameraRotation);
                if (pliersGet && controlPanelCameraState) {
                  if (intersectsArray.includes('LeftPort') && redWireGet) {
                    setRedWireInstall(true)
                  }
                  // Place blue wire
                  if (intersectsArray.includes('RightPort') && blueWireGet) {
                    setBlueWireInstall(true)
                  }
                  // Place purple wire
                  if (intersectsArray.includes('MiddlePort') && purpleWireGet) {
                    setPurpleWireInstall(true)
                  }
                } else if (controlPanelCameraState && redWireGet || blueWireGet || purpleWireGet) {
                  setTextData({
                    position: [1.35, 2.3, -9.8],
                    rotation: [-0.2*Math.PI, 0, 0],
                    content: "Looks like I still need something to splice these wires together...",
                    fontSize: 0.03,
                  });
                } else if (controlPanelCameraState) {
                  setTextData({
                    position: [1.35, 2.3, -9.8],
                    rotation: [-0.2*Math.PI, 0, 0],
                    content: "Looks like this panel controls the arcade cabinet\n\nI need to find the wires to hook it back up...",
                    fontSize: 0.03,
                  });
                }
                
                setControlPanelCameraState(true)
                break;
            // Zoom to key pad
            case intersectsArray.includes('KeyPad'):
                if (keyPadCameraState) {
                  switch (true) {
                    case intersectsArray.includes('Num_0'):
                        handleNumberButtonClick('0')
                        break;
                    case intersectsArray.includes('Num_1'):
                        handleNumberButtonClick('1')
                        break;
                    case intersectsArray.includes('Num_2'):
                        handleNumberButtonClick('2')
                        break;
                    case intersectsArray.includes('Num_3'):
                        handleNumberButtonClick('3')
                        break;
                    case intersectsArray.includes('Num_4'):
                        handleNumberButtonClick('4')
                        break;
                    case intersectsArray.includes('Num_5'):
                        handleNumberButtonClick('5')
                        break;
                    case intersectsArray.includes('Num_6'):
                        handleNumberButtonClick('6')
                        break;
                    case intersectsArray.includes('Num_7'):
                        handleNumberButtonClick('7')
                        break;
                    case intersectsArray.includes('Num_8'):
                        handleNumberButtonClick('8')
                        break;
                    case intersectsArray.includes('Num_9'):
                        handleNumberButtonClick('9')
                        break;
                    case intersectsArray.includes('Back_Button'):
                        handleNumberButtonClick('<')
                        break;
                    default:
                        break;
                  }
                } else {
                  setCameraState(true);
                  camera.position.copy(newKeyPadCameraPosition);
                  camera.rotation.copy(newKeyPadCameraRotation);
                  setKeyPadCameraState(true)
                }
                break;
            // Door Text
            case intersectsArray.includes('ExitDoor_4'):
                if (exitLight === 'green') {
                  setCurrentAnimation1('ExitAction')
                  setExitDoor(true)
                } else {
                  setTextData({
                    position: [0, 4, 11],
                    rotation: [0, Math.PI, 0],
                    content: 'The door seems to be locked...',
                    fontSize: 0.2,
                  });
                }
                break;
            case intersectsArray.includes('Exit_Screen') && exitDoor:
                handleEscape();
                console.log("You Escaped!");
            // Default case - return to center camera
            default:
                if (!lockCameraState) {
                  controlsRef.current.enabled = true;
                }
                break;
        }
    }

    const handleNumberButtonClick = (number) => {
      setKeyAnimation(`Press_${number}`);
      let newContent = '';
    
      if (number === '<') {
        newContent = textContent.slice(0, -1);
      } else if (textContent.length < 4) {
        newContent = textContent + number;
      }
      setTextPosition([1.608, 3.3, 11])
      setTextRotation([0, Math.PI, 0])
      setTextFontSize(0.01)
      setTextContent(newContent)
    };

    // Handle camera state
    const handleKeyDown = (event) => {
        if (event.key === 'Escape') {
            setCameraState(false);
          //   camera.position.copy( cameraResetPosition )
          //   camera.rotation.copy( cameraResetRotation )
          //   setTextData({ position: [0, 0, 0], rotation: [0, 0, 0], content: '', fontSize: 0.2 });
            setDrawerCameraState(false)
            setKeyPadCameraState(false)
            setWoodenCrateCameraState(false)
            setVentCameraState(false)
            setControlPanelCameraState(false)
            setArcadeCameraState(false)
            setBoxCameraState(false)
            // console.log("BACK");
        }
    };

    useEffect(() => {
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }, []);

    // Handle camera state for back button
    // const handleBackButton = () =>  {
    //   setCameraState(false);
    //   //   camera.position.copy( cameraResetPosition )
    //   //   camera.rotation.copy( cameraResetRotation )
    //   //   setTextData({ position: [0, 0, 0], rotation: [0, 0, 0], content: '', fontSize: 0.2 });
    //   setDrawerCameraState(false)
    //   setKeyPadCameraState(false)
    //   setWoodenCrateCameraState(false)
    //   setVentCameraState(false)
    //   setControlPanelCameraState(false)
    //   setArcadeCameraState(false)
    //   setBoxCameraState(false)
    // };

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

    gltf.scene.traverse((object) => {

        // Set loaded mesh objects
        if (object.isMesh) {
            switch (object.name) {
              case 'BoxKey_1':
                boxKey = object;
                break;
              case 'Pliers':
                pliers = object;
                break;
              case 'Lock':
                lock = object;
                break;
              case 'Hand_saw_handle':
                handSaw = object;
                break;
              case 'Loose_Board':
                looseBoard = object;
                break;
              case 'WrenchBody':
                wrench = object;
                break;
              case 'LockKey':
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
              case 'Red_Wire':
                redWireInstalled = object;
                object.visible = false;
                break;
              case 'Blue_Wire':
                blueWireInstalled = object;
                object.visible = false;
                break;
              case 'Purple_Wire':
                purpleWireInstalled = object;
                object.visible = false;
                break;
              case 'GalagaScreen':
                galagaStartScreen = object; 
                break;
                // case 'prop_chair_karlstad':
                //   object.material = chairCustomMaterial
                //   break;
            }
        }
    })

    // Control box wire states
    if (redWireInstall) {
      // console.log("Installed red wire");
      redWireInstalled.visible = true;
    }
    if (blueWireInstall) {
      // console.log("Installed blue wire");
      blueWireInstalled.visible = true;
    }
    if (purpleWireInstall) {
      // console.log("Installed purple wire");
      purpleWireInstalled.visible = true;
    }
    if (redWireInstall && blueWireInstall && purpleWireInstall && !arcadeLight) {
      setArcadeLight(true);
      setGalagaScreen(true);
    }
    if (galagaScreen) {
      galagaStartScreen.visible = true;
    }

    // Generate random code for keypad
    useEffect(() => {
      const generateRandomString = () => {
        let result = '';
        const characters = '0123456789';
        const length = 4;
  
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          const randomCharacter = characters[randomIndex];
          result += randomCharacter;
        }
        // console.log("Keypad code: ", result);
        return result;
      };
  
      const generatedCode = generateRandomString();
      setKeyPadCode(generatedCode);
    }, []);

    // Control exit light state
    if (textContent === keyPadCode && exitLight !== 'green') {
      setExitLight('green');
    }

    /**
     * Animations
     */

    // Animation controls for Leva
    // const { animationName } = useControls({
    //     animationName: { options: animations.names }
    // })

    useEffect(() =>
    {
      if (currentAnimation1 !== '') {
          const action = animations.actions[currentAnimation1]
          action
              .reset()
              // .fadeIn(0.5)
              .play()
              .setLoop(THREE.LoopOnce, 1)
              .clampWhenFinished = true
          return () =>
          {
              action.fadeOut(0.5)
          }
      }
    }, [currentAnimation1])

    useEffect(() =>
    {
      if (currentAnimation2 !== '') {
          const action = animations.actions[currentAnimation2]
          action
              .reset()
              // .fadeIn(0.5)
              .play()
              .setLoop(THREE.LoopOnce, 1)
              .clampWhenFinished = true
          return () =>
          {
              action.fadeOut(0.5)
          }
      }
    }, [currentAnimation2])

    useEffect(() =>
    {
      if (keyAnimation !== '') {
          const action = animations.actions[keyAnimation]
          action
              .reset()
              // .fadeIn(0.5)
              .play()
              .setLoop(THREE.LoopOnce, 1)
              .clampWhenFinished = false
          return () =>
          {
              action.stop()
          }
      }
    }, [keyAnimation])
 
    return <>
            {/* Add Performance metrics */}
            {/* <Perf position="bottom-left" /> */}
            <primitive
              object={ gltf.scene }
              onClick={ handleClick }
              // onPointerOver={ onHover }
            />
            {/* <BackButton 
              handleBackButton={handleBackButton}
              backButtonVisible={backButtonVisible}
            /> */}
            <OrbitControls ref={controlsRef} enableDamping={true} enableZoom={true} enablePan={false} maxDistance={8} className="POO" />
            <ParticleSystem />
            <Text color="white" fontSize={textData.fontSize} position={textData.position} rotation={textData.rotation} text={textData.content}></Text>
            <Text color="white" font={'galaga.ttf'} fontSize={galagaText.fontSize} position={galagaText.position} rotation={galagaText.rotation} text={galagaText.content}></Text>
            <ambientLight intensity={0.5} />
            <directionalLight castShadow position={ [ 1, 2, 3 ] } intensity={ 1 } shadow-normalBias={ 0.04 } />
            <pointLight color="white" intensity={0.3} position={[0, 0, 0]} />
            {/* Exit Light */}
            <pointLight
                position={[1.65, 5.1, 11]} // Specify the desired position
                color={exitLight} // Set the color
                intensity={6} // Adjust the intensity as needed
                distance={5} // Set the distance for falloff
                decay={5} // Set the decay rate
                power={100} // Set the power
            />
            {/* Arcade Light */}
            <pointLight
                position={[0.2, 2.7, -8.2]} // Specify the desired position
                color={"blue"} // Set the color
                intensity={30} // Adjust the intensity as needed
                distance={3} // Set the distance for falloff
                decay={2} // Set the decay rate
                power={100} // Set the power
                visible={arcadeLight}
            />
        </>
        
}