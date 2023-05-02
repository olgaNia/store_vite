import {useShoppingCart} from "../context/ShoppingCartContext";
import storeItems from "../data/items.json";
import {Button, Stack} from "react-bootstrap";
import {formatCurrency} from "../utilities/formatCurrency";

type cartItemProps = {
    id: number
    quantity:number
}

export function CartItem({id,quantity} : cartItemProps){
    const {removeFromCart} = useShoppingCart()
    const item = storeItems.find(itemElem => itemElem.id === id)
    if( item == null) return null
    return(
        <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
            <img src={item.imgUrl} alt="item" style={{width:"150px", height:"75px", objectFit: "contain"}}/>
            <div className="me-auto">
               <div>
                   {item.name}{" "}
                   {quantity > 1 && (
                       <span className="text-muted" style={{fontSize:".5rem"}}> x {quantity} </span>
                   )}
               </div>
                <div className="text-muted" style={{fontSize:".7rem"}}>
                    {formatCurrency(item.price)}
                </div>
                <div>
                    {formatCurrency(item.price * quantity)}
                </div>
                <Button
                    onClick={()=>{removeFromCart(item.id)}}
                    variant="outline-danger"
                    size="sm">
                    &times;
                </Button>
            </div>
        </Stack>
    )
}