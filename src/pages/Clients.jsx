import React from 'react'
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Inject, Toolbar, Sort, Filter, Search } from '@syncfusion/ej2-react-grids'

import { customersGrid } from '../data/data'
import { Header } from '../components'
import { useFirebaseContext } from '../contexts/FirebaseContextProvider'

const Clients = () => {
  const { clients } = useFirebaseContext();

  return (
    <div className='m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl'>
      <Header category='Page' title ='Clients'/>
      <GridComponent dataSource={clients} allowPaging allowSorting toolbar={['Search']} width='auto' >
        <ColumnsDirective>
        {customersGrid.map((item, index) => (
          <ColumnDirective  key={index} {...item} />
        ))}
        </ColumnsDirective>
        <Inject services={[ Page, Toolbar, Search, Sort, Filter ]}/>
      </GridComponent>
    </div>
  )
}

export default Clients