import React from 'react'
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, Edit, Toolbar, Sort, Filter } from '@syncfusion/ej2-react-grids'

import { customersGrid } from '../data/dummy'
import { useStateContext } from '../contexts/ContextProvider'
import { Header } from '../components'

const Clients = () => {
  const { clients } = useStateContext();

  return (
    <div className='m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl'>
      <Header category='Page' title ='Clients'/>
      <GridComponent dataSource={clients} allowPaging allowSorting toolbar={['Delete']} editSettings={{ allowDeleting: true, allowEditing: true }} width='auto' >
        <ColumnsDirective>
        {customersGrid.map((item, index) => (
          <ColumnDirective  key={index} {...item} />
        ))}
        </ColumnsDirective>
        <Inject services={[ Page, Toolbar, Selection, Edit, Sort, Filter ]}/>
      </GridComponent>
    </div>
  )
}

export default Clients