import { Col, Row } from "antd";
import { useRouter } from "next/router";
import Coin from "../../src/components/pair";
import Exchange from "../../src/components/exchange";
import Head from 'next/head'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Dispatch } from "redux";
import { ActionType } from "../../src/redux/actionTypes/param";

export default function Market() {
    const router = useRouter()
    const { param } = router.query
    const dispatch: Dispatch<any> = useDispatch();

    const action = (type, payload) => dispatch({ type, payload })

    useEffect(() => {
        if (param) {
            action(ActionType.GET_PAIR_REQ, param);
        }
    }, [param])
    return (
        <div>
            <Head>
                <title>Exchange rate</title>
            </Head>
            <Row justify="space-around" align="middle" style={{ 'height': '90vh' }}>
                <Col span={24}>
                    <Row justify="center" gutter={[16, 16]}>
                        <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} xl={{ span: 6 }}><Coin /></Col>
                        <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} xl={{ span: 6 }}><Exchange /></Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}