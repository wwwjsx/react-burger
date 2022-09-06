import PropTypes from 'prop-types';

const CommonPropTypes = () => {

    const ingredient = {
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
    };

    const ingredientTypeShape = PropTypes.shape(ingredient);

    return {
        ingredientType: ingredient,
        ingredientShapeType: ingredientTypeShape,
        ingredientsArrayType: PropTypes.arrayOf(ingredientTypeShape),
        headerLinkType: {
            icon: PropTypes.string.isRequired,
            activeIcon: PropTypes.string.isRequired
        }
    };
};

export default CommonPropTypes();