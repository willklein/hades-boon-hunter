import React, { useState } from 'react'

import {
  Box,
  Button,
  Checkbox,
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

import useStickyState from './useStickyStorage'

type God = 'Aphrodite' | 'Ares' | 'Artemis' | 'Athena' | 'Demeter' | 'Dionysus' | 'Poseidon' | 'Zeus'

type Boon = {
  god: string,
  boon: string
}

type Requirement = {
  god: string,
  boons: string[]
}

type DuoBoonMap = Record<string, boolean>

interface DuoBoon {
  name: string
}


const duoBoonData = [...boonData.duoBoons]

const getKey = (name: string) => name.replace(/\s/g , "-")

const duoBoonLookup = duoBoonData.reduce((duoBoonAccumulator, duoBoon) => {
  return [...duoBoonAccumulator, ...duoBoon.requirements[0].boons, ...duoBoon.requirements[1].boons]
}, [] as string[])

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
    <React.Fragment>
      { 
        god
          ? boonData.boons[god].filter((boon) => currentBoons.findIndex((currentBoon) => currentBoon.boon === boon) === -1).map((boon) => (<Button key={`boon-chooser-boon-${getKey(boon)}`} onClick={() => setBoon({god, boon})}>{boon} ({duoBoonLookup.filter(b => b === boon).length})</Button>))
          : boonData.gods.map((god) => (<Button key={`boon-chooser-${god}`} onClick={() => setGod(god as God)}>{god}</Button>))
      }
    </React.Fragment>
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
          <Tr key={`currentBoons-${godBoons[0].god}`}>
            <Td>{godBoons[0].god}</Td>
            <Td>{godBoons.map(boon => boon.boon).join(', ')}</Td>
          </Tr>
        )) }

        </Tbody>
      </Table>
    </TableContainer>
  )
}

const DuoBoonList = ({ requirement, currentBoons }: {
  requirement: Requirement | undefined,
  currentBoons: Boon[]
}) => (
  <>
    { requirement?.boons.map((boon, boonIndex) => (
        <React.Fragment key={`duo-boon-list-${boonIndex}`}>
          { boonIndex > 0 ? ', ' : null }
          { currentBoons.findIndex(currentBoon => currentBoon.boon === boon) > -1 ? <strong>{boon}</strong> : <span>{boon}</span> }
        </React.Fragment>
    )) } 
  </>
)


const duoBoonMap = duoBoonData.reduce((boonMap: DuoBoonMap, duoBoon: DuoBoon) => {
  boonMap[duoBoon.name] = false

  return boonMap
}, {})

function App() {
  const [boons, setBoons] = useStickyState<Boon[]>([], 'boons')
  const [duoBoons, setDuoBoons] = useStickyState<DuoBoonMap>(duoBoonMap, 'duoBoon')

  const toggleDuoBoon = (duoBoonKey: string, value: boolean) => {
    setDuoBoons({
      ...duoBoons,
      [duoBoonKey]: value
    })
  }

  const resetBoons = () => {
    setBoons([])
  }

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

                { duoBoonData.map((boon, duoBoonIndex) => (
                  <React.Fragment key={`duo-boon-${getKey(boon.name)}`}>
                    <Tr key={`duo-boon-${getKey(boon.name)}-0`}>
                      <Td rowSpan={2}><Checkbox onChange={(event) => toggleDuoBoon(boon.name, event.target.checked)} isChecked={duoBoons[boon.name]}/></Td>
                      <Td rowSpan={2}>{boon.name}</Td>
                      <Td>{boon.gods[0]}</Td>
                      <Td><DuoBoonList requirement={boon.requirements.find(requirement => requirement.god === boon.gods[0])} currentBoons={boons} /></Td>
                    </Tr>

                    <Tr key={`duo-boon-${getKey(boon.name)}-1`}>
                      <Td>{boon.gods[1]}</Td>
                      <Td><DuoBoonList requirement={boon.requirements.find(requirement => requirement.god === boon.gods[1])} currentBoons={boons} /></Td>
                    </Tr>
                  </React.Fragment>
                )) }

              </Tbody>
            </Table>
          </TableContainer>

          <Button onClick={resetBoons}>New Runthrough</Button>
        </VStack>
      </Container>
    </div>
  )
}

export default App
