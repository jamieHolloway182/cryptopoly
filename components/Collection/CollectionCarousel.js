import React, { Component } from 'react';
import Image from 'next/image'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import image1 from '../../public/image1.png'
import image2 from '../../public/image2.png'
import image3 from '../../public/image3.png'

class CollectionCarousel extends Component {
    render() {
        return (
            <Carousel showThumbs={false}>
                <div>
                    <Image src={image1}  width={1000} height={500}/>
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <Image src={image2} width={1000} height={500}/>
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    <Image src={image3}  width={1000} height={500}/>
                    <p className="legend">Legend 3</p>
                </div>
            </Carousel>
        );
    }
};

export default CollectionCarousel