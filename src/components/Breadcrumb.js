// 현재 탐색 중인 경로
// root - .. - 

export default function Breadcrumb({$app, initialState, onClick}){
    this.state = initialState;
    this.$target = document.createElement('nav');
    this.$target.className = "Breadcrumb";

    $app.appendChild(this.$target);

    this.onClick = onClick;

    this.setState = (nextState) =>{
        this.state = nextState;
        this.render();
    }

    this.render = () =>{
        if(this.state){
            this.$target.innerHTML=
            `
            <div class="nav-item">root</div>
            ${
                this.state.map((node,index)=>
                `<div class="nav-item" data-index="${index}">
                ${node.name}
                </div>
                `
                ).join('')}
            `
        }
    }

    this.$target.addEventListener('click', e=>{
        e.preventDefault();
        e.stopPropagation();
        const $navItem = e.target.closest('.nav-item')

        if($navItem){
            const { index } = $navItem.dataset;
            this.onClick(index ? parseInt(index, 10) : null)
        }
    })
}