import React, { useState, useEffect, useContext } from 'react';

const ConfigurationContext = React.createContext({});

function ConfigurationContextProvider(props) {
    const [configuration, setConfiguration] = useState(null);

    useEffect(() => {
        fetch(`https://reactworkshop-api.herokuapp.com/3/configuration`)
            .then(response => response.json())
            .then(data => setConfiguration(data));
    }, []);

    return <ConfigurationContext.Provider value={configuration} {...props} />;
}

function useConfiguration() {
    return useContext(ConfigurationContext);
}

export default useConfiguration;
export { useConfiguration, ConfigurationContext, ConfigurationContextProvider };
