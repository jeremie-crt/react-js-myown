import React, { Component } from 'react'

class ViewArticle extends Component {

    render() {

        const idArticle = this.props.match.params.id

        return (
           <p>ViewArticle for artcile id: {idArticle}</p>
        )
    }
}

export default ViewArticle