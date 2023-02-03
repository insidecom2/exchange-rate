import { Col, Row } from "antd";
import { useRouter } from "next/router";
import Coin from "../../src/components/pair";
import Exchange from "../../src/components/exchange";
import Head from 'next/head'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Dispatch } from "redux";
import { ActionType } from "../../src/redux/actionTypes/param";
import { lowerSymbol } from "../../src/utils/symbol";
import useWebSocket from "react-use-websocket";
import { useFetchExchangeRate } from "../../src/hooks/useFetchExchangeRate";

export default function Market() {
    const router = useRouter()
    const { param } = router.query
    const dispatch: Dispatch<any> = useDispatch();

    const action = (type, payload) => dispatch({ type, payload })

    const socketUrl = 'wss://ws.satangcorp.com/ws/!miniTicker@arr';
    const { lastMessage } = useWebSocket(socketUrl);

    useEffect(() => {
        if (param) {
            action(ActionType.GET_PAIR_REQ, param);
        }
    }, [param])

    useEffect(() => {
        getWebsocketExchangeRate();
    }, [lastMessage]);

    const selectData = (data: string) => {
        const dataArray = JSON.parse(data)
        let dataUsed: object[] = [];
        if (dataArray.length > 0) {
            dataUsed = dataArray.filter((data) => {
                if (data.s === lowerSymbol(param)) {
                    return data
                }
            })
        }
        return dataUsed.length > 0 ? dataUsed[0] : {};
    }

    const getWebsocketExchangeRate = () => {
        if (lastMessage !== null) {
            const exchangeData: object = selectData(lastMessage.data);
            const action = (type, payload) => dispatch({ type, payload })
            if (exchangeData) {
                useFetchExchangeRate({ action: action, exchangeData: exchangeData })
            }
        }
    }

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