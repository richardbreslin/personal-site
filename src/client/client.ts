import * as THREE from '/build/three.module.js'
import { OrbitControls } from '/jsm/controls/OrbitControls'
import { GLTFLoader } from '/jsm/loaders/GLTFLoader'
import Stats from '/jsm/libs/stats.module'

const scene: THREE.Scene = new THREE.Scene()
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

const light = new THREE.SpotLight();
light.position.set(0, 10, 0)
scene.add(light);
light.castShadow = true;
light.intensity = .3
light.color = new THREE.Color(0xff691f)

const lightGit = new THREE.SpotLight();
lightGit.position.set(0, 3, 0)
scene.add(lightGit);
lightGit.color = new THREE.Color(0xff1f1f)
lightGit.castShadow = true;

const light2: THREE.SpotLight = new THREE.SpotLight();


const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.y = 10

const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer()
// renderer.physicallyCorrectLights = true
// renderer.shadowMap.enabled = true
renderer.outputEncoding = THREE.sRGBEncoding
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)

const loader = new GLTFLoader()
loader.load(
    'portfolio2MESHED.glb',
    function (gltf) {
        scene.add(gltf.scene);
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded')
    },
    (error) => {
        console.log(error);
    }
);

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

const stats = Stats()
document.body.appendChild(stats.dom)

var animate = function () {
    requestAnimationFrame(animate)

    controls.update()

    render()

    stats.update()
};

function render() {
    renderer.render(scene, camera)
}
animate();