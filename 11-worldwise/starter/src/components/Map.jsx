import {useNavigate, useSearchParams } from 'react-router-dom'
import styles from './Map.module.css' // command csm will import the styles vid: 211

function Map() {
    const[searchParams, setSearchParams]= useSearchParams()

    const lat= searchParams.get("lat")
    const lng= searchParams.get("lng")
    // console.log(lat, lng)
    const navigate= useNavigate()
    return (
        <div className={styles.mapContainer} onClick={()=>navigate('form')}>
            map
            <h4> lat :{lat}</h4>
            <h4> lng :{lng}</h4>
            <button onClick={()=> setSearchParams({lat:20,lng:54})}>change position</button>
        </div>
    )
}

export default Map
