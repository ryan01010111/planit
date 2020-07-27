import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class FilterContainer extends Component {
    handleClick = (option, value, e) => {
        const reduce = !(e.target.classList.contains('filter-selected'));
        e.target.classList.toggle('filter-selected');
        this.props.filterMaterials(reduce, option, value);
    }

    renderOptions = option => {
        let rawOptions = [];
        this.props.materials.forEach(item => item[option].forEach(val => rawOptions.push(val)));
        const options = [...new Set(rawOptions)].sort();

        return this.props.options[option].map((value, index) => {
            const disable = !(options.includes(value));
            return (
                <button
                    key={index}
                    className="filter-btn"
                    onClick={this.handleClick.bind(this, option, value)}
                    disabled={disable}
                >
                    {value}
                </button>
            )
        })
    }
        
    render() {
        return (
            <div id="filter-container"
                className="hide-filter-sm"
            >
                <svg
                    id="refresh-svg"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    onClick={this.props.refreshMaterials.bind(this)}
                >
                    <defs>
                        <filter id="shadow"
                            width="150%"
                            height="150%"
                        >
                            <feDropShadow
                                dx="1"
                                dy="1"
                                stdDeviation="1"
                                floodColor="#777"
                            />
                        </filter>
                    </defs>
                    <path
                        id="refresh-path"
                        d="M256.455 8c66.269.119 126.437 26.233 170.859 68.685l35.715-35.715C478.149
                            25.851 504 36.559 504 57.941V192c0 13.255-10.745 24-24 24H345.941c-21.382
                            0-32.09-25.851-16.971-40.971l41.75-41.75c-30.864-28.899-70.801-44.907-113.23-45.273-92.398-.798-170.283
                            73.977-169.484 169.442C88.764 348.009 162.184 424 256 424c41.127 0 79.997-14.678 110.629-41.556
                            4.743-4.161 11.906-3.908 16.368.553l39.662 39.662c4.872 4.872 4.631 12.815-.482 17.433C378.202
                            479.813 319.926 504 256 504 119.034 504 8.001 392.967 8 256.002 7.999 119.193 119.646 7.755 256.455 8z"
                    />
                </svg>
                <div id="filter-content">
                    <div id="filter-levels">
                        <p>Level</p>
                        {this.renderOptions('level')}
                    </div>
                    <div id="filter-age-groups">
                        <p>Age Group</p>
                        {this.renderOptions('age_group')}
                    </div>
                    <div id="filter-categories">
                        <p>Category</p>
                        {this.renderOptions('category')}
                    </div>
                </div>
            </div>
        )
    }
}

// PropTypes
FilterContainer.propTypes = {
    filterMaterials: PropTypes.func.isRequired,
    materials: PropTypes.array.isRequired,
    options: PropTypes.object.isRequired,
    refreshMaterials: PropTypes.func.isRequired
}
