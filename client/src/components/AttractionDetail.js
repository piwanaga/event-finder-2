/**Details for an attraction to be shown on attraction page
 * - name
 * - genre
 * - faux rating
 * - follow button
 * - image
 * - event results
 */

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAttractionDetails, searchEvents, addArtist, removeArtist } from '../actions/actionCreators';
import EventSearchResults from './EventSearchResults';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHeart as faHeartRegular} from '@fortawesome/free-regular-svg-icons'
import {faHeart as faHeartSolid} from '@fortawesome/free-solid-svg-icons'

const AttractionDetail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { attractionId } = useParams();
    const [isFollowing, setIsFollowing] = useState(false);
    const attraction = useSelector(store => store.attractionsReducer.details);
    const user = useSelector(store => store.userReducer.user);

    // const checkIfFollowing = () => {
    //     if (user.loggedIn) setIsFollowing(user.artists.map(a => a.id).includes(attractionId));
    // };

    useEffect(() => {
        dispatch(getAttractionDetails(attractionId));
        dispatch(searchEvents({attractionId}));
        if (user.loggedIn) setIsFollowing(user.artists.map(a => a.id).includes(attractionId));
    }, [attractionId, dispatch, user.loggedIn, user.artists]);

    const handleFollow = () => {
        if (user.loggedIn) {
            dispatch(addArtist({
                id: attractionId,
                name: attraction.name,
                photoUrl: attraction.images[2].url,
                username: user.username
            }));
            setIsFollowing(true);
        } else {
            navigate('/login')
        }            
    };

    const handleUnfollow = () => {
        dispatch(removeArtist({
            id: attractionId,
            username: user.username
        }));
        setIsFollowing(false);
    };

    const renderFollowButton = () => (
        isFollowing ? 
        <div className='flex ml-1'>
            <button onClick={handleUnfollow} className='mr-2'>
                <FontAwesomeIcon icon={faHeartSolid} className='text-xl text-red-500'/>
            </button>
            <p className='text-sm text-gray-400 italic'>Following</p>
        </div> :
        <div className='flex ml-1'>
            <button onClick={handleFollow} className='mr-2'>
                <FontAwesomeIcon icon={faHeartRegular} className='text-xl text-gray-700'/>
            </button> 
            <p className='text-sm text-gray-400'>Follow</p>
        </div>
    );
    
    return (
    <>
    {attraction ?
        <div className='flex justify-center px-3'>
            <div className='flex flex-col items-center md:w-4/5 lg:w-3/5'>
                <div className='sm:grid sm:grid-cols-2 w-full'>
                    <div className='sm:order-last lg:flex lg:justify-end'>
                            {attraction.images ?
                                <img alt={attraction.name} className='rounded mb-4 w-full' src={attraction.images[2].url}/> :
                                null
                            }
                    </div>
                    <div>
                        <p className='text-5xl mb-4'>{attraction.name}</p>
                        {attraction.classifications ? 
                        <p className='mb-4 ml-1 text-xl text-gray-500'>
                            {attraction.classifications[0].segment.name} / {attraction.classifications[0].genre.name}
                        </p> :
                        null
                        }
                        {renderFollowButton()}
                    </div>
                </div>
                <div className='w-full mt-10'>
                    <EventSearchResults attractionId={attraction.id} attractionName={attraction.name}/>
                </div>
            </div>
        </div> :
        <p>loading</p>
    }
    </>
    );
    
};

export default AttractionDetail;