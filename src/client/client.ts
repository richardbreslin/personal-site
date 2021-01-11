import * as THREE from '/build/three.module.js'
import { OrbitControls } from '/jsm/controls/OrbitControls'
// import Stats from '/jsm/libs/stats.module'


const scene: THREE.Scene = new THREE.Scene()
// const axesHelper = new THREE.AxesHelper(5)
// scene.add(axesHelper)

const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0, 0, 6)


const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer()
renderer.physicallyCorrectLights = true
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputEncoding = THREE.sRGBEncoding
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)

const raycaster = new THREE.Raycaster();

let ISOHEDRON: THREE.Object3D;
let GitHubLogo: THREE.Object3D;
let LinkedInLogo: THREE.Object3D;
let gitAnimate: boolean;
let linkedInAnimate: boolean;
let isoAnimate: boolean;

const loader = new THREE.ObjectLoader();
loader.load(
    "portandisofinal.json",
    function (obj) {
        obj.position.set(0, -7, 0)
        scene.add(obj);
        console.log(obj);
        ISOHEDRON = obj.children[0];
        GitHubLogo = obj.children[1].children[5];
        LinkedInLogo = obj.children[1].children[6];
        animate();
    },

    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');

    },

    function (err) {
        console.error('An error happened');
    }
);


function onMouseMove(event: MouseEvent) {
    const mouse = {
        x: (event.clientX / renderer.domElement.clientWidth) * 2 - 1,
        y: -(event.clientY / renderer.domElement.clientHeight) * 2 + 1
    }

    raycaster.setFromCamera(mouse, camera);

    const intersectsGitHubLogo = raycaster.intersectObject(GitHubLogo, false);
    const intersectsLinkedInLogo = raycaster.intersectObject(LinkedInLogo, false);
    const intersectsIsohedron = raycaster.intersectObject(ISOHEDRON, false);

    (intersectsGitHubLogo.length > 0) ? gitAnimate = true : gitAnimate = false;
    (intersectsLinkedInLogo.length > 0) ? linkedInAnimate = true : linkedInAnimate = false;
    (intersectsIsohedron.length > 0) ? isoAnimate = true : isoAnimate = false;

}

function onClick(event: MouseEvent) {
    const mouse = {
        x: (event.clientX / renderer.domElement.clientWidth) * 2 - 1,
        y: -(event.clientY / renderer.domElement.clientHeight) * 2 + 1
    }
    raycaster.setFromCamera(mouse, camera);

    const intersectsGitHubLogo = raycaster.intersectObject(GitHubLogo, false);
    const intersectsLinkedInLogo = raycaster.intersectObject(LinkedInLogo, false);

    if (intersectsGitHubLogo.length > 0) {
        window.open("https://github.com/richardbreslin")
    }
    if (intersectsLinkedInLogo.length > 0) {
        window.open("https://www.linkedin.com/in/r-breslin/")
    }
}

renderer.domElement.addEventListener('click', onClick, false);
renderer.domElement.addEventListener('mousemove', onMouseMove, false);

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

// const stats = Stats()
// document.body.appendChild(stats.dom)

let isoMove = function () {
    ISOHEDRON.rotation.y += 0.02;
    ISOHEDRON.rotation.z += 0.02;
}

let animate = function () {
    requestAnimationFrame(animate)

    ISOHEDRON.rotation.z += 0.01;
    ISOHEDRON.rotation.y += 0.01;

    (gitAnimate) ? (GitHubLogo.position.y += 0.005) : (GitHubLogo.position.y = 0);
    (linkedInAnimate) ? (LinkedInLogo.position.y += 0.005) : (LinkedInLogo.position.y = 0);
    (isoAnimate) ? isoMove() : null;

    render()
    // stats.update()

};

function render() {
    controls.update()
    renderer.render(scene, camera);
}
window.requestAnimationFrame(render);