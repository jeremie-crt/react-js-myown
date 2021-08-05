import React from 'react';
import ReactPlayer from "react-player";
import HomeSlider from "./HomeSlider";

const Homepage = () => {

    return (
        <section className='mt-5'>
            <HomeSlider/>

            <div className="row mt-5 mb-5">
                <h3>HomePage</h3>
                <p>Collaboratively recaptiualize just in time total linkage via exceptional
                    resources.
                    Continually plagiarize extensible results rather than ethical channels.
                    Rapidiously
                    transition interactive infomediaries via leveraged functionalities.
                    Proactively
                    impact
                    multimedia based metrics after covalent functionalities. Seamlessly
                    transition
                    front-end
                    partnerships via resource maximizing ideas.

                    Monotonectally formulate collaborative leadership with inexpensive models.
                    Progressively
                    transform timely convergence whereas standards compliant convergence.
                    Assertively
                    build
                    go forward testing procedures before flexible ideas. Phosfluorescently
                    synthesize
                    out-of-the-box applications without multimedia based benefits. Assertively
                    monetize
                    prospective results via customized collaboration and idea-sharing.

                    Efficiently re-engineer interdependent expertise through B2B
                    functionalities.
                    Dynamically morph leveraged growth strategies without equity invested
                    manufactured
                    products. Progressively mesh cross-unit niches rather than efficient
                    communities.
                    Quickly engineer multidisciplinary models after robust convergence.
                    Objectively
                    transition parallel partnerships after innovative meta-services.
                </p>

                <div className="col-12 mt-2">
                    <div className="vm-video">
                        <div className="vc-container player-wrapper">
                            <ReactPlayer
                                volume={0}
                                playing={true}
                                url="https://vimeo.com/234462297"
                                className="react-player"
                                controls
                                width="100%"
                                height="300px"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2607.494783441191!2d2.484082119537567!3d49.19117273760694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e6481e342c6671%3A0x4be6f9dfb9124695!2sCh%C3%A2teau%20de%20Chantilly!5e0!3m2!1sfr!2sfr!4v1628083675112!5m2!1sfr!2sfr"
                width="100%"
                height="400"
                frameBorder="0"
                allowFullScreen=""
                aria-hidden="false"
                tabIndex="0"
            />

        </section>
    )
}

export default Homepage