'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, RoundedBox, ContactShadows, Image } from '@react-three/drei';
import { Suspense, useRef, useState, useEffect } from 'react';
import * as THREE from 'three';

function Box({p,s,c,r=0.06}:{
    p:[number,number,number];
    s:[number,number,number];
    c:string;r?:number
}) {
    return (
    <RoundedBox position={p} args={s} radius={r} smoothness={3} castShadow receiveShadow>
        <meshStandardMaterial color={c} roughness={0.8}/>
    </RoundedBox>
    )}
function Arrive({children}:{children:React.ReactNode}) {
    const ref=useRef<THREE.Group>(null); 
    const progress=useRef(0);
    useFrame((_,dt)=>{progress.current=Math.min(1,progress.current+dt*1.8);
        if(ref.current){
            const t=1-Math.pow(1-progress.current,3);
            ref.current.position.y=(1-t)*1.8;
            ref.current.scale.setScalar(Math.max(.001,t));
        }});
    return (
            <group ref={ref}>
                {children}
            </group>
            );
}

function DiscoBall() {
    const ball = useRef<THREE.Group>(null);

    useFrame((_, dt) => {
        if (ball.current) {
            ball.current.rotation.y += dt * 0.35;
        }
    });

    return(
        <group position={[0.5, 1.9, -0.7]}>
            <mesh position={[0, 0.3, 0]}>
                <cylinderGeometry args={[0.012, 0.012, 0.6, 8]}/>
                <meshStandardMaterial color="#746f68"/>
            </mesh>

        <group ref={ball}>
            <mesh castShadow>
                <sphereGeometry args={[0.3, 16, 12]} />
                <meshStandardMaterial
                    color="#ccd8e2"
                    metalness={0.7}
                    roughness={0.2}
                    flatShading />
            </mesh>

            <mesh>
                <sphereGeometry args={[0.303, 16, 12]} />
                <meshBasicMaterial
                    color="#72818e"
                    wireframe
                    transparent
                    opacity={0.3}/>
            </mesh>
        </group>
        </group>
    )

}

