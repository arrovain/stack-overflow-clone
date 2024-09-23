import React, { useEffect, useState } from 'react'
import useValidation from '../custom/useValidation'
import ReactQuill from 'react-quill'
import TagsInput from 'react-tagsinput'
import Spinner from '../layouts/Spinner'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { BASE_URL, getConfig, modules } from '../../helpers/config'

export default function Ask() {
    const { isLoggedIn, token } = useSelector(state => state.user)
    const[question, setQuestion] = useState({
        title: '',
        body: '',
        tags: []
    })
    const [errors, setErrors] = useState([])
    const [submitting, setSubmitting] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if(!isLoggedIn) navigate('/login')
    }, [isLoggedIn])

    const handleTagsInputChange = (tags) => {
        setQuestion({
            ...question, tags
        })
    }

    const storeQuestion = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        setErrors([])
        try {
            const response = await axios.post(`${BASE_URL}/question/store`,
                question,getConfig(token))
            setSubmitting(false)
            toast.success(response.data.message)
            navigate('/')
        } catch (error) {
            setSubmitting(false)
            if(error?.response?.status === 422) {
                setErrors(error.response.data.errors)
            }
            console.log(error)
        }
    }

    return (
        <div className='row my-5'>
            <div className="col-md-6 mx-auto">
                <div className="card shadow-sm">
                    <div className="card-header bg-white">
                        <h5 className="text-center mt-2">
                            Ask question
                        </h5>
                    </div>
                    <div className="card-body">
                        <form className="mt-5" onSubmit={(e) => storeQuestion(e)}>
                            <div className="mb-3">
                                <label htmlFor="title">Title*</label>
                                <input type="text" 
                                    onChange={(e) => setQuestion({
                                        ...question, title: e.target.value
                                    })}
                                    value={question.title}
                                    name='title'
                                    className="form-control" />
                                    { useValidation(errors, 'title') }
                            </div>
                            <div className="mb-3">
                                <label htmlFor="body">Body*</label>
                                <ReactQuill theme="snow" 
                                    value={question.body} 
                                    modules={modules}
                                    onChange={(value) => setQuestion({
                                        ...question, body: value
                                    })} />
                                { useValidation(errors, 'body') }
                            </div>
                            <div className="mb-3">
                                <label htmlFor="tags">Tags</label>
                                <TagsInput value={question.tags} 
                                    onChange={handleTagsInputChange} />
                            </div>
                            <div className="mb-3">
                                {
                                    submitting ?
                                        <Spinner />
                                    :
                                    <button type='submit' className="btn btn-sm btn-dark">
                                        Submit
                                    </button>
                                }
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
