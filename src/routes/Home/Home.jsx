
import { Typography } from '@mui/material';
import './Home.scss'
import CirclesContainer from '../../components/Grids/Circles/CirclesContainer/CirclesContainer';
import Circle from '../../components/Grids/Circles/Circle/Circle'

import Hotdog from '../../assets/img/home/hot-dog.png'
import Burger from '../../assets/img/home/burger.webp'
import Pizza from '../../assets/img/home/pizza.webp'
import IceCream from '../../assets/img/home/ice-cream.png'
import Sushi from '../../assets/img/home/sushi.webp'
import Donut from '../../assets/img/home/donought.png'
import Cake from '../../assets/img/home/cake.webp'
import PopCorn from '../../assets/img/home/popcorn.webp'
import Item from '../../components/Item/Item';


//colors
/*
primary: #FFEDBC
secondary: #FFF4D6

primary: #FFE4D3
secondary: #FFEFE5

primary: #E4BAD4
secondary: #F6DFEB

primary: #9EB384
secondary: #CEDEBD
*/



function Home(){

    

    return (
        <main className="main-home min-h-screen pt-14">
            <Typography variant='h2' component="h1" className="text-center main-home__title"  
                gutterBottom>Food Mood</Typography>
            {/* <Item /> */}
        </main>
    )
}

export default Home;