function Furniture({index}:{index:number}) {
switch(index){
case 0:return <group position={[-.6,0,-1.25]}>
    <Box p={[0,.38,0]} s={[2.1,.45,.85]} c="#bd684b"/>
    <Box p={[0,.82,-.38]} s={[2.1,.7,.22]} c="#c77759"/>
        {[-1,1].map(x=><Box key={x} p={[x,.65,0]} s={[.22,.55,.9]} c="#c77759"/>)}
        {[-.48,.48].map(x=><Box key={x} p={[x,.64,.02]} s={[.86,.16,.65]} c="#d58a68"/>)}
    <Box p={[.58,.86,-.2]} s={[.4,.4,.16]} c="#f3dbae"/>
    </group>;
case 1:return <group position={[.15,0,.15]}><Box p={[0,.49,0]} s={[1.25,.12,.8]} c="#744a32"/>
    {[-.46,.46].map(x=>[-.26,.26].map(z=><Box key={`${x}-${z}`} p={[x,.25,z]} s={[.07,.5,.07]} c="#523b2a"/>))}
    <mesh position={[.2,.58,0]}>
        <cylinderGeometry args={[.15,.15,.04,32]}/>
        <meshStandardMaterial color="#f1e2c5"/>
    </mesh><Box p={[-.25,.6,.08]} s={[.22,.08,.28]} c="#dcab55"/>
    </group>;
case 2:return <Box p={[0,.045,.25]} s={[2.8,.025,2.05]} c="#d2b985" r={.01}/>;
case 3:return <group position={[1.5,0,-1.45]}>
    <mesh position={[0,.05,0]}>
        <cylinderGeometry args={[.27,.3,.08,32]}/>
        <meshStandardMaterial color="#625543"/>
    </mesh>
        <Box p={[0,.85,0]} s={[.04,1.6,.04]} c="#625543"/>
    <mesh position={[0,1.62,0]}>
        <coneGeometry args={[.38,.5,32,1,true]}/>
        <meshStandardMaterial color="#f5d795" side={THREE.DoubleSide}/>
    </mesh>
    <pointLight position={[0,1.45,0]} intensity={3} color="#ffcf7c" distance={4}/>
    </group>;
case 4:return <group position={[-1.65,0,.9]}>
    <mesh position={[0,.25,0]} castShadow>
        <cylinderGeometry args={[.23,.17,.45,24]}/>
        <meshStandardMaterial color="#bd7355"/>
    </mesh>
    {[0,1,2,3,4].map(i=>
    <group key={i} rotation={[0,i*1.3,0]}>
        <Box p={[0,.65,0]} s={[.025,.7,.025]} c="#537459"/>
    <mesh position={[.14,.8+i*.055,0]} scale={[.11,.27,.07]} rotation={[0,0,-.6]} castShadow>
        <sphereGeometry args={[1,16,12]}/>
        <meshStandardMaterial color={i%2?'#71865a':'#45634d'}/>
    <group/>
    </mesh>
    </group>)}
    </group>;
case 5:return <group position={[-.6,1.65,-1.94]}>
    <Box p={[0,0,0]} s={[1,.72,.07]} c="#9b6748"/>
    <Box p={[0,0,.045]} s={[.85,.57,.015]} c="#edd8ae"/>
        <mesh position={[.15,.08,.06]}><circleGeometry args={[.15,32]}/><meshBasicMaterial color="#ca7250"/></mesh>
    <Box p={[-.12,-.14,.07]} s={[.6,.15,.02]} c="#7b8860" r={.01}/>
    </group>;
case 6:return <group position={[1.45,0,.95]}>
    <Box p={[0,.12,0]} s={[.85,.2,.65]} c="#9caa83"/>
    <Box p={[0,.22,0]} s={[.65,.12,.48]} c="#d6d8b9"/>
    <mesh position={[-.56,.1,.25]}><cylinderGeometry args={[.17,.2,.14,24]}/><meshStandardMaterial color="#b37952"/></mesh>
    </group>;
case 7:return <DiscoBall/>;
case 8:return <group position={[-1.94, 1.65, -0.5]}
                    rotation={[0, Math.PI / 2, 0]}>
    <Box 
        p={[0,0,0]}
        s={[1.1, 0.82, 0.07]}
        c="#9b6748"
    />
    <Box 
        p={[0, 0, 0.045]}
        s={[1, 0.72, 0.015]}
        c="#fff4df"
    />
    <Suspense fallback={null}>
  <Image
    url="/party-photo.png"
    position={[0, 0, 0.06]}
    scale={[0.9, 0.62]}
  />
</Suspense>
</group>
default:return <group>
    {Array.from({length:9},(_,i)=>
    <group key={i} position={[-1.7+i*.42,2.12-Math.sin(i/8*Math.PI)*.25,-1.84]}>
        <mesh>
            <sphereGeometry args={[.055,12,8]}/>
            <meshStandardMaterial color="#ffc400" emissive="#ffc400" emissiveIntensity={2} roughness={0.2} metalness={0.3}/>
        </mesh>{i%3===0&&<pointLight intensity={.9} distance={2.5} color="#f74600"/>}
    </group>)}
    </group>;
    }
}
function Scene({count}:{count:number}){
    return <group>
        <Box p={[0,-.12,0]} s={[4.3,.22,4.3]} c="#b59675"/>
        <Box p={[0,1.15,-2.07]} s={[4.3,2.5,.12]} c="#e7d9bf"/>
        <Box p={[-2.07,1.15,0]} s={[.12,2.5,4.3]} c="#d8ceb6"/>
        {Array.from({length:count},(_,i)=><Arrive key={i}><Furniture index={i}/></Arrive>)}
    </group>
}
export default function Room({count,reset}:{count:number;reset:number}){
    const [lost,setLost]=useState(false);
    useEffect(()=>{
        const h=()=>setLost(true);
        window.addEventListener('webglcontextlost',h);
        return()=>window.removeEventListener('webglcontextlost',h)
    },[]);
    return( 
    <div className="canvas-wrap" aria-label={`Трёхмерная комната, предметов: ${count}`}>
        {lost?<p className="scene-fallback">Не удалось показать 3D. Попробуй обновить страницу или открыть игру в другом браузере.</p>:<Canvas key={reset} shadows dpr={[1,1.5]} camera={{position:[6,5,7],fov:38}} gl={{antialias:true}}>
            <color attach="background" args={['#c4dae8']}/>
            <ambientLight intensity={1.2}/>
            <directionalLight castShadow position={[3,7,4]} intensity={2} shadow-mapSize={[1024,1024]}/>
            <Suspense fallback={null}>
                <Scene count={count}/>
                <ContactShadows position={[0,-.25,0]} opacity={.25} scale={12} blur={2.5} far={5}/>
            </Suspense>
            <OrbitControls key={reset} target={[0,.65,0]} enablePan={false} minDistance={6} maxDistance={12} minPolarAngle={.4} maxPolarAngle={1.4} minAzimuthAngle={-.3} maxAzimuthAngle={1.5}/>
            </Canvas>}
    </div>)
}

