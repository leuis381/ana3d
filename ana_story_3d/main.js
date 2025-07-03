// Escena y cámara
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(0, 1.6, 5);

// Render
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Luz ambiental
const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

// Holograma TextMaterial
const createTextMesh = (text, font) => {
  const geometry = new THREE.TextGeometry(text, {
    font: font,
    size: 0.3,
    height: 0.02,
  });
  const material = new THREE.MeshBasicMaterial({
    color: 0x00ffff,
    transparent: true,
    opacity: 0.8,
  });
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
};

// Planos con imágenes
const loader = new THREE.TextureLoader();
const imagePlanes = [];
for (let i = 1; i <= 8; i++) {
  const texture = loader.load('assets/images/slide' + i + '.jpg');
  const material = new THREE.MeshBasicMaterial({ map: texture });
  const geometry = new THREE.PlaneGeometry(4, 2.5);
  const plane = new THREE.Mesh(geometry, material);
  plane.position.set(0, 1.5, -i * 8); // Z negativo para crear profundidad
  imagePlanes.push(plane);
  scene.add(plane);
}

// Audio
const listener = new THREE.AudioListener();
camera.add(listener);
const audioLoader = new THREE.AudioLoader();
const slideAudios = [];
for (let i = 1; i <= 8; i++) {
  const sound = new THREE.PositionalAudio(listener);
  audioLoader.load('assets/audios/audio' + i + '.mp3', buffer => {
    sound.setBuffer(buffer);
    sound.setRefDistance(10);
  });
  imagePlanes[i - 1].add(sound);
  slideAudios.push(sound);
}

// Texto holograma
const fontLoader = new THREE.FontLoader();
fontLoader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function(font) {
  const texts = [
    "1. El problema",
    "2. Conoce a Ana",
    "3. Solución inteligente",
    "4. Cómo funciona",
    "5. Compacto y ergonómico",
    "6. Luces LED intuitivas",
    "7. Calendario integrado",
    "8. Impacto en la comunidad"
  ];
  texts.forEach((txt, i) => {
    const textMesh = createTextMesh(txt, font);
    textMesh.position.set(-1.8, 3.5, -i * 8);
    scene.add(textMesh);
  });
});

// Animación automática entre escenas
let currentSlide = 0;
function animateCamera() {
  const targetZ = -currentSlide * 8;
  gsap.to(camera.position, {
    z: targetZ + 5,
    duration: 1.5,
    ease: "power2.inOut",
    onStart: () => {
      slideAudios.forEach(a => { a.stop && a.stop(); });
      if (slideAudios[currentSlide].isPlaying) slideAudios[currentSlide].stop();
      slideAudios[currentSlide].play();
    }
  });
  currentSlide = (currentSlide + 1) % imagePlanes.length;
}

setInterval(animateCamera, 10000); // Cambia de escena cada 10 segundos

// Loop de render
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
