import React from 'react';
import style from './index.module.css';
import moment from 'moment'

class Review extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            postedDate: new Date(this.props.review.postedDate),
            ratings: []
        };
        this.getRatings = this.getRatings.bind(this);
    }

    getRatings(){
        let rating = this.props.review.rating;
        for (var i = 0; i < 5; i += 1) {
            let item = <i  className={`${rating > 0 ? "bi bi-star-fill" : "bi bi-star"} ${style.star}`} key={i}></i>
            this.setState(prevState => ({
                ratings: [...prevState.ratings, item]
            }))
            rating -= 1;
        }
    }

    componentDidMount(){
        this.getRatings()
    }

    render(){
        return (
            <div className={`${style.box} mb-5`}>
                <div className={`${style.topSection} container row justify-content-between`}>
                    <div className={`col-auto row`}>
                        <img className={`${style.profileImage}`} src={this.props.review.profileImage} alt="profileImage"></img>
                        <div className={`col-auto align-self-center`}>
                            <p className={`mb-1 labelText`}>{this.props.review.firstName} {this.props.review.lastName}</p>
                            <p className={`detailSubText subTextColor`}>{moment(this.state.postedDate).format('DD MMM YYYY')}</p>
                        </div>
                    </div>
                    <div className={`col-auto`}>
                        <div style={{textAlign: "right"}}>
                            {this.state.ratings}
                        </div>
                        <p className={`smallText subTextColor`}>Event: {this.props.review.event}</p>
                    </div>
                </div>
                <div className={`${style.bottomSection}`}>{this.props.review.comment}</div>
            </div>
        )
    }
}

export default Review;