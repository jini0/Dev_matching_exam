export default function Suggestion({
    $target,
    initialState,
    onSelect
}){
    this.$element = document.createElement('div');
    this.$element.className = 'Suggestion'; // class주는건 나중에 css줄 때 편하게 하려고 만들때 바로 class도 붙여주기
    $target.appendChild(this.$element)

    // this.state = initialState;
    //현재키가 어디를 순회하는지 지정하는 selectedIndex를 추가
    this.state = {
        selectedIndex: 0,
        items: initialState.items
    }
    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    }
    this.render = () => {
        // items = [] --> default 설정
        const { items = [], selectedIndex } = this.state;   // selectedIndex의 초기값은 현재 0
        if( items.length > 0) {     //items의 길이가 0보다 크다 -> '값이 있다' 의미
            this.$element.style.display = 'block';
            this.$element.innerHTML = `
            <ul>
                ${items.map((item,index)=> `
                    <li class="${index===selectedIndex ? 'Suggestion__item--selected' : ''}" data-index='${index}'>${item}</li>
                `).join('')}    
            </ul>
            `
            //data-index --> custom속성!
            //.join('') -> 배열을 문자열로 변경해주기!!
        } else {    // 0보다 크지않을때(0일때) -> 값이 없음 --> display = none
            this.$element.style.display = 'none';
            this.$element.innerHTML = '';
        }
    }
    this.render();   //render호출 - 그려주기!

    //화살표 위, 아래 입력으로 selectedIndex변경하기
    window.addEventListener('keyup', (e)=>{
        //검색된 항목의 배열의 길이가 0보다 클 때
        if(this.state.items.length > 0){
            //현재 selectedIndex값을 selectedIndex에 할당
            const { selectedIndex } = this.state;
            //검색된 배열의 마지막 인덱스를 lastIndex에 할당
            const lastIndex = this.state.items.length - 1   //길이-1 => 마지막 index!(index는 항상 0부터 시작이니까!)
            const navigationKeys = ['ArrowUp','ArrowDown']      //화살표 방향키 위아래만 누를때만 움직이도록!
            let nextIndex = selectedIndex;
            //클릭한 키 값이 navigationKeys배열에 있으면 
            if (navigationKeys.includes(e.key)){    // 1. 'ArrowUp', 2.'ArrowDown' 이 두개만 눌렀을 때만!!
                if(e.key === 'ArrowUp') {   // 1. ArrowUp을 눌렀을 때
                    nextIndex = selectedIndex === 0? lastIndex : nextIndex - 1;
                } else if(e.key === 'ArrowDown') {  // 2. ArrowDown을 눌렀을 때
                    nextIndex = selectedIndex === lastIndex ? 0 : nextIndex + 1;
                }
                this.setState({
                    ...this.state,
                    selectedIndex: nextIndex
                })
                //✔input에 cursor가 있으면, 자꾸 방향키 움직여도 돌아감!! --> input에 이벤트가 걸려있어서!!! ---> SearchInput.js에서 수정
                // (input의 onChange이벤트가 걸려있어서...!! --> 조건을 줘서 수정해야한다)
            }
            // 현재 커서의 위치의 검색어를 파라메타로 전달
            else if(e.key === 'Enter'){
                onSelect(this.state.items[this.state.selectedIndex])    //selectedIndex : 현재커서의 번호 / items 배열 --> 배열의 값에 접근하게될거임!
            }
        } 
    })

    //마우스클릭 이벤트
    this.$element.addEventListener('click', (e) => {
        const $li = e.target.closest('li');  // .closest -> 가장 가까운애 찾는
        console.log(e);
        if ($li) {  //$li가 있다면
            const { index } = $li.dataset;
            try {
                onSelect(this.state.items[parseInt(index)]) //index가 문자열이라 숫자로 변경 -> parseInt()
            } catch(e) {
                alert('선택할 수 없습니다.')
            }
        }
    })
    // console.log(e) --> e를 찍어보면, PointerEvent {isTrusted: true, pointerId: 1, width: 1, height: 1, pressure: 0, …} 에서
    // target속성을 열어보면(target: li.Suggestion__item--selected) -> dataset이라는 속성이있다(커스텀속성이라서)
    // -->
    // dataset: DOMStringMap
    // index: "0"
    // [[Prototype]]: DOMStringMap
}
