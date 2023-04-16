import React from 'react'
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject  } from '@syncfusion/ej2-react-grids'

import { ordersGrid } from '../data/data'
import { Header } from '../components'
import { useFirebaseContext } from '../contexts/FirebaseContextProvider'

const Invoices = () => {
  const { invoices } = useFirebaseContext();

  return (
    <div className='m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl'>
      <Header category='Page' title ='Invoices'/>
      <GridComponent id='gridComp' dataSource={invoices} allowPaging allowSorting >
        <ColumnsDirective>
        {ordersGrid.map((item, index) => (
          <ColumnDirective  key={index} {...item} />
        ))}
        </ColumnsDirective>
        <Inject services={[ Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport ]}/>
      </GridComponent>
    </div>
  )
}

export default Invoices