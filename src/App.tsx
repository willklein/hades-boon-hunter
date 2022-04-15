import { useState } from 'react'

import {
  Box,
  Button,
  Container,
  Divider,
  Heading,
  VStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react'

import './App.css'
import boonData from './boons.json'


const duoBoonLookup = boonData.duoBoons.reduce((boonAccumulator, duoBoon) => {
  return [...boonAccumulator, ...duoBoon.requirements[0].boons, ...duoBoon.requirements[1].boons]
}, [] as string[])

console.log('duo boon list', duoBoonLookup)

type God = 'Aphrodite' | 'Ares' | 'Artemis' | 'Athena' | 'Demeter' | 'Dionysus' | 'Poseidon' | 'Zeus'

type Boon = {
  god: string,
  boon: string
}

type Requirement = {
  god: string,
  boons: string[]
}

function BoonChooser({ addBoon, currentBoons }: {
  addBoon: (boon: Boon) => void,
  currentBoons: Boon[]
}) {
  const [god, setGod] = useState<God | null>(null)
  const setBoon = (boon: Boon) => {
    addBoon(boon)
    setGod(null)
  }

  return (
    <>
      { 
        god
          ? boonData.boons[god].filter((boon) => currentBoons.findIndex((currentBoon) => currentBoon.boon === boon) === -1).map((boon) => (<Button onClick={() => setBoon({god, boon})}>{boon} ({duoBoonLookup.filter(b => b === boon).length})</Button>))
          : boonData.gods.map((god) => (<Button onClick={() => setGod(god as God)}>{god}</Button>))
      }
    </>
  )
}

function CurrentBoonList({ boons }: { boons: Boon[] }) {
  const gods = boons.reduce((godAccumulator: string[], boon: Boon) => {
    if(godAccumulator.indexOf(boon.god) === -1) {
      godAccumulator.push(boon.god)
    }

    return godAccumulator
  }, [])

  const boonsByGod = gods.map((god) => boons.filter((boon) => boon.god === god))

  return (
    <TableContainer>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>God</Th>
            <Th>Boons</Th>
          </Tr>
        </Thead>
        <Tbody>

        { boonsByGod.map((godBoons) => (
          <Tr>
            <Td>{godBoons[0].god}</Td>
            <Td>{godBoons.map(boon => boon.boon).join(', ')}</Td>
          </Tr>
        )) }

        </Tbody>
      </Table>
    </TableContainer>
  )
}

function DuoBoonList({ requirement, currentBoons }: {
  requirement: Requirement | undefined,
  currentBoons: Boon[]
}) {
  return requirement ? (
    <>
      { requirement.boons.map((boon, boonIndex) => (
        <>
        { boonIndex > 0 ? ', ' : null }
        { currentBoons.findIndex(currentBoon => currentBoon.boon === boon) > -1 ? <strong>{boon}</strong> : <span>{boon}</span> }
      </>
      )) }
    </>
  ) : null
}

function App() {
  const [boons, setBoons] = useState<Boon[]>([])

  return (
    <div className="App">
      <Container maxW="container.l">
        <VStack>
          <Heading>Current Boons</Heading>
          <CurrentBoonList boons={boons} />

          <Divider />

          <Heading>Choose a Boon</Heading>
          <Box w="100%">
          <VStack>
            <BoonChooser currentBoons={boons} addBoon={(newBoon: Boon) => { setBoons([...boons, newBoon])}} />
          </VStack>
          </Box>

          <Divider />

          <Heading>Duo Boons</Heading>
          <TableContainer>
            <Table variant='simple'>
              <Thead>
                <Tr>
                  <Th>Boon</Th>
                  <Th>Gods</Th>
                  <Th>Requirements</Th>
                </Tr>
              </Thead>
              <Tbody>

                { boonData.duoBoons.map((boon) => (
                  <>
                    <Tr>
                      <Td rowSpan={2}>{boon.name}</Td>
                      <Td>{boon.gods[0]}</Td>
                      <Td><DuoBoonList requirement={boon.requirements.find(requirement => requirement.god === boon.gods[0])} currentBoons={boons} /></Td>
                    </Tr>

                    <Tr>
                      <Td>{boon.gods[1]}</Td>
                      <Td><DuoBoonList requirement={boon.requirements.find(requirement => requirement.god === boon.gods[1])} currentBoons={boons} /></Td>
                    </Tr>
                  </>
                )) }

              </Tbody>
            </Table>
          </TableContainer>
        </VStack>
      </Container>
    </div>
  )
}

export default App
