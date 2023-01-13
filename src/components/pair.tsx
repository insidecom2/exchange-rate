
import { Button, Card, Space } from "antd";
import { useRouter } from "next/router";
import { useTypedSelector } from '../hooks/useTypeSelector';
import { convertSymbolUpper } from "../utils/symbol";

export default function Coin() {
    const router = useRouter()
    const coinLists: string[] = ['BTC/THB', 'BUSD/THB', 'USDT/THB'];
    const { pair, loading, error } = useTypedSelector((state) => state.param);

    const changeCoin = (coin: string) => {
        const param:string = coin.replace('/', '_');
        router.push(`/market/${param}`)
    }
    return (
        <>
            <Card style={{ width: '100%' }} bordered={false} className="pair-card">
                <Space direction="vertical" style={{ width: '100%' }}>
                    {coinLists.map((data: string, key: number) => {
                        const classActive: string = (data === convertSymbolUpper(pair) ? "button-active" : "button-default");
                            return <Button key={key} size={'large'} block className={classActive} onClick={() => changeCoin(data) }>{data}</Button>
                        })
                    }
                </Space>
            </Card>
        </>
    )
}