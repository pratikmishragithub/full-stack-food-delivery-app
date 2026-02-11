import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'
const ExploreMenu = ({category,setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Explore our menu</h1>
        <p className='explore-menu-text'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo culpa perferendis animi consectetur tempore voluptates quis repellendus eos? Libero vero expedita doloribus quaerat id, quod nesciunt pariatur perspiciatis facere labore.</p>
        <div className='explore-menu-list'>
            {menu_list.map((item,index)=>{
                return (
                   <div onClick={()=> setCategory(prev=> prev===item.menu_image.name ? "All": item.menu_name)} key={index} className='explore-menu-list-item'>
                  <img className={category===item.menu_name ? "active" :""} src={item.menu_image} alt=""/>
                  <p>{item.menu_name}</p>
                   </div>
                )
            })}
        </div>
       <hr/>
    </div>
  )
}

export default ExploreMenu