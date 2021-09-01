import React, { Component } from 'react'
import { Link } from "react-router-dom";

class ListArticles extends Component {

    constructor(props) {
        super(props);
        this.listArticles = this.props.listArticles
        this.amountArticles = Object.keys(this.listArticles).length
    }

    render() {

        function createMarkup(text) {
            return {__html: text}
        }
        function reduceTextLength(text, start, end) {
            return text.substr(0, 150)
        }

        const card = (data, index) => {

            let textContent = createMarkup( reduceTextLength(data.content, 0, 150).toLowerCase() + '...')

            return (
                <div key={index} className="card" style={{width: '18rem'}}>
                    <img className="card-img-top" src={data.picture.url} alt="Card image cap"/>
                        <div className="card-body">
                            <h5 className="card-title">{data.title}</h5>
                                <div className="card-text" dangerouslySetInnerHTML={textContent}/>
                            <Link to={`view-article/${data.slug}`} className="card-link">See article</Link>
                        </div>
                </div>
            )
           }

        let cards = Object.keys(this.listArticles).map((item, index) =>
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