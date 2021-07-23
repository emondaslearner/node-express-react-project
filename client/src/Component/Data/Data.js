import React, { useContext, useEffect, useState } from 'react';
import { context } from '../../App';

const Data = () => {
    const [user,setUser] = useContext(context);
    const [haveOrder,setOrder] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3500/orders?email='+user.email,{
            method:'GET',
            headers:{
                'Content-type': 'application/json; charset=UTF-8',
                authorization:`Bearer ${sessionStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(result => {
            setOrder(result);
        })
    },[])
    return (
        haveOrder.map(order => <li>{order.name} From:{(new Date(order.checkIn).toDateString('dd/MM/yyyy'))} To:{(new Date(order.checkOut).toDateString('dd/MM/yyyy'))}</li>)
    );
};

export default Data;