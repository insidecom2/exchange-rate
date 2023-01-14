import { Card, Spin } from "antd";
import React, { useEffect } from 'react';
import { Typography } from 'antd';
import { useState } from 'react';
import { convertSymbolLower, convertSymbolUpper, moneyFormat } from '../utils/symbol';
import { useTypedSelector } from "../hooks/useTypeSelector";
import { useDispatch } from 'react-redux';
import { getExchangeRate } from "../redux/actions/exchange.action";
import { Dispatch } from "redux";

const { Title, Text } = Typography;

export default function Exchange() {
    const [autoFetch, setAutoFetch] = useState<number>(5)
    const dispatch: Dispatch<any> = useDispatch();
    const param = useTypedSelector((state) => state.param);
    const exchangeRate = useTypedSelector((state) => state.exchangeRate);
    const [data, setData] = useState<typeof exchangeRate>({
        payload: {},
        loading: false,
    });
    const [pairLasted, setPairLasted] = useState<string>(param.pair);
    const [loadingPage, setLoadingPage] = useState<boolean>(true)

    useEffect(() => {
        if (Object.keys(exchangeRate.payload).length > 0) {
            setData(exchangeRate)
            if (loadingPage) setLoadingPage(false)
        }
    }, [exchangeRate]);

    useEffect(() => {
        if (pairLasted !== param.pair) {
            setAutoFetch(5)
            setPairLasted(param.pair)
        }
        const fetchExchangeRate = async () => {
            if (param.pair) {
                try {
                    const symbol = convertSymbolLower(param.pair)
                    if (!exchangeRate.loading) {
                        await dispatch(getExchangeRate(symbol));
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        }

        if (autoFetch === 5) {
            fetchExchangeRate();
        }
        const interval = setInterval(() => {
            if (autoFetch - 1 >= 0) {
                setAutoFetch(autoFetch - 1);
            } else {
                setAutoFetch(5)
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [autoFetch, param.pair])

    return (
        <Card style={{ width: '100%', height: '240px' }}>
            {loadingPage ?
                <div className="exchange-loading">
                    <Spin />
                </div> : ''}
            <Title level={3}>{convertSymbolUpper(param.pair)}</Title>
            <Title level={2} style={{ height: '30px' }}>{data.payload.lastPrice ? moneyFormat(data.payload.lastPrice) : ''}</Title>
            <Text className="exchange-volume-text"><p>Volume : {data.payload.quoteVolume ? moneyFormat(data.payload.quoteVolume) : ''}</p></Text>
            <Text className="exchange-volume-text"><p>High price : {data.payload.highPrice ? moneyFormat(data.payload.highPrice) : ''}</p></Text>
            <Text className="exchange-volume-text"><p>Low price : {data.payload.lowPrice ? moneyFormat(data.payload.lowPrice) : ''}</p></Text>
            <Text className={parseFloat(data.payload.priceChangePercent) < 0 ? 'exchange-volume-danger' : 'exchange-volume-success'}><p>Change : {data.payload.priceChangePercent ? moneyFormat(data.payload.priceChangePercent) + '%' : ''} </p></Text>
        </Card>
    )
}