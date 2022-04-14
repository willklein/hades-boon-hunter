import { useState } from 'react'

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'

// import logo from './logo.svg'
import './App.css'
import boonData from './boons.json'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <TableContainer>
        <Table variant='simple'>
          <TableCaption>Dual Boons</TableCaption>
          <Thead>
            <Tr>
              <Th>Boon</Th>
              <Th>Gods</Th>
              <Th>Requirements</Th>
            </Tr>
          </Thead>
          <Tbody>

            {boonData.dualBoons.map((boon) => (
              <>
              <Tr>
                <Td rowSpan={2}>{boon.name}</Td>
                <Td>{boon.gods[0]}</Td>
                <Td>{boon.requirements.find(requirement => requirement.god === boon.gods[0])?.boons.join(', ')}</Td>
              </Tr>

              <Tr>
                <Td>{boon.gods[1]}</Td>
                <Td>{boon.requirements.find(requirement => requirement.god === boon.gods[1])?.boons.join(', ')}</Td>
              </Tr>
              </>
              ))}

          </Tbody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default App
