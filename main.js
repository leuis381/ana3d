console.log("🚀 Ana 3D Pro - Experiencia inmersiva cargando...");

const slides = [
  { image: "slide1.jpg", text: "Ana enfrenta un problema diario con los residuos." },
  { image: "slide2.jpg", text: "Preocupada, busca una solución para su cocina." },
  { image: "slide3.jpg", text: "Descubre el tacho inteligente." },
  { image: "slide4.jpg", text: "Este tacho separa automáticamente los residuos." },
  { image: "slide5.jpg", text: "Compacto, ergonómico y perfecto para espacios pequeños." },
  { image: "slide6.jpg", text: "Luces LED indican el estado de cada compartimiento." },
  { image: "slide7.jpg", text: "Se integra con un calendario de reciclaje." },
  { image: "slide8.jpg", text: "Ana ahora recicla con facilidad. ¡Tú también puedes!" }
];

const audios = [];
const listener = new THREE.AudioListener();
const audioLoader = new THREE.AudioLoader();
const camera = new THREE.PerspectiveCamera();
camera.add(listener);

// Crear fondo
const bg = document.createElement('div');
bg.style.position = 'fixed';
bg.style.top = 0;
bg.style.left = 0;
bg.style.width = '100vw';
bg.style.height = '100vh';
bg.style.zIndex = '-1';
bg.style.backgroundSize = 'contain';
bg.style.backgroundRepeat = 'no-repeat';
bg.style.backgroundPosition = 'center';
bg.style.transition = 'opacity 1s ease';
document.body.appendChild(bg);

// Color de fondo detrás del slide (si no cubre todo)
const bgColor = document.createElement('div');
bgColor.style.position = 'fixed';
bgColor.style.top = 0;
bgColor.style.left = 0;
bgColor.style.width = '100vw';
bgColor.style.height = '100vh';
bgColor.style.zIndex = '-2';
bgColor.style.background = '#111'; // tono suave
document.body.appendChild(bgColor);

// Caja de texto animada
const textBox = document.createElement('div');
textBox.style.position = 'absolute';
textBox.style.bottom = '10%';
textBox.style.left = '50%';
textBox.style.transform = 'translateX(-50%)';
textBox.style.color = '#ffffff';
textBox.style.fontSize = '1.8em';
textBox.style.fontFamily = 'Arial, sans-serif';
textBox.style.textAlign = 'center';
textBox.style.padding = '20px 30px';
textBox.style.background = 'rgba(0, 0, 0, 0.5)';
textBox.style.borderRadius = '12px';
textBox.style.opacity = 0;
textBox.style.transition = 'opacity 1s ease, transform 1s ease';
textBox.style.maxWidth = '90vw';
document.body.appendChild(textBox);

// Barra de progreso
const progressBar = document.createElement('div');
progressBar.style.position = 'absolute';
progressBar.style.bottom = '0';
progressBar.style.left = '0';
progressBar.style.height = '5px';
progressBar.style.background = '#00ffff';
progressBar.style.width = '0%';
progressBar.style.transition = 'width 1s ease';
document.body.appendChild(progressBar);

// Precarga de audios
for (let i = 1; i <= 8; i++) {
  const audio = new THREE.Audio(listener);
  audioLoader.load(`audio${i}.mp3`, buffer => {
    audio.setBuffer(buffer);
    audio.setVolume(1);
  });
  audios.push(audio);
}

// Control
let current = 0;
let started = false;

function showSlide(index) {
  const slide = slides[index];
  bg.style.opacity = 0;
  textBox.style.opacity = 0;
  textBox.style.transform = 'translateX(-50%) translateY(20px)';

  setTimeout(() => {
    bg.style.backgroundImage = `url('${slide.image}')`;
    bg.style.opacity = 1;
    textBox.innerText = slide.text;
    textBox.style.opacity = 1;
    textBox.style.transform = 'translateX(-50%) translateY(0)';
    progressBar.style.width = ((index + 1) / slides.length * 100) + "%";

    const sound = audios[index];
    if (sound && sound.buffer) {
      sound.play();
      sound.source.onended = () => setTimeout(() => nextSlide(), 2000);
    } else {
      setTimeout(() => nextSlide(), 10000);
    }
  }, 1000);
}

function nextSlide() {
  current++;
  if (current >= slides.length) current = 0;
  showSlide(current);
}

// Botón de inicio
const startButton = document.createElement('div');
startButton.innerText = "🌱 Conoce cómo ayudamos a Ana a resolver su problema con los residuos";
startButton.style.position = 'absolute';
startButton.style.top = '50%';
startButton.style.left = '50%';
startButton.style.transform = 'translate(-50%, -50%)';
startButton.style.padding = '18px 28px';
startButton.style.background = 'rgba(0,0,0,0.7)';
startButton.style.color = '#00ffff';
startButton.style.fontSize = '22px';
startButton.style.fontFamily = 'Arial, sans-serif';
startButton.style.borderRadius = '12px';
startButton.style.cursor = 'pointer';
startButton.style.zIndex = '999';
startButton.style.boxShadow = '0 0 20px #00ffff';
startButton.style.maxWidth = '90vw';
startButton.style.textAlign = 'center';
startButton.style.lineHeight = '1.4';
startButton.style.fontWeight = 'bold';
document.body.appendChild(startButton);

// Iniciar en clic
startButton.addEventListener('click', () => {
  if (!started) {
    started = true;
    document.body.removeChild(startButton);
    showSlide(current);
  }
});
