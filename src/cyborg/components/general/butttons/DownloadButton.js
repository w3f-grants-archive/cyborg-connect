import { FiDownload } from 'react-icons/fi'

const DownloadButton = ({ linkToFile }) => {
  return (
    <a
      className="w-16 aspect-square rounded-lg text-white hover:text-cb-green bg-cb-gray-500 grid items-center justify-center"
      href={linkToFile}
      download="cyborg-node-installation-script.sh"
    >
      <FiDownload size={22} />
    </a>
  )
}

export default DownloadButton
