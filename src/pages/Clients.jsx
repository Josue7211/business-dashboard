import React from 'react'
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Inject, Toolbar, Sort, Filter, Search } from '@syncfusion/ej2-react-grids'

import { customersGrid } from '../data/dummy'
import { useStateContext } from '../contexts/ContextProvider'
import { Header } from '../components'

const Clients = () => {
  const { clients } = useStateContext();

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