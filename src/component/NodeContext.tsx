import React,{createContext} from 'react'
import AddEmployee from './AddEmployee';
import {assetManagerContextType,listAssetManager} from './Interfacess';

//whole application context
export const AssetManagerContext=createContext<assetManagerContextType>(listAssetManager);


  
 