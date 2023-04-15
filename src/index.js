
import React from 'react';
import ReactDOM from 'react-dom/client';
import { registerLicense } from '@syncfusion/ej2-base';
import'./index.css'
import App from './App';
import { ContextProvider } from './contexts/ContextProvider';
import { AuthContextProvider } from './contexts/AuthContextProvider';
import { DataContextProvider } from './contexts/DataContextProvider';

registerLicense('Mgo+DSMBaFt+QHFqVk9rWU5FckBAXWFKblJ3T2BedV5zZCQ7a15RRnVfRlxnSHxTcEZkWn1Xcw==;Mgo+DSMBPh8sVXJ1S0d+X1hPc0BDWXxLflF1VWJYdV13flVFcC0sT3RfQF5jTX9Xd0djX3xZc3BRRQ==;ORg4AjUWIQA/Gnt2VFhhQlJNfVpdXGdWfFN0RnNYflRzc19GY0wgOX1dQl9gSXpSckRhWXldd3dQT2M=;MTcyODA0MUAzMjMxMmUzMTJlMzMzOWNSekVaYzRhY2xrL242RFZxaWppSW1ob0dTVTh6QmZoOWpUNC9XSGtQVE09;MTcyODA0MkAzMjMxMmUzMTJlMzMzOUI0eHdiMjdJUEFMUWJqaUs1TENMcUZGalNmYjVTRlB2TzI2emFuekxuRXc9;NRAiBiAaIQQuGjN/V0d+XU9Hf1RHQmJNYVF2R2BJfl96d1JMYF9BNQtUQF1hSn5Xd0FiW39Yc3NRRGBf;MTcyODA0NEAzMjMxMmUzMTJlMzMzOVlKUDR4RGxFRmZVZG5vTXljTTY2VERzTTdFNjNXcVFaMjAyQkEwUzRhY289;MTcyODA0NUAzMjMxMmUzMTJlMzMzOWNVNXNwQitnSEgzRnZnM3drT3NmcExZVTREUFhLZVU1a3JacHBYaGt2QXc9;Mgo+DSMBMAY9C3t2VFhhQlJNfVpdXGdWfFN0RnNYflRzc19GY0wgOX1dQl9gSXpSckRhWXldd3BdR2M=;MTcyODA0N0AzMjMxMmUzMTJlMzMzOWp4U0ZDeFlFcVpjZ1FXbE9wbFBiT244b3I5T2k2MEN0UGhDekhDWmJYZHc9;MTcyODA0OEAzMjMxMmUzMTJlMzMzOUxIM0FJU2tFRWw0OHNNNEt5ZVo4SHpFUjM1ZjBPcjRzdGFBYW1GMVRWMnM9;MTcyODA0OUAzMjMxMmUzMTJlMzMzOVlKUDR4RGxFRmZVZG5vTXljTTY2VERzTTdFNjNXcVFaMjAyQkEwUzRhY289');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <DataContextProvider>
        <ContextProvider>
          <App />
        </ContextProvider>
      </DataContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
