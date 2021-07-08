
export default function Nodes({$app, initialState, onClick, onBackClick}){
    this.state = initialState;
    this.$target = document.createElement('ul');
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
            
                const icon = node.type === "FILE" ? '💕' : '💌';
                return `
                <div class="Node" data-node-id="${node.id}">
                    <span class="icon" data-node-id="${node.id}">${icon}</span>
                    <span data-node-id="${node.id}">${node.name}</span>
                </div>
                `
            }
            ).join('');
            //console.log(nodesTemplate)

            this.$target.innerHTML = this.state.isRoot ? 
            nodesTemplate :
            `<div class="Node">prev</div>${nodesTemplate}`;

            this.$target.querySelectorAll(".Node").forEach($node=>{
                $node.addEventListener("click", (e)=>{
                    e.preventDefault();
                    e.stopPropagation();
                    const { nodeId } = e.target.dataset;
                    
                    if(nodeId){
                        const selectedNode = this.state.nodes.find(node => node.id === nodeId);

                        if(selectedNode){
                            this.onClick(selectedNode);
                        }
                    }
                    else{
                        this.onBackClick();
                        return;
                    }
                })
        })
    }
        
    }
}