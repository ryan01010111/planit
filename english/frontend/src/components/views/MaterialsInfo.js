import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { OrderContext } from '../contexts/OrderContext';

export default function MaterialsInfo({ item, closeMaterialsInfo, purchased }) {
    const [order, setOrder] = useContext(OrderContext);

    const renderLevels = () => {
        if (item.level) {
            return item.level.map((lvl, index) => ( <span key={index}>{lvl}</span> ))
        }
    }

    const renderAges = () => {
        if (item.age_group) {
            return item.age_group.map((grp, index) => ( <span key={index}>{grp}</span> ))
        }
    }

    const renderCategories = () => {
        if (item.category) {
            return item.category.map((cat, index) => ( <span key={index}>{cat}</span> ))
        }
    }
    
    const prepareOrder = () => {
        closeMaterialsInfo();
        setOrder(item);
    }
 
    return (
        <div id="materials-info"
            className="hide"
        >
            <button id="close-materials-info-btn" onClick={closeMaterialsInfo}>X</button>
            <img className="sample-image" src={item.sample_image} alt="sample"/>
            <h3 className="item-title">{item.title}</h3>
            <p><strong>Levels:</strong> {renderLevels()}</p>
            <p><strong>Age groups:</strong> {renderAges()}</p>
            <p><strong>Duration:</strong> <strong>{item.duration} minutes</strong></p>
            <p><strong>Categories:</strong> {renderCategories()}</p>
            <p className="item-description">{item.description}</p>
            {purchased
                ? (
                    <Link to={`/view/${item.id}`}
                        onClick={closeMaterialsInfo}
                    >
                        <button id="loadMaterialsBtn">View</button>
                    </Link>
                )
                : (
                    <Link to={`/checkout/${item.id}`}
                        onClick={prepareOrder}
                    >
                        <button id="buyMaterialsBtn">Buy</button>
                    </Link>
                )
            }
        </div>
    )
}

// PropTypes
MaterialsInfo.propTypes = {
    closeMaterialsInfo: PropTypes.func.isRequired,
    item: PropTypes.object,
}
