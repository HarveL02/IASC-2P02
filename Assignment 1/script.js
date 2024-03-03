import * as THREE from "three"
import { OrbitControls } from "OrbitControls"

/***********
 ** SETUP **
 ***********/
// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    aspectRatio: window.innerWidth / window.innerHeight
} 
/***********
 ** SCENE **
 ***********/
// Canvas
const canvas = document.querySelector('.webgl')

// Scene
const scene = new THREE.Scene()

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
    0.1,
    100
)
camera.position.set(8, 3, 7.5)
scene.add(camera)

// Renderer
const renderer = new THREE.WebGL1Renderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/************
 ** MESHES **
 ************/
const caveMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('white'),
    side: THREE.DoubleSide
})

// caveWall
const caveWallGeometry = new THREE.PlaneGeometry(10, 5)
const caveWall = new THREE.Mesh(caveWallGeometry, caveMaterial)

caveWall.rotation.y = Math.PI * 0.5
caveWall.position.set(-5, 0, 0)
caveWall.receiveShadow = true
scene.add(caveWall)

// barrierWall
const barrierWallGeometry = new THREE.PlaneGeometry(10, 2)
const barrierWall = new THREE.Mesh(barrierWallGeometry, caveMaterial)

barrierWall.rotation.y = Math.PI * 0.5
barrierWall.position.set(5, -1.5, 0)
scene.add(barrierWall)

// caveFloor
const caveFloorGeometry = new THREE.PlaneGeometry(10, 10)
const caveFloor = new THREE.Mesh(caveFloorGeometry, caveMaterial)

caveFloor.rotation.x = Math.PI * 0.5
caveFloor.position.set(0, -2.5, 0)
scene.add(caveFloor)

// OBJECTS

// Pacman
const pacmanGeometry = new THREE.SphereGeometry(1, 32, 16, 0, 4.7)
const pacmanMaterial = new THREE.MeshNormalMaterial()
const pacman = new THREE.Mesh(pacmanGeometry, pacmanMaterial)

pacman.position.set(6, 1.5, 2)
pacman.castShadow = true
pacman.rotation.z = Math.PI * 0.54
pacman.rotation.x = Math.PI * 0.2

scene.add(pacman)

// Food Pellet
const pelletGeometry = new THREE.CapsuleGeometry(0.1, 0.2)
const pelletMaterial = new THREE.MeshNormalMaterial()
const pellet = new THREE.Mesh(pelletGeometry, pelletMaterial)

pellet.position.set(6, 1.5, -1.3)
pellet.castShadow = true
pellet.rotation.x = Math.PI * 0.5

scene.add(pellet)

// SUN
const sunGeometry = new THREE.SphereGeometry()
const sunMaterial = new THREE.MeshLambertMaterial({
    emissive: new THREE.Color('orange'),
    emissiveIntensity: 20
})
const sun = new THREE.Mesh(sunGeometry, sunMaterial)
scene.add(sun)

/************
 ** LIGHTS **
 ************/

// Directional Light (Default Pointing down, values of color and intensity)
const directionalLight = new THREE.DirectionalLight(
    new THREE.Color('white'),
    0.5
)
directionalLight.target = caveWall
directionalLight.position.set(10.7, 1.5, 0)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.width = 1024
directionalLight.shadow.mapSize.height = 1024
scene.add(directionalLight)


/**********************
 ** DOM INTERACTIONS **
 *********************/
 // domObject
 const domObject = {
    part: 1,
    firstChange: false,
    open: false,
    secondChange: false,
    thirdChange: false,
    fourthChange: false
 }
 
 // Continue Reading
 document.querySelector('#continue-reading').onclick = function() {
    document.querySelector('#part-two').classList.remove('hidden')
    document.querySelector('#part-one').classList.add('hidden')
    domObject.part = 2
 }

 // Restart
 document.querySelector('#restart').onclick = function() {
    document.querySelector('#part-two').classList.add('hidden')
    document.querySelector('#part-one').classList.remove('hidden')
    domObject.part = 1

    // reset
    domObject.closed = false
    domObject.open = false
    domObject.moveRight = false
    domObject.sunMoves = false
    domObject.pacRotate = false

    // reset sun position
    directionalLight.position.set(10.7, 1.8, 0)

    // reset pacman position + rotation
    pacman.position.set(6, 1.5, 2)
    pacman.rotation.z = Math.PI * 0.54

    // reset pellet position
    pellet.position.set(6, 1.5, -1.3)
 }

 
 // Closed
 document.querySelector('#closed').onclick = function() {
    domObject.closed = true
 }

 // open
 document.querySelector('#open').onclick = function() {
    domObject.open = true
 }

 // Move right
 document.querySelector('#move-right').onclick = function() {
    domObject.moveRight = true
 }

 // Sun Moves
 document.querySelector('#sun-moves').onclick = function() {
    domObject.sunMoves = true
 }

 // Pac Rotates
 document.querySelector('#pac-rotate').onclick = function() {
    domObject.pacRotate = true
 }

/********************
 ** ANIMATION LOOP **
 ********************/
 const clock = new THREE.Clock()

 // Animate
const animation = () =>
{
    // Return elapsedTime
    const elapsedTime = clock.getElapsedTime()

    // Update Sun position to match directionalLight position
    sun.position.copy(directionalLight.position)

    // Controls
    controls.update()


    // DOM INTERACTIONS
    // part 1
    if(domObject.part === 1){
        camera.position.set(1.1, 0.3, 1.3)
        camera.lookAt(-5, 0, 1.3)
    }

    // part 2
    if(domObject.part === 2){
        camera.position.set(14.3, 4.1, 10.2)
        camera.lookAt(0, 0, 0)
    }

    // closed
    if(domObject.closed){
        pacman.rotation.z = Math.PI * 1
        pellet.position.copy(pacman.position)
    }

    // open
    if(domObject.open){
        pacman.rotation.z = Math.PI * 0.54
    }

    // move-right
    if(domObject.moveRight){
        pacman.position.z = Math.sin(elapsedTime) * 2
        
    }

    // sun-moves
    if(domObject.sunMoves){
        directionalLight.position.z = Math.sin(elapsedTime) * 2
        pellet.position.set(6, 1.5, -1.3)
        pacman.position.z = 0
    }

    // pac-rotate
    if(domObject.pacRotate){
        pacman.rotation.z = elapsedTime
    }

    // Renderer
    renderer.render(scene, camera)

    // Request next frame
    window.requestAnimationFrame(animation)
}

animation()