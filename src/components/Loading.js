export default function Loading({$app, initialState}){
    this.state = initialState;
    this.$target = document.createElement('div');
    this.$target.className = "loading";

    document.body.appendChild(this.$target);

    this.setState = (nextState) =>{
        this.state = nextState;
        this.render();
    }

    this.prevent = (e) =>{
        e.preventDefault();
        e.stopPropagation();
    }

    this.render = () =>{

        this.$target.innerHTML = ` <img src="./assets/nyan-cat.gif">`;
        // 로딩중일 경우만 화면에 노출
        if(this.state){
            this.$target.style.display ="block";
            document.body.addEventListener('click', this.prevent, false);
        }
        else{
            this.$target.style.display = "none";
            document.body.removeEventListener('click', this.prevent, false);
        }
        
    }

}