export default function Loading({$app, initialState}){
    this.state = initialState;
    this.$target = document.createElement('div');
    this.$target.className = "loading";

    $app.appendChild(this.$target);

    this.setState = (nextState) =>{
        this.state = nextState;
        this.render();
    }

    this.render = () =>{

        this.$target.innerHTML = ` 💜💙💚💛🧡 Loading 🧡💛💚💙💜`;
        // 로딩중일 경우만 화면에 노출
        this.$target.style.display = this.state ? "block" : "none";
    }

}