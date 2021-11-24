import {useState, useEffect} from 'react';
import axios from 'axios';
export function useRefreshLoader(){
    const[loading, setLoading] = useState(true);
    useEffect(()=>{
        (async ()=>{
            await axios.get('/')
        })();
    }, [])
}