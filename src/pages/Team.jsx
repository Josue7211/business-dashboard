import React from 'react'
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Search, Inject, Toolbar } from '@syncfusion/ej2-react-grids'
import { employeesGrid } from '../data/data'
import { Header } from '../components'
import { useFirebaseContext } from '../contexts/FirebaseContextProvider'

const Team = () => {
  const { team } = useFirebaseContext();

  return (
    <div className='m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl'>
      <Header category='Page' title ='Team'/>
      <GridComponent dataSource={team} allowPaging allowSorting toolbar={['Search']} width='auto' >
        <ColumnsDirective>
        {employeesGrid.map((item, index) => (
          <ColumnDirective  key={index} {...item} />
        ))}
        </ColumnsDirective>
        <Inject services={[ Page, Search, Toolbar ]}/>
      </GridComponent>
    </div>
  )
}

export default Team