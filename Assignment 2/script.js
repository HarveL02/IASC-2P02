import * as THREE from "three"
import * as dat from "lil-gui"
import { OrbitControls } from "OrbitControls"

/***********
 ** SETUP **
 **********/
// Sizes
const sizes = {
    width: window.innerWidth * 0.5,
    height: window.innerHeight * 0.5,
    aspectRatio: (window.innerWidth * 0.5) / (window.innerHeight * 0.5)
}

/***********
 ** SCENE **
 **********/
// Canvas
const canvas = document.querySelector('.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color('gray')

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
    0.1,
    100
)
camera.position.set(0, 0, 20)
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)

// Orbit Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true


/************
 ** MESHES **
 ***********/

// TorusKnot
const torusKnotGeometry = new THREE.TorusKnotGeometry(2, 0.7)
const torusKnotMaterial = new THREE.MeshStandardMaterial()

const torusKnot = new THREE.Mesh(torusKnotGeometry, torusKnotMaterial)
scene.add(torusKnot)

/************
 ** LIGHTS **
 ***********/

// Directional Lights

// Generating Directional Lights for each term and setting placeholder intensity of 0

const directionalLight1 = new THREE.DirectionalLight(0x66ff99, 0)
directionalLight1.position.x = 5
directionalLight1.position.y = 5

const directionalLight2 = new THREE.DirectionalLight(0x99ccff, 0)
directionalLight2.position.x = -5
directionalLight2.position.y = 5

const directionalLight3 = new THREE.DirectionalLight(0xff66cc, 0)
directionalLight3.position.x = -5
directionalLight3.position.y = -5

const directionalLight4 = new THREE.DirectionalLight(0xffff66, 0)
directionalLight4.position.x = 5
directionalLight4.position.y = -5



/***********************
 ** TEXT PARSERS & UI **
 **********************/
let preset = {}

 const uiobj = {
    text: '',
    textArray: [],
    term1: 'jo',
    term2: 'beth',
    term3: 'amy',
    term4: 'meg',
    rotateCamera: false,
    animateTorusKnot: false
}



// Text Parsers


// Parse Text and Terms
const parseTextandTerms = () =>
{
    // Strip periods and downcase text
    const parsedText = uiobj.text.replaceAll(".", "").toLowerCase()

    // Tokenize Text
    uiobj.textArray = parsedText.split(/[^\w']+/)


    // Determine the total instances of each term and assign them to light intensity value
    //Term 1
    directionalLight1.intensity = findTermInParsedText(uiobj.term1)

    //Term 2
    directionalLight2.intensity = findTermInParsedText(uiobj.term2)

    //Term 3
    directionalLight3.intensity = findTermInParsedText(uiobj.term3)

    //Term 4
    directionalLight4.intensity = findTermInParsedText(uiobj.term4)

    scene.add(directionalLight1, directionalLight2, directionalLight3, directionalLight4)

 }



const findTermInParsedText = (term) =>
{
    let count = 0
    for (let i = 0; i < uiobj.textArray.length; i++)
    {
        if(uiobj.textArray[i] === term)
        {
            ++count
        }
    }
    let value = count / 200
    console.log(count)
    console.log(value)
    return value
}

// Load Source Text
fetch("https://raw.githubusercontent.com/ajbc/timesig/master/static/docs/little-women.txt")
    .then(response => response.text())
    .then((data) =>
    {
        uiobj.text = data
        parseTextandTerms()       
    }
    )

    

// UI
const ui = new dat.GUI({
    container: document.querySelector('#parent1')
})

// Interaction Folders
    // TorusKnot Folder
    const torusKnotFolder = ui.addFolder('Filter Terms')

    torusKnotFolder
        .add(directionalLight1, 'visible')
        .name(`${uiobj.term1}`)

    torusKnotFolder
        .add(directionalLight2, 'visible')
        .name(`${uiobj.term2}`)

    torusKnotFolder
        .add(directionalLight3, 'visible')
        .name(`${uiobj.term3}`)

    torusKnotFolder
        .add(directionalLight4, 'visible')
        .name(`${uiobj.term4}`)

    torusKnotFolder
        .add(uiobj, 'animateTorusKnot')
        .name('Animate Object')
    

    // Camera Folder
    const cameraFolder = ui.addFolder('Camera')

    cameraFolder
        .add(uiobj, 'rotateCamera')
        .name('Rotate Camera')



/********************
 ** ANIMATION LOOP **
********************/
const clock = new THREE.Clock()

// Animate
const animation = () =>
{
    // Return elapsedTime
    const elapsedTime = clock.getElapsedTime()

    // Orbit Controls
    controls.update()

    // Camera Rotation
    if(uiobj.rotateCamera)
    {
        camera.position.x = Math.sin(elapsedTime * 0.2) * 20
        camera.position.z = Math.cos(elapsedTime * 0.2) * 20

    }

    // Animate Torus Knot
    if(uiobj.animateTorusKnot)
    {
        torusKnot.rotation.x = elapsedTime
        torusKnot.rotation.y = elapsedTime
    }

    // Renderer
    renderer.render(scene, camera)

    // Request Next Frame
    window.requestAnimationFrame(animation)
}

animation()

