import React, { useState } from 'react'
import { IoMdCopy } from 'react-icons/io'
import CopyToClipboard from 'react-copy-to-clipboard'
import { useSubstrateState } from '../../../../substrate-lib'
import Modal from '../../general/modals/Modal'
import Button from '../../general/Button'
import { addNode } from '../../../util/nodeDeployment'
import { Separator } from '../../general/Separator'
import DownloadButton from '../../general/butttons/DownloadButton'
import { toast } from 'react-hot-toast'

const LINK_TO_SCRIPT =
  'https://raw.githubusercontent.com/Cyborg-Network/Worker/main/MasterSetup.sh'

function DeployNodeModal({ setNodeStatus }) {
  const [deployIP, setDeployIP] = useState('')
  const { api, currentAccount } = useSubstrateState()

  const handleAddNode = e => {
    if (deployIP.length < 7) {
      toast('Please insert a valid IP Address')
    } else {
      addNode(e, api, currentAccount, deployIP, setNodeStatus)
    }
  }

  return (
    <Modal additionalClasses={'flex flex-col gap-6'}>
      <div className="flex justify-between items-top">
        <h3>Deploy Master Node</h3>
        <Button
          variation={'cancel'}
          onClick={() => setNodeStatus('')}
          className="bg-cb-gray-400 rounded-full h-fit p-1.5 aspect-square hover:text-cb-green"
        />
      </div>
      <Separator colorClass={'bg-gray-500'} />
      <div className="flex gap-6 items-center">
        <div className="text-lg">
          <span className="font-extrabold">1. </span>Download the installation
          script and run it on your node to set it up.
        </div>
        {/*We still need a place to manage this file so that this button can work reliably*/}
        <DownloadButton linkToFile={LINK_TO_SCRIPT} />
      </div>
      <Separator colorClass={'bg-gray-500'} />
      <div className="flex flex-col gap-6">
        <div className="text-lg">
          <span className="font-extrabold">2. </span>Paste the IP address of the
          node that was set up with the installation script here.
        </div>
        {/*The below div can ONLY contain the input and the CopyToClipboard component, since the absolute pos can't directly bind to the input since it doesn't accept children*/}
        <div className="h-fit relative">
          <input
            type="text"
            placeholder="Insert command to deploy node..."
            onChange={e => {
              setDeployIP(e.target.value)
            }}
            className="w-full relative p-3.5 bg-cb-gray-500 border border-cb-gray-600 text-white rounded-lg focus:border-cb-green focus:ring-cb-green focus:outline-none"
            required
          />
          <CopyToClipboard text={deployIP}>
            <button className="absolute rounded-lg bg-cb-gray-400 hover:text-cb-green right-2 top-1/2 -translate-y-1/2">
              <IoMdCopy size={25} />
            </button>
          </CopyToClipboard>
        </div>
      </div>
      <Separator colorClass={'bg-gray-500'} />
      <button
        onClick={e => handleAddNode(e)}
        className="flex w-1/2 items-center text-cb-gray-500 self-center justify-center gap-1 size-30 py-3 px-6 rounded-md bg-cb-green focus:bg-cb-gray-500 focus:text-cb-green"
      >
        Deploy
      </button>
    </Modal>
  )
}

export default DeployNodeModal
