import React from 'react'
import PropTypes from 'prop-types'

const MaterialsItem = ({ item, purchased, getInfo }) => {
    const renderDetails = items => {
        if (items) {
            return items.map((item, index) => ( <span key={index}>{item}</span> ))
        }
    }

    return (
        <div className="materials-item"
            onClick={getInfo.bind(this, item.id)}
        >
            <h3 className={`item-title ${purchased ? "purchased" : "not-purchased"}`}>
                {item.title}
            </h3>
            <div className="materials-item-container">
                <div className="materials-item-body">
                    <p><strong>Levels:</strong> {renderDetails(item.level)}</p>
                    <p><strong>Age groups:</strong> {renderDetails(item.age_group)}</p>
                    <p><strong>Duration:</strong> <strong>{item.duration} minutes</strong></p>
                    <p><strong>Categories:</strong> {renderDetails(item.category)}</p>
                </div>
                <div className="materials-item-more">
                    <img className="sample-image" src={item.sample_image} alt="image"/>
                    {purchased ? (
                        <div className="price">Owned</div>
                    ) : (
                        <div className="price">${item.price}</div>
                    )}
                </div>
            </div>
        </div>
    )
}

MaterialsItem.propTypes = {
    getInfo: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    purchased: PropTypes.bool.isRequired
}

export default MaterialsItem;
