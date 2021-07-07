const API_END_POINT = 'https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev';

export const request = async (nodeID) => {
    try{
        const res = await fetch(`${API_END_POINT}/${nodeID ? nodeID : ''}`);

        if(!res.ok){
            throw new Error('fetch error');
        }
        else{
            return await res.json();
        }
    }
    catch(e){
        throw new Error(e.message);
    }
}