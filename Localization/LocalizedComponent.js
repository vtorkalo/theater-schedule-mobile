import { Component } from 'react';
import PropTypes from 'prop-types';

export default class LocalizedComponent extends Component {
    t(key) {
        return this.context.t(key);
    }
}
LocalizedComponent.contextTypes = {
    t: PropTypes.func
};