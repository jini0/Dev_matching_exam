// 8.22 <프론트엔드 웹개발자-데브매칭 테스트 풀이>
// https://prgms.tistory.com/139
// App에서 합칠거고, component로 다 따로 분리해서 해줘야함!! --> ✔시험칠 때 주의✔ (react 컴포넌트와 똑같음!!!)
// App.js에서 component를 다 불러올거!(App에서 합칠거임)
// 🖤react로 컴포넌트 나눴던걸 javascript로 준다고 생각하자!!!🖤
// 🥨fetch쓰는 법 / component를 자바스크립트로 하는 법 등 익혀두자!!!🥨

import { fetchedLanguages } from "./api.js"
import SearchInput from "./components/SearchInput.js"   //.js 확장자명 꼭 붙여주기!!
import Suggestion from "./components/Suggestion.js"
import SelectedLanguages from "./components/SelectedLanguages.js"

// 변수명 만들때, $가 붙은 변수이름을 쓸거임
export default function App({ $target }){   // 내보내기
    this.state = {
        fetchedLanguages : [],
        selectedLanguages : []
    }
    this.setState = (nextState) => {
        this.state = {
            ...this.state,
            ...nextState
        }
        suggestion.setState({
            selectedIndex: 0,   //초기값0도 같이 넘겨줌
            items: this.state.fetchedLanguages
        })
        selectedLanguages.setState(this.state.selectedLanguages);
    }
    // 잘 불러오는지 테스트>
    // this.render = () => {
    //     $target.innerHTML = '<h1>안녕하세요</h1>';
    // }
    // this.render();  //render 호출

    const selectedLanguages = new SelectedLanguages({
        $target,
        initialState: []
    })

    const searchInput = new SearchInput({
        // 타겟, 초기값, onChange 넘겨줄거임 --> 생성할 때 넘겨주는 값들! props같다고 생각하자!
        $target,
        initialState: '',    //초기값: 빈문자열
        onChange: async (keyword) => {
            //인풋에 입력한 키워드가 없을때
            if(keyword.length === 0){
                this.setState({
                    fetchedLanguages: [],
                })
            } 
            //인풋에 입력했을때
            else {
                const languages = await fetchedLanguages(keyword);
                this.setState({
                    fetchedLanguages: languages.langArr     // 서버에서 res.send({ langArr: langArr2 })로 받았음 --> 배열이 아닌 객체로 넘겨받았음!
                })
            }
            // const languages = await fetchedLanguages(keyword);
            // console.log(languages);
        }
    })
    //현재 선택한 항목을 알기위하여 cursor 추가
    const suggestion = new Suggestion({
        $target,
        initialState: {
            cursor: 0,
            items: []
        },
        onSelect: (language) => {
            alert(language)
            //이미 선택된 언어의 경우 맨 뒤로 보내버리는 처리
            const nextSelectedLanguage = [...this.state.selectedLanguages]
            //선택된 언어 배열에 클릭한 값이 있으면 그 값의 index값을 반환, 없으면 -1을 반환
            // findIndex()
            // ex> ['java', 'javascript'] 에서,,,음
            const index = nextSelectedLanguage.findIndex((selectedLanguage) => selectedLanguage === language)   // 일치하면 해당하는 index를 반환
            if (index > -1){
                //splice(index, num)    / 배열에서 이 인덱스를 몇개 지울건지
                nextSelectedLanguage.splice(index, 1)   //1개 삭제
            }
            // ex> java를 추가해줄건데, 이미 java가 있으면 원래 있던거를 제거해줄거임!! ['java', 'javascript', 'java'] --> ['javascript', 'java']  이렇게 담길거임!
            nextSelectedLanguage.push(language) //추가해주기 push()
            this.setState({
                ...this.state,
                selectedLanguages: nextSelectedLanguage         // 위의 selectedLanguages : []인 빈배열에서 nextSelectedLanguage라는 값을 넣어줄거라는 이야기!
            })
        }
    })
}