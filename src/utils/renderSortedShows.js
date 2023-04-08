export const renderSortedShows = (showsList, criteria, direction) => {

    if(criteria === 'title') {
        if(direction === 'ascending') {
            return showsList.sort((a,b) => (a.fields[criteria]).localeCompare(b.fields[criteria]));
        } else if ( direction === 'descending') {
            return showsList.sort((a,b) => (b.fields[criteria]).localeCompare(a.fields[criteria]));
        }
    } else if (criteria === 'rating') {
        if(direction === 'ascending') {
            return showsList.sort((a,b) => a.fields[criteria].ratingPoints - b.fields[criteria].ratingPoints);
        } else if ( direction === 'descending') {
            return showsList.sort((a,b) => b.fields[criteria].ratingPoints - a.fields[criteria].ratingPoints);
        } 
    } else {
        if(direction === 'ascending') {
            return showsList.sort((a,b) => a.fields[criteria] - b.fields[criteria]);
        } else if ( direction === 'descending') {
            return showsList.sort((a,b) => b.fields[criteria] - a.fields[criteria]);
        }  
    }
};