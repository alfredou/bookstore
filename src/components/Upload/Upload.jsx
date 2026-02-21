import './upload.css'
import useImageUpload from '../../hooks/useImageUpload'
import toast, { Toaster } from 'react-hot-toast';
import { useContext } from "react"
import { AuthContext } from '../../context/AuthContext';
import { apiUrl } from '../../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudArrowUp, faImage, faCheck, faTrashCan } from '@fortawesome/free-solid-svg-icons'

const notify = () => toast.success('Profile picture updated!', {
  style: { borderRadius: '10px', background: '#333', color: '#fff' }
});

const uploadError = () => toast.error('Please select an image first');
const otherError = () => toast.error('Something went wrong');

const Upload = ({ setShowModal }) => {
  const { user, dispatch } = useContext(AuthContext)
  const {
    handleDragLeave,
    handleDragOver,
    handleDrop,
    showFiles,
    clearFiles,
    active,
    image,
    previews
  } = useImageUpload()

  const handleFileChange = (e) => {
    let files = e.target.files
    showFiles(files)
  }

  const updateProfileImage = () => {
    if (image.length == 0) {
      uploadError()
    }
    else {
      apiUrl.patch(`/user/updateUser/${user._id}`, { img: image }, {
        withCredentials: true
      }).then((res) => {
        if (res.data) {
          dispatch({ type: "LOGIN_SUCESS", payload: res.data })
          notify()
          // Automatically close modal after success with a small delay
          setTimeout(() => {
            if (setShowModal) setShowModal(false)
          }, 1500)
        } else {
          otherError()
        }
      })
    }
  }

  return (
    <div className="upload__card">
      <Toaster position="bottom-right" reverseOrder={false} />

      <header className="upload__header">
        <h2 className="upload__title">Profile Picture</h2>
        <p className="upload__subtitle">JPG, PNG or GIF (Max. 5MB)</p>
      </header>

      <main className="upload__body">
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`dropzone ${active ? 'dropzone--active' : ''} ${previews.length > 0 ? 'dropzone--has-file' : ''}`}
        >
          {previews.length > 0 ? (
            <div className="upload__preview-wrapper">
              <img src={previews[0]} alt="Preview" className="upload__preview-img" />
              <button className="upload__remove-btn" onClick={clearFiles} title="Remove image">
                <FontAwesomeIcon icon={faTrashCan} />
              </button>
            </div>
          ) : (
            <label className="dropzone__label" htmlFor="profile-upload-input">
              <div className="dropzone__icon-box">
                <FontAwesomeIcon icon={faCloudArrowUp} className="dropzone__icon" />
              </div>
              <div className="dropzone__text-box">
                <span className="dropzone__primary-text">Click to upload</span>
                <span className="dropzone__secondary-text">or drag and drop</span>
              </div>
              <input
                onChange={handleFileChange}
                type="file"
                id="profile-upload-input"
                name="profile-upload-input"
                hidden
                accept="image/*"
              />
            </label>
          )}
        </div>

        {previews.length > 0 && (
          <div className="upload__status-bar">
            <FontAwesomeIcon icon={faCheck} className="upload__status-icon" />
            <span>Ready to update</span>
          </div>
        )}
      </main>

      <footer className="upload__footer">
        <button
          className={`upload__btn-submit ${image.length === 0 ? 'upload__btn-submit--disabled' : ''}`}
          onClick={updateProfileImage}
          disabled={image.length === 0}
        >
          <FontAwesomeIcon icon={faImage} style={{ marginRight: '8px' }} />
          Save Changes
        </button>
      </footer>
    </div>
  )
}

export default Upload
