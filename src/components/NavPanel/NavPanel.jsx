import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown } from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';
import cn from 'classnames';
import { AddModal, DeleteModal, EditModal } from '../modals/index.js';

function NavPanel({
  items, selectCurrentItemId, currentItemId, initialChannel, socket,
}) {
  const [showedModal, setShowedModal] = useState(null);
  const [editedChannelId, setEditedChannelId] = useState(initialChannel.id);
  const { t } = useTranslation();

  const handleClose = useCallback(() => setShowedModal(null), [setShowedModal]);

  const showAddModal = useCallback(() => setShowedModal('add'), [setShowedModal]);
  const showDeleteModal = useCallback(() => setShowedModal('delete'), [setShowedModal]);
  const showEditModal = useCallback(() => setShowedModal('edit'), [setShowedModal]);

  const renderNavItem = ({ id, name, removable }) => {
    const buttonClasses = cn('w-100', 'rounded-0', 'text-start', 'btn', {
      'btn-secondary': id === currentItemId,
    });

    const dropdownClasses = cn('flex-grow-0', 'dropdown-toggle', 'dropdown-toggle-split', 'btn', {
      'btn-secondary': id === currentItemId,
    });

    return (
      <li className="nav-item w-100" key={id}>
        {removable
          ? (
            <Dropdown className="d-flex btn-group">
              <button className={buttonClasses} type="button" onClick={() => selectCurrentItemId(id)}>
                <span className="me-1">#</span>
                {name}
              </button>
              <Dropdown.Toggle
                className={dropdownClasses}
                variant="outline"
              />
              <Dropdown.Menu onClick={() => setEditedChannelId(id)}>
                <Dropdown.Item onClick={showDeleteModal}>{t('navPanel.dropdownMenu.delete')}</Dropdown.Item>
                <Dropdown.Item onClick={showEditModal}>{t('navPanel.dropdownMenu.rename')}</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )
          : (
            <button className={buttonClasses} type="button" onClick={() => selectCurrentItemId(id)}>
              <span className="me-1">#</span>
              {name}
            </button>
          )}
      </li>
    );
  };

  return (
    <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>{t('navPanel.title')}</span>
        <button className="p-0 text-primary btn btn-group-vertical" type="button" onClick={showAddModal}>
          <PlusSquare size={20} color="royalblue" />
        </button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill px-2">
        {items.map(renderNavItem)}
      </ul>
      <AddModal show={showedModal === 'add'} handleClose={handleClose} socket={socket} />
      <EditModal show={showedModal === 'edit'} handleClose={handleClose} socket={socket} editedChannelId={editedChannelId} />
      <DeleteModal show={showedModal === 'delete'} handleClose={handleClose} socket={socket} editedChannelId={editedChannelId} />
    </div>
  );
}

export default NavPanel;
