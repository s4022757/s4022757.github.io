/* const button1 = document.getElementById('button1') */
/* audio1.src = 'assets/sword.wav'; */


const container = document.getElementById('container');
const canvas = document.getElementById('canvas1')
const audio1 = document.getElementById('audio1')

canvas.width = window.innerWidth
canvas.height = window.innerHeight
const ctx = canvas.getContext('2d');

let audioSource;
let analyser;
let audioContext;
let initialized = false;

container.addEventListener('click', function(){
    //let audio1 = new Audio('assets/sword.wav');
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    if (!initialized) {
        audio1.src = 'assets/sword.wav'
        audioSource = audioContext.createMediaElementSource(audio1);
        analyser = audioContext.createAnalyser();
        audioSource.connect(analyser);
        analyser.connect(audioContext.destination)

        analyser.fftSize = 64;
        initialized = true;
        animate();
    }

audio1.play();
});

function animate(){
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength)
    const barWidth = canvas.width/bufferLength;

    function draw(){
        let x = 0;
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        analyser.getByteFrequencyData(dataArray);

        for (let i = 0; i < bufferLength; i++){
            let barHeight = dataArray[i];
            ctx.fillStyle = 'white';
            ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight)
            x += barWidth;
        }   
        requestAnimationFrame(animate);
    }
    draw();
}
    //animate();




/*button1.addEventListener('click', function(){
    console.log('click');
    audio1.play();
    audio1.addEventListener('playing', function(){
        console.log('Audio 1 started playing')
    });
    audio1.addEventListener('ended', function(){
        console.log('Audio 1 ended');
    });
});

const button2 = document.getElementById('button2');
button2.addEventListener('click', playSound);
function playSound(){
    const oscillator = audioCtx.createOscillator();
    oscillator.connect(audioCtx.destination)
    oscillator.type = 'sine';
    oscillator.start();
    setTimeout(function (){
        oscillator.stop();
    }, 1000);
     audio1.play(); 
}
*/













/* browser fix from gemini
playBtn.addEventListener('click', () => {
    // This is the "magic" line for cross-browser compatibility
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    togglePlayPause();
});
*/