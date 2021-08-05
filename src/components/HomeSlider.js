import React from 'react'
import Carousel from "react-bootstrap/Carousel";

import Garden from '../assets/garden.jpg'
import House from '../assets/garden-house.jpg'
import Horses from '../assets/garden-horse.jpg'
import Castle from '../assets/castle.jpg'
import Hippo from '../assets/hippodrome-de-chantilly.jpg'

import './HomeSlider.css'

const HomeSlider = () => {
    //Data of slides - could be an imported file
    let dataSlides = {
        1: {
            src: Garden,
            text: 'Synergistically orchestrate orthogonal niches without maintainable best practices. Professionally administrate',
            title: 'Garden'
        },
        2: {
            src: House,
            text: 'Corporate e-services and quality leadership. Phosfluorescently revolutionize excellent applications for customized e-services. Completely e-enable market.',
            title: 'House'
        },
        3: {
            src: Horses,
            text: 'Collaboratively benchmark end-to-end manufactured products after premium mindshare. Progressively disseminate enterprise ideas vis-a-vis frictionless imperatives. ',
            title: 'Horses'
        },
        4: {
            src: Castle,
            text: ' Quickly benchmark best-of-breed value without fully tested portals. Conveniently seize',
            title: 'Castle'
        },
        5: {
            src: Hippo,
            text: 'Dramatically whiteboard integrated quality vectors via B2B users. Interactively orchestrate unique quality vectors.',
            title: 'Hippo'
        },

    }

    let listdataSlides = Object.keys(dataSlides)
        .map((item, index) => {
            return <Carousel.Item key={index}>
                        <img
                            className="d-block w-100"
                            src={dataSlides[item].src}
                            alt={dataSlides[item].title}
                        />
                        <Carousel.Caption>
                            <h3>{dataSlides[item].title}</h3>
                            <p>{dataSlides[item].text}</p>
                        </Carousel.Caption>
                    </Carousel.Item>
        })

    return (
        <div className="container">
            <div className="row">
                <h1 className='mt-2'>Slider Text</h1>
                <p>Phosfluorescently extend impactful process improvements rather than open-source quality
                    vectors. Efficiently syndicate stand-alone quality vectors for innovative solutions.
                    Authoritatively morph virtual infrastructures before diverse testing.</p>
            </div>
            <div className="container-carousel col-12">
                <Carousel>
                    { listdataSlides }
                </Carousel>
            </div>
        </div>
    )
}

export default HomeSlider