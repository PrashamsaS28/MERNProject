
import React, { useContext, useEffect, useState } from 'react';
//import coffee from '../assets/coffee.jpg';
import blogContext from '../context/blogs/BlogContext';
import { PiDotsThree } from "react-icons/pi";
import EditProductModel from './EditProductModel';
import { useNavigate } from 'react-router-dom';

const Serviceitems = (props) => {
  const context = useContext(blogContext);
  const { state: { cart, products }, dispatch, allProduct ,product } = context;

const[menuVisible,setmenuVisible]=useState(false)
const[modelVisible,setmodelVisible]=useState(false)


const navigate=useNavigate()


  const toggleMenu=()=>{
setmenuVisible(!menuVisible)
  }
  
  
  const openEditModel=()=>{
    setmodelVisible(true)
      }
          const closeModel=()=>{
        setmodelVisible(false)
          }

const saveedit=(updateData)=>{
editProduct(_id,updateData)
closeModel()
}
useEffect(() => {
  allProduct();
}, []);




const viewmenuhandler = () => {
  navigate('/menu');
};


const displayeditems = product ? product.slice(0, 4) : [];

  return (
    <div className='container'>
     <br></br><br></br><br></br><br></br>
      <h4 className='service-heading my-3 text-center' style={{fontFamily:"monospace", fontSize:"37px"}}>Todays' Special</h4>
      <br></br><br></br>
      <div className='row'>
        {displayeditems && displayeditems.map((e) => {
          return(
         
            <div className='col-md-3' key={e._id}>
              <div className="card" style={{ height: '90%', width: '100%', overflow: 'hidden' }}>
                                <img src={`http://localhost:5000/uploads/${e.images[0]}` } className="card-img-top" style={{height:"60%", width:"100%", objectFit:'cover'}} alt={e.title} />
                <div className="card-body">
                  <div className='threedots'>
                  <h5 className="card-title" style={{fontSize:'23px'}}>{e.title} </h5>
                 
                  <PiDotsThree onClick={toggleMenu}/>
                  {menuVisible && (
                    <div className='menu-options'>
                      <button onClick={openEditModel}>Edit</button>
                      <button onClick={()=>deleteWork(_id)}>Delete</button>
                    </div>
        )}
                    </div>
                   <p className="card-text">Rs. {e.price}</p>
                 
                  {cart && cart.some(p => p._id === e._id) ? (
                    <button
                      className='btn btn-outline-danger' 
                      onClick={() => {
                        dispatch({
                          type: "REMOVE_FROM_CART",
                          payload: e
                        });
                      }}
                    >
                      Remove from cart
                    </button>
                  ) : (
                    <button
                      className='btn btn-outline-success' style={{marginTop:"15%"}}
                      onClick={() => {
                        dispatch({
                          type: "ADD_TO_CART",
                          payload: e
                        });
                      }}
                    >
                      Add to cart
                    </button>
                  )}
                </div>
              </div>
            
          
          {/*  
           {product && product.length > 4 && (
            <button className='btn btn-outline-secondary mt-3' onClick={viewmenuhandler}>
              View Menu
            </button>
          )} */}
          {modelVisible && (
            <EditProductModel
            product={product}
            onClose={closeModel}
onsave={saveedit}
            />
          )}
            </div>
          );
        })}
      
      </div>
    </div>
  );
};

export default Serviceitems;