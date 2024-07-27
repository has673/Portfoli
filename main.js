import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Torus

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

const spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(-10, 10, 10);
scene.add(spotLight);

// Helpers

// Uncomment the helpers if needed for debugging
// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

// Function to add stars randomly in the scene
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader().load('./dist/assets/space.jpg');
scene.background = spaceTexture;

// Avatar

const jeffTexture = new THREE.TextureLoader().load('./dist/assets/jeff.jpeg');
const jeff = new THREE.Mesh(
  new THREE.BoxGeometry(15, 10, 6),
  new THREE.MeshBasicMaterial({ map: jeffTexture })
);

jeff.position.set(20, 0, -5);
scene.add(jeff);

// Moon

const moonTexture = new THREE.TextureLoader().load('./dist/assets/moon.jpg');
const normalTexture = new THREE.TextureLoader().load('./dist/assets/normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

moon.position.set(-10, 0, 30);
scene.add(moon);

// Add a spotlight to enhance moon lighting
const moonLight = new THREE.PointLight(0xffffff, 1, 100);
moonLight.position.set(-10, 0, 25);
scene.add(moonLight);

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  jeff.rotation.y += 0.01;
  jeff.rotation.z += 0.01;

  camera.position.z = 30 + t * -0.01;
  camera.position.x = -3 + t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  // Rotate the torus
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  // Rotate the moon
  moon.rotation.x += 0.005;

  // Rotate the stars
  scene.children.forEach((child) => {
    if (child.geometry instanceof THREE.SphereGeometry && child !== moon) {
      child.rotation.x += 0.001;
      child.rotation.y += 0.001;
    }
  });

  // Change background color over time
  const time = Date.now() * 0.0005;
  scene.background = new THREE.Color(`hsl(${(time * 10) % 360}, 50%, 50%)`);

  // Update controls
  controls.update();

  renderer.render(scene, camera);
}

animate();
