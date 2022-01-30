import { useState, useEffect } from "react";
import axios from "axios";

const useAxiosFetch = (dataUrl) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        let isMounted = true;
        const source = axios.CancelToken.source();

        const fetchData = async (url) => {
            try {
                const response = await axios.get(url, {
                    cancelToken: source.token
                });
                if(isMounted) {
                    setData(response.data);
                }
            } catch (err) {
                if(isMounted) {
                    setData([]);
                }
            }
        }

        fetchData(dataUrl);

        const cleanUp = () => {
            isMounted = false;
            source.cancel();
        }

        return cleanUp;
    }, [dataUrl])

    return {data};
}

export default useAxiosFetch;