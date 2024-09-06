import fetchAllData from './fetchAllData';
import { useState, useEffect } from 'react';



function OutputTable() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const loadData = async () => {
        try {
          const result = await fetchAllData('agents');
          setData(result);
          console.log(result);
          setLoading(false);
        } catch (error) {
          console.error('加载数据时出错:', error);
          setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    },[])

    return (
        <>
           {data ? (
            data.map(item => <div>{item["company-name"]}</div>)
            ) : <div>Loading</div>
           }
            
        </>
    );
}

export default OutputTable;