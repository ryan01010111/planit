import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import MaterialsItem from './MaterialsItem';
import MaterialsInfo from './MaterialsInfo';
import FilterContainer from './FilterContainer';

export default function Materials({ view, materials, purchasedIDs, toggleDisplay }) {
    const [data, setData] = useState({
        selected: {
            item: {},
            purchased: null
        }
    })
    const [filteredMaterials, setFilteredMaterials] = useState({
        items: [],
        loaded: false,
        options: {
            level: [],
            age_group: [],
            category: []
        },
        selectedOptions: {}
    })

    const getOptions = option => {
        let options = [];
        materials.forEach(item => item[option].forEach(val => options.push(val)));
        return options;
    }

    useEffect(() => {
        const level = [...new Set(getOptions('level'))].sort();
        const age_group = [...new Set(getOptions('age_group'))].sort();
        const category = [...new Set(getOptions('category'))].sort();
        setFilteredMaterials({
            items: materials,
            loaded: true,
            options: {
                level,
                age_group,
                category
            },
            selectedOptions: {}
        })
        // reset filter buttons
        document.querySelectorAll('.filter-selected').forEach(el => el.classList.remove('filter-selected'));
        return () => {
            setFilteredMaterials({
                items: null,
                loaded: false,
                options: {
                    level: [],
                    age_group: [],
                    category: []
                },
                selectedOptions: {}
            })
        }
    }, [materials])

    const getInfo = id => {
        toggleDisplay('overlay');
        setData(prevData => {
            const items = materials.filter(item => item.id === id);
            const item = items[0];
            const purchased = purchasedIDs ? purchasedIDs.includes(item.id) : false;
            return {
                ...prevData,
                selected: {...prevData.item, item, purchased}
            }
        });
        document.querySelector('#materials-info').classList.remove('hide');
    }

    const closeMaterialsInfo = () => {
        toggleDisplay('overlay');
        document.querySelector('#materials-info').classList.add('hide');
    }

    const filterMaterials = (reduce, option, value) => {
        setFilteredMaterials(prevData => {
            const prevSelectedValues = prevData.selectedOptions[option] || null;
            let newSelectedOptions = prevData.selectedOptions;
            let newFiltered = [];
            if (!reduce) {
                // get index of value to be removed in respective list
                const index = prevSelectedValues.indexOf(value);
                // remove value
                prevSelectedValues.splice(index, 1);
                // update selected options
                newSelectedOptions[option] = prevSelectedValues;
                // generate array of previously selected options (keys)
            } else {
                newSelectedOptions[option] = prevSelectedValues ? [ ...prevSelectedValues, value ] : [ value ]
            }
            const optionList = Object.keys(newSelectedOptions);
            // if list is empty, return all materials
            if (optionList.length < 1) {
                newFiltered = materials;
            // else, filter materials
            } else {
                newFiltered = materials.filter(item => {
                    return optionList.every(opt => {
                        return newSelectedOptions[opt].length < 1 || item[opt].some(val => {
                            return newSelectedOptions[opt].includes(val);
                        })
                    })
                })
            }
            return {
                ...prevData,
                items: newFiltered,
                selectedOptions: newSelectedOptions
            }
        })
    };

    const refreshMaterials = e => {
        e.persist();
        e.target.classList.add('animate-refresh');
        setFilteredMaterials(prevData => {
            return {
                ...prevData,
                items: materials,
                selectedOptions: {}
            }
        })
        const selected = document.querySelectorAll('.filter-selected');
        selected.forEach(el => el.classList.remove('filter-selected'));
        setTimeout(() => {e.target.classList.remove('animate-refresh')}, 500);
    }

    return !filteredMaterials.loaded
        ? <Loading />
        : (
            <Fragment>
                <img
                    id="happy-teacher-img"
                    src="../../static/frontend/images/teacher-happy.png"
                    alt="happy teacher"
                />
                <div id="view-header">
                    <h1>{view}</h1>
                </div>
                <div id="materials-body">
                    <FilterContainer
                        materials={filteredMaterials.items}
                        options={filteredMaterials.options}
                        filterMaterials={filterMaterials}
                        refreshMaterials={refreshMaterials}
                    />
                    <div id="materials">
                        {filteredMaterials.items.map(item => (
                            <MaterialsItem
                                key={item.id}
                                item={item}
                                purchased={purchasedIDs.includes(item.id)}
                                getInfo={getInfo}
                            />
                        ))}
                        <MaterialsInfo
                            item={data.selected.item}
                            closeMaterialsInfo={closeMaterialsInfo}
                            purchased={data.selected.purchased}
                        />
                    </div>
                </div>
            </Fragment>
        )
}

// PropTypes
Materials.propTypes = {
    materials: PropTypes.array.isRequired,
    purchasedIDs: PropTypes.array.isRequired,
    toggleDisplay: PropTypes.func.isRequired,
    view: PropTypes.string.isRequired
}
