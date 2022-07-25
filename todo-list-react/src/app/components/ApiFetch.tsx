import React, {useState, useLayoutEffect} from 'react';
import axios from 'axios';

export const ApiFetch: React.FC = () => {
    // 那覇市のお天気データ ※https://weather.tsukumijima.net/参考
    const url = `https://weather.tsukumijima.net/api/forecast/city/130010`;
    // データを保存するやつ
    const [data, setData] = useState([]);

    useLayoutEffect(() => {
        axios.get(url)
            .then(res =>{
                setData(res.data.link);
            })
    }, []);

    /** レンダー部分 */
    return (
        <>
            {JSON.stringify(data)}
        </>
    );
};

export default ApiFetch;