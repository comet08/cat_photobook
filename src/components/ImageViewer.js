const IMAGE_PATH = 'https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public'

export default function ImageViewer({$app, initialState}){

    this.state = initialState;
    this.$target = document.createElement('div');
    this.$target.className = 'ImageViewer';
    
    $app.appendChild(this.$target);

    this.setState = (nextState) =>{
        this.state = nextState;
        this.render();
    }

    this.modalOn = () =>{
        this.$target.style.display = "flex";
        document.body.style.backgroundColor = "grey";
    }

    this.modalOff = () =>{
        this.$target.style.display = "none";
        document.body.style.backgroundColor='#eee';
    }

    this.onEvent = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        //console.log(e.target);
        const { target } = e;
        if(!target.classList.contains('modal-point'))
            this.modalOff();

        if(this.$target.style.display === "flex" && e.key === "Escape")
            this.modalOff();
    }

    this.render = async () =>{
        if(this.state){
            this.$target.innerHTML = `
            <div class="content">
            <img class="modal-point" src="${IMAGE_PATH}${this.state}">
            </div>
            `
            //모달 켜기
            await this.modalOn();
            
            //사진 이외의 영역을 클릭하면 modal off
            document.body.addEventListener('click', this.onEvent, false);

            // esc키를 누르면 modal off
            window.addEventListener("keyup", this.onEvent, false);
        }
        else{
            document.body.removeEventListener('click', this.onEvent, false);
            window.removeEventListener("keyup", this.onEvent, false);
        }
    }
}