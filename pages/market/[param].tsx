import { Col, Row } from "antd";
import { useRouter } from "next/router";
import Coin from "../../src/components/pair";
import Exchange from "../../src/components/exchange";
import Head from 'next/head'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setPair } from "../../src/redux/actions/param.action";
import { Dispatch } from "redux";

export default function Market() {
    const router = useRouter()
    const { param } = router.query
    const dispatch:Dispatch<any> = useDispatch();

    dispatch(setPair(param));
        
    return (
        <div>
            <Head>
                <title>Exchange rate</title>
            </Head>
            <Row justify="space-around" align="middle" style={{ 'height': '90vh' }}>
                <Col span={24}>
                    <Row justify="center" gutter={[16, 16]}>
                        <Col span={6}><Coin /></Col>
                        <Col span={6}><Exchange /></Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}