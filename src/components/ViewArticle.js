import React, {Component} from 'react'
import { Link } from "react-router-dom";
import { capitalizeFirstLetter } from "../Utils";

class ViewArticle extends Component {

    render() {
        const idArticle = this.props.match.params.id
        const listArticles = this.props.listArticles

        let article;
        //Get the corresponding article in the list by the id params
        Object.keys(listArticles).forEach(item => {
            if (listArticles.hasOwnProperty(item)) {
                if (idArticle === listArticles[item].slug) {
                    article = listArticles[item]
                }
            }
        })

        console.log('article', article);
        //also to render html text
        // var parse = require('html-react-parser');
        // parse('<div>text</div>');

        return (
            <div className="container mt-5">
                <Link to='/articles/list-articles' className="nav-link">
                    <a href="/" style={{textDecoration: 'none'}}>Return to the list</a>
                </Link>
                <div className="container text-center mt-2">
                    <h2 className='mb-3'>{capitalizeFirstLetter(article.title)}</h2>

                    <div className="col-8 m-auto">
                        <img src={article.picture.url} alt=""
                             style={{width: '100%'}}/>
                    </div>
                    <div className="row mt-4">
                        <div className="col-10 m-auto card-text"
                             dangerouslySetInnerHTML={{__html:article.content}}
                        >
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewArticle