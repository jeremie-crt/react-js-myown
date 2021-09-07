import React, {Component} from 'react'
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import './UserArticles.css'

class UserAddArticles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            article: {
                title: '',
                introduction: '',
                content: '',
                author: '',
                slug: '',
                published: '',
                date: '',
                picture: {},
                poster: '',
                background: '',
            },
            selectedFilePicture: '',
            isPicturePicked: false,
            selectedFilePoster: '',
            isPosterPicked: false,
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleOnChange = this.handleOnChange.bind(this)
        this.handleSubmission = this.handleSubmission.bind(this)
        this.handleOnChangeFile = this.handleOnChangeFile.bind(this)
        this.handleOnChangeEditor = this.handleOnChangeEditor.bind(this)
        this.savePicture = this.savePicture.bind(this)
    }

    savePicture(data) {
        const article = {...this.state.article}
        article.picture = data
        this.setState({article})
    }

    handleOnChangeEditor(data) {
        const article = {...this.state.article}
        article.content = data
        this.setState({article})
    }

    handleOnChange(event) {
        const target = event.target
        const value = target.value
        const name = target.name

        const article = {...this.state.article}
        article[name] = value
        this.setState({article})
    }

    handleOnChangeFile(event) {
        const target = event.target
        switch (target.id) {
            case 'picture':
                this.setState({selectedFilePicture: target.files[0]})
                this.setState({isPicturePicked: true})
                break
            ;
            case 'poster':
                this.setState({selectedFilePoster: target.files})
                this.setState({isPosterPicked: true})
                break
            ;
            default:
                break;
        }
    }

    handleSubmission(event) {
        event.preventDefault()
        this.uploadToNodeServer()
        //if(this.state.isPicturePicked) {
        //    this.uploadToCloudinary()
        //} else {
        //    this.handleSubmit()
        //}
    }

    /*uploadToCloudinary() {
        //File Upload
        let preset = 'direct-upload-preset-myown'
        const formData = new FormData();
        formData.append('file', this.state.selectedFile)
        //Tips: Must configure the preset to be able to use the direct upload call api
        // https://dev.to/ogwurujohnson/cloudinary-image-upload-the-setup-k3h
        formData.append("upload_preset", preset);

        const callApi = async () => {
            const data = await fetch(
                'https://api.cloudinary.com/v1_1/cloudinary-yoshaa-service/image/upload',
                {
                    method: 'POST',
                    body: formData,
                }
            )
                .then((response) => response.json())
                .then((result) => result)
                .catch((error) => {
                    console.error('Error:', error);
                });

            return data
        }

        callApi()
            .then((res) => {
                this.savePicture(res)
            })
            .then((res) => {
                //Save the state data
                this.handleSubmit()
            })
            .catch((error) => {
                console.error('Error:', error);
            })
    }*/

    uploadToNodeServer() {
        //File Upload
        //let preset = 'direct-upload-preset-myown'
        const formData = new FormData();

        for(var i = 0; i < this.state.selectedFilePoster.length; i++) {
            formData.append('file', this.state.selectedFilePoster[i])
        }
        //Tips: Must configure the preset to be able to use the direct upload call api
        // https://dev.to/ogwurujohnson/cloudinary-image-upload-the-setup-k3h
        //formData.append("upload_preset", preset);

        const callApi = async () => {
            const data = await fetch(
                'http://localhost:8000/upload',
                {
                    method: 'POST',
                    body: formData,
                }
            )
                .then(res => { // then print response status
                    console.log('res')
                    console.log(res)
                    return res
                })
                .catch((error) => {
                    console.error('Error:', error);
                });

            return data
        }

        callApi()
            .then((res) => {
                //this.savePicture(res)
                console.log('callApi')
                console.log(res)
            })
            .then((res) => {
                //Save the state data
                //this.handleSubmit()
            })
            .catch((error) => {
                console.error('Error:', error);
            })
    }

    handleSubmit() {
        let article = this.state.article
        let user = this.props.user
        article.author = user.id
        article.date = Date.now()

        if (article.title.substring(article.title.length, article.title.length - 1) === ' ') {
            article.title = article.title.substring(0, article.title.length - 1)
        }

        let formatTitle = article.title

        article.slug = formatTitle.toLowerCase().replaceAll(' ', '-')

        if (article.slug.substring(article.slug.length, article.slug.length - 1) === '-') {
            article.slug = article.slug.substring(0, article.slug.length - 1)
        }

        this.props.addNewArticle(article)
    }

    render() {
        const article = this.state.article
        const selectedFilePicture = this.state.selectedFilePicture
        const selectedFilePoster = this.state.selectedFilePoster

        return (
            <div className="wrapper-editor">
                <h2>Form article - add new one</h2>

                <form className="formArticles mt-5" onSubmit={this.handleSubmit} encType='multipart/form-data'>
                    <div className="form-group col-6">
                        <label htmlFor="title">title</label>
                        <input type="text" name='title' id='title' onChange={this.handleOnChange} value={article.title}
                               className="form-control"/>
                    </div>

                    <div className="form-group col-6">
                        <label htmlFor="introduction">introduction</label>
                        <textarea name='introduction' id='introduction' cols="10" rows="3"
                        className='form-control' onChange={this.handleOnChange} value={article.introduction} > </textarea>
                    </div>

                    <div className="form-group col-6 mb-5">
                        <label htmlFor="published">publishing at</label>
                        <input type="date" name='published' id='published' onChange={this.handleOnChange}
                               value={article.published} className="form-control"/>
                    </div>

                    <div className="form-group col-6 mb-5">
                        <label htmlFor="picture">Picture</label>
                        <input type="file" name='picture' id='picture' onChange={this.handleOnChangeFile}
                               className="form-control"/>
                        {this.state.isPicturePicked ? (
                            <div>
                                <p>Filename: {selectedFilePicture.name}</p>
                                <p>Filetype: {selectedFilePicture.type}</p>
                                <p>Size in bytes: {selectedFilePicture.size}</p>
                                <p>
                                    lastModifiedDate:{' '}
                                    {selectedFilePicture.lastModifiedDate.toLocaleDateString()}
                                </p>
                            </div>
                        ) : (
                            <p>Select a file to show details</p>
                        )}
                    </div>

                    <div className="form-group col-6 mb-5">
                        <label htmlFor="poster">Poster</label>
                        <input type="file" name='poster' multiple id='poster' onChange={this.handleOnChangeFile} className="form-control"/>
                        {this.state.isPosterPicked ?
                            (
                            <div>
                                <p>Filename: {selectedFilePoster.length}</p>
                            </div>
                        ) : (
                            <p>Select a file to show details</p>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="content">Content article</label>
                        <CKEditor
                            editor={ClassicEditor}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                this.handleOnChangeEditor(data)
                            }}

                            data={article.content}
                        />
                    </div>

                    <button type='submit' className='btn btn-primary mt-3' id='submit'
                            onClick={this.handleSubmission}>SAVE
                    </button>
                </form>
            </div>
        )
    }
}

export default UserAddArticles