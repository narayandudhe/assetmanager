

export interface List_Employe {
      EmployeeId:number,
      EmployeeName:string,
      EmployeeAddress:string,
      EmployeeDepName:string,
      EmployeeProfilePicUrl:string,
      EmployeeSalary:number,
      DateOfBirth:string,
      DateOfJoining:string,
      EmployeeEmailId:string,
      EmployeeMobileNo:number
  }
  
 export interface List_asset{
      AssetsId:number,
      AsstsName:string,
      AssetsSerialNo:string,
      AssetsCompanyName:string,
      AssetModel:string,
      AssetAsigned:boolean,
      AssetPurchaseDate:string,
      AssetsWarrenty:number,
      AssetImageUrl:string,
      AssetPrice:number,
  }
 export interface List_assets_assigned{
        AssignedId:number,
        AssetsId:number,
        AsstsName:String,
        AssetsSerialNo:string,
        AssetsCompanyName:string,
        AssetModel:string,
        EmployeeId:number,
        EmployeeName:string,
        DateOfAssigned:string
      }

export type assetManagerContextType={
    employees:List_Employe[],
    assets:List_asset[],
    assignedAssets:List_assets_assigned[],
    setEmployees:(data:List_Employe[]) => void,
    setAssets:(dataa:List_asset[]) => void,
    setAssignedAssets:(dataaa:List_assets_assigned[]) => void,
    apiurl:string
}

export const listAssetManager:assetManagerContextType={
    employees:[],
    assets:[],
    assignedAssets:[],
    setEmployees: (data) => {},
    setAssets: (data) => {},
    setAssignedAssets: (data) => {},
    apiurl:''
}

// export type EmployeeContextType={
//     employees:List_Employe[],
//     setEmployees:(data:List_Employe[]) => void,
//     }
//     export   const listaInicial: EmployeeContextType = {
//         employees:[],
//         setEmployees: (data) => {}
//       }
    
    
//       export  type AssetsContextType={
//         assets:List_asset[],
//         setAssets:(data:List_asset[]) => void
//     }
//     export  const listaInicialassets: AssetsContextType = {
//         assets:[],
//         setAssets: (data) => {}
//       }
      
//       export  type AssetsAssignedContextType={
//         assignedAssets:List_assets_assigned[],
//         setAssignedAssets:(data:List_assets_assigned[]) => void
//     }
//     export   const listaInicialassetsAssigned: AssetsAssignedContextType = {
//         assignedAssets:[],
//         setAssignedAssets: (data) => {}
//       }
      
export type UserContextProviderProps={
        children:React.ReactNode
    }
