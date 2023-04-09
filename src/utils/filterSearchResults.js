export const filterSearchResults = (showsList, searchTerm) => {
    const result = showsList.filter(x => x.fields.title.toLowerCase().includes(searchTerm.toLowerCase()));
    return result;
};