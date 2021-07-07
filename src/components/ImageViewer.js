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
        this.$target.style.width = "100%";
        this.$target.style.height = "100%";
        document.body.style.backgroundColor = "grey";
    }

    this.modalOff = () =>{
        this.$target.style.display = "none";
        document.body.style.backgroundColor = "white";
    }

    this.render = async () =>{
        if(this.state){
            this.$target.innerHTML = `
            <div class="content">
            <img class="modal-point" src="${IMAGE_PATH}${this.state}">
            </div>
            `

            await this.modalOn();
            
            document.body.addEventListener('click', (e)=>{
                e.preventDefault();
                e.stopPropagation();
                const { target } = e;
                if(!target.classList.contains('modal-point'))
                    this.modalOff();
            })

            window.addEventListener("keyup", e=>{
                if(this.$target.style.display === "flex" && e.key === "Escape")
                    this.modalOff();
            })
        }
    }
}