import React from 'react';
import PropTypes from 'prop-types';
import CommonPropTypes from './common/PropTypes';

export const IngiredientsContext = React.createContext();

IngiredientsContext.Provider.propTypes = {
    value: PropTypes.shape({
        ingredients: CommonPropTypes.ingredientsArrayType.isRequired,
        isLoading: PropTypes.bool.isRequired
    })
}