
export default function Nodes({$app, initialState, onClick, onBackClick}){
    this.state = initialState;
    this.$target = document.createElement('ul');
    this.$target.className = "Nodes";
    $app.appendChild(this.$target);

    this.onClick = onClick;
    this.onBackClick = onBackClick;

    this.setState = (nextState) =>{
        this.state = nextState;
        this.render();
    }

    this.render = () =>{
        if(this.state.nodes.length){ 
            const nodesTemplate = this.state.nodes.map((node)=>{
                const icon = node.type === "FILE" ? './assets/file.png' : './assets/directory.png';
                
                return `
                <div class="Node" data-node-id="${node.id}">
                    <img src='${icon}' data-node-id="${node.id}">
                    <span data-node-id="${node.id}">${node.name}</span>
                </div>
                `
            }
            ).join('');

            this.$target.innerHTML = this.state.isRoot ? 
            nodesTemplate :
            `<div class="Node"><img src="./assets/prev.png"></div>${nodesTemplate}`;
        }
    }

    this.$target.addEventListener("click", (e)=>{
            e.preventDefault();
            e.stopPropagation();

            const $node = e.target.closest('.Node');
 
            // dataset으로부터 data로 시작하는 속성 추출
            // data-node-id 속성이므로 nodeId로 접근한다.
            const { nodeId } = $node.dataset;

            if(nodeId){ // 선택한 노드의 nodeId 가 있을 경우
                const selectedNode = this.state.nodes.find(node => node.id === nodeId);
                if(selectedNode){
                    this.onClick(selectedNode);
                }
            }
            else{  // 없을 경우 = data-node-id 속성이 없는 node클래스는 prev 버튼.
                this.onBackClick();
                return;
            }
    })
}