import {useState, useEffect} from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setProfile, setIsAuth } from '../Store/ProfileSlice';

export function useRefreshLoader(){
    const[loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    useEffect(()=>{
        (async ()=>{
            try{
                const {data} = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/refresh`, 
                {
                    withCredentials: true
                })
                const profile = {...data, isAuth: true};
                await dispatch(setProfile(profile));
                setLoading(false);
            }catch(err){
                await dispatch(setIsAuth({isAuth: false}));
                setLoading(false)
            }
        })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return { loading }
}