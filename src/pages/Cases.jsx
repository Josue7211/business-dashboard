import React from 'react'
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Inject, Toolbar, Sort, Filter, Search } from '@syncfusion/ej2-react-grids'
import { casesGrid } from '../data/data'
import { useNavigate } from 'react-router-dom'
import { Header } from '../components'
import { useFirebaseContext } from '../contexts/FirebaseContextProvider'

const Cases = () => {
  const { cases } = useFirebaseContext();
  const navigate = useNavigate();

  function handleRowClick (args) {
    const caseId = args.data['id'];
    navigate(`/cases/${caseId}`);
    console.log(caseId)
  };

  return (
    <div className='m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl'>
      <Header category='Page' title ='Cases'/>
      <GridComponent dataSource={cases} allowPaging allowSorting toolbar={['Search']} width='auto' rowHeight={47} rowSelected={handleRowClick} >
        <ColumnsDirective>
        {casesGrid.map((item, index) => (
          <ColumnDirective  key={index} {...item} />
        ))}
        </ColumnsDirective>
        <Inject services={[ Page, Toolbar, Search, Sort, Filter ]}/>
      </GridComponent>
    </div>
  )
}

export default Cases