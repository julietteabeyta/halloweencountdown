import React, { Component } from 'react';
import './style.scss';
import Skull from './craneo.OBJ'

import * as THREE from 'three';
import * as OBJLoader from 'three-obj-loader';
import * as OrbitControls from 'three-orbitcontrols';

OBJLoader(THREE);

class App extends Component {

  state = {
    timeUntil: '',
    obj: null,
  }

  componentDidMount() {
    setInterval(() => {
      let {timeUntil} = this.state;
      const countDownDate = new Date("Oct 31, 2019 00:00:00").getTime();
      const currentDate = new Date().getTime();
      let timeBetween = Math.abs(countDownDate-currentDate)/1000;
      const days = Math.floor(timeBetween / 86400);
      timeBetween -= days * 86400;
      const hours = Math.floor(timeBetween / 3600) % 24;
      timeBetween -= hours * 3600;
      const minutes = Math.floor(timeBetween / 60) % 60;
      timeBetween -= minutes * 60;
      let seconds = Math.round(timeBetween % 60)-1;
      if(seconds === -1){
        seconds = 59;
      }
      if(seconds === 1){
        timeUntil =  `${days} days ${hours} hours ${minutes} minutes ${seconds} second`;
      } else{
        timeUntil =  `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;
      }
      this.setState({timeUntil})
    }, 1000);

    //And lets handle all of our threejs stuuuuuuffffff
    this.THREE = THREE;
    var scene = new this.THREE.Scene();
    var renderer = new this.THREE.WebGLRenderer( { antialias: true } );
    var controls;
    var skull;
    var skullCode = Skull;
    var objects = [];
    var container = document.createElement( 'div' );
		document.body.appendChild( container );
    var pointLight = new this.THREE.PointLight(0xffffff);
    pointLight.position.set(-200, 200, 200);
    scene.add(pointLight);

    var camera = new this.THREE.PerspectiveCamera(40, window.innerWidth/window.innerHeight, 1, 1000);
    camera.position.set(0, 0, 5);
    scene.add(camera);
    controls = new this.THREE.OrbitControls(camera);
    controls.update();

    scene.add( new THREE.AmbientLight( 0xffc922 ) );
    var pointLight1 = new THREE.PointLight( 0xffffff );
    pointLight1.position.set( 150, 10, 0 );
    pointLight1.castShadow = false;
    scene.add( pointLight1 );
    var pointLight2 = new THREE.PointLight( 0xffffff );
    pointLight2.position.set( -150, 0, 0 );
    scene.add( pointLight2 );
    var pointLight3 = new THREE.PointLight( 0xffffff );
    pointLight3.position.set( 0, -10, -150 );
    scene.add( pointLight3 );
    var pointLight4 = new THREE.PointLight( 0xffffff );
    pointLight4.position.set( 0, 0, 150 );
    scene.add( pointLight4 );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight*.75 );
    renderer.shadowMap.enabled = true;
    container.appendChild( renderer.domElement );
    renderer.gammaOutput = true;

    var skullBackMaterial = new THREE.MeshPhysicalMaterial({
      map: null,
      color: 0xFFFFFF,
      metalness: 1.0,
      roughness: 0,
      opacity: 0.0,
      side: THREE.BackSide,
      transparent: true,
      envMapIntensity: 5,
      premultipliedAlpha: true,
      reflectivity: 1,
      // TODO: Add custom blend mode that modulates background color by this materials color.
    });
    var skullFrontMaterial = new THREE.MeshPhysicalMaterial({
      map: null,
      color: 0xFFFFFF,
      metalness: 0.0,
      roughness: 0,
      opacity: 0.0,
      side: THREE.FrontSide,
      transparent: true,
      envMapIntensity: 5,
      premultipliedAlpha: true,
      reflectivity: 1,
    });

    var objectLoader = new this.THREE.OBJLoader();
    objectLoader.load(skullCode, function(obj){
      obj.traverse(function(child){
        if(child instanceof THREE.Mesh){
          child.material = skullBackMaterial;
          var second = child.clone();
          second.material = skullFrontMaterial;
          var parent = new THREE.Group();
          parent.add(second);
          parent.add(child);
          scene.add(parent);
          objects.push(parent);
        }
      });
      skull = objects;
      renderer.toneMappingExposure = 2;
      animate(skull);
    });

    var animate = function (obj) {
      requestAnimationFrame(animate);
      for ( var i = 0, l = objects.length; i < l; i ++ ) {
        var object = objects[ i ];
        object.rotation.y += 0.005;
      }

      const fadeInBust = () => {
        objects.forEach(object => {
          object.children.forEach(child => {
            if (child && child.material.opacity < 0.25) {
              child.material.opacity += 0.002;
            }
          })
        });
      };
      setTimeout(() => {
        fadeInBust();
      }, 1500);
      renderer.render(scene, camera);
    };
    var onWindowResize = function (obj) {
      var width = window.innerWidth;
      var height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height*.75);
    };


    window.addEventListener('resize', onWindowResize, false);
  }

  render() {
    return (
      <div>
        <div className="countdown-content">
          <div className="glitch header" data-text="HALLOWEEN">
            HALLOWEEN
          </div>
          <div className="date-text">{this.state.timeUntil}&nbsp;</div>
        </div>
        <div className="countdown-text">countdown</div>
      </div>
    );
  }
}

export default App;
