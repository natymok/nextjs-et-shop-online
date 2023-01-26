const reducer=(state,action)=>{
    
    switch(action.type){
        
    case 'signin':
        return{
            ...state,
            token:action.token
        }
        case 'getProduct':
            return{
                ...state,
                product:action.product
            }
            case 'getcatagory':
            return{
                ...state,
                catagories:action.catagory
            }
            case 'addcart':
                return{
                    ...state,
                    cart:action.cart
                }
            case 'allcat':
                return{
                    ...state,
                    catagoryList:action.allcatagory
                }
        default:
            return state
        }

    }
    export  default reducer;