import React, { Component } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import './UserArticles.css'

class UserAddArticles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            article: {
                title: '',
                content: '',
                author: '',
                slug: '',
                published: '',
                date: ''
            }
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleOnChange = this.handleOnChange.bind(this)
        this.handleOnChangeEditor = this.handleOnChangeEditor.bind(this)
    }

    handleSubmit(e) {

        let article = this.state.article
        let user = this.props.user
        article.author = user.id
        article.date = Date.now()

        if(article.title.substring(article.title.length, article.title.length -1) === ' ') {
            article.title = article.title.substring(0, article.title.length - 1)
        }

        let formatTitle = article.title

        article.slug = formatTitle.toLowerCase().replaceAll(' ', '-')

        if(article.slug.substring(article.slug.length, article.slug.length -1) === '-') {
            article.slug = article.slug.substring(0, article.slug.length - 1)
        }

        this.props.addNewArticle(article)

        //TODO check image
    }

    handleOnChange(event) {
        const target = event.target
        const value = target.value
        const name = target.name

        const article = { ...this.state.article }
        article[name] = value
        this.setState({ article })
    }

    handleOnChangeEditor(data) {
        const article = { ...this.state.article }
        article.content = data
        this.setState({ article })
    }

    render() {
        const article = this.state.article

        return (
            <div className="wrapper-editor">
                <h2>Form article - add new one</h2>

                <form className="formArticles mt-5" onSubmit={this.handleSubmit} >
                    <div className="form-group col-6">
                        <label htmlFor="title">title</label>
                        <input type="text" name='title' id='title' onChange={this.handleOnChange} value={article.title} className="form-control"/>
                    </div>

                    <div className="form-group col-6 mb-5">
                        <label htmlFor="published">publishing at</label>
                        <input type="date" name='published' id='published' onChange={this.handleOnChange} value={article.published} className="form-control"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="content">Content article</label>
                        <CKEditor
                            editor={ ClassicEditor }
                            onChange={ ( event, editor ) => {
                                const data = editor.getData();
                                this.handleOnChangeEditor(data)
                            } }

                            data={article.content}
                        />
                    </div>

                    <button type='submit' className='btn btn-primary mt-3' id='submit'>SAVE</button>
                </form>
            </div>
        )
    }
}

export default UserAddArticles