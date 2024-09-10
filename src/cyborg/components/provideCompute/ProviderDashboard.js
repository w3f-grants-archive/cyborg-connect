import React, { useState, useEffect } from 'react'
import nondeployed from '../../../../public/assets/icons/nondeployed.png'
import deploymentsTab from '../../../../public/assets/icons/deployment-logo.png'
import { FiPlusCircle } from 'react-icons/fi'
import { useCyborg, useCyborgState } from '../../CyborgContext'
import { Button } from 'semantic-ui-react'
import { TbRefresh } from 'react-icons/tb'
import { NodeList } from '../general/dashboard/NodeList'

function AddNodeButton({ addNode }) {
  return (
    <button
      onClick={() => addNode(true)}
      className="flex items-center gap-1 size-30 text-white py-3 px-6 rounded-md bg-cb-green focus:bg-cb-gray-400"
    >
      <FiPlusCircle size={18} /> Add Node
    </button>
  )
}
function NoNodes({ addNode }) {
  return (
    <div className="flex flex-col justify-center h-2/3 items-center">
      <a className="">
        <img src={nondeployed} />
      </a>
      <div className="text-white flex flex-col">
        <p>Currently, you don't have any nodes.</p>
        <button onClick={() => addNode(true)} className="hover:text-cb-green">
          <u>Add your first node</u>
        </button>
      </div>
    </div>
  )
}

function ProviderDashboard() {
  const [node, addNode] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const { taskMetadata } = useCyborgState()
  const { workersWithLastTasks } = useCyborg()
  console.log('workerList: ', workersWithLastTasks)

  useEffect(() => {
    console.log(node)
  }, [node])

  return (
    <div className="h-screen bg-cb-gray-700 flex flex-col ">
      <div className="flex items-center justify-between mx-2 text-white">
        <div className="flex items-center">
          <img src={deploymentsTab} />
          <div>
            <h3 className="mb-0">Deployments</h3>
            <p className="text-white text-opacity-70">Dashboard / Node List</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setRefresh(!refresh)}>
            <TbRefresh />
          </Button>
          <AddNodeButton addNode={addNode} />
        </div>
      </div>
      {node || (workersWithLastTasks && workersWithLastTasks.length > 0) ? (
        <NodeList nodes={workersWithLastTasks} taskMetadata={taskMetadata} />
      ) : (
        <NoNodes addNode={addNode} />
      )}
    </div>
  )
}

export default ProviderDashboard
