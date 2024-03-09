import React from 'react'
import BookModel from '../../../models/BookModels';
import { Link } from 'react-router-dom';
import { customerProfilePictureUrl } from '../../../services/client';

export const ReturnBook: React.FC<{book: BookModel}> = (props) => {
    return (
        <>
        <div className='col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3'>
            <div className='text-center'>
                {props.book.profileImageId ? 
                    <img
                        src={customerProfilePictureUrl(props.book.title)}
                        width='151'
                        height='233'
                        alt="book"
                    />
                    :
                    <img
                        src={require('C:/Users/Quigas/Fullstack/react-library/src/Images/BooksImages/noimage.jpg')}
                        width='151'
                        height='233'
                        alt="book"
                    />
                }
                <h6 className='mt-2'>{props.book.title}</h6>
                <p>{props.book.author}</p>
                <Link className='btn main-color text-white' to={`checkout/${props.book.id}`}>Reserve</Link>
            </div>
        </div>
        </>
    );
}