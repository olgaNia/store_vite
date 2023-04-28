import {Button, Card, CardImg} from "react-bootstrap";
import {formatCurrency} from "../utilities/formatCurrency";
import {useShoppingCart} from "../context/ShoppingCartContext";

type StoreItemProps = {
    id: number
    name: string
    price: number
    imgUrl: string
}

export function StoreItem({id, name, price, imgUrl}: StoreItemProps) {

   const {getItemQuantity,
       increaseItemQuantity,
       decreaseItemQuantity,
       removeFromCart} = useShoppingCart()

    const quantity = getItemQuantity(id)

    return (
        <Card className="h-100">
            <CardImg
                variant="top"
                src={imgUrl}
                height="200px"
                style={{objectFit: "contain"}}
            />
                <Card.Body className="d-flex flex-column">

                    <Card.Title className="d-flex justify-content-between aline-items-baseline mb-3">
                        <span>{name}</span>
                        <span>{formatCurrency(price)}</span>
                    </Card.Title>
                    <div className="mt-auto">
                        {quantity === 0 ? (
                            <Button className="w-100"
                            onClick={()=> increaseItemQuantity(id)}
                            > Add to Card</Button>
                        ) : (
                            <div
                                className="d-flex align-items-center flex-column"
                                style={{gap: ".5rem"}}
                            >
                                <div
                                    className="d-flex align-items-center justify-content-center"
                                    style={{gap: ".5rem"}}>
                                    <Button  onClick={()=> decreaseItemQuantity(id)}> - </Button>
                                    <div>
                                      <span>
                                          {quantity}
                                      </span> in Cart
                                    </div>
                                    <Button  onClick={()=> increaseItemQuantity(id)} > + </Button>
                                </div>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={()=> removeFromCart(id)}
                                >
                                    Remove </Button>
                            </div>
                        )
                        }
                    </div>
                </Card.Body>

        </Card>

    )
}

