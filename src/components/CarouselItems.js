import React from 'react'
import Carousel from "react-bootstrap/Carousel";

const CarouselItems = (props) => {
    // let listdataSlides = Object.keys(dataSlides)
    //     .map((item, index) => <CarouselItems key={index} item={dataSlides[item]} forKey={index}/>)

    let data = props.item
    return (
        <Carousel.Item key={props.forKey}>
            <img
                className="d-block w-100"
                src={data.src}
                alt={data.title}
            />
            <Carousel.Caption>
                <h3>{data.title}</h3>
                <p>{data.text}</p>
            </Carousel.Caption>
        </Carousel.Item>
    )
}

export default CarouselItems