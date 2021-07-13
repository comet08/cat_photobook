export default function Loading({$app, initialState}){
    this.state = initialState;
    this.$target = document.createElement('div');
    this.$target.className = "loading";

    $app.appendChild(this.$target);

    this.setState = (nextState) =>{
        this.state = nextState;
        this.render();
    }

    this.prevent = (e) =>{
        e.preventDefault();
        e.stopPropataion();
    }

    this.render = () =>{

        this.$target.innerHTML = ` 💜💙💚💛🧡 Loading 🧡💛💚💙💜`;
        // 로딩중일 경우만 화면에 노출
        if(this.state){
            this.$target.style.display ="block";
            this.$target.style.backgroundColor = "white";
            document.body.style.backgroundColor = "grey";
            document.body.addEventListener('click', this.prevent, false);
        }
        else{
            this.$target.style.display = "none";
            document.body.style.backgroundColor = "white";
            document.body.removeEventListener('click', this.prevent, false);
        }
        
    }

}