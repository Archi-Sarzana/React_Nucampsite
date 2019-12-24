import React from 'react'
import { Button, Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import {LocalForm, Control, Errors} from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';
import { baseUrl } from '../Shared/baseUrl';

const minLength = len => val => val && (val.length >= len);
const maxLength = len => val => !val || (val.length <= len);

class CommentForm extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            modal: false
        };
        this.toggle = this.toggle.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.postComment(this.props.campsiteId, values.rating, values.author, values.text);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        return (
            <div>
                <Button outline onClick={this.toggle}> <i className='fa fa-pencil' aria-hidden="true"/> Submit Button </Button>  
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}> Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={values => this.handleSubmit(values)} >
                            <div className="form-group">
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select name="rating" className="form-control" model=".rating" id="rating">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </div>
                            <div className="form-group">
                                <Label htmlFor="author">Author</Label>
                                <Control.text name="author" className="form-control" model=".author" id="author" validators={{minLength: minLength(2), maxLength: maxLength(15)}}>
                                </Control.text>
                                <Errors className="text-danger"
                                model=".author"
                                show="touched"
                                component="div"
                                messages={{
                                    minLength: 'Must be at least 2 characters',
                                    maxLength: 'Must be at least 15 characters or less',
                                }}
                                />
                            </div>
                            <div className="form-group">
                                <Label htmlFor="text">Comment</Label>
                                <Control.textarea rows="6" name="text" className="form-control" model=".text" id="text"></Control.textarea>
                            </div>
                            <Button type="Submit" color="primary"> Submit </Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

    function RenderCampsite({campsite}) {
        return(
            <div className='col-md-5 m-1'>
                <FadeTransform
                    in
                    transformProps={{
                        exitTransform: 'scale(0.5) translateY(50%)'
                    }}>
                    <Card>
                    <CardImg top src={baseUrl + campsite.image} alt={campsite.name} />
                        <CardBody>
                            <CardText>{campsite.description}</CardText>
                        </CardBody>
                    </Card>
                </FadeTransform>
            </div>
        )
    }

    function RenderComments({comments, postComment, campsiteId}) {
        if(comments) {
            return(
                <div className='col-md-5 m-1'>
                    <h4>Comments</h4>
                    <Stagger in>
                    {comments.map(comment => {
                        return (
                            <Fade in key={comment.id}>
                                <div>
                                    <p>{comment.text}<br />
                                        -- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                                    </p>
                                </div>
                            </Fade>
                        );
                    })}
                </Stagger>
                      <CommentForm campsiteId={campsiteId} postComment={postComment} />
                </div>
              
            )
        }
        return <div />;
    }
    
    function CampsiteInfo(props) {
        if (props.isLoading) {
            return (
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        if (props.errMess) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h4>{props.errMess}</h4>
                        </div>
                    </div>
                </div>
            );
        }
        if (props.campsite) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <Breadcrumb>
                                <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                                <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                            </Breadcrumb>
                            <h2>{props.campsite.name}</h2>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <RenderCampsite campsite={props.campsite} />
                        <RenderComments 
                        comments={props.comments}
                        postComment={props.postComment}
                        campsiteId={props.campsite.id}
                    />
                    </div>
                </div>
            );
        }
        return <div />;
       
    }
    
    export default CampsiteInfo;