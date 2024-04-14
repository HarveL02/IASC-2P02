import * as THREE from "three"
import * as dat from "lil-gui"
import { OrbitControls } from "OrbitControls"

/***********
 ** SETUP **
 **********/
// Sizes
const sizes = {
    width: window.innerWidth * 0.4,
    height: window.innerHeight * 0.5,
    aspectRatio: (window.innerWidth * 0.4) / (window.innerHeight * 0.5)
}

/***********
 ** SCENE **
 **********/
// Canvas
const canvas = document.querySelector('.webgl2')

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
camera.position.set(35, 0, 35)
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
 ** LIGHTS **
 ***********/
// Directional Lights
const directionalLight1 = new THREE.DirectionalLight(0x404040, 100)
scene.add(directionalLight1)
directionalLight1.position.set(4,22,12)


/************
 ** MESHES **
 ***********/
// Sphere Geometry
const sphereGeometry = new THREE.BoxGeometry(0.5)

// Sphere Materials
const term1Material = new THREE.MeshStandardMaterial({ color: new THREE.Color('#ffcc66')})
const term2Material = new THREE.MeshStandardMaterial({ color: new THREE.Color('#ff9900')})
const term3Material = new THREE.MeshStandardMaterial({ color: new THREE.Color('#cc3300')})

for (let a = 0; a < 10; a++){
    const test = Math.random()
    console.log(test)
}

const drawSphere = (i, material, position) =>
{
    const sphere = new THREE.Mesh(sphereGeometry, material)
    sphere.position.x = position
    
    //(Math.random() - (position)) * 10
    //sphere.rotation.z = 1.5

    sphere.position.z = (Math.random() - (position/3)) * 10
    sphere.position.y = i - 15

    sphere.randomizer = Math.random()
    

    scene.add(sphere)
}


/***********************
 ** TEXT PARSERS & UI **
 **********************/
let preset = {}

 const uiobj = {
    text: '',
    textArray: [],
    term1: 'jo',
    term2: 'laurie',
    term3: 'amy',
    rotateCamera: false,
    isolateView: false
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

    // Find Term 1
    findTermInParsedText(uiobj.term1, term1Material, 5)

    // Find Term 2
    findTermInParsedText(uiobj.term2, term2Material, 0)

    // Find Term 3
    findTermInParsedText(uiobj.term3, term3Material, -5)

}

const findTermInParsedText = (term, material, position) =>
{
    for (let i = 0; i < uiobj.textArray.length; i++)
    {
        //console.log(i, uiobj.textArray[i])
        if(uiobj.textArray[i] === term)
        {
            //console.log(i, term)
            // convert i into n, which is a value between 0 and 20
            const n = (100 / uiobj.textArray.length) * i * 0.3
            
            // call drawSphere function 5 times using converted n value
            drawSphere(n, material, position)

            
        }
    }

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
    container: document.querySelector('#parent2')
})

// Interaction Folders
    // Spheres Folder
    const spheresFolder = ui.addFolder('Filter Terms')

    spheresFolder
        .add(term1Material, 'visible')
        .name(`${uiobj.term1}`)

    spheresFolder
        .add(term2Material, 'visible')
        .name(`${uiobj.term2}`)

    spheresFolder
        .add(term3Material, 'visible')
        .name(`${uiobj.term3}`)

    spheresFolder
        .add(uiobj, 'isolateView')
        .name('Isolated View')
        

    // Camera Folder
    const cameraFolder = ui.addFolder('Camera')

    cameraFolder
        .add(uiobj, 'rotateCamera')
        .name('Rotate Camera')


/********************
 ** ANIMATION LOOP **
********************/
const clock = new THREE.Clock()
console.log(scene.children)

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
        camera.position.x = Math.sin(elapsedTime * 0.2) * 40
        camera.position.z = Math.cos(elapsedTime * 0.2) * 40

    }

    // Isolate View
    if(uiobj.isolateView)
    {
        camera.position.set(40,0,10)
       for(let i=0; i < scene.children.length; i++)
       {
            if(scene.children[i].position.y < 7)
            {
                scene.children[i].position.x -= 1
            }

       }
    }
    

    // Renderer
    renderer.render(scene, camera)

    // Request Next Frame
    window.requestAnimationFrame(animation)
}

animation()

