import { Col, Card, Button} from "react-bootstrap"
import Image from "react-bootstrap/Image"
import classes from "../App.module.css"
export const GameSkeleton = () => {
    return (
        <Col md={2} className="mt-3" >
             <Card className={classes.card} style={{width: 200, cursor: 'pointer'}} border={"light"}>
                <Image width={200} height={200} src="images/loading.gif"/>
                <hr/>
                <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
                {/* <div>{categories}</div> */}
                </div>
                <div>Loading...</div>
                <div>... рублей</div>
                <Button className="mt-2" type="submit">В корзину</Button>
            </Card>
        </Col>
    )
}