export const filterSearchResults = (showsList, searchTerm) => {
    console.log(showsList, 'list');
    console.log(searchTerm);
    const result = showsList.filter(x => x.fields.title.toLowerCase().includes(searchTerm.toLowerCase()));
    console.log(result);
    return result;
};