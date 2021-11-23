import React from 'react';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import dayjs from 'dayjs';
import EventSearchResults from './EventSearchResults';
import EventFilters from './EventFilters';

const Discover = () => {
    const { search } = useLocation();
    let { location, startDateTime, classificationName } = queryString.parse(search);

    if (classificationName === 'arts') classificationName = 'arts & theater' 

    // const INITIAL_STATE = {
    //     location: location || null,
    //     startDateTime: startDateTime || null,
    //     classificationName: classificationName 
    // }
    // const [queries, setQueries] = useState(INITIAL_STATE)

    const capitalizeFirstLetter = str => {
        return str.charAt(0).toUpperCase() + str.slice(1);
      }

    const renderHeading = () => {
        return (
            <div className='text-2xl mb-10'>
            <p className='inline'>Showing upcoming <span className='font-semibold text-indigo-700'>{capitalizeFirstLetter(classificationName)}</span> events</p>
            {location ? 
                <p className='inline'> near <span className='font-semibold text-indigo-700'>{capitalizeFirstLetter(location)}</span></p> : 
                null
            }
            {startDateTime ?
                <p className='inline'> starting <span className='font-semibold text-indigo-700'>{dayjs(startDateTime).format('MMM D, YYYY')}</span></p> :
                null
            }
            </div>
        )
    }

    return (
        <div className='px-3'>
            <div className='w-full flex justify-center '>
                <div className='md:w-4/5 lg:w-3/5'>
                    <div>
                        {renderHeading()}
                    </div>
                    <div className='mb-10'>
                        <EventFilters />
                    </div>
                    <div>
                        <EventSearchResults />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Discover;