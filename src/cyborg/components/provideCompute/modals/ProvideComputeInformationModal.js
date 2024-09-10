import Button from '../../general/Button'
import Modal from '../../general/modals/Modal'

function ProvideComputeInfoModal({ onClose, onProceed }) {
  return (
    <Modal>
      <div className="flex flex-col">
        <Button
          variation={'cancel'}
          additionalClasses="absolute top-6 right-6"
          onClick={onClose}
        />
        <h2>Welcome to the Dashboard!</h2>
        <p className="text-lg">
          Here, you can get an overview over your computational resources.
        </p>
        <p className="text-lg">
          You start by adding units capable of executing computational requests
          that are connected to your address on the Cyborg Parachain, referred
          to as nodes.
        </p>
        <p className="text-lg">
          To set up the node, you will be asked to execute a script on the
          machine that will serve as the node and then register its IP address
          on the Cyborg Parachain, so that it can begin to receive requests.
        </p>
        <Button variation={'primary'} onClick={onProceed}>
          Add your first node!
        </Button>
      </div>
    </Modal>
  )
}

export default ProvideComputeInfoModal
