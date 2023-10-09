// Import React and useState hook
import React, { useState } from "react";

// Import React Bootstrap components
import { Button, Modal } from "react-bootstrap";

// Import Font Awesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

// Define the DeleteButton component
const DeleteButton = ({ name, id, url, fetchData }) => {
    // Define the state for showing the modal
    const [showModal, setShowModal] = useState(false);

    // Define the handler for showing the modal
    const handleShowModal = () => {
        setShowModal(true);
    };

    // Define the handler for hiding the modal
    const handleHideModal = () => {
        setShowModal(false);
    };
    const deleteCityById = (id) => {
        let token = localStorage.getItem('token');
        // Use axios.delete() to send a delete request
        return axios.delete(process.env.REACT_APP_MAIN_URL + "/dashboard/" + `${url}/${id}`, {
            headers: {
                "Authorization": "Bearer " + token,
            },
            timeout: 5000 // 5 seconds
        });
    };
    // Define the handler for confirming the deletion
    const handleConfirmDelete = () => {
        // Perform the deletion logic here, such as calling an API or updating the state
        // Define the function to delete a city by id
        deleteCityById(id)
            .then(response => {
                // Do something with the response
                console.log(response.data);
                fetchData();
            })
            .catch(error => {
                // Handle the error
                console.error(error);
            });


        // Hide the modal after deletion
        handleHideModal();
    };

    return (
        <>
            {/* Render the delete button with a trash icon */}
            <Button className='dropdown-item text-end' variant="danger" onClick={handleShowModal}>
                <FontAwesomeIcon icon={faTrash} />
                احذف
            </Button>

            {/* Render the modal component with a title, body, and footer */}
            <Modal show={showModal} onHide={handleHideModal}>
                <Modal.Header closeButton>
                    <Modal.Title>تأكيد الحذف</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Render the message with the item name */}
                    هل أنت متأكد من حذف {name}?
                </Modal.Body>
                <Modal.Footer>
                    {/* Render the cancel button */}
                    <Button variant="secondary" onClick={handleHideModal}>
                        الغاء
                    </Button>
                    {/* Render the confirm button */}
                    <Button variant="primary" onClick={handleConfirmDelete}>
                        تأكيد الحذف
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DeleteButton;
