var images = [];
var container, controls, camera, renderer, scene, light,


rotationSpeed = 0.1,
clock = new THREE.Clock(),
WIDTH = window.innerWidth +10,
HEIGHT = window.innerHeight+50;
//-- usage --//
     
//cam vars
var angle = 1,
aspect = WIDTH / HEIGHT,
near = 0.1,
far = 10000000;


var origin = new Array ( );



origin[0] = new Array (   40732.740786937065, -67981.83097049118, -44208.591595794525);//



var origin_n = Math.floor((Math.random() * origin.length) + 0);

//origin_n=1;

var wiews = new Array ( );

wiews[0] = new Array ( -84299 , 29328 , 16390);//
wiews[1] = new Array (5370.961947081386, 88691.17881009095, -6808.257652735666 );




var wiews_n = Math.floor((Math.random() * wiews.length) + 0);
//wiews_n=5;





var position = { x : origin[origin_n][0], y: origin[origin_n][1] , z:origin[origin_n][2] };
var target = { x : wiews[wiews_n][0], y: wiews[wiews_n][1] , z:wiews[wiews_n][2] };


    var dx = position.x - target.x;
    var dy = position.y - target.y;
    var dz = position.z - target.z;

    distance = Math.sqrt( dx * dx + dy * dy + dz * dz );

console.log(position);
console.log(target);
console.log(distance/100);

var tween = new TWEEN.Tween(position).to(target, 7000);


tween.easing(TWEEN.Easing.Quadratic.Out);
tween.delay(100);


//mesh vars
var earthMesh, Atmos, AtmosMat;
       
    container = document.createElement('div');
    document.body.appendChild(container);
                
    //cam
    camera = new THREE.PerspectiveCamera(angle, aspect, near, far);
    
                
     //scene
    scene = new THREE.Scene();
    camera.lookAt(1000, 0, 0);
                 
            
    //light          
    light = new THREE.SpotLight(0xffffff, 1, 0, Math.PI / 2, 27);
    light.position.set(-8000, 8000, 8000);
    light.target.position.set (0,0, 0);
    light.castShadow = true;
   

    scene.add(light);

    //EARTH
    var earthGeo = new THREE.SphereGeometry (900, 400, 400),
        earthMat = new THREE.MeshPhongMaterial();
    earthMesh = new THREE.Mesh(earthGeo, earthMat);
                
    earthMesh.position.set(-100, 0,0);
    earthMesh.rotation.y=5;
    scene.add(earthMesh);
                
    //diffuse
    

            if (anno<2016) {
                earthMat.map = THREE.ImageUtils.loadTexture('images/texture/drawn_'+(+anno+1)+'.jpg')
            }
            else
                earthMat.map = THREE.ImageUtils.loadTexture('images/texture/drawn_'+(1972)+'.jpg')

            if (anno>1972) {
                earthMat.map = THREE.ImageUtils.loadTexture('images/texture/drawn_'+(+anno-1)+'.jpg')
            }
            else
                earthMat.map = THREE.ImageUtils.loadTexture('images/texture/drawn_'+(2016)+'.jpg')
        
        earthMat.map = THREE.ImageUtils.loadTexture('images/texture/drawn_'+anno+'.jpg');
    //bump
    earthMat.bumpMap = THREE.ImageUtils.loadTexture('images/hd-bump-map.jpg');
    earthMat.bumpScale = 2;

               
    earthMesh.castShadow = false;
    earthMesh.receiveShadow = true;
       


    tween.start();  
        
                
    //renderer
    renderer = new THREE.WebGLRenderer({antialiasing : true});

    renderer.setSize(WIDTH, HEIGHT);
                
    container.appendChild(renderer.domElement);


    //controls
    controls = new THREE.OrbitControls( camera, renderer.domElement);
    controls.addEventListener( 'change', render );
    

    window.addEventListener('resize', onWindowResize, false );


   document.getElementById("plus").addEventListener("click", plus);
   document.getElementById("minus").addEventListener("click", minus);


tween.onUpdate(function(){

    camera.position.set( position.x,  position.y,  position.z);

});

 function minus()

        {
        
            if (anno>1972) {
                anno=anno-1;

            }
            else{

                anno=2016;
            }


            if (anno>1972) {
                earthMat.map = THREE.ImageUtils.loadTexture('images/texture/drawn_'+(+anno-1)+'.jpg')
            }
            else
                earthMat.map = THREE.ImageUtils.loadTexture('images/texture/drawn_'+(2016)+'.jpg')




        year.innerHTML= 'Landsat global coverage '+bottoni[0]+anno+bottoni[1];
        earthMat.map = THREE.ImageUtils.loadTexture('images/texture/drawn_'+(+anno-1)+'.jpg');
        earthMat.map = THREE.ImageUtils.loadTexture('images/texture/drawn_'+anno+'.jpg');
        document.getElementById("plus").addEventListener("click", plus);
        document.getElementById("minus").addEventListener("click", minus);

    }

     function plus()

        {
        
            if (anno<2016) {
                anno=anno+1;
            
            }
            else{
                anno=1972;
               
            }



        year.innerHTML= 'Landsat global coverage '+bottoni[0]+anno+bottoni[1];
        ;
        earthMat.map = THREE.ImageUtils.loadTexture('images/texture/drawn_'+anno+'.jpg');
        document.getElementById("plus").addEventListener("click", plus);
        document.getElementById("minus").addEventListener("click", minus);
   
    }


    function getPosition(event)

        {
          var cursorX = event.x;
          var cursorY = event.y;
        
        if (cursorX>window.innerWidth / 2){

            if (anno<2016) {
                anno=anno+1;
            }
            else{
                anno=1972;
            }

        }
        else{

    
            if (anno>1972) {
                anno=anno-1;
            }
            else{
                anno=2016;
            }
        }
        year.innerHTML= 'Landsat global coverage '+anno+bottoni;
        earthMat.map = THREE.ImageUtils.loadTexture('images/texture/drawn_'+anno+'.jpg');
    }

    function onWindowResize() {

                windowHalfX = window.innerWidth / 2;
                windowHalfY = window.innerHeight / 2;

                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();

                renderer.setSize( window.innerWidth, window.innerHeight );



            }


      function animate(){
        TWEEN.update();
        
        requestAnimationFrame(animate);

        

        controls.update();

        

        render(); 
        //to find new POW
        //console.log(camera.position);   
      }
            
      function render(){
        var delta = clock.getDelta();
        

		earthMesh.rotation.y += rotationSpeed * delta;
        renderer.clear();
        renderer.render(scene, camera); 
      }

animate();




