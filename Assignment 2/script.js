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
/*
 // Cube Geometry
const cubeGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)

// Cube Materials
const redMaterial = new THREE.MeshStandardMaterial({ color: new THREE.Color('red')})
const greenMaterial = new THREE.MeshStandardMaterial({ color: new THREE.Color('green')})
const blueMaterial = new THREE.MeshStandardMaterial({ color: new THREE.Color('blue')})

const drawCube = (i, material) =>
{
    const cube = new THREE.Mesh(cubeGeometry, material)
    cube.position.x = (Math.random() - 0.5) * 10
    cube.position.z = (Math.random() - 0.5) * 10
    cube.position.y = i - 10

    cube.rotation.x = Math.random() * 2 * Math.PI
    cube.rotation.y = Math.random() * 2 * Math.PI
    cube.rotation.z = Math.random() * 2 * Math.PI

    scene.add(cube)
}
*/

// TorusKnot
const torusKnotGeometry = new THREE.TorusKnotGeometry(2, 0.7)
const torusKnotMaterial = new THREE.MeshStandardMaterial()

const torusKnot = new THREE.Mesh(torusKnotGeometry, torusKnotMaterial)
scene.add(torusKnot)



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
    //console.log(parsedText)

    // Tokenize Text
    uiobj.textArray = parsedText.split(/[^\w']+/)
    //console.log(uiobj.textArray)

/* 
    // Find Term 1
    const term1Value = findTermInParsedText(uiobj.term1)

    // Find Term 2
    const term2Value = findTermInParsedText(uiobj.term2)

    // Find Term 3
    const term3Value = findTermInParsedText(uiobj.term3)

    // Find Term 4
    const term4Value = findTermInParsedText(uiobj.term4)



    const directionalLight1 = new THREE.DirectionalLight(0x66ff99, findTermInParsedText(uiobj.term1))
    directionalLight1.position.x = 5
    directionalLight1.position.y = 5

    const directionalLight2 = new THREE.DirectionalLight(0x99ccff, findTermInParsedText(uiobj.term2))
    directionalLight2.position.x = -5
    directionalLight2.position.y = 5

    const directionalLight3 = new THREE.DirectionalLight(0xff66cc, findTermInParsedText(uiobj.term3))
    directionalLight3.position.x = -5
    directionalLight3.position.y = -5

    const directionalLight4 = new THREE.DirectionalLight(0xffff66, findTermInParsedText(uiobj.term4))
    directionalLight4.position.x = 5
    directionalLight4.position.y = -5

    scene.add(directionalLight1, directionalLight2, directionalLight3, directionalLight4)
*/
 }

// we want it to spit out how many times the term appears
// have function return count value
// 

const findTermInParsedText = (term) =>
{
    let count = 0
    for (let i = 0; i < uiobj.textArray.length; i++)
    {
        //console.log(i, uiobj.textArray[i])
        if(uiobj.textArray[i] === term)
        {
            ++count
            //console.log(count)
            // convert i into n, which is a value between 0 and 20
            //const n = (100 / uiobj.textArray.length) * i * 0.2
            
            // call drawCube function 5 times using converted n value
            /*for (let a = 0; a < 5; a++)
            {
                drawCube(n, material)
            }*/  
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

    
/************
 ** LIGHTS **
 ***********/

// Generating Values for the presence of each term

// Find Term 1
const term1Value = findTermInParsedText(uiobj.term1)
console.log("success")

// Find Term 2
const term2Value = findTermInParsedText(uiobj.term2)

// Find Term 3
const term3Value = findTermInParsedText(uiobj.term3)

// Find Term 4
const term4Value = findTermInParsedText(uiobj.term4)

// Directional Lights
//const directionalLight = new THREE.DirectionalLight(0x404040, 100)
//scene.add(directionalLight)


// Generating Directional Lights for each term and specifying intensity/colour

const directionalLight1 = new THREE.DirectionalLight(0x66ff99, term1Value)
directionalLight1.position.x = 5
directionalLight1.position.y = 5

const directionalLight2 = new THREE.DirectionalLight(0x99ccff, term2Value)
directionalLight2.position.x = -5
directionalLight2.position.y = 5

const directionalLight3 = new THREE.DirectionalLight(0xff66cc, term3Value)
directionalLight3.position.x = -5
directionalLight3.position.y = -5

const directionalLight4 = new THREE.DirectionalLight(0xffff66, term4Value)
directionalLight4.position.x = 5
directionalLight4.position.y = -5

scene.add(directionalLight1, directionalLight2, directionalLight3, directionalLight4)



// Helpers
const helper1 = new THREE.DirectionalLightHelper(directionalLight1)
const helper2 = new THREE.DirectionalLightHelper(directionalLight2)
const helper3 = new THREE.DirectionalLightHelper(directionalLight3)
const helper4 = new THREE.DirectionalLightHelper(directionalLight4)
scene.add(helper1, helper2, helper3, helper4)




// UI
const ui = new dat.GUI({
    container: document.querySelector('#parent1')
})

// Interaction Folders
    // Cubes Folder
    const cubesFolder = ui.addFolder('Filter Terms')

    cubesFolder
        .add(directionalLight1, 'visible')
        .name(`${uiobj.term1}`)

    cubesFolder
        .add(greenMaterial, 'visible')
        .name(`${uiobj.term2}`)

    cubesFolder
        .add(blueMaterial, 'visible')
        .name(`${uiobj.term3}`)

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

    // Renderer
    renderer.render(scene, camera)

    // Request Next Frame
    window.requestAnimationFrame(animation)
}

animation()

