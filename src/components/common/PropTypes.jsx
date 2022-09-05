import PropTypes from 'prop-types';

const CommonPropTypes = () => {
    const ingredient = PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        proteins: PropTypes.number,
        fat: PropTypes.number,
        carbohydrates: PropTypes.number,
        calories: PropTypes.number,
        price: PropTypes.number,
        image: PropTypes.string.isRequired,
        image_mobile: PropTypes.string.isRequired,
        image_large: PropTypes.string.isRequired,
    });

    return {
        ingredientType: ingredient,
        ingredientsType: PropTypes.arrayOf(ingredient)
    };
};

export default CommonPropTypes();