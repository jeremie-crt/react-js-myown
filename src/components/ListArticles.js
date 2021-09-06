import React, {Component} from 'react'
import {Link} from "react-router-dom";
import {capitalizeFirstLetter, reduceTextLength} from "../Utils";

class ListArticles extends Component {

    constructor(props) {
        super(props);
        this.listArticles = this.props.listArticles
        this.amountArticles = Object.keys(this.listArticles).length
    }

    render() {
        //Single Card Component
        const card = (data, index) => {

            let textContent = reduceTextLength(data.introduction, 0, 150)
                .toLowerCase() + '...'

            return (
                <div key={index} className="col-sm-4 mb-3" style={{maxHeight: '485px'}}>
                    <div className="card" style={{height: '100%'}}>
                        <Link to={`view-article/${data.slug}`} className="card-link">
                            <div className="card-header" style={{height: '250px', minHeight: '250px'}}>
                                <img className="card-img-top" src={data.picture.url} alt={data.title}
                                     style={{height: '100%', width: '100%'}}
                                />
                            </div>
                        </Link>
                        <div className="card-body mt-2">
                            <h5 className="card-title">{data.title}</h5>
                            <div className="card-text mb-2" dangerouslySetInnerHTML={{__html: capitalizeFirstLetter(textContent)}}/>
                            <Link to={`view-article/${data.slug}`} className="card-link">
                                <a href="/">Read article</a>
                            </Link>
                        </div>
                    </div>
                </div>
            )
        }

        let cards = Object
            .keys(this.listArticles)
            .map((item, index) =>
                card(this.listArticles[item], index)
            )

        return (
            <section className="container">
                <div className="row">
                    <p>List of articles: {this.amountArticles}</p>
                </div>
                <div className="row">
                    {cards}
                </div>
            </section>
        )
    }
}

export default ListArticles