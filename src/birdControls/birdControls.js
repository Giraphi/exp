import {
    MathUtils,
    Vector3
} from 'three';

// based on https://github.com/mrdoob/three.js/blob/dev/examples/jsm/controls/FirstPersonControls.js

const BirdControls = function (object, domElement ) {
    // set by constructor (property 'arg')
    this.object = object;
    this.domElement = domElement;

    // set by property
    this.movementSpeed = 1.0;
    this.lookSpeed = 0.005;

    // internals
    this.panSpeed = 0;

    this.moveForward = false;
    this.moveBackward = false;

    this.viewHalfX = 0;
    this.viewHalfY = 0;

    var lat = 0;
    var lon = 0;

    if ( this.domElement !== document ) {
        this.domElement.setAttribute( 'tabindex', - 1 );
    }

    this.setMoveForward = function(isMovingForward) {
        this.moveForward = isMovingForward;
    }

    this.setMoveBackward = function(isMovingBackward) {
        this.moveBackward = isMovingBackward;
    }

    this.setPanSpeed = function(panSpeed) {
        this.panSpeed = panSpeed;
    }


    this.handleResize = function () {
        if ( this.domElement === document ) {
            this.viewHalfX = window.innerWidth / 2;
            this.viewHalfY = window.innerHeight / 2;
        } else {
            this.viewHalfX = this.domElement.offsetWidth / 2;
            this.viewHalfY = this.domElement.offsetHeight / 2;
        }
    };

    this.update = function () {

        var targetPosition = new Vector3();

        return function update( delta ) {
            var actualMoveSpeed = delta * this.movementSpeed;

            if ( this.moveForward || ( this.autoForward && ! this.moveBackward ) ) {
                this.object.translateZ( - ( actualMoveSpeed  ) );
            }
            if ( this.moveBackward ) this.object.translateZ( actualMoveSpeed );

            var actualLookSpeed = delta * this.lookSpeed;

            lon -= this.panSpeed * actualLookSpeed;
            lat = Math.max( - 85, Math.min( 85, lat ) );
            var phi = MathUtils.degToRad( 90 - lat );
            var theta = MathUtils.degToRad( lon );
            var position = this.object.position;
            targetPosition.setFromSphericalCoords( 1, phi, theta ).add( position );

            this.object.lookAt( targetPosition );
        };
    }();
    //
    // this.dispose = function () {
    // };

    // function bind( scope, fn ) {
    //     return function () {
    //         fn.apply( scope, arguments );
    //     };
    // }

    this.handleResize();
};

export { BirdControls };