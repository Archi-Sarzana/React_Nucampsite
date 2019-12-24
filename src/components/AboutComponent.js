import React from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader, Media } from 'reactstrap';
import { Link } from 'react-router-dom';

const RenderPartner = ({partner}) => {
    if (partner) {
      const { image, name, description } = partner;
      return(
        <React.Fragment>
          <Media object src={image} alt={name} width='150'/>
          <Media body className="ml-5 mb-4">
            <Media heading>
              {name}
            </Media>
            {description}
          </Media>
        </React.Fragment>
      )
    } else {
      return <div />
    };
  }

//added for week 5 workshop Create a new functional component named PartnerList that takes props as its argument. Take the declaration of const partners from the top of the About component and move it into this component.
const PartnerList = (props) => {
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
//}
//workshop week 5 task 1: Under this, write an if statement to handle if there was an error message while trying to load. This should return a div with the className of "col". Inside this div should be an h4 element that contains the error message.
if (props.partners.errMess) {
    return (
        <div className="col mt-4">
            <h4>{props.partners.errMess}</h4>
        </div>
    );
}
    return(
        <div className="col mt-4">
            <Media list>
                {props.partners}
            </Media>
        </div>
    )
}

// const RenderPartner = ({partner}) => {
//     if (partner) {
//       const { image, name, description } = partner;
//       return(
//         <React.Fragment>
//           <Media object src={image} alt={name} width='150'/>
//           <Media body className="ml-5 mb-4">
//             <Media heading>
//               {name}
//             </Media>
//             {description}
//           </Media>
//         </React.Fragment>
//       )
//     } else {
//       return <div />
//     }
// }
 

const About = (props) => {

    const partners = props.partners.map(partner => {
        return (
            <Media tag="li" key={partner.id}>
                <RenderPartner partner={partner} />
                <PartnerList partner={partner} />
            </Media>
        );
    });

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>About Us</BreadcrumbItem>
                    </Breadcrumb>
                    <h2>About Us</h2>
                    <hr />
                </div>
            </div>
            <div className="row row-content">
                <div className="col-sm-6">
                    <h3>Our Mission</h3>
                    <p>We present a curated database of the best campsites in the vast woods and backcountry of the World Wide Web Wilderness. We increase access to adventure for the public while promoting safe and respectful use of resources. The expert wilderness trekkers on our staff personally verify each campsite to make sure that they are up to our standards. We also present a platform for campers to share reviews on campsites they have visited with each other.</p>
                </div>
                <div className="col-sm-6">
                    <Card>
                        <CardHeader className="bg-primary text-white"><h3>Facts At a Glance</h3></CardHeader>
                        <CardBody>
                            <dl className="row">
                                <dt className="col-6">Founded</dt>
                                <dd className="col-6">February 3, 2016</dd>
                                <dt className="col-6">No. of Campsites in 2019</dt>
                                <dd className="col-6">563</dd>
                                <dt className="col-6">No. of Reviews in 2019</dt>
                                <dd className="col-6">4388</dd>
                                <dt className="col-6">Employees</dt>
                                <dd className="col-6">42</dd>
                            </dl>
                        </CardBody>
                    </Card>
                </div>

                <div className="col">
                    <Card className="bg-light mt-3">
                        <CardBody>
                            <blockquote className="blockquote">
                                <p className="mb-0">I will not follow where the path may lead, but I will go where there is no path, and I will leave a trail.</p>
                                <footer className="blockquote-footer">Muriel Strode,{' '}
                                    <cite title="Source Title">"Wind-Wafted Wild Flowers" -
                                    The Open Court, 1903</cite>
                                </footer>
                            </blockquote>
                        </CardBody>
                    </Card>
                </div>
            </div>
            
            <div className="row row-content">
                <div className="col-12">
                    <h3>Community Partners</h3>
                </div>
    
                {/* (Comment out for week 5 exercise, task 1) 
                    <div className="col mt-4">
                    <Media list>
                        {partners}
                    </Media>
                </div> */}
            </div>
        </div>
    );
}

export default About;