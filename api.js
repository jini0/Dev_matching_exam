export const API_END_POINT = 'http://localhost:3002';   // 만든 서버의 api주소

const request = async (url) => {
    const res = await fetch(url);    // fetch를 실행시키는 request를 우선 만듬!
    if(res.ok){ //ok가 true면,
        const json = await res.json();  //json파일로 바꾸고 변수로 받아서
        return json;    //return해줌    --> retrun해주면 함수 끝남, throw까지 가지 않음
    }
    throw new Error('요청에 실패함')    //ok가 뜨지 않으면 요청에 실패했다고 뜰거임 
}
export const fetchedLanguages = async (keyword) => request(`${API_END_POINT}/languages?keyword=${keyword}`)
// fetchedLanguages  함수 호출시, 매개변수 자리에 인자로 keyword 넣어준다! 