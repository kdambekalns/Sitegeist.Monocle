import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {redux} from 'Redux/index';

import {PrototypeDisplay} from 'Containers/index';
import styles from './style.css';

@connect(state => {
	return {
        activePreset: state.viewportOptions.activePreset,
        availablePresets: state.viewportOptions.availablePresets,

        path: state.styleguide.path,
        prototypes: state.styleguide.prototypes
	};
})
export default class PreviewSection extends Component {
	static propTypes = {
        activePreset: PropTypes.string,
        availablePresets: PropTypes.object,
        path: PropTypes.string,
        prototypes: PropTypes.object
	};

    render() {
        const {activePreset, availablePresets} = this.props;
        const {path, prototypes} = this.props;

        const width = (availablePresets[activePreset]) ? availablePresets[activePreset]['width'] : '';
        const label = (availablePresets[activePreset]) ? availablePresets[activePreset]['label'] : '';

        const displayPrototypes = [];
        for (var prototypeKey in prototypes) {
            if (prototypes.hasOwnProperty(prototypeKey)) {
                const prototype = prototypes[prototypeKey];
                if (prototype['path'].startsWith(path)) {
                    displayPrototypes.push({key: prototypeKey, prototypeKey: prototypeKey});
                }
            }
        }

        return <div className={styles.previewSection}>
            {displayPrototypes.map(item => (
                <PrototypeDisplay key={item.prototypeKey} prototypeName={item.prototypeKey} />
            ))}
        </div>;
    }
}
