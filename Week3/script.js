import * as THREE from "three"

/***********
 ** SCENE **
 **********/
// Canvas - connects js to html
const canvas = document.querySelector('.webgl')

// Scene - like a movie set the actual scene
const scene = new THREE.Scene()
scene.background = new THREE.Color('grey')

// Camera - self explanatory - added into the scene
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
)
scene.add(camera)

camera.position.set(0, 0, 5)
// 5 is closer, -5 is further away on x-axis

// Renderer - draws it internally to the canvas
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

renderer.setSize(window.innerWidth, window.innerHeight)

/************
 ** MESHES **
************/
// testSphere
const sphereGeometry = new THREE.SphereGeometry(1)
const sphereMaterial = new THREE.MeshNormalMaterial()
const testSphere = new THREE.Mesh(sphereGeometry, sphereMaterial)

scene.add(testSphere)

/********************
 ** ANIMATION LOOP **
 *******************/
const clock = new THREE.Clock()
 // Animate
const animation = () =>
{
    // Return elapsedTime
    const elapsedTime = clock.getElapsedTime()
    
    // Animate testSphere
    testSphere.position.z = Math.sin(elapsedTime)
    // best way is to use sine and cosine

    // Renderer - remember these are all variables that have been declared
    renderer.render(scene, camera)

    // Request Next Frame
    window.requestAnimationFrame(animation)
}

animation()