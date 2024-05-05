import httpInstance from '../httpInstance';

export const getSimilar = async (movieID: string) => {
    let res: any;
    const endpoint = `${movieID}/similar?api_key=${process.env.REACT_APP_MDB_API_KEY}&lenguage=en-US`;
    await httpInstance.get(endpoint)
    .then((data) => {
        res = data;
    }).catch((err) => { 
        res = err.response;
    });
    return res;
}