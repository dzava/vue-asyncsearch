import {obj_get} from '../utils'

export default {
    props: {
        options: {
            type: Array,
            required: true,
        },
        labelField: {
            type: String,
            default: 'label',
        },
        valueField: {
            type: String,
            default: 'value',
        },
    },
    methods: {
        getLabelForOption(option) {
            return obj_get(option, this.labelField)
        },
        getValueForOption(option) {
            return obj_get(option, this.valueField)
        },
    },
}
