import { request } from "../api/api.js";
import Breadcrumb from "./Breadcrumb.js";
import ImageViewer from "./ImageViewer.js";
import Loading from "./Loading.js";
import Nodes from "./Nodes.js";

const cache = {};

export default function App({$app}){
    this.state = {
        isLoading : false,
        isRoot : false,
        nodes : [],
        depth : [],
        selectedFilePath : null,
    }
    this.$target  = document.createElement('div');
    $app.appendChild(this.$target);

    this.setState = (nextState) => {
        this.state = nextState;
        // 컴포넌트 업데이트
        breadcrumb.setState(this.state.depth);
        nodes.setState({
            isRoot : this.state.isRoot,
            nodes : this.state.nodes
        })
        loading.setState(this.state.isLoading);
        imageViewer.setState(this.state.selectedFilePath);
    }

    const loading = new Loading({
        $app,
        initialState : this.state.isLoading
    })

    const imageViewer = new ImageViewer({
        $app,
        initialState : this.state.selectedFilePath
    })

    const breadcrumb = new Breadcrumb({
        $app,
        initialState : this.state.depth,
        onClick : (index) =>{
            if(index === null){
                this.setState({
                    ...this.state,
                    isRoot : true,
                    depth : [],
                    nodes : cache.rootNodes,
                    selectedFilePath : null,
                })
                return;
            }
            if(index === this.state.depth.length-1)
            return;

            const nextState = {...this.state};
            const nextDepth = this.state.depth.slice(0, index+1);
            console.log(nextDepth)
            this.setState({
                ...nextState,
                depth : nextDepth,
                nodes : cache[nextDepth[nextDepth.length-1].id]
            })
            
        }
    })

    const nodes = new Nodes({
        $app,
        initialState : {
            isRoot : this.state.isRoot,
            nodes : this.state.nodes
        },
        onClick : async (node) => {
            try{
                if(node.type==="DIRECTORY"){
                    if(cache[node.id]){
                        this.setState({
                            ...this.state,
                            isRoot:false,
                            depth : [...this.state.depth, node],
                            nodes : cache[node.id],
                            selectedFilePath : null
                        })
                    }
                    else {
                        const newNodes = await request(node.id);

                        this.setState({
                            ...this.state,
                            isRoot : false,
                            depth : [...this.state.depth, node],
                            nodes : newNodes,
                            selectedFilePath : null
                        })
                        cache[node.id] = newNodes;
                    }
                }
                else if(node.type === "FILE"){
                    this.setState({
                        ...this.state,
                        selectedFilePath : node.filePath
                    })
                }
            }catch(e){
                throw new Error(e.message);
            }
           
        },

        onBackClick : () => {
            const nextState = { ...this.state};
            nextState.depth.pop();

            const prevNodeID = nextState.depth.length ?
            nextState.depth[nextState.depth.length-1].id : null;
            
            if(prevNodeID === null){ // back root
                this.setState({
                    ...nextState,
                    isRoot:true,
                    nodes : cache.rootNodes,
                    selectedFilePath : null
                })
            }
            else{
                this.setState({
                    ...nextState,
                    isRoot : false,
                    nodes : cache[prevNodeID],
                    selectedFilePath : null
                })
            }   
        }
    })

    


    const init = async () =>{
        try{
            this.setState({
                ...this.state,
                isLoading : true,
            })
            const rootNodes = await request();
            
            this.setState({
                ...this.state,
                isRoot : true,
                nodes : rootNodes,
            })

            cache.rootNodes = rootNodes;
            
            this.setState({
                ...this.state,
                isLoading : false,
            })

        }catch(e){
            throw new Error(e.message);
        }
    }

    init();
}