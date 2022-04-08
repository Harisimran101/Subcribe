import * as THREE from 'https://cdn.skypack.dev/three@0.136';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.136/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.136/examples/jsm/loaders/GLTFLoader.js';

const webgl = document.querySelector('.webgl');
const width = webgl.offsetWidth;
const height = webgl.offsetHeight;
const progressbar = document.querySelector('.progress-bar');
const allbars = document.querySelectorAll('.bar');

let subscribers = 100;

      
const barpercentage = progressbar.offsetWidth / 100;
console.log(barpercentage)

// LOADING DOTS

anime({
    targets: '.dot',
    opacity: ['0', '1'],
    loop: true,
    delay: function(el,i,l){
        return i * 500;
    },
    endDelay: 0,
  
})
      
const scene = new THREE.Scene();
			const camera = new THREE.PerspectiveCamera( 50, width / height, 0.1, 1000 );
            

    const renderer = new THREE.WebGLRenderer({
         antialias: true,
         canvas: webgl,
         alpha: true
      });
			renderer.setSize( width, height );
     
const spotLight = new THREE.SpotLight( 0xffffff,4 );
spotLight.position.set( 1, 4, 3 );
scene.add(spotLight)

let model;
let diamond;
let mixer;

const loader = new GLTFLoader();
loader.load('model/model.glb', (gltf) =>{
    model = gltf.scene;
   scene.add(model);
    model.scale.set(2.5,2.5,2.5);
   diamond = model.getObjectByName('Cube');

   mixer = new THREE.AnimationMixer( gltf.scene );
   mixer.clipAction( gltf.animations[ 0 ] ).play();
 
})


			camera.position.set(0,0,7) ;
let bar;

for(let i = 0; i < subscribers / 100; i++){
    bar = document.createElement('div');
    bar.classList.add('bar');
    bar.style.background = 'red';

    if(subscribers == "1000"){  
     bar.style.background = 'green';  
     
     }

     else {
        bar.style.background = '#F4D03F';   

      
        bar.style.backgroundImage = "linear-gradient(132deg, #F4D03F 0%, #16A085 100%)";

     }

    progressbar.appendChild(bar)

}




var clock = new THREE.Clock();
let delta = 0;

			function animate() {
				requestAnimationFrame( animate );
              
				if ( mixer ) {
                    mixer.update( clock.getDelta() * 1.2);
                };


				renderer.render( scene, camera );
			};

			animate();