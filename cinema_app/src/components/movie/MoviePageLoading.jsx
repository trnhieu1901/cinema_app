import React from 'react';
import LoadingSkeleton from '../loading/LoadingSkeleton';

const MoviePageLoading = () => {
    return (
        <div className="flex h-[400px] flex-col  p-3 text-white rounded-lg select-none movie-card bg-slate-800">
            <LoadingSkeleton height="250px" radius="5px" />
            <div className="flex flex-col flex-1 gap-5 mt-4">
                <LoadingSkeleton width="" height="50px" radius="5px" />
                <LoadingSkeleton width="" height="30px" radius="5px" />
                <LoadingSkeleton width="" height="15px" radius="5px" />
            </div>
        </div>
    );
};

export default MoviePageLoading;
