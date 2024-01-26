import * as THREE from "three"

/***********
 ** SCENE **
 **********/
// Canvas - connects js to html
const canvas = document.querySelector('.webgl')

// Scene - like a movie set the actual scene
const scene = new THREE.Scene()
scene.background = new THREE.Color("rgb(29, 31, 68)")

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

// torusKnot

const torusKnotGeometry = new THREE.TorusKnotGeometry(0.4, 0.2, 64, 8, 9, 3)
const torusKnotMaterial = new THREE.MeshNormalMaterial()
const testTorusKnot = new THREE.Mesh(torusKnotGeometry, torusKnotMaterial)
const testTorusKnot2 = new THREE.Mesh(torusKnotGeometry, torusKnotMaterial)

scene.add(testTorusKnot)
scene.add(testTorusKnot2)

/********************
 ** ANIMATION LOOP **
 *******************/
const clock = new THREE.Clock()
 // Animate
const animation = () =>
{
    // Return elapsedTime
    const elapsedTime = clock.getElapsedTime()
    
    // Animating Objects

    //Rotations
    testTorusKnot.rotation.x = elapsedTime
    testTorusKnot.rotation.y = elapsedTime

    testTorusKnot2.rotation.x = elapsedTime
    testTorusKnot2.rotation.y = elapsedTime

    //Scale
    testTorusKnot2.scale.x = Math.sin(elapsedTime)
    testTorusKnot2.scale.y = Math.sin(elapsedTime)
    testTorusKnot2.scale.z = Math.sin(elapsedTime)

    //Positions
    testTorusKnot.position.x = Math.cos(elapsedTime * 1.3)
    testTorusKnot2.position.x = Math.sin(elapsedTime)

    // Renderer - remember these are all variables that have been declared
    renderer.render(scene, camera)

    // Request Next Frame
    window.requestAnimationFrame(animation)
}

animation()