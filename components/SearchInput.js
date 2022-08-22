export default function SearchInput({ 
    $target,
    initialState,
    onChange
}){
    this.$element = document.createElement('form'); //form태그 만들어줄거임
    this.$element.className = "SearchInput";
    this.state = initialState;

    $target.appendChild(this.$element)

    this.render = () => {   //reneder라는 매서드 만들어서 input을 넣어줌
        this.$element.innerHTML = `
        <input class="SearchInput__input" type="text"
        placeholder="프로그램 언어를 입력하세요" value="${this.state}"/>
        `
    }
    this.render();  // 얘가 없으면 실행되지 않음

    // 이벤트 구현
    this.$element.addEventListener('keyup', (e)=>{

        // 2. input에 cursor가 있으면, 자꾸 방향키 움직여도 돌아감!! --> input에 이벤트가 걸려있어서!!! ---> 수정
        const actionIgnoreKeys = ['Enter','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'];
        if(!actionIgnoreKeys.includes(e.key)){
            // console.log(e.target.value);
            onChange(e.target.value);    //input에 적힌 값은 value니까! 얘(e.target.value)가 keyword
        }
        // 1.
        // console.log(e.target.value);
        // onChange(e.target.value);    //input에 적힌 값은 value니까! 얘(e.target.value)가 keyword
    })
    // submit이벤트 처리하기
    // -->input에서 enter키를 누르면 form태그라 submit이 되어서 제거해줘야함ㄴ
    this.$element.addEventListener('submit', (e) => {
        e.preventDefault();
    })
}