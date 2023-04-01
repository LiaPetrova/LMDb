export const filterSearchResults = (allShowsList, searchTerm) => {
    const result = allShowsList.filter(x => x.fields.title.toLowerCase().includes(searchTerm.toLowerCase()));
    console.log(result);
    return result;
};