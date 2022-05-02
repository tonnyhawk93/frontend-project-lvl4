import React from "react";
import { PlusSquare } from 'react-bootstrap-icons';
import cn from 'classnames';

const NavPanel = ({items, selectCurrentItemId, currentItemId}) => {
    return (
        <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
            <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
                <span>Каналы</span>
                <button className="p-0 text-primary btn btn-group-vertical">
                    <PlusSquare size={20} color="royalblue"/>
                </button>
            </div>
            <ul className="nav flex-column nav-pills nav-fill px-2">
                {items.map(({id, name}) => {
                    const buttonClasses = cn("w-100", "rounded-0", "text-start", "btn", {
                        "btn-secondary": id === currentItemId,
                    })

                    return (
                        <li className="nav-item w-100" key={id}>
                            <button className={buttonClasses} onClick={() => selectCurrentItemId(id)}>
                                <span className="me-1">#</span>
                                {name}
                            </button>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default NavPanel;