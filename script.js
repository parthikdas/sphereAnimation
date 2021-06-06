import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';
//import * as dat from 'https://unpkg.com/dat.gui@0.7.7/build/dat.gui.module.js';
// Debug
//const gui = new dat.GUI()
//setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#webgl'),
    antialias: true,
    alpha: true
});
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.set(0, 0 ,2);
renderer.render(scene, camera);
//window resizing
window.addEventListener('resize',() => {//if window is resized this will take care
    // Update camera
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    // Update renderer
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
});
//Lighting
const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.set(2, 3, 4);
const pointLight2 = new THREE.PointLight(0xff0000, 10)
pointLight2.position.set(-1.86, 1, -1.65);//to put in the left corner by default
const pointLight3 = new THREE.PointLight(0xe1ff, 6.8)
pointLight3.position.set(2.13, -3, -1.98);
scene.add(pointLight, pointLight2, pointLight3);
//GUI
// const light1 = gui.addFolder('Light 1');//to make lights in separate folders
// light1.add(pointLight2.position, 'y').min(-3).max(3).step(0.01);//min max makes that slider
// light1.add(pointLight2.position, 'x').min(-6).max(6).step(0.01);
// light1.add(pointLight2.position, 'z').min(-3).max(3).step(0.01);
// light1.add(pointLight2, 'intensity').min(0).max(10).step(0.01);
// const light2 = gui.addFolder('Light 2');
// light2.add(pointLight3.position, 'y').min(-3).max(3).step(0.01);
// light2.add(pointLight3.position, 'x').min(-6).max(6).step(0.01);
// light2.add(pointLight3.position, 'z').min(-3).max(3).step(0.01);
// light2.add(pointLight3, 'intensity').min(0).max(10).step(0.01);
// const light2Color = {
//     color: 0xff0000
// }
// light2.addColor(light2Color, 'color').onChange(()=>{//thats how you change color
//     pointLight3.color.set(light2Color.color)
// })
//Objects
const sphere = new THREE.Mesh(
    new THREE.SphereBufferGeometry(.6, 64, 64),
    new THREE.MeshStandardMaterial( {
        color: 0x292929,
        metalness: 0.7,
        roughness: 0.2,
        normalMap: new THREE.TextureLoader().load('NormalMap.png')
    } )
);
scene.add(sphere);
//Animation
document.addEventListener('mousemove', onDocumentMouseMove)
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;
const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;
function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX);
    mouseY = (event.clientY - windowHalfY);
}

window.addEventListener('scroll', () => {//update sphere, parallax effect
    sphere.position.y = window.scrollY * .001;// multiplied with small number so that not too much goes above
});

const clock = new THREE.Clock();
const animate = function () {
    requestAnimationFrame( animate );//a mechanism that tells the browser u want to perform an animation
    const elapsedTime = clock.getElapsedTime();
    targetX = mouseX * 0.001;
    targetY = mouseY * 0.001;
    sphere.rotation.y += .5 * elapsedTime;
    sphere.rotation.y += .5 * (targetX - sphere.rotation.y);
    sphere.rotation.x += .5 * (targetY - sphere.rotation.x);
    sphere.position.z += .5 * (targetY - sphere.rotation.x);//this makes the coming near and going far effect
    renderer.render( scene, camera );
};
animate();